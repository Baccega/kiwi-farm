"use client";

import { useContext } from "react";
import { Button } from "~/components/ui/button";
import { BasketContext } from "../providers";
import { Coins, Trash } from "lucide-react";

export default function BasketPage() {
  const { basket, setBasket } = useContext(BasketContext) ?? {};

  return (
    <main className="text-primary-80">
      <section
        id="basket"
        className="container relative flex h-full min-h-section scroll-mt-[--header-height] flex-col pt-8 md:px-16"
      >
        <h1 className="text-5xl">Carrello</h1>
        <h2>Hai {basket?.length ?? 0} prodotti nel carrello</h2>

        {basket?.map((item, index) => (
          <div key={index} className="h-60">
            wefew
          </div>
        ))}

        <Button
          className="flex items-center gap-2"
          onClick={() => setBasket && setBasket((prev) => [...prev, "ok"])}
        >
          <Coins /> Acquista questi prodotti
        </Button>
        <Button
          className="flex items-center gap-2"
          variant={"outline"}
          onClick={() => setBasket && setBasket([])}
        >
          <Trash /> Svuota il carrello
        </Button>
      </section>
    </main>
  );
}
