import {
  BriefcaseBusiness,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("Contacts.title"),
    description: t("Contacts.description"),
  };
}

export default async function Page(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);
  const t = await getTranslations("Contacts");

  return (
    <main className="container flex min-h-section flex-col gap-4 px-6 pb-10 pt-header md:px-16">
      <h1 className="pt-6 text-4xl font-bold">{t('title')}</h1>
      <h2 className="pt-6 text-xl">{t('description')}</h2>
      <div className="flex translate-x-2 flex-col gap-3 md:gap-4">
        <span className="flex justify-center gap-2 md:justify-start">
          <Facebook />
          <Link
            href="https://www.facebook.com/profile.php?id=100095173000490"
            className={buttonVariants({
              variant: "link",
              size: "link",
            })}
          >
            {t('facebook')}
          </Link>
        </span>
        <span className="flex justify-center gap-2 md:justify-start">
          <Instagram />
          <Link
            href="https://www.instagram.com/legiumelle/"
            className={buttonVariants({
              variant: "link",
              size: "link",
            })}
          >
            {t('instagram')}
          </Link>
        </span>
        <span className="flex justify-center gap-2 md:justify-start">
          <MapPin />
          <Link
            href="https://maps.app.goo.gl/JgZYeZmG7WiTfMWc7"
            className={buttonVariants({
              variant: "link",
              size: "link",
            })}
          >
            {t('address')}
          </Link>
        </span>
        <span className="flex justify-center gap-2 md:justify-start">
          <Mail />{" "}
          <Link
            href="mailto:info@legiumelle.it"
            className={buttonVariants({
              variant: "link",
              size: "link",
            })}
          >
            {t('email')}
          </Link>
        </span>
        <span className="flex justify-center gap-2 md:justify-start">
          <Phone />{" "}
          <Link
            href="tel:+393460586379"
            className={buttonVariants({
              variant: "link",
              size: "link",
            })}
          >
            {t('phone')}
          </Link>
        </span>
        <span className="flex justify-center gap-4 md:justify-start">
          <BriefcaseBusiness /> {t('piva')}
        </span>
      </div>
    </main>
  );
}
