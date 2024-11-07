"use client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { getCookie } from "cookies-next";
import type { BasketProduct } from "~/types/Product";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { Drawer } from "~/components/ui/drawer";
import CookiesBanner from "./_components/CookieBanner";
import { useLocale } from "next-intl";

interface BasketState {
  basket: BasketProduct[];
  shippingLocation: string | undefined;
  emptyBasket: () => void;
  removeProductFromBasket: (id: string) => void;
  addProductToBasket: (product: Stripe.Product, price: Stripe.Price) => void;
  setProductQuantity: (id: string, newQuantity: number) => void;
  setShippingLocation: (newLocation: string | undefined) => void;
}

export const useBasketStore = create<BasketState>()(
  devtools(
    persist(
      (set) => ({
        basket: [],
        shippingLocation: "",
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
        addProductToBasket: (product: Stripe.Product, price: Stripe.Price) =>
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
                    price,
                    quantity: 1,
                    weight: Number(product?.metadata?.weight) ?? 0,
                  },
                ],
              };
            }
            return state;
          }),
        setShippingLocation: (newLocation: string | undefined) =>
          set(() => ({
            shippingLocation: newLocation,
          })),
      }),
      {
        name: "basket-storage",
      },
    ),
  ),
);

interface CookiesBannerState {
  cookiesDrawerOpen: boolean;
  hasCookiesConsent: boolean | null;
  setCookiesDrawerOpen: (open: boolean) => void;
  setHasCookiesConsent: (hasConsent: boolean) => void;
}

export const useCookiesStore = create<CookiesBannerState>()(
  devtools(
    persist(
      (set) => ({
        cookiesDrawerOpen: false,
        hasCookiesConsent: null,
        setCookiesDrawerOpen: (open: boolean) =>
          set({ cookiesDrawerOpen: open }),
        setHasCookiesConsent: (hasConsent: boolean) =>
          set({ hasCookiesConsent: hasConsent }),
      }),
      {
        name: "cookies-storage",
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

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const hasCookiesConsent = Boolean(getCookie("hasCookiesConsent") ?? "false");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [onConfirm, setOnConfirm] = useState<undefined | (() => void)>();
  const [cookiesDrawerOpen, setCookiesDrawerOpen] =
    useState(!hasCookiesConsent);

  function handleCookiesDrawerOpenChange(open: boolean) {
    setCookiesDrawerOpen(open);
  }

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
    <Drawer
      open={cookiesDrawerOpen}
      onOpenChange={handleCookiesDrawerOpenChange}
    >
      <PostHogProvider client={posthog}>
        <QueryClientProvider client={queryClient}>
          <AlertContext.Provider value={{ openAlert }}>
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
              <AlertDialogContent onEscapeKeyDown={() => setIsAlertOpen(false)}>
                <AlertDialogHeader>
                  <AlertDialogTitle>{title}</AlertDialogTitle>
                  <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={closeAlert}>
                    Annulla
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleConfirm}>
                    Conferma
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
              {children}
            </AlertDialog>
          </AlertContext.Provider>
        </QueryClientProvider>
      </PostHogProvider>
      <CookiesBanner locale={locale} hasCookiesConsent={hasCookiesConsent} />
    </Drawer>
  );
}
