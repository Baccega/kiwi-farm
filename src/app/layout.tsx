import "~/styles/globals.css";

import { Bricolage_Grotesque } from "next/font/google";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Providers from "./providers";

const font = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Le Giumelle",
  description:
    "Scopri la nostra azienda agricola ed acquista i nostri prodotti",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-dvh ${font.className} grid grid-rows-[1fr,auto]`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
