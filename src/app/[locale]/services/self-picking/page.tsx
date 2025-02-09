import { getTranslations, setRequestLocale } from "next-intl/server";
import CdnImage from "~/components/cdnImage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("SelfPicking.title"),
    description: t("SelfPicking.description"),
    alternates: {
      canonical: "/it/services/self-picking",
      languages: {
        "it-IT": "/it/services/self-picking",
        "en-US": "/en/services/self-picking",
      },
    },
    openGraph: {
      images: ["/services/self-picking.jpeg"],
    },
  };
}

export default async function Page(props: { params: { locale: string } }) {
  setRequestLocale(props.params.locale);
  const t = await getTranslations("Services");

  return (
    <main className="gap-4 pt-header">
      <section className="container relative flex h-full min-h-section flex-col gap-8 py-8 md:flex-row md:px-16">
        <figure className="relative h-80 w-full basis-80 px-12">
          <CdnImage
            src={"/services/self-picking.jpeg"}
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
