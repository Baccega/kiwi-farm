import { z } from "zod";

export const createCheckoutSessionRequestSchema = z.object({
  items: z.array(z.object({ price: z.string(), quantity: z.number() })),
});
