import Image from "next/image";
import React from "react";
import { CustomBorder } from "~/components/customBorder";
import { getStripePrices, getStripeProducts } from "~/server/stripeQueries";
import Link from "next/link";
import { getFormattedPrice } from "~/lib/utils";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600;

export default async function ProductList(props: { locale: string }) {
  const products = await getStripeProducts();
  const prices = await getStripePrices();
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
      {products.map((product) => {
        const price = prices.find((price) => price.product === product.id);

        return (
          <Link
            href={`/${props.locale}/products/${product.id}`}
            scroll={false}
            key={product.id}
          >
            <CustomBorder className="relative flex h-product w-product cursor-pointer items-end bg-primary-80 text-white transition-transform hover:scale-105">
              {product.metadata?.images?.split(",")[0] !== null ? (
                <Image
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
              <span className="h-15 z-30 flex w-full justify-between rounded-lg bg-primary-80 p-4">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                {price ? <p>{getFormattedPrice(price)} €</p> : null}
              </span>
            </CustomBorder>
          </Link>
        );
      })}
    </>
  );
}
