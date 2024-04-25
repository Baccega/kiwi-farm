import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex h-fit flex-col">
      <section
        id="hero"
        className="min-h-section container relative flex h-full scroll-mt-[--header-height] items-center justify-center border-b text-center"
      >
        <h1 className="text-5xl">Gli Specialisti del Kiwi dal 1986</h1>
      </section>
      <section
        id="azienda"
        className="min-h-section container relative flex h-full scroll-mt-[--header-height] items-center justify-center border-b text-center"
      >
        <h1 className="text-5xl">Scopri la nostra azienda</h1>
      </section>
      <section
        id="prodotti"
        className="min-h-section container relative flex h-full scroll-mt-[--header-height] items-center justify-center border-b text-center"
      >
        In costruzione
      </section>
      <section
        id="spaccio"
        className="min-h-section container relative flex h-full scroll-mt-[--header-height] items-center justify-center scroll-smooth border-b text-center"
      >
        Spaccio
      </section>
      <section
        id="contatti"
        className="bg-primary-80 container relative flex h-full min-h-50 md:min-h-64 scroll-mt-[--header-height] flex-col items-center justify-between border-b py-4 text-center text-white md:flex-row gap-4"
      >
        <div className="flex flex-col justify-between gap-2 md:gap-6">
          <Image src="logo-white.svg" alt="logo" width={200} height={50} />
          <div className="flex items-center justify-center md:justify-start gap-1">
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
        <div className="flex flex-col gap-3 md:gap-4">
          <span className="flex justify-center md:justify-start gap-2">
            <MapPin />
            <span className="px-2">
              Via Restello 19, Villa del Conte, Italy
            </span>
          </span>
          <span className="flex justify-center md:justify-start gap-2">
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
          <span className="flex justify-center md:justify-start gap-2">
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
      </section>
    </main>
  );
}
