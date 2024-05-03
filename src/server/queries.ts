import "server-only";
import { db } from "./db";

export async function getProducts() {
  const products = await db.query.products.findMany({
    where: (products, { eq }) => eq(products.available, true),
  });

  return products ?? [];
}
