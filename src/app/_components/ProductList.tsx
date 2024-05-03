import Image from "next/image";
import React from "react";
import { getProducts } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function ProductList() {
  const products = await getProducts();

  return (
    <>
      {products.map((product) => (
        <div
          key={product.id}
          className="border-sketchy relative flex h-product w-product cursor-pointer items-end bg-primary-80 text-white transition-transform hover:scale-105"
        >
          {product.image !== null ? (
            <Image
              src={`/${product.image}`}
              fill={true}
              alt={product.name ?? ""}
              className="z-20 rounded-md object-cover"
            />
          ) : null}
          <div className="h-15 z-30 flex w-full justify-between rounded-md bg-primary-80 p-4">
            <h2>{product.name}</h2>
            {/* <p>{product.description}</p> */}
            <p>{product.price} €</p>
          </div>
        </div>
      ))}
    </>
  );
}
