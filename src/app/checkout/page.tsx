"use client";

import { useBasketStore } from "../providers";

export default function CheckoutPage() {
  const basket = useBasketStore((state) => state.basket);
  const emptyBasket = useBasketStore((state) => state.emptyBasket);

  return (
    <main className="text-primary-80">
      <section
        id="checkout"
        className="container relative min-h-section md:px-16"
      ></section>
    </main>
  );
}
