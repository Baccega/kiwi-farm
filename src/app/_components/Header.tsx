"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

function Navigation(props: { onLinkClick?: () => void }) {
  return (
    <nav className="flex flex-col gap-6">
      <Link
        href="#azienda"
        className="text-xl text-primary"
        onClick={props.onLinkClick}
      >
        Azienda
      </Link>
      <Link
        href="#prodotti"
        className="text-xl text-primary"
        onClick={props.onLinkClick}
      >
        Prodotti
      </Link>
      <Link
        href="#spaccio"
        className="text-xl text-primary"
        onClick={props.onLinkClick}
      >
        Spaccio
      </Link>
      <Link
        href="#contatti"
        className="text-xl text-primary"
        onClick={props.onLinkClick}
      >
        Contatti
      </Link>
    </nav>
  );
}

export default function Header() {
  const [open, setOpen] = React.useState(false);

  function handleLinkClick() {
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <header className="h-header sticky top-0 z-50 border-b-2 border-b-primary bg-white">
        <div className="container flex items-center justify-between py-4">
          <Link
            href="/"
            className="block text-xl font-bold tracking-tight text-primary"
          >
            <Image src="logo.svg" alt="logo" width={200} height={50} />
          </Link>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <Navigation onLinkClick={handleLinkClick} />
          </SheetContent>
        </div>
      </header>
    </Sheet>
  );
}
