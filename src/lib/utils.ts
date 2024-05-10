import { type ClassValue, clsx } from "clsx";
import type Stripe from "stripe";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomElement<T>(items: readonly T[]): T | undefined {
  if (items.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

export function getFormattedPrice(price: Stripe.Price): number {
  return (price.unit_amount ?? 0) / 100;
}
