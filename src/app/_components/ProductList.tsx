import Image from "next/image";
import React from "react";
import { CustomBorder } from "~/components/customBorder";
import ProductCard from "./ProductCard";
import { getStripeProducts } from "~/server/stripeQueries";

export const dynamic = "force-dynamic";

export default async function ProductList() {
  const products = await getStripeProducts();

  return (
    <>
      {products.map((product) => (
        <CustomBorder
          key={product.id}
          className="relative flex h-product w-product cursor-pointer items-end bg-primary-80 text-white transition-transform hover:scale-105"
        >
          {product.images[0] !== null ? (
            <Image
              src={`/${product.images[0]}`}
              fill={true}
              alt={product.name ?? ""}
              className="z-20 rounded-lg object-cover"
            />
          ) : null}
          <ProductCard product={product} />
        </CustomBorder>
      ))}
    </>
  );
}
