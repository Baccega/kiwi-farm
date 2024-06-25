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
import { createContext, useEffect, useState } from "react";
import type Stripe from "stripe";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface BasketState {
  basket: BasketProduct[];
  emptyBasket: () => void;
  removeProductFromBasket: (id: string) => void;
  addProductToBasket: (product: Stripe.Product, price: Stripe.Price) => void;
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
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [onConfirm, setOnConfirm] = useState<undefined | (() => void)>();

  const cookiesDrawerOpen = useCookiesStore((state) => state.cookiesDrawerOpen);
  const hasCookiesConsent = useCookiesStore((state) => state.hasCookiesConsent);
  const setCookiesDrawerOpen = useCookiesStore(
    (state) => state.setCookiesDrawerOpen,
  );
  const setHasCookiesConsent = useCookiesStore(
    (state) => state.setHasCookiesConsent,
  );

  // Open the cookies drawer if the user hasn't consented yet
  useEffect(() => {
    if (hasCookiesConsent === null) {
      setCookiesDrawerOpen(true);
    }
  }, [hasCookiesConsent, setCookiesDrawerOpen]);

  // Enable Posthog if the user has consented
  useEffect(() => {
    if (typeof window === "undefined" || !hasCookiesConsent) return;
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "/ingest",
      ui_host: "https://eu.i.posthog.com",
    });
  }, [hasCookiesConsent]);

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
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Cookies</DrawerTitle>
          <DrawerDescription>
            Accettando i cookies si acconsente all&apos;uso di{" "}
            <strong>PostHog</strong> (Data analytics) e <strong>Sentry</strong>{" "}
            (Error reporting) durante la navigazione sul sito.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="md:flex-row">
          <DrawerClose
            onClick={() => setHasCookiesConsent(true)}
            className={cn(
              buttonVariants({
                variant: "default",
              }),
              "w-full md:w-96",
            )}
          >
            Accetta tutti
          </DrawerClose>
          <DrawerClose
            onClick={() => setHasCookiesConsent(false)}
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "w-full md:w-96",
            )}
          >
            Solo i cookies strettamente necessari
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
