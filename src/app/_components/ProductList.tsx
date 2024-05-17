import Image from "next/image";
import React from "react";
import { CustomBorder } from "~/components/customBorder";
import { getStripePrices, getStripeProducts } from "~/server/stripeQueries";
import Link from "next/link";
import { getFormattedPrice } from "~/lib/utils";

export const revalidate = 3600;

export default async function ProductList() {
  const products = await getStripeProducts();
  const prices = await getStripePrices();

  return (
    <>
      {products.map((product) => {
        const price = prices.find((price) => price.product === product.id);

        return (
          <Link
            href={`/products/${product.id}`}
            scroll={false}
            key={product.id}
          >
            <CustomBorder className="relative flex h-product w-product cursor-pointer items-end bg-primary-80 text-white transition-transform hover:scale-105">
              {product.images[0] !== null ? (
                <Image
                  src={product.images?.[0] ?? "placeholder.png"}
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
