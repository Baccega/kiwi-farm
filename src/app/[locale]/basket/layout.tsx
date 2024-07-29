import {
  unstable_setRequestLocale,
} from "next-intl/server";

export default async function Layout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Set locale for server components
  // https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#add-unstable_setrequestlocale-to-all-layouts-and-pages
  unstable_setRequestLocale(props.params.locale);

  return props.children;
}
