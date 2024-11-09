import Image from "next/image";
import Link from "next/link";
import React from "react";
import BasketLink from "./BasketLink";
import MenuButton from "./MenuButton";
import LanguageSwitcher from "./LanguageSwitcher";

export default async function Header(props: { locale: string }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-header border-b-2 border-b-primary bg-white text-primary">
      <div className="container relative flex items-center justify-between py-4 @container/header md:px-16">
        <Image
          src="/svgs/drappeggio4.svg"
          alt=""
          aria-hidden={true}
          width={160}
          height={160}
          priority
          className="absolute bottom-0 left-0 z-20 translate-x-[-55%] translate-y-[83%] scale-90 object-cover md:translate-x-[-45%] md:scale-100"
        />
        <Image
          src="/svgs/drappeggio4.svg"
          alt=""
          priority
          aria-hidden={true}
          width={160}
          height={160}
          className="absolute bottom-0 right-0 z-20 translate-x-[55%] translate-y-[83%] scale-90 object-cover md:translate-x-[45%] md:scale-100"
        />
        <Link
          href={`/${props.locale}`}
          className="block text-xl font-bold tracking-tight transition-transform hover:scale-105 active:scale-95"
        >
          <Image
            src="/logo.svg"
            alt="logo"
            width={200}
            height={50}
            priority
            className="h-auto w-52"
          />
        </Link>
        <div className="flex items-center gap-1 @md/header:gap-4 @4xl/header:flex-row-reverse md:gap-6">
          <BasketLink locale={props.locale} />
          <LanguageSwitcher locale={props.locale} />
          <MenuButton />
        </div>
      </div>
    </header>
  );
}
