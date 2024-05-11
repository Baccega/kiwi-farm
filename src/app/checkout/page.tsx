"use client";

import { useQuery } from "@tanstack/react-query";
import { useBasketStore } from "../providers";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import useStripe from "./_hooks/useStripe";

export default function CheckoutPage() {
  const basket = useBasketStore((state) => state.basket);

  const stripeProps = useStripe(basket);
  // const { data, isLoading } = useQuery({
  //   queryKey: ["checkout-session"],
  //   queryFn: createStripeCheckoutSession,
  // });
  return (
    <main className="text-primary-80">
      <section
        id="checkout"
        className="container relative min-h-section md:px-16"
      >
        <EmbeddedCheckoutProvider {...stripeProps}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
        {/* {isLoading ? "LOADING..." : JSON.stringify(data)} */}
      </section>
    </main>
  );
}
