import "~/styles/globals.css";

import { Roboto } from "next/font/google";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Le Giumelle",
  description:
    "Scopri la nostra azienda agricola ed acquista i nostri prodotti",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-dvh ${roboto.className} grid grid-rows-[1fr,auto]`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
