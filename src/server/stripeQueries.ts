import "server-only";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-04-10",
});

export async function getStripeProducts(limit = 100) {
  const { data } = await stripe.products.list({ limit });

  return data;
}
