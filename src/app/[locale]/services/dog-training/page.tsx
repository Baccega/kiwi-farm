import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import anakinImage from "/public/anakin.jpg";


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("DogTraining.title"),
    description: t("DogTraining.description"),
  };
}
export default async function Page(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);
  const t = await getTranslations("Services");
  return (
    <main className="gap-4 pt-header">
      <section className="container relative flex h-full min-h-section flex-col gap-8 py-8 md:flex-row md:px-16">
        <figure className="relative h-80 w-full basis-80 px-12">
          <Image
            src={anakinImage ?? "/placeholder.png"}
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
