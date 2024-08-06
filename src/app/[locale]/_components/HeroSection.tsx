import { type VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";
import React, { type ReactNode } from "react";
import { CustomBorder } from "~/components/customBorder";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const heroSectionVariants = cva(
  "flex w-full flex-col gap-10 lg:justify-between",
  {
    variants: {
      variant: {
        default: "lg:flex-row-reverse",
        imgLeft: "lg:flex-row",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const heroSectionFigureVariants = cva("max-w-80 mx-auto lg:mx-0 bg-primary", {
  variants: {
    variant: {
      default: "lg:mr-auto",
      imgLeft: "lg:ml-auto",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface HeroSectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof heroSectionVariants> {
  id: string;
  title: string;
  description: ReactNode;
  ctaText: string;
  ctaHref: string;
  imgSrc: string;
  imgAlt: string;
  imgClassname?: string;
  className?: string;
}

export function HeroSection({
  id,
  title,
  description,
  ctaText,
  ctaHref,
  imgSrc,
  imgAlt,
  className,
  imgClassname,
  variant,
  ...rest
}: HeroSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "container relative flex h-full min-h-section scroll-mt-[--header-height] items-center justify-center scroll-smooth border-b py-24 text-center md:px-16",
        className,
      )}
      {...rest}
    >
      <div className={cn(heroSectionVariants({ variant, className }))}>
        <div className="flex flex-col items-center gap-10 lg:basis-3/5 lg:items-start">
          <div className="flex flex-col items-center gap-6 lg:items-start">
            <h2 className="text-5xl">{title}</h2>
            <p className="text-center text-xl text-primary-60 lg:text-left">
              {description}
            </p>
          </div>
          <Link
            href={ctaHref}
            className={cn(buttonVariants({ variant: "outline" }), "w-fit")}
          >
            {ctaText}
          </Link>
        </div>
        <div className="basis-1/3">
          <CustomBorder className={heroSectionFigureVariants({ variant })}>
            <AspectRatio ratio={1}>
              <Image
                src={imgSrc}
                alt={imgAlt}
                fill
                sizes="20rem"
                className={cn("rounded-lg object-cover", imgClassname)}
              />
            </AspectRatio>
          </CustomBorder>
        </div>
      </div>
    </section>
  );
}
