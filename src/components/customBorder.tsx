import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";
import Image from "next/image";

const customBorderVariants = cva(
  "relative rounded-xl after:border-sketchy before:border-sketchy",
  {
    variants: {
      variant: {
        default: "border-primary",
        bees: "",
      },
      // all around, only bottom, only top, only left, only right
      size: {
        default:
          "border-[3px] after:scale-105 before:scale-105 after:rotate-[-1deg] before:rotate-[1deg] after:rounded-sketchy before:rounded-sketchy",
        big: "border-2 after:scale-[1.01] before:scale-[1.01] after:rotate-[-0.5deg] before:rotate-[0.5deg] after:rounded-sketchy-big before:rounded-sketchy-big",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface CustomBorderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof customBorderVariants> {
  withDecoration?: boolean;
}

const flowers = ["fiore1.svg", "fiore2.svg", "fiore3.svg", "fiore4.svg"];

const TOP_LEFT = "-top-6 -left-5";
// const TOP_RIGHT = "-top-7 -right-5";
// const BOTTOM_LEFT = "-bottom-7 -left-5";
const BOTTOM_RIGHT = "-bottom-7 -right-6";

const CustomBorder = React.forwardRef<HTMLDivElement, CustomBorderProps>(
  (
    { className, variant, size, withDecoration = true, children, ...props },
    ref,
  ) => {
    const svgs = [
      {
        src: flowers[2],
        position: TOP_LEFT,
        size: 35,
        random: `translate-y-10`,
      },
      {
        src: flowers[2],
        position: TOP_LEFT,
        size: 40,
        random: ``,
      },
      {
        src: flowers[2],
        position: TOP_LEFT,
        size: 30,
        random: `translate-x-10`,
      },
      {
        src: flowers[2],
        position: BOTTOM_RIGHT,
        size: 30,
        random: `-translate-y-10`,
      },
      {
        src: flowers[2],
        position: BOTTOM_RIGHT,
        size: 35,
        random: ``,
      },
      {
        src: flowers[2],
        position: BOTTOM_RIGHT,
        size: 30,
        random: `-translate-x-10`,
      },
    ] as const;

    return (
      <div
        className={cn(customBorderVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {withDecoration
          ? svgs.map(({ src, position, random, size }, i) => (
              <Image
                src={`/svgs/${src}`}
                className={cn(`absolute z-40`, random, position)}
                width={size}
                height={size}
                alt=""
                aria-hidden={true}
                key={i}
              />
            ))
          : null}
        {children}
      </div>
    );
  },
);
CustomBorder.displayName = "CustomBorder";

export { CustomBorder, customBorderVariants };
