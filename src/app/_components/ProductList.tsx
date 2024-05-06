import Image from "next/image";
import React from "react";
import { CustomBorder } from "~/components/customBorder";
import { getProducts } from "~/server/queries";
import { type Product } from "~/types/Product";
import ProductCard from "./ProductCard";

export const dynamic = "force-dynamic";

export default async function ProductList() {
  const products = (await getProducts()) as unknown as Product[];

  return (
    <>
      {products.map((product) => (
        <CustomBorder
          key={product.id}
          className="relative flex h-product w-product cursor-pointer items-end bg-primary-80 text-white transition-transform hover:scale-105"
        >
          {product.image !== null ? (
            <Image
              src={`/${product.image}`}
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
