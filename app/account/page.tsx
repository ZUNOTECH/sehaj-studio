'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { formatPrice } from '@/lib/shopify/types';

interface CustomerAddress {
  id: string;
  firstName: string | null;
  lastName: string | null;
  name: string | null;
  company: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  province: string | null;
  zip: string | null;
  country: string | null;
  phone: string | null;
}

interface CustomerOrderLineItem {
  title: string;
  quantity: number;
  variant: {
    title: string | null;
  } | null;
}

interface CustomerOrder {
  id: string;
  name: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string | null;
  fulfillmentStatus: string | null;
  totalPriceV2: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    edges: { node: CustomerOrderLineItem }[];
  };
}

interface CustomerAccount {
  id: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string;
  email: string;
  phone: string | null;
  defaultAddress: CustomerAddress | null;
  addresses: {
    edges: { node: CustomerAddress }[];
  };
  orders: {
    edges: { node: CustomerOrder }[];
  };
}

interface AddressFormState {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone: string;
}

const INITIAL_ADDRESS_FORM: AddressFormState = {
  firstName: '',
  lastName: '',
  company: '',
  address1: '',
  address2: '',
  city: '',
  province: '',
  zip: '',
  country: 'India',
  phone: '',
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Something went wrong. Please try again.';
}

function formatStatus(value: string | null | undefined) {
  if (!value) return 'Pending';
  return value
    .toLowerCase()
    .split('_')
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');
}

function formatAddress(address: CustomerAddress) {
  return [
    address.name,
    address.address1,
    address.address2,
    [address.city, address.province].filter(Boolean).join(', '),
    [address.country, address.zip].filter(Boolean).join(' - '),
    address.phone,
  ]
    .filter((segment) => segment && segment.trim().length > 0)
    .join(', ');
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date(value));
}

export default function AccountPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [activeAddressId, setActiveAddressId] = useState<string | null>(null);
  const [customer, setCustomer] = useState<CustomerAccount | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);
  const [addressMessage, setAddressMessage] = useState<string | null>(null);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState<AddressFormState>(INITIAL_ADDRESS_FORM);

  const fullName = useMemo(() => {
    if (!customer) return '';
    return [customer.firstName, customer.lastName].filter(Boolean).join(' ').trim() || customer.displayName;
  }, [customer]);

  const loadAccount = useCallback(async () => {
    setPageError(null);

    try {
      const response = await fetch('/api/account/me', { cache: 'no-store' });
      const data = (await response.json()) as { customer?: CustomerAccount; error?: string };

      if (response.status === 401) {
        router.replace('/account/login');
        return;
      }

      if (!response.ok || !data.customer) {
        throw new Error(data.error || 'Unable to load your account');
      }

      setCustomer(data.customer);
    } catch (error) {
      setPageError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadAccount();
  }, [loadAccount]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setPageError(null);

    try {
      await fetch('/api/account/logout', { method: 'POST' });
      router.push('/account/login');
      router.refresh();
    } catch (error) {
      setPageError(getErrorMessage(error));
    } finally {
      setIsLoggingOut(false);
    }
  };

  const resetAddressForm = () => {
    setAddressForm(INITIAL_ADDRESS_FORM);
    setEditingAddressId(null);
  };

  const handleAddressInput = (field: keyof AddressFormState, value: string) => {
    setAddressForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditAddress = (address: CustomerAddress) => {
    setEditingAddressId(address.id);
    setAddressError(null);
    setAddressMessage(null);
    setAddressForm({
      firstName: address.firstName || '',
      lastName: address.lastName || '',
      company: address.company || '',
      address1: address.address1 || '',
      address2: address.address2 || '',
      city: address.city || '',
      province: address.province || '',
      zip: address.zip || '',
      country: address.country || 'India',
      phone: address.phone || '',
    });
  };

  const handleAddressSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAddressError(null);
    setAddressMessage(null);
    setIsSavingAddress(true);

    const payloadAddress = {
      firstName: addressForm.firstName,
      lastName: addressForm.lastName,
      company: addressForm.company,
      address1: addressForm.address1,
      address2: addressForm.address2,
      city: addressForm.city,
      province: addressForm.province,
      zip: addressForm.zip,
      country: addressForm.country,
      phone: addressForm.phone,
    };

    try {
      const response = await fetch('/api/account/addresses', {
        method: editingAddressId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          editingAddressId
            ? { addressId: editingAddressId, address: payloadAddress }
            : { action: 'create', address: payloadAddress }
        ),
      });

      const data = (await response.json()) as { customer?: CustomerAccount; error?: string };

      if (response.status === 401) {
        router.replace('/account/login');
        return;
      }

      if (!response.ok || !data.customer) {
        throw new Error(data.error || 'Unable to save address');
      }

      setCustomer(data.customer);
      setAddressMessage(editingAddressId ? 'Address updated successfully.' : 'Address added successfully.');
      resetAddressForm();
    } catch (error) {
      setAddressError(getErrorMessage(error));
    } finally {
      setIsSavingAddress(false);
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    setAddressError(null);
    setAddressMessage(null);
    setActiveAddressId(addressId);

    try {
      const response = await fetch(`/api/account/addresses?addressId=${encodeURIComponent(addressId)}`, {
        method: 'DELETE',
      });

      const data = (await response.json()) as { customer?: CustomerAccount; error?: string };
      if (response.status === 401) {
        router.replace('/account/login');
        return;
      }

      if (!response.ok || !data.customer) {
        throw new Error(data.error || 'Unable to delete address');
      }

      setCustomer(data.customer);
      setAddressMessage('Address removed successfully.');
      if (editingAddressId === addressId) {
        resetAddressForm();
      }
    } catch (error) {
      setAddressError(getErrorMessage(error));
    } finally {
      setActiveAddressId(null);
    }
  };

  const handleSetDefault = async (addressId: string) => {
    setAddressError(null);
    setAddressMessage(null);
    setActiveAddressId(addressId);

    try {
      const response = await fetch('/api/account/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'setDefault', addressId }),
      });

      const data = (await response.json()) as { customer?: CustomerAccount; error?: string };
      if (response.status === 401) {
        router.replace('/account/login');
        return;
      }

      if (!response.ok || !data.customer) {
        throw new Error(data.error || 'Unable to update default address');
      }

      setCustomer(data.customer);
      setAddressMessage('Default address updated.');
    } catch (error) {
      setAddressError(getErrorMessage(error));
    } finally {
      setActiveAddressId(null);
    }
  };

  if (isLoading) {
    return (
      <section className="account-wrap">
        <div className="container">
          <div className="account-loading surface-card">Loading your account...</div>
        </div>
      </section>
    );
  }

  if (pageError) {
    return (
      <section className="account-wrap">
        <div className="container">
          <div className="account-error-shell surface-card">
            <p className="account-error">{pageError}</p>
            <Link href="/account/login" className="btn btn-primary">
              Go to Login
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!customer) {
    return null;
  }

  return (
    <section className="account-wrap">
      <div className="container">
        <div className="account-header shell-card">
          <div>
            <p className="kicker">My Account</p>
            <h1 className="account-title">Hello, {fullName || 'Sehaj Studio Customer'}</h1>
            <p className="account-subtitle">Manage profile details, order history, and saved delivery addresses.</p>
          </div>
          <button type="button" className="btn btn-secondary" onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? 'Logging Out...' : 'Logout'}
          </button>
        </div>

        <div className="account-grid">
          <div className="account-column">
            <article className="account-card">
              <h2>Profile</h2>
              <div className="account-profile-row">
                <span>Name</span>
                <strong>{fullName || '-'}</strong>
              </div>
              <div className="account-profile-row">
                <span>Email</span>
                <strong>{customer.email}</strong>
              </div>
              <div className="account-profile-row">
                <span>Phone</span>
                <strong>{customer.phone || '-'}</strong>
              </div>
              {customer.defaultAddress && (
                <div className="account-profile-row">
                  <span>Default Address</span>
                  <strong>{formatAddress(customer.defaultAddress)}</strong>
                </div>
              )}
            </article>

            <article className="account-card">
              <h2>Order History</h2>
              {customer.orders.edges.length === 0 && (
                <p className="account-empty">No orders yet. Your purchases will show up here after checkout.</p>
              )}

              <div className="account-orders">
                {customer.orders.edges.map(({ node: order }) => (
                  <div key={order.id} className="account-order-card">
                    <div className="account-order-head">
                      <div>
                        <p className="account-order-name">{order.name}</p>
                        <p className="account-order-date">Placed on {formatDate(order.processedAt)}</p>
                      </div>
                      <div className="account-order-total">
                        {formatPrice(order.totalPriceV2.amount, order.totalPriceV2.currencyCode)}
                      </div>
                    </div>
                    <div className="account-order-meta">
                      <span className="account-status-chip">Payment: {formatStatus(order.financialStatus)}</span>
                      <span className="account-status-chip">Fulfillment: {formatStatus(order.fulfillmentStatus)}</span>
                    </div>
                    <ul className="account-order-items">
                      {order.lineItems.edges.map(({ node: lineItem }, idx) => (
                        <li key={`${order.id}-${idx}`}>
                          {lineItem.title} x {lineItem.quantity}
                          {lineItem.variant?.title ? ` (${lineItem.variant.title})` : ''}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="account-column">
            <article className="account-card">
              <h2>{editingAddressId ? 'Edit Address' : 'Add New Address'}</h2>
              <form className="account-form" onSubmit={handleAddressSubmit}>
                <div className="account-form-grid">
                  <Input
                    id="address-first-name"
                    label="First Name"
                    value={addressForm.firstName}
                    onChange={(e) => handleAddressInput('firstName', e.target.value)}
                    autoComplete="given-name"
                  />
                  <Input
                    id="address-last-name"
                    label="Last Name"
                    value={addressForm.lastName}
                    onChange={(e) => handleAddressInput('lastName', e.target.value)}
                    autoComplete="family-name"
                  />
                </div>
                <Input
                  id="address-company"
                  label="Company (Optional)"
                  value={addressForm.company}
                  onChange={(e) => handleAddressInput('company', e.target.value)}
                  autoComplete="organization"
                />
                <Input
                  id="address-line-1"
                  label="Address Line 1"
                  value={addressForm.address1}
                  onChange={(e) => handleAddressInput('address1', e.target.value)}
                  autoComplete="address-line1"
                  required
                />
                <Input
                  id="address-line-2"
                  label="Address Line 2 (Optional)"
                  value={addressForm.address2}
                  onChange={(e) => handleAddressInput('address2', e.target.value)}
                  autoComplete="address-line2"
                />
                <div className="account-form-grid">
                  <Input
                    id="address-city"
                    label="City"
                    value={addressForm.city}
                    onChange={(e) => handleAddressInput('city', e.target.value)}
                    autoComplete="address-level2"
                    required
                  />
                  <Input
                    id="address-state"
                    label="State"
                    value={addressForm.province}
                    onChange={(e) => handleAddressInput('province', e.target.value)}
                    autoComplete="address-level1"
                  />
                </div>
                <div className="account-form-grid">
                  <Input
                    id="address-zip"
                    label="ZIP / PIN Code"
                    value={addressForm.zip}
                    onChange={(e) => handleAddressInput('zip', e.target.value)}
                    autoComplete="postal-code"
                    required
                  />
                  <Input
                    id="address-country"
                    label="Country"
                    value={addressForm.country}
                    onChange={(e) => handleAddressInput('country', e.target.value)}
                    autoComplete="country-name"
                    required
                  />
                </div>
                <Input
                  id="address-phone"
                  label="Phone (Optional)"
                  value={addressForm.phone}
                  onChange={(e) => handleAddressInput('phone', e.target.value)}
                  autoComplete="tel"
                />

                {addressError && <p className="account-error">{addressError}</p>}
                {addressMessage && <p className="account-success">{addressMessage}</p>}

                <div className="account-form-actions">
                  <button className="btn btn-primary" type="submit" disabled={isSavingAddress}>
                    {isSavingAddress ? 'Saving...' : editingAddressId ? 'Update Address' : 'Add Address'}
                  </button>
                  {editingAddressId && (
                    <button type="button" className="btn btn-secondary" onClick={resetAddressForm}>
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </article>

            <article className="account-card">
              <h2>Saved Addresses</h2>
              {customer.addresses.edges.length === 0 && (
                <p className="account-empty">No saved addresses yet. Add one using the form above.</p>
              )}
              <div className="account-addresses">
                {customer.addresses.edges.map(({ node: address }) => {
                  const isDefaultAddress = customer.defaultAddress?.id === address.id;
                  return (
                    <div key={address.id} className="account-address-card">
                      <p className="account-address-text">{formatAddress(address)}</p>
                      <div className="account-address-actions">
                        {isDefaultAddress ? (
                          <span className="account-default-chip">Default</span>
                        ) : (
                          <button
                            type="button"
                            className="account-inline-action"
                            onClick={() => void handleSetDefault(address.id)}
                            disabled={activeAddressId === address.id}
                          >
                            {activeAddressId === address.id ? 'Updating...' : 'Set as Default'}
                          </button>
                        )}
                        <button
                          type="button"
                          className="account-inline-action"
                          onClick={() => handleEditAddress(address)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="account-inline-action danger"
                          onClick={() => void handleDeleteAddress(address.id)}
                          disabled={activeAddressId === address.id}
                        >
                          {activeAddressId === address.id ? 'Removing...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
