import Link from "next/link";
import React from "react";
import { buttonVariants } from "~/components/ui/button";
import { DrawerTrigger } from "~/components/ui/drawer";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary-80">
      <div className="container flex flex-col items-center justify-between gap-2 py-1 text-sm text-white md:flex-row md:px-16">
        <nav className="flex flex-col gap-x-2 md:-translate-x-4 md:flex-row">
          <Link
            href="/privacy"
            className={buttonVariants({
              variant: "link",
              inverted: true,
              size: "sm",
            })}
          >
            Privacy
          </Link>
          <DrawerTrigger
            className={buttonVariants({
              variant: "link",
              inverted: true,
              size: "sm",
            })}
          >
            Cookies
          </DrawerTrigger>
          <Link
            href="/terms-and-conditions"
            className={buttonVariants({
              variant: "link",
              inverted: true,
              size: "sm",
            })}
          >
            Termini e condizioni
          </Link>
          <Link
            href="/returns"
            className={buttonVariants({
              variant: "link",
              inverted: true,
              size: "sm",
            })}
          >
            Resi
          </Link>
        </nav>
        <p className="">©{year} Società agricola Kiwi Farm S.S.</p>
      </div>
    </footer>
  );
}
