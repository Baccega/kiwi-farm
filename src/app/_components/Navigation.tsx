import React from "react";
import Link from "next/link";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "~/lib/utils";

const navigationVariants = cva("flex gap-6", {
  variants: {
    variant: {
      default: "",
      vertical: "flex-col",
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
        className="text-xl text-primary"
        onClick={onLinkClick}
      >
        Azienda
      </Link>
      <Link
        href="#prodotti"
        className="text-xl text-primary"
        onClick={onLinkClick}
      >
        Prodotti
      </Link>
      <Link
        href="#spaccio"
        className="text-xl text-primary"
        onClick={onLinkClick}
      >
        Spaccio
      </Link>
      <Link
        href="#contatti"
        className="text-xl text-primary"
        onClick={onLinkClick}
      >
        Contatti
      </Link>
    </nav>
  );
}
