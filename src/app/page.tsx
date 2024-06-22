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

const SERVICES = [
  {
    id: "dog-training",
    image: "/kiwi.jpg",
    name: "Addestramento cani",
  },
  {
    id: "self-picking",
    image: "/kiwi.jpg",
    name: "Autoraccolta",
  },
];

export default function HomePage() {
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
            <h1 className="text-5xl">Gli Specialisti del Kiwi dal 1986</h1>
            <p className="text-xl text-primary-60">
              Una azienda agricola a conduzione familiare
            </p>
          </div>
          <div className="flex flex-col gap-4 md:flex-row ">
            <Link href="#prodotti" className={cn(buttonVariants(), "w-fit")}>
              Acquista i nostri prodotti
            </Link>
            <Link
              href="#azienda"
              className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
            >
              Scopri la nostra azienda
            </Link>
          </div>
        </div>
      </section>
      <HeroSection
        id="azienda"
        title="La Nostra Azienda"
        description={
          <>
            Siamo una famiglia un legame profondo con il nostro territorio, che
            curiamo e coltiviamo da almeno sei generazioni. <br />
            Dal 1986 i Kiwi sono la nostra coltivazione principale e il nostro
            orgoglio
          </>
        }
        imgSrc="/enea.jpg"
        imgAlt="Foto famiglia"
        ctaText="Vieni a trovarci"
        ctaHref="#contatti"
      />
      <section
        id="prodotti"
        className="container relative flex h-full min-h-section scroll-mt-[--header-height] items-center justify-center border-b py-24 text-center md:px-16"
      >
        <div className="grid grid-cols-[repeat(auto-fill,var(--product-width))] gap-10">
          <h2 className="col-span-full text-5xl">I Nostri Prodotti</h2>
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
            <ProductList />
          </Suspense>
        </div>
      </section>
      <section
        id="prodotti"
        className="container relative flex h-full min-h-section scroll-mt-[--header-height] items-center justify-center border-b py-24 text-center md:px-16"
      >
        <div className="grid grid-cols-[repeat(auto-fill,var(--product-width))] gap-10">
          <h2 className="col-span-full text-5xl">I Nostri Servizi</h2>
          {SERVICES.map((service) => (
            <Link
              href={`/services/${service.id}`}
              scroll={false}
              key={service.id}
            >
              <CustomBorder className="relative flex h-product w-product cursor-pointer items-end bg-primary-80 text-white transition-transform hover:scale-105">
                {service.image !== null ? (
                  <Image
                    src={service.image ?? "placeholder.png"}
                    fill={true}
                    alt={service.name ?? ""}
                    className="z-20 rounded-lg object-cover"
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

      <HeroSection
        variant="imgLeft"
        id="spaccio"
        description="Il Nostro Spaccio"
        imgSrc="/spaccio.jpg"
        imgAlt="Foto spaccio"
        imgClassname="object-right"
        title="Il Nostro Spaccio"
        ctaText="Vieni a trovarci"
        ctaHref="#contatti"
      />

      <section
        id="faq"
        className="container relative flex h-full min-h-section scroll-mt-[--header-height] flex-col items-center justify-center border-b py-24 text-center md:px-16"
      >
        <h2 className="pb-4 text-5xl">Domande frequenti</h2>
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
                Via Restello 19, Villa del Conte, Italy
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
                info@legiumelle.it
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
                +39 346 058 6379
              </Link>
            </span>
            <span className="flex justify-center gap-4 md:justify-start">
              <BriefcaseBusiness /> P.IVA 04682830288
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
