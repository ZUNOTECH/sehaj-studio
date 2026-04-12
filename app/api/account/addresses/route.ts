import { NextRequest, NextResponse } from 'next/server';
import {
  createCustomerAddress,
  deleteCustomerAddress,
  MailingAddressInput,
  setCustomerDefaultAddress,
  updateCustomerAddress,
} from '@/lib/shopify/customer';
import {
  clearCustomerSessionCookie,
  getCustomerTokenFromRequest,
} from '@/lib/shopify/customer-session';

interface CreateOrDefaultBody {
  action?: 'create' | 'setDefault';
  addressId?: string;
  address?: MailingAddressInput;
}

interface UpdateBody {
  addressId?: string;
  address?: MailingAddressInput;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Unable to update address';
}

function normalizeOptional(value?: string) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}

function sanitizeAddressInput(address: MailingAddressInput): MailingAddressInput {
  return {
    firstName: normalizeOptional(address.firstName),
    lastName: normalizeOptional(address.lastName),
    company: normalizeOptional(address.company),
    address1: address.address1?.trim(),
    address2: normalizeOptional(address.address2),
    city: address.city?.trim(),
    province: normalizeOptional(address.province),
    zip: address.zip?.trim(),
    country: address.country?.trim() || 'India',
    phone: normalizeOptional(address.phone),
  };
}

function validateAddressInput(address: MailingAddressInput) {
  if (!address.address1 || !address.city || !address.zip || !address.country) {
    throw new Error('Address line 1, city, ZIP and country are required');
  }
}

function clearCookieOnUnauthorized(response: NextResponse) {
  clearCustomerSessionCookie(response);
  return response;
}

export async function POST(request: NextRequest) {
  const token = getCustomerTokenFromRequest(request);
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload: CreateOrDefaultBody;
  try {
    payload = (await request.json()) as CreateOrDefaultBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }

  try {
    if (payload.action === 'setDefault') {
      if (!payload.addressId) {
        return NextResponse.json({ error: 'Address ID is required' }, { status: 400 });
      }

      const customer = await setCustomerDefaultAddress(token, payload.addressId);
      return NextResponse.json({ customer });
    }

    if (payload.action === 'create') {
      if (!payload.address) {
        return NextResponse.json({ error: 'Address payload is required' }, { status: 400 });
      }

      const addressInput = sanitizeAddressInput(payload.address);
      validateAddressInput(addressInput);

      const customer = await createCustomerAddress(token, addressInput);
      return NextResponse.json({ customer });
    }

    return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
  } catch (error) {
    const message = getErrorMessage(error);
    const isUnauthorized = message.toLowerCase().includes('session');
    const response = NextResponse.json({ error: message }, { status: isUnauthorized ? 401 : 400 });
    return isUnauthorized ? clearCookieOnUnauthorized(response) : response;
  }
}

export async function PUT(request: NextRequest) {
  const token = getCustomerTokenFromRequest(request);
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload: UpdateBody;
  try {
    payload = (await request.json()) as UpdateBody;
  } catch {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }

  if (!payload.addressId || !payload.address) {
    return NextResponse.json({ error: 'Address ID and payload are required' }, { status: 400 });
  }

  try {
    const addressInput = sanitizeAddressInput(payload.address);
    validateAddressInput(addressInput);
    const customer = await updateCustomerAddress(token, payload.addressId, addressInput);
    return NextResponse.json({ customer });
  } catch (error) {
    const message = getErrorMessage(error);
    const isUnauthorized = message.toLowerCase().includes('session');
    const response = NextResponse.json({ error: message }, { status: isUnauthorized ? 401 : 400 });
    return isUnauthorized ? clearCookieOnUnauthorized(response) : response;
  }
}

export async function DELETE(request: NextRequest) {
  const token = getCustomerTokenFromRequest(request);
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const addressId = request.nextUrl.searchParams.get('addressId');
  if (!addressId) {
    return NextResponse.json({ error: 'Address ID is required' }, { status: 400 });
  }

  try {
    const customer = await deleteCustomerAddress(token, addressId);
    return NextResponse.json({ customer });
  } catch (error) {
    const message = getErrorMessage(error);
    const isUnauthorized = message.toLowerCase().includes('session');
    const response = NextResponse.json({ error: message }, { status: isUnauthorized ? 401 : 400 });
    return isUnauthorized ? clearCookieOnUnauthorized(response) : response;
  }
}
