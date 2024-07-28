"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "~/components/ui/button";
import { useBasketStore } from "../providers";

export default function BasketLink() {
  const pathname = usePathname();
  const basket = useBasketStore((state) => state.basket);

  return (
    <Link
      href="/basket"
      className={buttonVariants({
        variant: "ghost",
        size: "icon",
        active: pathname === "/basket",
      })}
    >
      <ShoppingCart className="fill-primary" />
      {basket?.length ? (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-40 text-xs text-primary-foreground">
          {basket.length}
        </span>
      ) : null}
    </Link>
  );
}
