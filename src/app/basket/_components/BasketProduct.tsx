"use client";

import { Minus } from "lucide-react";
import Image from "next/image";
import { useBasketStore } from "~/app/providers";
import { Button } from "~/components/ui/button";
import { type BasketProduct } from "~/types/Product";

export interface BasketProductProps
  extends React.HTMLAttributes<HTMLDivElement> {
  basketProduct: BasketProduct;
}

export default function BasketProduct(props: BasketProductProps) {
  const { basketProduct } = props;
  const { id, product, quantity } = basketProduct;
  const removeProductFromBasket = useBasketStore(
    (state) => state.removeProductFromBasket,
  );
  const setProductQuantity = useBasketStore(
    (state) => state.setProductQuantity,
  );

  function handleDecrease() {
    if (quantity === 1) {
      removeProductFromBasket(id);
      return;
    }
    setProductQuantity(id, quantity + 1);
  }

  return (
    <div className="flex h-32 w-full flex-row justify-between rounded-xl border-2 border-primary bg-accent">
      <span className="flex flex-col justify-between gap-2 px-4 py-4">
        <h3 className="text-lg">{product.name}</h3>
        <span className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => handleDecrease()}
            disabled={quantity === 1}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="text-7xl font-bold tracking-tighter">
              {quantity}
            </div>
            <div className="text-[0.70rem] uppercase text-muted-foreground">
              pezzi
            </div>
          </div>
        </span>
      </span>
      <figure className="relative h-full w-32 rounded-lg rounded-l-none border-l-2 border-primary">
        <Image
          src={`/${product.image}`}
          className="rounded-lg rounded-l-none object-cover"
          fill
          alt={""}
        />
      </figure>
    </div>
  );
}
