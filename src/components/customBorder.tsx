import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";
import Image from "next/image";
import { getRandomCustomBorder } from "~/resources/customBordersList";

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
  decorationPositions?: string[];
}

const CustomBorder = React.forwardRef<HTMLDivElement, CustomBorderProps>(
  (
    {
      className,
      variant,
      size,
      withDecoration = true,
      decorationPositions,
      children,
      ...props
    },
    ref,
  ) => {
    const randomBorder = getRandomCustomBorder(decorationPositions);

    return (
      <div
        className={cn(customBorderVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {withDecoration
          ? randomBorder.map(({ src, position, size }, i) => (
              <Image
                src={`/svgs/${src}`}
                className={cn(`absolute z-40`, position)}
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
