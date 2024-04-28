import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function HomePage() {
  return (
    <main className="text-primary-80 flex h-fit flex-col">
      <section
        id="hero"
        className="min-h-section container relative flex h-full scroll-mt-[--header-height] items-center justify-center border-b py-24 text-center"
      >
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
      <section
        id="azienda"
        className="min-h-section container relative flex h-full scroll-mt-[--header-height] items-center justify-center border-b py-24 text-center"
      >
        <div className="flex w-full flex-col gap-10 lg:flex-row-reverse lg:justify-between">
          <div className="flex flex-col items-center gap-6 lg:basis-3/5 lg:items-start">
            <h1 className="text-5xl">La Nostra Azienda</h1>
            <p className="text-primary-60 text-center text-xl lg:text-left">
              Siamo una famiglia un legame profondo con il nostro territorio,
              che curiamo e coltiviamo da almeno sei generazionsi. <br />
              Dal 1986 i Kiwi sono la nostra coltivazione principale e il nostro
              orgoglio
            </p>
          </div>
          <div className="basis-1/3">
            <figure className="relative mx-auto max-w-80 overflow-hidden rounded-xl border-8 border-primary bg-primary">
              <AspectRatio ratio={1}>
                <Image
                  src="/enea.jpg"
                  alt="Foto famiglia"
                  fill
                  objectFit="cover"
                  className="rounded-lg"
                />
              </AspectRatio>
            </figure>
          </div>
        </div>
      </section>
      <section
        id="prodotti"
        className="min-h-section container relative flex h-full scroll-mt-[--header-height] items-center justify-center border-b py-24 text-center"
      >
        In costruzione
      </section>
      <section
        id="spaccio"
        className="min-h-section container relative flex h-full scroll-mt-[--header-height] items-center justify-center scroll-smooth border-b py-24 text-center"
      >
        <div className="flex w-full flex-col gap-10 lg:flex-row-reverse lg:justify-between">
          <div className="flex flex-col items-center gap-10 lg:basis-3/5 lg:items-start">
            <div className="flex flex-col items-center gap-6 lg:items-start">
              <h1 className="text-5xl">Il Nostro Spaccio</h1>
              <p className="text-primary-60 text-center text-xl lg:text-left">
                Venite a trovarci nel nostro spaccio aziendale, dove potrete
                trovare e gustare tutti i nostri prodotti
              </p>
            </div>
            <Link
              href="#contatti"
              className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
            >
              Vieni a trovarci
            </Link>
          </div>
          <div className="basis-1/3">
            <figure className="relative mx-auto max-w-80 overflow-hidden rounded-xl border-8 border-primary bg-primary">
              <AspectRatio ratio={1}>
                <Image
                  src="/spaccio.jpg"
                  alt="Foto spaccio"
                  fill
                  objectFit="fill"
                  className="rounded-lg"
                />
              </AspectRatio>
            </figure>
          </div>
        </div>
      </section>
      <section
        id="contatti"
        className="bg-primary-80 min-h-50 scroll-mt-[--header-height] border-b"
      >
        <div className="container relative flex h-full flex-col items-center justify-between gap-6 py-6 text-center text-white md:min-h-64 md:flex-row md:gap-4">
          <div className="flex flex-col justify-between gap-2 md:gap-6 ">
            <Image src="logo-white.svg" alt="logo" width={200} height={50} />
            <div className="flex items-center  justify-center gap-1 md:-translate-x-2 md:justify-start">
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
                href="mailto:soc.agr.kiwifarm@gmail.com"
                className={buttonVariants({
                  variant: "link",
                  inverted: true,
                  size: "link",
                })}
              >
                soc.agr.kiwifarm@gmail.com
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
