import React from "react";
import { CustomBorder } from "~/components/customBorder";
import { getStripeProducts } from "~/server/stripeQueries";
import { getTranslations } from "next-intl/server";
import type Stripe from "stripe";
import { Product } from "./Product";

export const revalidate = 3600;

export default async function ProductList(props: {
  locale: string;
  filter?: (product: Stripe.Product) => boolean;
}) {
  const products = await getStripeProducts();
  const t = await getTranslations("Products");

  if (products?.length === 0) {
    return (
      <CustomBorder className="col-span-full flex h-product w-product items-center justify-center bg-primary-80 text-white">
        <p>{t("noProductsAvailable")}</p>
      </CustomBorder>
    );
  }

  return (
    <>
      {products.filter(props.filter ?? (() => true)).map((product) => (
        <Product
          variant={
            product.metadata?.enabled === "false" ? "outOfStock" : "default"
          }
          href={`/${props.locale}/products/${product.metadata?.slug ?? product.id}`}
          product={product}
          key={product.id}
        />
      ))}
    </>
  );
}
