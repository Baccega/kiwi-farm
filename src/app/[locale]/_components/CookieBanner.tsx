"use client";
import {
  ConsentManagerDialog,
  CookieBanner,
  useConsentManager,
} from "@c15t/nextjs";
import { useTranslations } from "next-intl";
import Link from "next/link";
import posthog from "posthog-js";
import { useEffect } from "react";
import { buttonVariants } from "~/components/ui/button";

export default function CookiesBanner({ locale }: { locale: string }) {
  const t = useTranslations("Cookies");
  const { hasConsentFor } = useConsentManager();
  const hasMesurementCookiesConsent = hasConsentFor("measurement");

  // Enable Posthog if the user has consented
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !hasMesurementCookiesConsent ||
      !process.env.NEXT_PUBLIC_POSTHOG_KEY
    )
      return;
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "/ingest",
      ui_host: "https://eu.i.posthog.com",
    });
  }, [hasMesurementCookiesConsent]);

  return (
    <>
      <CookieBanner
        title={t("bannerTitle")}
        description={
          <>
            {t.rich("bannerDescription", {
              posthog: (chunks) => (
                <Link
                  className={buttonVariants({
                    variant: "link",
                    size: "inline-link",
                  })}
                  href={"https://posthog.com/"}
                >
                  {chunks}
                </Link>
              ),
              sentry: (chunks) => (
                <Link
                  className={buttonVariants({
                    variant: "link",
                    size: "inline-link",
                  })}
                  href={"https://sentry.io/welcome/"}
                >
                  {chunks}
                </Link>
              ),
              privacyPolicy: (chunks) => (
                <Link
                  className={buttonVariants({
                    variant: "link",
                    size: "inline-link",
                  })}
                  href={`/${locale}/privacy`}
                >
                  {chunks}
                </Link>
              ),
              termsAndConditions: (chunks) => (
                <Link
                  className={buttonVariants({
                    variant: "link",
                    size: "inline-link",
                  })}
                  href={`/${locale}/terms-and-conditions`}
                >
                  {chunks}
                </Link>
              ),
            })}
          </>
        }
      />
      <ConsentManagerDialog />
    </>
  );
}
