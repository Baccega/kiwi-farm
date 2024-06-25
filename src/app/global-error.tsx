"use client";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";
import { useCookiesStore } from "./providers";

export default function GlobalError(props: { error: unknown }) {
  const hasCookiesConsent = useCookiesStore((state) => state.hasCookiesConsent);

  useEffect(() => {
    if (!hasCookiesConsent) return;
    Sentry.captureException(props.error);
  }, [hasCookiesConsent, props.error]);

  return (
    <html>
      <body>
        <Error statusCode={500} title="Error" />
      </body>
    </html>
  );
}
