import "server-only";
import type Stripe from "stripe";

async function fetchStripe<T>(path: string): Promise<T> {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
    },
    next: { revalidate: 3600 },
  });
  return (await res.json()) as T;
}

export async function getStripeProducts() {
  const { data } =
    await fetchStripe<Stripe.ApiList<Stripe.Product>>("products");

  return data;
}

export async function getStripeProduct(id: string) {
  const product = await fetchStripe<Stripe.Product>(`products/${id}`);

  return product;
}

export async function getStripePrices() {
  const { data } = await fetchStripe<Stripe.ApiList<Stripe.Price>>(
    "prices?currency=eur",
  );

  return data;
}

export async function getStripePrice(id: string) {
  const price = await fetchStripe<Stripe.Price>(`prices/${id}`);

  return price;
}
