const isProduction = process.env.NODE_ENV === "production";

const PRODUCTS = {
  "kiwi-prima": {
    id: isProduction ? "prod_RBbW5edbxa3Dwc" : "prod_Q4Kmx2LJDf917b",
  },
  "kiwi-seconda": {
    id: isProduction ? "prod_RBbVKXsNLEvXLc" : "prod_Q6BgD1rQi4XS8v",
  },
  "succo-di-kiwi": {
    id: isProduction ? "prod_RBxTfwcdmxEVXF" : "prod_RBxRA7GjTbMW1N",
  },
  "zucca-noce-di-burro": {
    id: isProduction ? "prod_RBbV40zpVORTpU" : "prod_RBb0vZq0aa6zRi",
  },
  "uova-di-casa": {
    id: isProduction ? "prod_TDrxS6FpFbyGPo" : "prod_TDrR0VUajXBmNy",
  },
} as const;

export type ProductSlug = keyof typeof PRODUCTS;

export function getAllProductsSlugs() {
  return Object.keys(PRODUCTS);
}

export function getStripeIdFromSlug(slug: keyof typeof PRODUCTS) {
  return PRODUCTS?.[slug]?.id ?? "NO_PRODUCT_ID";
}

export function isSlugValid(slug: string) {
  return Object.keys(PRODUCTS).includes(slug);
}
