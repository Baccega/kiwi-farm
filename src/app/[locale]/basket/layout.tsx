import {
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { AVAILABLE_LOCALES } from "~/middleware";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("HomePage-title"),
    description: t("HomePage-description"),
  };
}

export function generateStaticParams() {
  return AVAILABLE_LOCALES.map((locale) => ({ locale }));
}

export default async function Layout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Set locale for server components
  // https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#add-unstable_setrequestlocale-to-all-layouts-and-pages
  unstable_setRequestLocale(props.params.locale);

  return props.children;
}
