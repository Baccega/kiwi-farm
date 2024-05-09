"use client";
import { useBasketStore } from "../providers";
import type Stripe from "stripe";

export default function ProductCard(props: { product: Stripe.Product }) {
  const { product } = props;

  const addProductToBasket = useBasketStore(
    (state) => state.addProductToBasket,
  );
  return (
    <div
      className="h-15 z-30 flex w-full justify-between rounded-lg bg-primary-80 p-4"
      onClick={() => {
        addProductToBasket(product);
      }}
    >
      <h2>{product.name}</h2>
      <h2>{product.default_price?.toString()}</h2>
      {/* <p>{product.description}</p> */}
      {/* <p>{product.price} €</p> */}
    </div>
  );
}
