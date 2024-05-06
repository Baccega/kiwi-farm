"use client";

import { Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Navigation } from "./Navigation";
import { Button, buttonVariants } from "~/components/ui/button";

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return {
    props: {
      open: isOpen,
      onOpenChange: setIsOpen,
    },
    trigger: () => setIsOpen(true),
    dismiss: () => setIsOpen(false),
  };
}

export default function Header() {
  const menuDialog = useDialog();

  function handleLinkClick() {
    menuDialog.dismiss();
  }

  return (
    <header className="sticky top-0 z-50 h-header border-b-2 border-b-primary bg-white text-primary">
      <div className="container relative flex items-center justify-between py-4 @container/header md:px-16">
        <Image
          src="drappeggio2.svg"
          alt=""
          aria-hidden={true}
          width={150}
          height={350}
          className="absolute bottom-0 left-0 z-20 translate-x-[-55%] translate-y-[85%] object-cover md:translate-x-[-45%]"
        />
        <Image
          src="drappeggio2.svg"
          alt=""
          aria-hidden={true}
          width={150}
          height={350}
          className="absolute bottom-0 right-0 z-20 translate-x-[55%] translate-y-[85%] object-cover md:translate-x-[45%]"
        />
        <Link href="/" className="block text-xl font-bold tracking-tight">
          <Image src="logo.svg" alt="logo" width={200} height={50} />
        </Link>
        <div className="flex items-center gap-0 @xs/header:gap-4 md:gap-8">
          <Navigation
            className="hidden @3xl/header:flex"
            onLinkClick={handleLinkClick}
          />

          <Link
            href="/basket"
            className={buttonVariants({ variant: "link", size: "icon" })}
          >
            <ShoppingCart className="fill-primary" />
          </Link>

          <Sheet {...menuDialog}>
            <SheetContent>
              <Navigation variant="vertical" onLinkClick={handleLinkClick} />
            </SheetContent>
            <SheetTrigger
              asChild
              onClick={menuDialog.trigger}
              className="@3xl/header:hidden"
            >
              <Button variant={"link"} size={"icon"}>
                <Menu className="fill-primary" />
              </Button>
            </SheetTrigger>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
