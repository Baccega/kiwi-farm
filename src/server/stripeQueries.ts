import "server-only";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function getStripeProducts() {
  const data = (await stripe.products.list({ expand: ["data.default_price"] }))
    .data;
  const products = JSON.parse(JSON.stringify(data)) as Stripe.Product[];
  return products.sort((a, b) => {
    const enabledA = a.metadata?.enabled === "true" ? 1 : 0;
    const enabledB = b.metadata?.enabled === "true" ? 1 : 0;
    return enabledB - enabledA;
  });
}

export async function getStripeProduct(id: string) {
  const data = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  return JSON.parse(JSON.stringify(data)) as Stripe.Product;
}
