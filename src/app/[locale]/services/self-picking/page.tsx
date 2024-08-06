import Image from "next/image";

import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import selfPickingImage from "/public/services/self-picking.jpg";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("SelfPicking.title"),
    description: t("SelfPicking.description"),
    openGraph: {
      images: [selfPickingImage.src],
    },
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
            src={selfPickingImage}
            alt={"Self Picking"}
            fill={true}
            sizes="(max-width: 768px) 100vw, 20rem"
            className="z-20 rounded-lg object-cover"
          />
        </figure>
        <div className="flex grow flex-col gap-4">
          <h1 className="text-3xl font-bold">{t("selfPicking.title")}</h1>
          <h2 className="text-xl">{t("selfPicking.description")}</h2>
          <p className="">
            {t.rich("selfPicking.description2", {
              br: () => <br />,
            })}
          </p>
        </div>
      </section>
    </main>
  );
}
