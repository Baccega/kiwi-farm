import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="h-header container sticky top-0 z-50 flex items-center justify-between border-2 border-b-primary bg-white py-4">
      <Link
        href="/"
        className="block text-2xl font-bold tracking-tight text-primary text-xl"
      >
        <Image src="logo.svg" alt="logo" width={200} height={50} />
      </Link>
      <nav className="flex gap-6">
        <Link href="#azienda" className="text-primary text-xl">
          Azienda
        </Link>
        <Link href="#prodotti" className="text-primary text-xl">
          Prodotti
        </Link>
        <Link href="#spaccio" className="text-primary text-xl">
          Spaccio
        </Link>
        <Link href="#contatti" className="text-primary text-xl">
          Contatti
        </Link>
      </nav>
    </header>
  );
}
