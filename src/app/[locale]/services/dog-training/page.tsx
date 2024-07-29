import { type Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Addestramento cani",
  description:
    "Il nostro addestramento cani è disponibile per tutte le razze e taglie.",
};

export default async function Page(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);
  const t = await getTranslations("Services");
  return (
    <main className="gap-4 pt-header">
      <section className="container relative flex h-full min-h-section flex-col gap-8 py-8 md:flex-row md:px-16">
        <figure className="relative h-80 w-full basis-80 px-12">
          <Image
            unoptimized
            src={"/anakin.jpg" ?? "/placeholder.png"}
            alt={""}
            fill={true}
            className="z-20 rounded-lg object-cover"
          />
        </figure>
        <div className="flex grow flex-col gap-4">
          <h1 className="text-3xl font-bold">{t("dogTraining.title")}</h1>
          <p className="">{t("dogTraining.description")}</p>
        </div>
      </section>
    </main>
  );
}
