import Link from "next/link";
import React from "react";
import { buttonVariants } from "~/components/ui/button";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary-80">
      <div className="container flex flex-col items-center justify-between py-1 text-sm text-white md:flex-row md:px-16">
        <nav className="flex gap-4 md:-translate-x-4">
          <Link
            href="/privacy"
            className={buttonVariants({ variant: "link", inverted: true })}
          >
            Privacy
          </Link>
          <Link
            href="/cookies"
            className={buttonVariants({ variant: "link", inverted: true })}
          >
            Cookies
          </Link>
          <Link
            href="/credits"
            className={buttonVariants({ variant: "link", inverted: true })}
          >
            Credits
          </Link>
        </nav>
        <p className="">©{year} Società agricola Kiwi Farm S.S.</p>
      </div>
    </footer>
  );
}
