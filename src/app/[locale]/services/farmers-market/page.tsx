import Image from "next/image";
import Link from "next/link";
import { type Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Il nostro spaccio",
  description:
    "Vieni a trovarci nel nostro spaccio per scoprire tutti i nostri prodotti!",
};

export default async function Page(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);
  return (
    <main className="gap-4 pt-header">
      <section className="container relative flex h-full min-h-section flex-col gap-8 py-8 md:flex-row md:px-16">
        <figure className="relative h-80 w-full basis-80 px-12">
          <Image
            src={"/spaccio.jpg" ?? "placeholder.png"}
            alt={""}
            fill={true}
            className="z-20 rounded-lg object-cover"
          />
        </figure>
        <div className="flex grow flex-col gap-4">
          <h1 className="text-3xl font-bold">Il nostro spaccio</h1>
          <h2 className="text-xl">
            Vieni a trovarci nel nostro spaccio per scoprire tutti i nostri
            prodotti!
          </h2>
          <p className="">
            Il nostro spaccio è sempre aperto e si trova in Via Restello 19,
            Villa del Conte (PD) (
            <Link href="https://maps.app.goo.gl/eDN69XbVXrhpmTSHA">
              Google maps
            </Link>
            )
          </p>
        </div>
      </section>
    </main>
  );
}
