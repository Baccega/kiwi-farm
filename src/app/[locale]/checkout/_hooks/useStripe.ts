import { z } from "zod";
import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { type BasketProduct } from "~/types/Product";

export default function useStripe(basket: BasketProduct[]) {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
  const fetchClientSecret = useCallback(() => {
    return fetch("/checkout/api", {
      method: "POST",
      body: JSON.stringify({
        items: basket.map(({ quantity, price }) => ({
          quantity,
          price: price.id,
        })),
      }),
    })
      .then((res) => res.json())
      .then((unParsedData) => {
        const data = z.object({ clientSecret: z.string() }).parse(unParsedData);
        return data.clientSecret;
      });
  }, [basket]);

  const options = { fetchClientSecret };

  return { stripe: stripePromise, options };
}
