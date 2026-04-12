interface ShopifyGraphQLError {
  message: string;
}

interface ShopifyGraphQLResponse<T> {
  data?: T;
  errors?: ShopifyGraphQLError[];
}

interface CustomerUserError {
  code?: string;
  field?: string[];
  message: string;
}

interface CustomerAccessToken {
  accessToken: string;
  expiresAt: string;
}

export interface CustomerAddress {
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

export interface CustomerOrderLineItem {
  title: string;
  quantity: number;
  variant: {
    title: string | null;
    image: {
      url: string;
      altText: string | null;
    } | null;
  } | null;
}

export interface CustomerOrder {
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

export interface CustomerAccount {
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

export interface MailingAddressInput {
  firstName?: string;
  lastName?: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  zip: string;
  country: string;
  phone?: string;
}

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json`;

function assertConfig() {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error('Missing Shopify Storefront API configuration');
  }
}

function getFirstUserError(errors?: CustomerUserError[]): string | null {
  if (!errors || errors.length === 0) return null;
  return errors[0].message;
}

function throwIfCustomerUserErrors(errors?: CustomerUserError[]) {
  const firstError = getFirstUserError(errors);
  if (firstError) {
    throw new Error(firstError);
  }
}

async function shopifyCustomerFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  assertConfig();

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }

  const json = (await response.json()) as ShopifyGraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  if (!json.data) {
    throw new Error('No Shopify response payload');
  }

  return json.data;
}

const CUSTOMER_QUERY = `
  query getCustomerAccount($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      displayName
      email
      phone
      defaultAddress {
        id
        firstName
        lastName
        name
        company
        address1
        address2
        city
        province
        zip
        country
        phone
      }
      addresses(first: 20) {
        edges {
          node {
            id
            firstName
            lastName
            name
            company
            address1
            address2
            city
            province
            zip
            country
            phone
          }
        }
      }
      orders(first: 20) {
        edges {
          node {
            id
            name
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            totalPriceV2 {
              amount
              currencyCode
            }
            lineItems(first: 5) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    title
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_ADDRESS_CREATE_MUTATION = `
  mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_ADDRESS_UPDATE_MUTATION = `
  mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
    customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_ADDRESS_DELETE_MUTATION = `
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      deletedCustomerAddressId
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_DEFAULT_ADDRESS_UPDATE_MUTATION = `
  mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
    customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export async function loginCustomer(email: string, password: string): Promise<CustomerAccessToken> {
  const data = await shopifyCustomerFetch<{
    customerAccessTokenCreate: {
      customerAccessToken: CustomerAccessToken | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION, {
    input: { email, password },
  });

  throwIfCustomerUserErrors(data.customerAccessTokenCreate.customerUserErrors);

  if (!data.customerAccessTokenCreate.customerAccessToken) {
    throw new Error('Unable to log in with those credentials');
  }

  return data.customerAccessTokenCreate.customerAccessToken;
}

export async function registerCustomer(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}) {
  const data = await shopifyCustomerFetch<{
    customerCreate: {
      customer: { id: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(CUSTOMER_CREATE_MUTATION, {
    input,
  });

  throwIfCustomerUserErrors(data.customerCreate.customerUserErrors);

  if (!data.customerCreate.customer) {
    throw new Error('Unable to create customer account');
  }

  return data.customerCreate.customer;
}

export async function getCustomerAccount(customerAccessToken: string): Promise<CustomerAccount> {
  const data = await shopifyCustomerFetch<{ customer: CustomerAccount | null }>(CUSTOMER_QUERY, {
    customerAccessToken,
  });

  if (!data.customer) {
    throw new Error('Session expired. Please log in again.');
  }

  return data.customer;
}

export async function createCustomerAddress(customerAccessToken: string, address: MailingAddressInput) {
  const data = await shopifyCustomerFetch<{
    customerAddressCreate: {
      customerAddress: { id: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(CUSTOMER_ADDRESS_CREATE_MUTATION, {
    customerAccessToken,
    address,
  });

  throwIfCustomerUserErrors(data.customerAddressCreate.customerUserErrors);
  return getCustomerAccount(customerAccessToken);
}

export async function updateCustomerAddress(customerAccessToken: string, id: string, address: MailingAddressInput) {
  const data = await shopifyCustomerFetch<{
    customerAddressUpdate: {
      customerAddress: { id: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(CUSTOMER_ADDRESS_UPDATE_MUTATION, {
    customerAccessToken,
    id,
    address,
  });

  throwIfCustomerUserErrors(data.customerAddressUpdate.customerUserErrors);
  return getCustomerAccount(customerAccessToken);
}

export async function deleteCustomerAddress(customerAccessToken: string, id: string) {
  const data = await shopifyCustomerFetch<{
    customerAddressDelete: {
      deletedCustomerAddressId: string | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(CUSTOMER_ADDRESS_DELETE_MUTATION, {
    customerAccessToken,
    id,
  });

  throwIfCustomerUserErrors(data.customerAddressDelete.customerUserErrors);
  return getCustomerAccount(customerAccessToken);
}

export async function setCustomerDefaultAddress(customerAccessToken: string, addressId: string) {
  const data = await shopifyCustomerFetch<{
    customerDefaultAddressUpdate: {
      customer: { id: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(CUSTOMER_DEFAULT_ADDRESS_UPDATE_MUTATION, {
    customerAccessToken,
    addressId,
  });

  throwIfCustomerUserErrors(data.customerDefaultAddressUpdate.customerUserErrors);
  return getCustomerAccount(customerAccessToken);
}
