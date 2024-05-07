"use client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { type Product, type BasketProduct } from "~/types/Product";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface BasketState {
  basket: BasketProduct[];
  emptyBasket: () => void;
  removeProductFromBasket: (id: number) => void;
  addProductToBasket: (product: Product) => void;
  setProductQuantity: (id: number, newQuantity: number) => void;
}

export const useBasketStore = create<BasketState>()(
  devtools(
    persist(
      (set) => ({
        basket: [],
        emptyBasket: () => set({ basket: [] }),
        removeProductFromBasket: (id: number) =>
          set((state) => ({
            basket: state.basket.filter((product) => product.id !== id),
          })),
        setProductQuantity: (id: number, newQuantity: number) =>
          set((state) => ({
            basket: state.basket.map((product) =>
              product.id === id
                ? { ...product, quantity: newQuantity }
                : product,
            ),
          })),
        addProductToBasket: (product: Product) =>
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

export default function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
