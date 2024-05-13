"use client";

import { redirect } from "next/navigation";
import { useStripeSession } from "./_hooks/useStripeSession";
import { useBasketStore } from "~/app/providers";

export default function CheckoutPage() {
  const queryString = window?.location?.search ?? "";
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get("session_id");
  const emptyBasket = useBasketStore((state) => state.emptyBasket);
  const { status, customerEmail, error } = useStripeSession(
    sessionId,
    emptyBasket,
  );

  if (status === "open" || !sessionId || error) {
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
        className="container relative flex min-h-section flex-col gap-2 md:px-16"
      >
        {status === "complete" ? (
          <>
            <h1 className="text-center text-3xl font-bold">
              🎉 Grazie per il tuo acquisto 🎉
            </h1>
            <p className="text-center text-xl font-bold">
              Una ricevuta è stata inviata a `{customerEmail}`
            </p>
          </>
        ) : (
          "Loading..."
        )}
      </section>
    </main>
  );
}
