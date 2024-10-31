"use client";

import { redirect } from "next/navigation";
import { useStripeSession } from "./_hooks/useStripeSession";
import { useBasketStore } from "~/app/[locale]/providers";
import { useUrlParams } from "./_hooks/useUrlParams";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useTelegramNotification } from "./_hooks/useTelegramNotification";

export default function CheckoutPage(props: { params: { locale: string } }) {
  const t = useTranslations("Checkout");
  const urlParams = useUrlParams();
  const sessionId = urlParams?.get("session_id") ?? "";
  const emptyBasket = useBasketStore((state) => state.emptyBasket);
  const { isLoading, sendTelegramNotification } = useTelegramNotification(
    props.params.locale,
    sessionId,
  );

  const handlePaymentCompleted = useCallback(async () => {
    emptyBasket();
    await sendTelegramNotification();
  }, [emptyBasket, sendTelegramNotification]);

  const { status, customerEmail, error } = useStripeSession(
    sessionId,
    handlePaymentCompleted,
    props.params.locale,
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
        {status === "complete" && !isLoading ? (
          <>
            <h1 className="text-center text-3xl font-bold">{t("title")}</h1>
            <p className="text-center text-xl font-bold">
              {t("description", { customerEmail: customerEmail })}
            </p>
          </>
        ) : (
          <p>{t("loading")}</p>
        )}
      </section>
    </main>
  );
}
