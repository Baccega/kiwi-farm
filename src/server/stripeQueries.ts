import "server-only";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function getStripeProducts() {
  const data = (await stripe.products.list({ expand: ["data.default_price"] }))
    .data;
  return (JSON.parse(JSON.stringify(data)) as Stripe.Product[]).filter(
    (product) => (product.metadata?.enabled ?? "true") === "true",
  );
}

export async function getStripeProduct(id: string) {
  const data = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });
  if (data.metadata?.enabled === "false") {
    return null;
  }

  return JSON.parse(JSON.stringify(data)) as Stripe.Product;
}
