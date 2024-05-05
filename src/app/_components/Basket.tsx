import { useContext } from "react";
import { Button } from "~/components/ui/button";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";
import { BasketContext } from "../providers";
import { X } from "lucide-react";

export default function Basket() {
  const { basket, setBasket } = useContext(BasketContext) ?? {};

  return (
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>Carrello</DrawerTitle>
        <DrawerDescription>
          Hai {basket?.length ?? 0} prodotti nel carrello
        </DrawerDescription>
      </DrawerHeader>

      <DrawerFooter>
        <Button
          onClick={() => setBasket && setBasket((prev) => [...prev, "ok"])}
        >
          Acquista questi prodotti
        </Button>
        <Button variant={"outline"} onClick={() => setBasket && setBasket([])}>
          Svuota il carrello
        </Button>
        <DrawerClose asChild>
          <Button
            className="data-[state=open]:bg-secondary absolute right-4 top-4 rounded-sm fill-primary stroke-primary text-primary opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            variant="link"
          >
            <X />
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  );
}
