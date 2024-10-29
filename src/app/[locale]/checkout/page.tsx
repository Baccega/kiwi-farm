"use client";

// import { useQuery } from "@tanstack/react-query";
import { useBasketStore } from "../providers";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import useStripe from "./_hooks/useStripe";
import { redirect } from "next/navigation";

export default function CheckoutPage(props: { params: { locale: string } }) {
  const basket = useBasketStore((state) => state.basket);

  const stripeProps = useStripe(basket, props.params.locale);
  // const { data, isLoading } = useQuery({
  //   queryKey: ["checkout-session"],
  //   queryFn: createStripeCheckoutSession,
  // });

  if (basket.length === 0) {
    redirect("/");
  }

  return (
    <main className="pt-header text-primary-80">
      <section
        id="checkout"
        className="container relative min-h-page bg-primary py-10 md:px-16"
      >
        <EmbeddedCheckoutProvider {...stripeProps}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </section>
    </main>
  );
}
