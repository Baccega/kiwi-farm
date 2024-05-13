import "server-only";
import type Stripe from "stripe";


async function fetchStripe<T>(path: string): Promise<Stripe.ApiList<T>> {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
    },
    next: { revalidate: 3600 },
  });
  return (await res.json()) as Stripe.ApiList<T>;
}

export async function getStripeProducts(limit = 100) {
  const { data } = await fetchStripe<Stripe.Product>("products");

  return data;
}

export async function getStripePrices() {
  const { data } = await fetchStripe<Stripe.Price>("prices?currency=eur");

  return data;
}
