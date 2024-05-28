import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { AlertContext, useBasketStore } from "~/app/providers";
import { useContext } from "react";
import { type BasketProduct } from "~/types/Product";

export default function ProductQuantityChanger(props: {
  basketProduct: BasketProduct;
}) {
  const { id, quantity } = props.basketProduct;
  const { openAlert } = useContext(AlertContext) ?? {};

  const removeProductFromBasket = useBasketStore(
    (state) => state.removeProductFromBasket,
  );
  const setProductQuantity = useBasketStore(
    (state) => state.setProductQuantity,
  );

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
    <div className="flex items-center justify-start">
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
          <div className="text-2xl font-bold tracking-tighter">{quantity}</div>
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
    </div>
  );
}
