import Image from "next/image";
import Link from "next/link";
import { type Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import spaccioImage from "/public/spaccio.jpg";

export const metadata: Metadata = {
  title: "Il nostro spaccio",
  description:
    "Vieni a trovarci nel nostro spaccio per scoprire tutti i nostri prodotti!",
};

export default async function Page(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);
  const t = await getTranslations("Services");

  return (
    <main className="gap-4 pt-header">
      <section className="container relative flex h-full min-h-section flex-col gap-8 py-8 md:flex-row md:px-16">
        <figure className="relative h-80 w-full basis-80 px-12">
          <Image
            src={spaccioImage ?? "/placeholder.png"}
            alt={""}
            fill={true}
            className="z-20 rounded-lg object-cover"
          />
        </figure>
        <div className="flex grow flex-col gap-4">
          <h1 className="text-3xl font-bold">{t("farmersMarket.title")}</h1>
          <h2 className="text-xl">{t("farmersMarket.description")}</h2>
          <p className="">
            {t.rich("farmersMarket.description2", {
              gmaps: (chunk) => (
                <Link href="https://maps.app.goo.gl/eDN69XbVXrhpmTSHA">
                  {chunk}
                </Link>
              ),
            })}
          </p>
        </div>
      </section>
    </main>
  );
}
