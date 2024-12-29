import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { buttonVariants } from "~/components/ui/button";
import CdnImage from "~/components/cdnImage";
import Image from "next/image";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("DogTraining.title"),
    description: t("DogTraining.description"),
    alternates: {
      canonical: "/it/services/dog-training",
      languages: {
        "it-IT": "/it/services/dog-training",
        "en-US": "/en/services/dog-training",
      },
    },
    openGraph: {
      images: ["/services/dog-training.jpeg"],
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
            src={"/services/dog-training.jpeg"}
            alt={"Dog Training"}
            fill={true}
            className="z-20 rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, 20rem"
          />
        </figure>
        <div className="flex grow flex-col gap-4">
          <h1 className="text-3xl font-bold">{t("dogTraining.title")}</h1>
          <h2 className="text-xl">{t("dogTraining.h1")}</h2>
          <ul className="list-inside list-disc">
            <li>{t("dogTraining.services.1")}</li>
            <li>{t("dogTraining.services.2")}</li>
            <li>{t("dogTraining.services.3")}</li>
            <li>{t("dogTraining.services.4")}</li>
          </ul>
          <h2 className="text-xl">{t("dogTraining.h2")}</h2>
          <div className="flex translate-x-2 flex-col gap-3 md:gap-4">
            <span className="flex justify-center gap-2 md:justify-start">
              <MapPin />
              <Link
                href="https://maps.app.goo.gl/JgZYeZmG7WiTfMWc7"
                className={buttonVariants({
                  variant: "link",
                  size: "link",
                })}
              >
                {t("dogTraining.address")}
              </Link>
            </span>
            <span className="flex justify-center gap-2 md:justify-start">
              <Phone />{" "}
              <Link
                href="tel:+393403617941"
                className={buttonVariants({
                  variant: "link",
                  size: "link",
                })}
              >
                {t("dogTraining.phone")}
              </Link>
            </span>
            <Image
              src={"/logos/enci-logo.png"}
              alt={"Enci logo"}
              width={150}
              height={150}
              className="block object-cover pt-4"  
            />
          </div>
        </div>
      </section>
    </main>
  );
}
