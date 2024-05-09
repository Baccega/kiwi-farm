"use client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { type BasketProduct } from "~/types/Product";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { createContext, useState } from "react";
import type Stripe from "stripe";

interface BasketState {
  basket: BasketProduct[];
  emptyBasket: () => void;
  removeProductFromBasket: (id: string) => void;
  addProductToBasket: (product: Stripe.Product) => void;
  setProductQuantity: (id: string, newQuantity: number) => void;
}

export const useBasketStore = create<BasketState>()(
  devtools(
    persist(
      (set) => ({
        basket: [],
        emptyBasket: () => set({ basket: [] }),
        removeProductFromBasket: (id: string) =>
          set((state) => ({
            basket: state.basket.filter((product) => product.id !== id),
          })),
        setProductQuantity: (id: string, newQuantity: number) =>
          set((state) => ({
            basket: state.basket.map((product) =>
              product.id === id
                ? { ...product, quantity: newQuantity }
                : product,
            ),
          })),
        addProductToBasket: (product: Stripe.Product) =>
          set((state) => {
            if (
              !state.basket.find(
                (basketProduct) => basketProduct.id === product.id,
              )
            ) {
              return {
                basket: [
                  ...state.basket,
                  {
                    id: product.id,
                    product,
                    quantity: 1,
                  },
                ],
              };
            }
            return state;
          }),
      }),
      {
        name: "basket-storage",
      },
    ),
  ),
);

type OpenAlertProps = {
  title: string;
  description: string;
  onConfirm: () => void;
};

export const AlertContext = createContext<{
  openAlert: (props: OpenAlertProps) => void;
} | null>(null);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [onConfirm, setOnConfirm] = useState<undefined | (() => void)>();

  function closeAlert() {
    setIsAlertOpen(false);
  }

  function openAlert(props: OpenAlertProps) {
    setTitle(props.title);
    setDescription(props.description);
    setOnConfirm(() => props.onConfirm);
    setIsAlertOpen(true);
  }

  function handleConfirm() {
    if (!onConfirm) return;
    onConfirm();
  }

  return (
    <AlertContext.Provider value={{ openAlert }}>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent onEscapeKeyDown={() => setIsAlertOpen(false)}>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeAlert}>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Conferma
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
        {children}
      </AlertDialog>
    </AlertContext.Provider>
  );
}
