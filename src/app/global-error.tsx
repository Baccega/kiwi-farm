"use client";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";
import { useConsentManager } from "@c15t/nextjs";

export default function GlobalError(props: { error: unknown }) {
  const { hasConsentFor } = useConsentManager();
  const hasMesurementCookiesConsent = hasConsentFor("measurement");

  useEffect(() => {
    if (!hasMesurementCookiesConsent) return;
    Sentry.captureException(props.error);
  }, [hasMesurementCookiesConsent, props.error]);

  return (
    <html>
      <body>
        <Error statusCode={500} title="Error" />
      </body>
    </html>
  );
}
