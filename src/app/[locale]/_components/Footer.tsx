"use client";
import { useConsentManager } from "@c15t/nextjs";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";

export default function Footer(props: { locale: string }) {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();
  const { setIsPrivacyDialogOpen } = useConsentManager();

  return (
    <footer className="bg-primary-80">
      <div className="container flex flex-col items-center justify-between py-1 text-sm text-white md:flex-row md:px-16">
        <nav className="flex flex-col flex-wrap gap-x-2 md:-translate-x-4 md:flex-row">
          <Link
            href={`/${props.locale}/privacy`}
            className={buttonVariants({
              variant: "link",
              inverted: true,
              size: "sm",
            })}
          >
            {t("privacy")}
          </Link>
          <Button
            variant="link"
            size="sm"
            className="text-primary-foreground"
            onClick={() => setIsPrivacyDialogOpen(true)}
          >
            {t("cookies")}
          </Button>
          <Link
            href={`/${props.locale}/terms-and-conditions`}
            className={buttonVariants({
              variant: "link",
              inverted: true,
              size: "sm",
            })}
          >
            {t("termsAndConditions")}
          </Link>
          <Link
            href={`/${props.locale}/returns`}
            className={buttonVariants({
              variant: "link",
              inverted: true,
              size: "sm",
            })}
          >
            {t("returns")}
          </Link>
        </nav>
        <div className="flex flex-col flex-wrap items-center justify-end gap-x-2 md:flex-row">
          <p className="">
            {t.rich("credits", {
              sandro: (chunks) => (
                <Link
                  href={`https://github.com/Baccega`}
                  className={buttonVariants({
                    variant: "link",
                    inverted: true,
                    size: "sm",
                  })}
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <p className="flex h-9 items-center px-2">
            {t("copyright", {
              year,
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}
