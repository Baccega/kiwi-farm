import React from "react";
import { CustomBorder } from "~/components/customBorder";
import { getStripeProducts } from "~/server/stripeQueries";
import Link from "next/link";
import { getFormattedPrice } from "~/lib/utils";
import { getTranslations } from "next-intl/server";
import CdnImage from "~/components/cdnImage";
import type Stripe from "stripe";

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
      {products.filter(props.filter ?? (() => true)).map((product) => {
        if (!product.default_price || typeof product.default_price === "string")
          return null;
        return (
          <Link
            href={`/${props.locale}/products/${product.metadata?.slug ?? product.id}`}
            scroll={false}
            key={product.id}
          >
            <CustomBorder className="intersect-once intersect:motion-preset-expand relative flex h-product w-product cursor-pointer items-end bg-primary-80 text-white transition-all hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-inner">
              {product.metadata?.images?.split(",")[0] !== null ? (
                <CdnImage
                  src={
                    product.metadata?.images?.split(",")?.[0] ??
                    "/placeholder.png"
                  }
                  sizes="20rem"
                  fill={true}
                  alt={product.name ?? ""}
                  className="z-20 rounded-lg object-cover"
                />
              ) : null}
              <span className="h-15 z-30 flex w-full items-center justify-between rounded-b-lg border-t-2 border-primary bg-primary-80 p-4 shadow-top">
                <h2 className="text-balance">{product.name}</h2>
                <p className="text-nowrap">
                  {product.default_price
                    ? t("pricePerUnitShort", {
                        price: getFormattedPrice(product.default_price),
                        unit: product.unit_label ?? "pz",
                      })
                    : null}
                </p>
              </span>
            </CustomBorder>
          </Link>
        );
      })}
    </>
  );
}
