import { useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import posthog from "posthog-js";

export function useCookiesConsent() {
  const [hasCookiesConsent, setHasCookiesConsent] = useLocalStorage<
    boolean | null
  >("cookiesConsent", null);

  // Enable Posthog
  useEffect(() => {
    if (typeof window === "undefined" || !hasCookiesConsent) return;
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "/ingest",
      ui_host: "https://eu.i.posthog.com",
    });
  }, [hasCookiesConsent]);

  return { hasCookiesConsent, setHasCookiesConsent };
}
