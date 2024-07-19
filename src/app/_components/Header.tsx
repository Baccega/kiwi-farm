import Image from "next/image";
import Link from "next/link";
import React from "react";
import BasketLink from "./BasketLink";
import MenuButton from "./MenuButton";

export default async function Header() {
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
          className="auto absolute bottom-0 left-0 z-20 w-40 translate-x-[-55%] translate-y-[87%] object-cover md:translate-x-[-45%]"
        />
        <Image
          src="/svgs/drappeggio4.svg"
          alt=""
          priority
          aria-hidden={true}
          width={160}
          height={160}
          className="auto absolute bottom-0 right-0 z-20 w-40 translate-x-[55%] translate-y-[87%] object-cover md:translate-x-[45%]"
        />
        <Link href="/" className="block text-xl font-bold tracking-tight">
          <Image
            src="/logo.svg"
            alt="logo"
            width={200}
            height={50}
            priority
            className="h-auto w-52"
          />
        </Link>
        <div className="flex items-center gap-0 @xs/header:gap-4 @4xl/header:flex-row-reverse md:gap-8">
          <BasketLink />
          <MenuButton />
        </div>
      </div>
    </header>
  );
}
