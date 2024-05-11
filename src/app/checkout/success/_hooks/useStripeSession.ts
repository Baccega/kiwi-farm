import { useEffect, useState } from "react";
import { z } from "zod";

export function useStripeSession() {
  const [status, setStatus] = useState<
    "complete" | "expired" | "open" | undefined
  >();
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    async function fetchStripeSession() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get("session_id");
      const res = await fetch(`/checkout/api?session_id=${sessionId}`, {
        method: "GET",
      });
      const unParsedData: unknown = await res.json();
      const data = z
        .object({
          status: z.enum(["complete", "expired", "open"]),
          customer_email: z.string().email(),
        })
        .parse(unParsedData);
      setStatus(data.status);
      setCustomerEmail(data.customer_email);
    }

    void fetchStripeSession();
  }, []);

  return { status, customerEmail };
}
