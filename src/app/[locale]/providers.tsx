"use client";
import { create } from "zustand";
import { Observer } from "tailwindcss-intersect";
import { devtools, persist } from "zustand/middleware";
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
import { createContext, useEffect, useState } from "react";
import type Stripe from "stripe";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import CookiesBanner from "./_components/CookieBanner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { ConsentManagerProvider } from "@c15t/nextjs";
import { useLocale, useTranslations } from "next-intl";

interface BasketState {
  basket: BasketProduct[];
  shippingLocation: string | undefined;
  emptyBasket: () => void;
  removeProductFromBasket: (id: string) => void;
  addProductToBasket: (product: Stripe.Product, price: Stripe.Price) => void;
  setProductQuantity: (id: string, newQuantity: number) => void;
  setShippingLocation: (newLocation: string) => void;
}

export const useBasketStore = create<BasketState>()(
  devtools(
    persist(
      (set) => ({
        basket: [],
        shippingLocation: undefined,
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
        setShippingLocation: (newLocation: string) =>
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

type OpenAlertProps = {
  title: string;
  description: string;
  onConfirm: () => void;
};

export const AlertContext = createContext<{
  openAlert: (props: OpenAlertProps) => void;
} | null>(null);

const queryClient = new QueryClient();

function useTailwindIntersecProvider() {
  useEffect(() => {
    Observer.start();
  }, []);
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const t = useTranslations();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [onConfirm, setOnConfirm] = useState<undefined | (() => void)>();

  useTailwindIntersecProvider();

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
    <ConsentManagerProvider
      options={{
        mode: "offline",
        consentCategories: ["necessary", "measurement"],
        ignoreGeoLocation: true,
        translations: {
          defaultLanguage: locale,
          translations: {
            [locale]: {
              common: {
                acceptAll: t("Cookies.acceptAll"),
                customize: t("Cookies.customize"),
                rejectAll: t("Cookies.rejectAll"),
                save: t("Cookies.saveSettings"),
              },
              consentTypes: {
                necessary: {
                  title: t("Cookies.consentTypes.necessary"),
                  description: t("Cookies.consentTypes.necessaryDescription"),
                },
                measurement: {
                  title: t("Cookies.consentTypes.measurement"),
                  description: t("Cookies.consentTypes.measurementDescription"),
                },
              },
              consentManagerDialog: {
                title: t("Cookies.privacySettings.title"),
                description: t("Cookies.privacySettings.description"),
              },
            },
          },
        },
      }}
    >
      <PostHogProvider client={posthog}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AlertContext.Provider value={{ openAlert }}>
              <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent
                  onEscapeKeyDown={() => setIsAlertOpen(false)}
                >
                  <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {description}
                    </AlertDialogDescription>
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
                <CookiesBanner locale={locale} />
              </AlertDialog>
            </AlertContext.Provider>
          </TooltipProvider>
        </QueryClientProvider>
      </PostHogProvider>
    </ConsentManagerProvider>
  );
}
