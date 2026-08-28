import { parse as parseCookie } from "cookie";
import type { Request, Response } from "express";
import { SHOPIFY_PRODUCT_OPTIONS, SHOPIFY_PRODUCT_OPTIONS_BY_KEY, type ShopifyProductKey } from "@shared/shopifyCatalog";
import { getSessionCookieOptions } from "./_core/cookies";

type MoneyV2 = {
  amount: string;
  currencyCode: string;
};

type CartLineNode = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
    };
    image?: {
      url: string;
      altText?: string | null;
    } | null;
    price: MoneyV2;
  };
};

type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    edges: Array<{
      node: CartLineNode;
    }>;
  };
  cost: {
    subtotalAmount: MoneyV2;
    totalAmount: MoneyV2;
  };
};

type StorefrontError = {
  message?: string;
};

type StorefrontResponse<T> = {
  data?: T;
  errors?: StorefrontError[];
};

type ShopifyVariantSummary = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: MoneyV2;
};

type ShopifyProductSummary = {
  key: ShopifyProductKey;
  ampSlug?: string;
  handle: string;
  name: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  priceLabel: string;
  priceValue: number;
  currencyCode: string;
  availableForSale: boolean;
  variantId: string | null;
};

type CartSummary = {
  checkoutUrl: string | null;
  totalQuantity: number;
  subtotalLabel: string;
  totalLabel: string;
  currencyCode: string | null;
  lines: Array<{
    id: string;
    quantity: number;
    merchandiseId: string;
    productHandle: string;
    productTitle: string;
    variantTitle: string;
    imageUrl: string | null;
    imageAlt: string | null;
    linePriceLabel: string;
    unitPriceLabel: string;
  }>;
};

const SHOPIFY_STOREFRONT_API_VERSION = "2025-10";
const SHOPIFY_CART_COOKIE = "edwards_shopify_cart";

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const cartFields = `
  id
  checkoutUrl
  totalQuantity
  lines(first: 20) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            image {
              url
              altText
            }
            price {
              amount
              currencyCode
            }
            product {
              title
              handle
            }
          }
        }
      }
    }
  }
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
  }
`;

function getShopifyConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    throw new Error("Shopify Storefront configuration is missing.");
  }

  return {
    domain,
    token,
    endpoint: `https://${domain}/api/${SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`,
  };
}

async function storefrontRequest<T>(query: string, variables?: Record<string, unknown>) {
  const config = getShopifyConfig();

  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": config.token,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify Storefront request failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as StorefrontResponse<T>;

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).filter(Boolean).join(" ") || "Shopify Storefront request failed.");
  }

  return payload.data as T;
}

function formatMoneyLabel(amount: string, currencyCode: string) {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return `${amount} ${currencyCode}`;
  }

  if (currencyCode === "USD") {
    return moneyFormatter.format(numericAmount);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(numericAmount);
}

function getCartIdFromRequest(req: Request) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;

  const cookies = parseCookie(cookieHeader);
  return cookies[SHOPIFY_CART_COOKIE] ?? null;
}

function storeCartId(res: Response, req: Request, cartId: string) {
  res.cookie(SHOPIFY_CART_COOKIE, cartId, {
    ...getSessionCookieOptions(req),
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
}

function clearCartId(res: Response, req: Request) {
  res.clearCookie(SHOPIFY_CART_COOKIE, getSessionCookieOptions(req));
}

function buildCatalogQuery() {
  const productSelections = SHOPIFY_PRODUCT_OPTIONS.map((product) => {
    const alias = `product_${product.key.replace(/-/g, "_")}`;
    return `${alias}: productByHandle(handle: \"${product.handle}\") {
      handle
      title
      availableForSale
      variants(first: 1) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
        }
      }
    }`;
  }).join("\n");

  return `query EdwardsCatalog {
    ${productSelections}
  }`;
}

export async function getShopifyCatalog(): Promise<ShopifyProductSummary[]> {
  const data = await storefrontRequest<Record<string, {
    handle: string;
    title: string;
    availableForSale: boolean;
    variants: { nodes: ShopifyVariantSummary[] };
  } | null>>(buildCatalogQuery());

  return SHOPIFY_PRODUCT_OPTIONS.map((product) => {
    const alias = `product_${product.key.replace(/-/g, "_")}`;
    const liveProduct = data[alias];
    const firstVariant = liveProduct?.variants.nodes[0];
    const priceAmount = firstVariant?.price.amount ?? String(product.fallbackPriceValue);
    const currencyCode = firstVariant?.price.currencyCode ?? "USD";

    return {
      key: product.key,
      ampSlug: product.ampSlug,
      handle: liveProduct?.handle ?? product.handle,
      name: liveProduct?.title ?? product.displayName,
      eyebrow: product.eyebrow,
      subtitle: product.subtitle,
      description: product.description,
      priceLabel: firstVariant ? `${formatMoneyLabel(priceAmount, currencyCode)} USD` : product.fallbackPriceLabel,
      priceValue: Number(priceAmount) || product.fallbackPriceValue,
      currencyCode,
      availableForSale: Boolean(liveProduct?.availableForSale && firstVariant?.availableForSale),
      variantId: firstVariant?.id ?? null,
    };
  });
}

function summarizeCart(cart: ShopifyCart | null): CartSummary {
  if (!cart) {
    return {
      checkoutUrl: null,
      totalQuantity: 0,
      subtotalLabel: "$0",
      totalLabel: "$0",
      currencyCode: null,
      lines: [],
    };
  }

  return {
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotalLabel: formatMoneyLabel(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode),
    totalLabel: formatMoneyLabel(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode),
    currencyCode: cart.cost.totalAmount.currencyCode,
    lines: cart.lines.edges.map(({ node }) => ({
      id: node.id,
      quantity: node.quantity,
      merchandiseId: node.merchandise.id,
      productHandle: node.merchandise.product.handle,
      productTitle: node.merchandise.product.title,
      variantTitle: node.merchandise.title,
      imageUrl: node.merchandise.image?.url ?? null,
      imageAlt: node.merchandise.image?.altText ?? null,
      linePriceLabel: formatMoneyLabel(String(Number(node.merchandise.price.amount) * node.quantity), node.merchandise.price.currencyCode),
      unitPriceLabel: formatMoneyLabel(node.merchandise.price.amount, node.merchandise.price.currencyCode),
    })),
  };
}

async function fetchCart(cartId: string) {
  const data = await storefrontRequest<{ cart: ShopifyCart | null }>(`query EdwardsCart($cartId: ID!) {
    cart(id: $cartId) {
      ${cartFields}
    }
  }`, { cartId });

  return data.cart;
}

async function resolveVariantId(productKey: ShopifyProductKey) {
  const product = SHOPIFY_PRODUCT_OPTIONS_BY_KEY[productKey];
  const catalog = await getShopifyCatalog();
  const liveProduct = catalog.find((entry) => entry.key === product.key);

  if (!liveProduct?.variantId) {
    throw new Error(`The Shopify product for ${product.displayName} is not available for direct checkout yet.`);
  }

  return liveProduct.variantId;
}

function getUserErrors(result: { userErrors?: Array<{ message?: string }> } | null | undefined) {
  return result?.userErrors?.map((error) => error.message).filter(Boolean).join(" ") ?? "";
}

export async function getStoredCart(req: Request, res: Response) {
  const cartId = getCartIdFromRequest(req);
  if (!cartId) return summarizeCart(null);

  const cart = await fetchCart(cartId);
  if (!cart) {
    clearCartId(res, req);
    return summarizeCart(null);
  }

  return summarizeCart(cart);
}

export async function addShopifyProductToCart(req: Request, res: Response, productKey: ShopifyProductKey, quantity: number) {
  const variantId = await resolveVariantId(productKey);
  const cartId = getCartIdFromRequest(req);

  if (!cartId) {
    const data = await storefrontRequest<{ cartCreate: { cart: ShopifyCart | null; userErrors: Array<{ message?: string }> } }>(`mutation CreateEdwardsCart($merchandiseId: ID!, $quantity: Int!) {
      cartCreate(input: { lines: [{ merchandiseId: $merchandiseId, quantity: $quantity }] }) {
        cart {
          ${cartFields}
        }
        userErrors {
          message
        }
      }
    }`, { merchandiseId: variantId, quantity });

    const message = getUserErrors(data.cartCreate);
    if (message) {
      throw new Error(message);
    }

    if (!data.cartCreate.cart) {
      throw new Error("Shopify did not return a cart.");
    }

    storeCartId(res, req, data.cartCreate.cart.id);
    return summarizeCart(data.cartCreate.cart);
  }

  const existingCart = await fetchCart(cartId);
  if (!existingCart) {
    clearCartId(res, req);
    return addShopifyProductToCart(req, res, productKey, quantity);
  }

  const existingLine = existingCart.lines.edges.find((line) => line.node.merchandise.id === variantId);

  if (existingLine) {
    const data = await storefrontRequest<{ cartLinesUpdate: { cart: ShopifyCart | null; userErrors: Array<{ message?: string }> } }>(`mutation UpdateEdwardsCartLine($cartId: ID!, $lineId: ID!, $quantity: Int!) {
      cartLinesUpdate(cartId: $cartId, lines: [{ id: $lineId, quantity: $quantity }]) {
        cart {
          ${cartFields}
        }
        userErrors {
          message
        }
      }
    }`, {
      cartId,
      lineId: existingLine.node.id,
      quantity: existingLine.node.quantity + quantity,
    });

    const message = getUserErrors(data.cartLinesUpdate);
    if (message) {
      throw new Error(message);
    }

    return summarizeCart(data.cartLinesUpdate.cart);
  }

  const data = await storefrontRequest<{ cartLinesAdd: { cart: ShopifyCart | null; userErrors: Array<{ message?: string }> } }>(`mutation AddEdwardsCartLine($cartId: ID!, $merchandiseId: ID!, $quantity: Int!) {
    cartLinesAdd(cartId: $cartId, lines: [{ merchandiseId: $merchandiseId, quantity: $quantity }]) {
      cart {
        ${cartFields}
      }
      userErrors {
        message
      }
    }
  }`, { cartId, merchandiseId: variantId, quantity });

  const message = getUserErrors(data.cartLinesAdd);
  if (message) {
    throw new Error(message);
  }

  return summarizeCart(data.cartLinesAdd.cart);
}

export async function updateShopifyCartLine(req: Request, res: Response, lineId: string, quantity: number) {
  const cartId = getCartIdFromRequest(req);
  if (!cartId) {
    return summarizeCart(null);
  }

  if (quantity <= 0) {
    const data = await storefrontRequest<{ cartLinesRemove: { cart: ShopifyCart | null; userErrors: Array<{ message?: string }> } }>(`mutation RemoveEdwardsCartLine($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ${cartFields}
        }
        userErrors {
          message
        }
      }
    }`, { cartId, lineIds: [lineId] });

    const message = getUserErrors(data.cartLinesRemove);
    if (message) {
      throw new Error(message);
    }

    if (!data.cartLinesRemove.cart || data.cartLinesRemove.cart.totalQuantity === 0) {
      clearCartId(res, req);
    }

    return summarizeCart(data.cartLinesRemove.cart);
  }

  const data = await storefrontRequest<{ cartLinesUpdate: { cart: ShopifyCart | null; userErrors: Array<{ message?: string }> } }>(`mutation UpdateEdwardsCartQuantity($cartId: ID!, $lineId: ID!, $quantity: Int!) {
    cartLinesUpdate(cartId: $cartId, lines: [{ id: $lineId, quantity: $quantity }]) {
      cart {
        ${cartFields}
      }
      userErrors {
        message
      }
    }
  }`, { cartId, lineId, quantity });

  const message = getUserErrors(data.cartLinesUpdate);
  if (message) {
    throw new Error(message);
  }

  return summarizeCart(data.cartLinesUpdate.cart);
}
