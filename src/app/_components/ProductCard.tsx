"use client";
import { getFormattedPrice } from "~/lib/utils";
import { useBasketStore } from "../providers";
import type Stripe from "stripe";
import Link from "next/link";

export default function ProductCard(props: {
  product: Stripe.Product;
  price?: Stripe.Price;
}) {
  const { product, price } = props;

  return (
    <Link
      className="h-15 z-30 flex w-full justify-between rounded-lg bg-primary-80 p-4"
      href={`/products/${product.id}`}
    >
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      {price ? <p>{getFormattedPrice(price)} €</p> : null}
    </Link>
  );
}
