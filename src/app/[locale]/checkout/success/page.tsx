"use client";

import { redirect } from "next/navigation";
import { useStripeSession } from "./_hooks/useStripeSession";
import { useBasketStore } from "~/app/[locale]/providers";
import { useUrlParams } from "./_hooks/useUrlParams";

export default function CheckoutPage() {;
  const urlParams = useUrlParams();
  const sessionId = urlParams?.get("session_id") ?? "";
  const emptyBasket = useBasketStore((state) => state.emptyBasket);
  const { status, customerEmail, error } = useStripeSession(
    sessionId,
    emptyBasket,
  );

  if (status === "open" || error) {
    return redirect("/");
  }

  // const { data, isLoading } = useQuery({
  //   queryKey: ["checkout-session"],
  //   queryFn: createStripeCheckoutSession,
  // });
  return (
    <main className="pt-header text-primary-80">
      <section
        id="checkout-success"
        className="container relative flex min-h-section flex-col gap-2 pt-header md:px-16"
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
          <p>Loading...</p>
        )}
      </section>
    </main>
  );
}
