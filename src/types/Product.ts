import type Stripe from "stripe";

export type BasketProduct = {
  id: string;
  product: Stripe.Product;
  price: Stripe.Price;
  quantity: number;
};