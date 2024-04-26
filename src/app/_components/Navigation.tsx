import React from "react";
import Link from "next/link";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";

const navigationVariants = cva("flex gap-6", {
  variants: {
    variant: {
      default: "",
      vertical: "flex-col items-start",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface NavigationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navigationVariants> {
  onLinkClick?: () => void;
  className?: string;
}

export function Navigation(props: NavigationProps) {
  const { variant, onLinkClick, className, ...rest } = props;
  return (
    <nav className={cn(navigationVariants({ variant, className }))} {...rest}>
      <Link
        href="#azienda"
        className={cn(buttonVariants({ variant: "link" }), "text-xl")}
        onClick={onLinkClick}
      >
        Azienda
      </Link>
      <Link
        href="#prodotti"
        className={cn(buttonVariants({ variant: "link" }), "text-xl")}
        onClick={onLinkClick}
      >
        Prodotti
      </Link>
      <Link
        href="#spaccio"
        className={cn(buttonVariants({ variant: "link" }), "text-xl")}
        onClick={onLinkClick}
      >
        Spaccio
      </Link>
      <Link
        href="#contatti"
        className={cn(buttonVariants({ variant: "link" }), "text-xl")}
        onClick={onLinkClick}
      >
        Contatti
      </Link>
    </nav>
  );
}
