import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { HeroSection } from "./_components/HeroSection";

export default function HomePage() {
  return (
    <main className="text-primary-80 flex h-fit flex-col">
      <section
        id="hero"
        className="min-h-section container relative flex h-full scroll-mt-[--header-height] items-center justify-center border-b py-24 text-center md:px-16"
      >
        <Image
          src="/kiwi.jpg"
          aria-hidden="true"
          className="-z-10 object-cover opacity-20 grayscale"
          alt=""
          fill
        />
        <div className="flex flex-col items-center gap-14">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-5xl">Gli Specialisti del Kiwi dal 1986</h1>
            <p className="text-primary-60 text-xl">
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
            curiamo e coltiviamo da almeno sei generazionsi. <br />
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
        className="min-h-section container relative flex h-full scroll-mt-[--header-height] items-center justify-center border-b py-24 text-center md:px-16"
      >
        In costruzione
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
        id="contatti"
        className="bg-primary-80 min-h-50 scroll-mt-[--header-height] border-b"
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
          </div>
        </div>
      </section>
    </main>
  );
}
