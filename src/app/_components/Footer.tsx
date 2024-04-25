import Link from "next/link";
import React from "react";
import { buttonVariants } from "~/components/ui/button";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary-80 container flex flex-col items-center justify-between py-1 text-white md:flex-row">
      <nav className="flex gap-4">
        <Link href="/privacy" className={buttonVariants({ variant: "ghost" })}>
          Privacy
        </Link>
        <Link href="/cookies" className={buttonVariants({ variant: "ghost" })}>
          Cookies
        </Link>
        <Link href="/credits" className={buttonVariants({ variant: "ghost" })}>
          Credits
        </Link>
      </nav>
      <p className="">©{year} Le Giumelle</p>
    </footer>
  );
}
