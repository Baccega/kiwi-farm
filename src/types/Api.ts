import { z } from "zod";

export const createCheckoutSessionRequestSchema = z.object({
  items: z.array(z.object({ price: z.string(), quantity: z.number() })),
  locale: z.string(),
});

export const sendTelegramMessageRequestSchema = z.object({
  session_id: z.string(),
});
