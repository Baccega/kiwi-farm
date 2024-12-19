import "~/styles/globals.css";

import { Bricolage_Grotesque } from "next/font/google";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Providers from "./providers";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "~/i18n/routing";
import { notFound } from "next/navigation";

const font = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("HomePage.title"),
    description: t("HomePage.description"),
    metadataBase: new URL("https://legiumelle.it"),
    alternates: {
      canonical: "/it",
      languages: {
        "it-IT": "/it",
        "en-US": "/en",
      },
    },
    icons: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/apple-touch-icon.png",
      },
      { rel: "icon", url: "/favicon.ico" },
    ],
    openGraph: {
      images: ["/logo-full.jpg"],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(props.params.locale)) {
    notFound();
  }

  // Set locale for server components
  setRequestLocale(props.params.locale);

  const messages = await getMessages();

  return (
    <html lang={props.params.locale}>
      <body
        className={`min-dvh ${font.className} grid grid-rows-[1fr,auto] text-primary-80`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header locale={props.params.locale} />
            {props.children}
            <div id="modal-root" />
            <Footer locale={props.params.locale} />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
