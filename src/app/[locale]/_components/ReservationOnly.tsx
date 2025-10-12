"use client";

import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { useTranslations } from "next-intl";
import { PhoneCallIcon } from "lucide-react";

export default function ReservationOnly() {
  const t = useTranslations("ReservationOnly");
  return (
    <div className="flex flex-col gap-1">
      <span className="font-bold">{t("title")}</span>
      <Link
        href="tel:+393460586379"
        className={buttonVariants({
          variant: "default",
          size: "default",
          className: "w-fit gap-2",
        })}
      >
        <PhoneCallIcon />
        {t("phone")}
      </Link>
    </div>
  );
}
