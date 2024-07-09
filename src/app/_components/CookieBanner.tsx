"use client";
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
import setHasCookiesConsent from "~/server/cookies";

export default function CookiesBanner({
  hasCookiesConsent,
}: {
  hasCookiesConsent: boolean;
}) {
  async function handleConsentApproval() {
    await setHasCookiesConsent();
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
        <DrawerTitle>Cookies</DrawerTitle>
        <DrawerDescription>
          Accettando i cookies si acconsente all&apos;uso di{" "}
          <Link
            className={buttonVariants({
              variant: "link",
              size: "inline-link",
            })}
            href={"https://posthog.com/"}
          >
            PostHog (Data analytics)
          </Link>{" "}
          e{" "}
          <Link
            className={buttonVariants({
              variant: "link",
              size: "inline-link",
            })}
            href={"https://sentry.io/welcome/"}
          >
            Sentry (Error reporting)
          </Link>{" "}
          durante la navigazione sul sito. Leggi le nostre{" "}
          <Link
            className={buttonVariants({
              variant: "link",
              size: "inline-link",
            })}
            href={"/privacy"}
          >
            Privacy Policy
          </Link>{" "}
          e{" "}
          <Link
            className={buttonVariants({
              variant: "link",
              size: "inline-link",
            })}
            href={"/terms-and-conditions"}
          >
            Termini e condizioni
          </Link>{" "}
          per maggiori informazioni.
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
          Accetta tutti
        </DrawerClose>
        <DrawerClose
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            "w-full md:w-96",
          )}
        >
          Solo i cookies strettamente necessari
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
