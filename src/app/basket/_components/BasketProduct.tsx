"use client";

import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import { AlertContext, useBasketStore } from "~/app/providers";
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
  const { openAlert } = useContext(AlertContext) ?? {};

  function handleRemove() {
    if (!openAlert) return;
    openAlert({
      title: "Sei sicuro di voler rimuovere il prodotto dal carrello?",
      description: "Questa azione non può essere annullata.",
      onConfirm: () => {
        removeProductFromBasket(id);
      },
    });
  }

  function handleDecrease() {
    if (quantity === 1) {
      removeProductFromBasket(id);
      return;
    }
    setProductQuantity(id, quantity - 1);
  }

  function handleIncrease() {
    setProductQuantity(id, quantity + 1);
  }

  return (
    <div className="min-h-36 gap-4 rounded-xl border-2 border-primary bg-accent @container/basket-product">
      <div className="grid-areas-basket-product-sm @md/basket-product:grid-areas-basket-product grid-cols-basket-product grid-rows-basket-product grid h-full w-full items-center gap-2">
        <figure className="grid-in-image relative h-full w-32 rounded-lg rounded-r-none border-r-2 border-primary bg-primary">
          <Image
            src={`/${product?.images?.[0] ?? "placeholder.png"}`}
            className="rounded-lg rounded-r-none object-cover"
            fill
            alt={""}
          />
        </figure>
        <h3 className="grid-in-name text-lg">{product.name}</h3>

        <p className="grid-in-price flex flex-row items-baseline gap-x-2 self-center pb-4 text-lg font-bold @md/basket-product:flex-col-reverse @md/basket-product:self-end">
          {/* {Number(product.price * quantity).toFixed(2)} €{" "} */}2 €
          <span className="text-sm font-light tracking-wide">
            2 € / pz
            {/* ({Number(product.price).toFixed(2)} € / pz) */}
          </span>
        </p>
        <span className="grid-in-quantity flex items-center justify-start gap-2 self-end pb-4 pr-2 @md/basket-product:justify-end">
          <span className="flex items-center justify-center">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-8 shrink-0 rounded-lg rounded-r-none "
              onClick={handleDecrease}
              disabled={quantity === 1}
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">Decrease</span>
            </Button>
            <div className="flex h-9 min-w-14 flex-row items-baseline justify-center gap-2 border-b border-t border-input bg-background px-3 text-center">
              <div className="text-2xl font-bold tracking-tighter">
                {quantity}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-8 shrink-0 rounded-lg rounded-l-none"
              onClick={handleIncrease}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Increase</span>
            </Button>
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-lg"
            onClick={handleRemove}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Remove product</span>
          </Button>
        </span>
      </div>
    </div>
  );
}
