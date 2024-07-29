import {
  BriefcaseBusiness,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { HeroSection } from "./_components/HeroSection";
import ProductList from "./_components/ProductList";
import { Suspense } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { CustomBorder } from "~/components/customBorder";
import Faq from "./_components/Faq";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export default async function HomePage(props: { params: { locale: string } }) {
  unstable_setRequestLocale(props.params.locale);
  const t = await getTranslations();

  const SERVICES = [
    {
      id: "dog-training",
      image: "/anakin.jpg",
      name: t("Services.dogTraining.title"),
    },
    {
      id: "self-picking",
      image: "/self-picking.jpg",
      name: t("Services.selfPicking.title"),
    },
    {
      id: "farmers-market",
      image: "/spaccio.jpg",
      name: t("Services.farmersMarket.title"),
      imgClassname: "object-right",
    },
  ];

  return (
    <main className="flex h-fit flex-col overflow-x-hidden pt-header text-primary-80">
      <section
        id="hero"
        className="container relative flex h-full min-h-section scroll-mt-[--header-height] items-center justify-center border-b py-24 text-center md:px-16"
      >
        <CustomBorder
          size={"big"}
          withDecoration={false}
          // decorationPositions={[BOTTOM_LEFT, BOTTOM_RIGHT]}
          className="absolute bottom-0 top-0 h-full w-full border-t-0 before:border-t-0 after:border-t-0 md:px-4 md:pb-4"
        >
          <Image
            src="/kiwi2.jpg"
            aria-hidden="true"
            className="-z-10 block object-cover opacity-30 grayscale"
            alt=""
            fill
          />
        </CustomBorder>
        <div className="z-30 flex flex-col items-center gap-14">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-5xl">{t("HomePage.title")}</h1>
            <p className="text-xl text-primary-60">{t("HomePage.subtitle")}</p>
          </div>
          <div className="flex flex-col gap-4 md:flex-row ">
            <Link href="#prodotti" className={cn(buttonVariants(), "w-fit")}>
              {t("HomePage.buyOurProducts")}
            </Link>
            <Link
              href="#azienda"
              className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
            >
              {t("HomePage.discoverOurBusiness")}
            </Link>
          </div>
        </div>
      </section>
      <HeroSection
        id="azienda"
        title={t("HomePage.business")}
        description={<>{t("HomePage.businessDescription")}</>}
        imgSrc="/enea.jpg"
        imgAlt={t("HomePage.businessAlt")}
        ctaText={t("HomePage.businessCta")}
        ctaHref="/contacts"
      />
      <section
        id="prodotti"
        className="container relative flex h-full min-h-section scroll-mt-[--header-height] items-center justify-center border-b py-24 text-center md:px-16"
      >
        <div className="grid grid-cols-[repeat(auto-fill,var(--product-width))] gap-10">
          <h2 className="col-span-full text-5xl">
            {t("HomePage.productsTitle")}
          </h2>
          <Suspense
            fallback={[1, 2, 3, 4, 5, 6].map((id) => (
              <div key={id} className="flex flex-col space-y-3">
                <Skeleton className="h-product w-product rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-product" />
                  <Skeleton className="h-4 w-product" />
                </div>
              </div>
            ))}
          >
            <ProductList locale={props.params.locale} />
          </Suspense>
        </div>
      </section>
      <section
        id="servizi"
        className="container relative flex h-full min-h-section scroll-mt-[--header-height] items-center justify-center border-b py-24 text-center md:px-16"
      >
        <div className="grid grid-cols-[repeat(auto-fill,var(--product-width))] gap-10">
          <h2 className="col-span-full text-5xl">
            {t("HomePage.servicesTitle")}
          </h2>
          {SERVICES.map((service) => (
            <Link
              href={`/${props.params.locale}/services/${service.id}`}
              scroll={false}
              key={service.id}
            >
              <CustomBorder className="relative flex h-product w-product cursor-pointer items-end bg-primary-80 text-white transition-transform hover:scale-105">
                {service.image !== null ? (
                  <Image
                    src={service.image ?? "/placeholder.png"}
                    fill={true}
                    unoptimized
                    alt={service.name ?? ""}
                    className={cn(
                      "z-20 rounded-lg object-cover",
                      service.imgClassname,
                    )}
                  />
                ) : null}
                <span className="h-15 z-30 flex w-full justify-between rounded-lg bg-primary-80 p-4">
                  <h2>{service.name}</h2>
                </span>
              </CustomBorder>
            </Link>
          ))}
        </div>
      </section>

      <section
        id="faq"
        className="container relative flex h-full min-h-section scroll-mt-[--header-height] flex-col items-center justify-center border-b py-24 text-center md:px-16"
      >
        <h2 className="pb-6 text-5xl">{t("HomePage.FaqTitle")}</h2>
        <Faq />
      </section>

      <section
        id="contatti"
        className="min-h-50 scroll-mt-[--header-height] border-b bg-primary-80"
      >
        <div className="container relative flex h-full flex-col items-center justify-between gap-6 py-6 text-center text-white md:min-h-64 md:flex-row md:gap-4 md:px-16">
          <div className="flex flex-col justify-between gap-2 md:gap-6 ">
            <Image src="logo-white.svg" alt="logo" width={200} height={50} />
            <div className="flex items-center justify-center gap-1 md:-translate-x-2 md:justify-start">
              {" "}
              <Link
                href="https://www.instagram.com/legiumelle/"
                className={buttonVariants({
                  variant: "ghost",
                  inverted: true,
                  size: "icon",
                })}
              >
                <Instagram />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=100095173000490"
                className={buttonVariants({
                  variant: "ghost",
                  inverted: true,
                  size: "icon",
                })}
              >
                <Facebook />
              </Link>
            </div>
          </div>
          <div className="flex translate-x-2 flex-col gap-3 md:gap-4">
            <span className="flex justify-center gap-2 md:justify-start">
              <MapPin />
              <Link
                href="https://maps.app.goo.gl/JgZYeZmG7WiTfMWc7"
                className={buttonVariants({
                  variant: "link",
                  inverted: true,
                  size: "link",
                })}
              >
                {t("Contacts.address")}
              </Link>
            </span>
            <span className="flex justify-center gap-2 md:justify-start">
              <Mail />{" "}
              <Link
                href="mailto:info@legiumelle.it"
                className={buttonVariants({
                  variant: "link",
                  inverted: true,
                  size: "link",
                })}
              >
                {t("Contacts.email")}
              </Link>
            </span>
            <span className="flex justify-center gap-2 md:justify-start">
              <Phone />{" "}
              <Link
                href="tel:+393460586379"
                className={buttonVariants({
                  variant: "link",
                  inverted: true,
                  size: "link",
                })}
              >
                {t("Contacts.phone")}
              </Link>
            </span>
            <span className="flex justify-center gap-4 md:justify-start">
              <BriefcaseBusiness /> {t("Contacts.piva")}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
