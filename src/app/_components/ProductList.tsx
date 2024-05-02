import React from "react";
import { db } from "~/server/db";

export const dynamic = 'force-dynamic'

export default async function ProductList() {
  const products = (await db.query.products.findMany()) ?? [];

  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="h-product w-product p-4">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </>
  );
}
