import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export function useStripeSession(
  sessionId: string | null,
  onPaymentCompleted: () => Promise<void>,
  locale: string,
) {
  const { data, error } = useQuery({
    queryKey: ["checkout-session"],
    queryFn: async () => {
      const res = await fetch(
        `/${locale}/checkout/api?session_id=${sessionId}`,
        {
          method: "GET",
        },
      );
      const unParsedData: unknown = await res.json();
      const result = z
        .object({
          status: z.enum(["complete", "expired", "open"]),
          customer_email: z.string().email(),
        })
        .safeParse(unParsedData);
      if (result.success) {
        await onPaymentCompleted();
        return result.data;
      } else {
        throw new Error("Unsuccessful");
      }
    },
  });

  return { status: data?.status, customerEmail: data?.customer_email, error };
}
