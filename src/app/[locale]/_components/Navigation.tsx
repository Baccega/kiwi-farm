import React from "react";
import Link from "next/link";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";

const navigationVariants = cva("flex", {
  variants: {
    variant: {
      default: "gap-2 translate-x-4",
      vertical: "gap-6 flex-col items-start",
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
  locale: string;
}

export function Navigation(props: NavigationProps) {
  const { variant, onLinkClick, className, ...rest } = props;
  return (
    <nav className={cn(navigationVariants({ variant, className }))} {...rest}>
      <Link
        href={`/${props.locale}/#azienda`}
        className={cn(buttonVariants({ variant: "link" }), "text-xl")}
        onClick={onLinkClick}
      >
        Azienda
      </Link>
      <Link
        href={`/${props.locale}/#prodotti`}
        className={cn(buttonVariants({ variant: "link" }), "text-xl")}
        onClick={onLinkClick}
      >
        Prodotti
      </Link>
      <Link
        href={`/${props.locale}/#servizi`}
        className={cn(buttonVariants({ variant: "link" }), "text-xl")}
        onClick={onLinkClick}
      >
        Servizi
      </Link>
      <Link
        href={`/${props.locale}/contacts`}
        className={cn(buttonVariants({ variant: "link" }), "text-xl")}
        onClick={onLinkClick}
      >
        Contatti
      </Link>
    </nav>
  );
}
