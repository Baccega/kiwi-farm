import { useEffect, useState } from "react";
import { z } from "zod";

export function useStripeSession(
  sessionId: string | null,
  onPaymentCompleted: () => void,
) {
  const [status, setStatus] = useState<
    "complete" | "expired" | "open" | undefined
  >();
  const [customerEmail, setCustomerEmail] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStripeSession(sessionId: string) {
      const res = await fetch(`/checkout/api?session_id=${sessionId}`, {
        method: "GET",
      });
      const unParsedData: unknown = await res.json();
      const result = z
        .object({
          status: z.enum(["complete", "expired", "open"]),
          customer_email: z.string().email(),
        })
        .safeParse(unParsedData);

      if (result.success) {
        setStatus(result.data.status);
        setCustomerEmail(result.data.customer_email);
        onPaymentCompleted();
      } else {
        setError(true);
      }
    }

    if (sessionId) {
      void fetchStripeSession(sessionId);
    }
  }, [onPaymentCompleted, sessionId]);

  return { status, customerEmail, error };
}
