import { z } from "zod";
import { AVAILABLE_ZIPS } from "~/utils/availableZips";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const formSchema = z.object({
  shipmentType: z.union([z.literal("pickup"), z.literal("delivery")]),
  orderDetails: z.object({
    name: z.string().min(3).max(50),
    surname: z.string().min(3).max(50),
    email: z.string().email().min(3).max(50),
    phone: z.string().regex(phoneRegex).min(3).max(50),
    kiwiKg: z.coerce.number().min(1).max(100),
  }),
  shipmentDetails: z.object({
    address: z.string().min(3).max(50),
    city: z.string().min(3).max(50),
    // zip: z.string().min(3).max(7),
    zip: z.enum(["", ...AVAILABLE_ZIPS]),
    province: z.string().min(2).max(50),
  }),
  paymentMethod: z.union([z.literal("cash"), z.literal("online-payment")]),
});
export type FormSchema = z.infer<typeof formSchema>;
