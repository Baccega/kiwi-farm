"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Navigation } from "./Navigation";

export default function Header() {
  const [open, setOpen] = React.useState(false);

  function handleLinkClick() {
    setOpen(false);
  }

  return (
    <header className="h-header sticky top-0 z-50 border-b-2 border-b-primary bg-white text-primary">
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="@container/header container flex items-center justify-between py-4 md:px-16">
          <Image
            src="drappeggio2.svg"
            alt=""
            aria-hidden={true}
            width={180}
            height={350}
            className="absolute bottom-0 left-0 z-20 translate-x-[-45%] translate-y-[75%] object-cover"
          />
          <Image
            src="drappeggio2.svg"
            alt=""
            aria-hidden={true}
            width={180}
            height={350}
            className="absolute bottom-0 right-0 z-20 translate-x-[45%] translate-y-[75%] object-cover"
          />
          <Link href="/" className="block text-xl font-bold tracking-tight">
            <Image src="logo.svg" alt="logo" width={200} height={50} />
          </Link>
          <Navigation
            className="@2xl/header:flex hidden"
            onLinkClick={handleLinkClick}
          />
          <SheetTrigger className="@2xl/header:hidden">
            <Menu className="fill-primary" />
          </SheetTrigger>
          <SheetContent>
            <Navigation variant="vertical" onLinkClick={handleLinkClick} />
          </SheetContent>
        </div>
      </Sheet>
    </header>
  );
}
