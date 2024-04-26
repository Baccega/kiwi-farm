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
    <Sheet open={open} onOpenChange={setOpen}>
      <header className="h-header sticky top-0 z-50 border-b-2 border-b-primary bg-white">
        <div className="container flex items-center justify-between py-4">
          <Link
            href="/"
            className="block text-xl font-bold tracking-tight text-primary"
          >
            <Image src="logo.svg" alt="logo" width={200} height={50} />
          </Link>
          {/* <Navigation onLinkClick={handleLinkClick} /> */}
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <Navigation variant="vertical" onLinkClick={handleLinkClick} />
          </SheetContent>
        </div>
      </header>
    </Sheet>
  );
}
