import Head from "next/head";
import LinkButton from "~/components/LinkButton";
import Footer from "~/components/Footer";
import { api } from "~/utils/api";
import { IoMdBusiness } from "react-icons/io";
import { RiShoppingBagLine } from "react-icons/ri";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Kiwi farm</title>
        <meta name="description" content="Società agricola kiwi farm" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="hidden"></header>
      <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-primary to-accent px-8 py-16 text-white">
        <h1 className="pb-10 text-5xl font-bold">Società agricola Kiwi Farm</h1>
        <nav className="flex flex-grow flex-wrap items-center justify-center gap-8 text-base font-bold">
          <LinkButton href="/about-us" Icon={IoMdBusiness}>
            Chi siamo
          </LinkButton>
          <LinkButton href="/reserve-form" Icon={RiShoppingBagLine}>
            Prenotazione kiwi
          </LinkButton>
        </nav>
      </main>
      <Footer />
    </>
  );
}
