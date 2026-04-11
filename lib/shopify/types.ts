export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  featuredImage: Image | null;
  images: {
    edges: { node: Image }[];
  };
  variants: {
    edges: { node: Variant }[];
  };
  metafields: Metafield[] | null;
}

export interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: { name: string; value: string }[];
  image: Image | null;
}

export interface Image {
  id: string;
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Metafield {
  key: string;
  value: string;
  namespace: string;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: Image | null;
  products: {
    edges: { node: ShopifyProduct }[];
    pageInfo: PageInfo;
  };
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
  lines: {
    edges: { node: CartLine }[];
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: { name: string; value: string }[];
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: Image | null;
    };
    price: Money;
  };
}

export interface ProductFilters {
  size?: string[];
  price?: string[];
  occasion?: string[];
  pattern?: string[];
  fabric?: string[];
}

export interface SortOption {
  label: string;
  value: string;
}

export const PRODUCT_META_FIELDS = `
  metafields(identifier: { namespace: "custom", key: "availability_model" }) {
    key
    value
  }
  metafields(identifier: { namespace: "custom", key: "lead_time" }) {
    key
    value
  }
  metafields(identifier: { namespace: "custom", key: "occasion" }) {
    key
    value
  }
  metafields(identifier: { namespace: "custom", key: "pattern" }) {
    key
    value
  }
  metafields(identifier: { namespace: "custom", key: "fabric" }) {
    key
    value
  }
  metafields(identifier: { namespace: "custom", key: "fit_notes" }) {
    key
    value
  }
  metafields(identifier: { namespace: "custom", key: "care_instructions" }) {
    key
    value
  }
  metafields(identifier: { namespace: "custom", key: "cod_eligible_copy" }) {
    key
    value
  }
`;

export function getMetafieldValue(product: ShopifyProduct, key: string): string | null {
  const metafield = product.metafields?.find((m) => m.key === key);
  return metafield?.value || null;
}

export function getAvailabilityModel(product: ShopifyProduct): 'ready_to_ship' | 'made_to_order' | null {
  const value = getMetafieldValue(product, 'availability_model');
  if (value === 'ready_to_ship' || value === 'made_to_order') return value;
  return null;
}

export function formatPrice(amount: string, currencyCode: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}