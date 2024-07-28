import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "~/components/ui/button";
import { DrawerTrigger } from "~/components/ui/drawer";

export default function Footer(props: { locale: string }) {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary-80">
      <div className="container flex flex-col items-center justify-between gap-2 py-1 text-sm text-white md:flex-row md:px-16">
        <nav className="flex flex-col gap-x-2 md:-translate-x-4 md:flex-row">
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
          <DrawerTrigger
            className={buttonVariants({
              variant: "link",
              inverted: true,
              size: "sm",
            })}
          >
            {t("cookies")}
          </DrawerTrigger>
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
        <p className="">{t("copyright", { year })}</p>
      </div>
    </footer>
  );
}
