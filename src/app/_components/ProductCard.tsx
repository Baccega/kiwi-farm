"use client";
import { type Product } from "~/types/Product";
import { useBasketStore } from "../providers";

export default function ProductCard(props: { product: Product }) {
  const { product } = props;

  const addProductToBasket = useBasketStore(
    (state) => state.addProductToBasket,
  );
  return (
    <div
      className="h-15 z-30 flex w-full justify-between rounded-lg bg-primary-80 p-4"
      onClick={() => {
        console.log("Add to basket", product);
        addProductToBasket(product);
      }}
    >
      <h2>{product.name}</h2>
      {/* <p>{product.description}</p> */}
      <p>{product.price} €</p>
    </div>
  );
}
