import { useTranslations } from "next-intl";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");
  return (
    <main className="pt-header text-center">
      <h1 className="text-4xl pt-header">{t("title")}</h1>
      <Link href="/" className={cn(buttonVariants(), "w-fit mt-8")}>
        {t("link")}
      </Link>
    </main>
  );
}
