import { z } from "zod";
import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { type BasketProduct } from "~/types/Product";

export default function useStripe(
  basket: BasketProduct[],
  locale: string,
  shippingLocation: string,
) {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
  const fetchClientSecret = useCallback(() => {
    return fetch(`/${locale}/checkout/api`, {
      method: "POST",
      body: JSON.stringify({
        items: basket.map(({ quantity, price }) => ({
          quantity,
          price: price.id,
        })),
        locale,
        shippingLocation,
      }),
    })
      .then((res) => res.json())
      .then((unParsedData) => {
        const data = z.object({ clientSecret: z.string() }).parse(unParsedData);
        return data.clientSecret;
      });
  }, [basket, locale, shippingLocation]);

  const options = { fetchClientSecret };

  return { stripe: stripePromise, options };
}
