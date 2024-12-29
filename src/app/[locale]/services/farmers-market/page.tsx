import Link from "next/link";

import { getTranslations, setRequestLocale } from "next-intl/server";
import spaccioImage from "/public/services/spaccio.jpeg";
import { buttonVariants } from "~/components/ui/button";
import CdnImage from "~/components/cdnImage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("FarmersMarket.title"),
    description: t("FarmersMarket.description"),
    alternates: {
      canonical: "/it/services/farmers-market",
      languages: {
        "it-IT": "/it/services/farmers-market",
        "en-US": "/en/services/farmers-market",
      },
    },
    openGraph: {
      images: [spaccioImage.src],
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
            src={spaccioImage}
            alt={"Spaccio"}
            fill={true}
            className="z-20 rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, 20rem"
          />
        </figure>
        <div className="flex grow flex-col gap-4">
          <h1 className="text-3xl font-bold">{t("farmersMarket.title")}</h1>
          <h2 className="text-xl">{t("farmersMarket.description")}</h2>
          <p className="">
            {t.rich("farmersMarket.description2", {
              gmaps: (chunk) => (
                <Link
                  className={buttonVariants({ variant: "link", size: "inline-link"})}
                  href="https://maps.app.goo.gl/eDN69XbVXrhpmTSHA"
                >
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
