import { type BasketProduct } from "~/types/Product";

export async function createStripeCheckoutSession(basket: BasketProduct[]) {
  const response = await fetch("/checkout/api", {
    method: "POST",
    body: JSON.stringify({
      items: basket.map(({ quantity, price }) => ({
        quantity,
        price: price.id,
      })),
    }),
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = await response.json();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
}
