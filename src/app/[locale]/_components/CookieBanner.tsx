"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import posthog from "posthog-js";
import { useEffect } from "react";
import { buttonVariants } from "~/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";
import { cn } from "~/lib/utils";
import { setHasCookiesConsent } from "~/server/cookies";

export default function CookiesBanner({
  hasCookiesConsent,
  locale,
}: {
  hasCookiesConsent: boolean;
  locale: string;
}) {
  const t = useTranslations("Cookies");

  async function handleConsentApproval() {
    await setHasCookiesConsent(true);
  }

  async function handleRemoveConsent() {
    await setHasCookiesConsent(false);
  }

  // Enable Posthog if the user has consented
  useEffect(() => {
    if (typeof window === "undefined" || !hasCookiesConsent) return;
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "/ingest",
      ui_host: "https://eu.i.posthog.com",
    });
  }, [hasCookiesConsent]);

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{t("bannerTitle")}</DrawerTitle>
        <DrawerDescription>
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
        </DrawerDescription>
      </DrawerHeader>
      <DrawerFooter className="md:flex-row">
        <DrawerClose
          onClick={() => handleConsentApproval()}
          className={cn(
            buttonVariants({
              variant: "default",
            }),
            "w-full md:w-96",
          )}
        >
          {t('acceptAll')}
        </DrawerClose>
        <DrawerClose
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            "w-full md:w-96",
          )}
          onClick={() => handleRemoveConsent()}
        >
          {t('onlyNecessary')}
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
