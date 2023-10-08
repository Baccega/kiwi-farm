import Head from "next/head";
import Link from "next/link";
import Footer from "~/components/Footer";
import { BiArrowBack } from "react-icons/bi";

type Props = {
  title: string;
  description: string;
  headline: string;
  children: React.ReactNode;
};

export default function ArticleLayout(props: Props) {
  const { title, description, headline, children } = props;
  return (
    <div className="to-accent flex min-h-screen flex-col items-center justify-between gap-10 bg-gradient-to-b from-primary p-16 text-white">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex w-full justify-between gap-8">
        <nav className="h-12 w-12">
          <Link href="/">
            <BiArrowBack size={48} />
          </Link>
        </nav>
        <h1 className="w-full flex-grow text-center text-5xl font-bold">
          {headline}
        </h1>
        <div className="h-12 w-12"></div>
      </header>
      <main className="flex w-full flex-grow flex-col justify-evenly items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
