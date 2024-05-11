"use client";

import { redirect } from "next/navigation";
import { useStripeSession } from "./_hooks/useStripeSession";
import { useBasketStore } from "~/app/providers";

export default function CheckoutPage() {
  const { status, customerEmail } = useStripeSession();
  const emptyBasket = useBasketStore((state) => state.emptyBasket);

  emptyBasket();

  if (status === "open") {
    return redirect("/");
  }

  // const { data, isLoading } = useQuery({
  //   queryKey: ["checkout-session"],
  //   queryFn: createStripeCheckoutSession,
  // });
  return (
    <main className="text-primary-80">
      <section
        id="checkout-success"
        className="container relative min-h-section md:px-16"
      >
        <h1 className="text-3xl font-bold">
          {status === "complete"
            ? `🎉 Grazie per il tuo acquisto, ${customerEmail}! 🎉`
            : "Loading..."}
        </h1>
      </section>
    </main>
  );
}
