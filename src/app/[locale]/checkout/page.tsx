"use client";

// import { useQuery } from "@tanstack/react-query";
import { useBasketStore } from "../providers";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import useStripe from "./_hooks/useStripe";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Checkout({ locale }: { locale: string }) {
  const searchParams = useSearchParams();
  const shippingLocation = searchParams.get("shippingLocation") ?? "pickup";
  const basket = useBasketStore((state) => state.basket);
  const stripeProps = useStripe(basket, locale, shippingLocation);

  // const { data, isLoading } = useQuery({
  //   queryKey: ["checkout-session"],
  //   queryFn: createStripeCheckoutSession,
  // });

  return (
    <section
      id="checkout"
      className="container relative h-full min-h-page w-screen max-w-none bg-primary py-10 text-white md:px-16"
    >
      <EmbeddedCheckoutProvider {...stripeProps}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </section>
  );
}

export default function CheckoutPage(props: { params: { locale: string } }) {
  const basket = useBasketStore((state) => state.basket);

  if (basket.length === 0) {
    redirect("/");
  }

  return (
    <main className="pt-header text-primary-80">
      <Suspense>
        <Checkout locale={props.params.locale} />
      </Suspense>
    </main>
  );
}
