"use client";

import { Button } from "~/components/ui/button";
import { useBasketStore } from "../providers";
import { Coins, Trash } from "lucide-react";
import BasketProduct from "./_components/BasketProduct";

export default function BasketPage() {
  const basket = useBasketStore((state) => state.basket);
  const emptyBasket = useBasketStore((state) => state.emptyBasket);

  return (
    <main className="text-primary-80">
      <section
        id="basket"
        className="container relative flex h-full min-h-section scroll-mt-[--header-height] flex-col gap-8 py-8 md:px-16"
      >
        <span>
          <h1 className="text-5xl">Carrello</h1>
          <h2 className="pl-1 text-xl">
            Hai {basket?.length ?? 0} prodotti nel carrello
          </h2>
        </span>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {basket?.map((product) => (
            <BasketProduct basketProduct={product} key={product.id} />
          ))}
          {basket?.map((product) => (
            <BasketProduct basketProduct={product} key={product.id} />
          ))}
        </div>

        <div className="flex flex-col gap-2 md:flex-row">
          <Button
            className="flex items-center gap-2"
            // onClick={() =>
            //   setBasket && setBasket((prev) => [...prev, MOCK_PRODUCT])
            // }
          >
            <Coins /> Acquista questi prodotti
          </Button>
          <Button
            className="flex items-center gap-2"
            variant={"outline"}
            onClick={emptyBasket}
          >
            <Trash /> Svuota il carrello
          </Button>
        </div>
      </section>
    </main>
  );
}
