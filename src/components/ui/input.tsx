import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils";

const inputVariants = cva("", {
  variants: {
    variant: {
      default:
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      unstyled: "w-full h-full px-3 focus:outline-primary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & VariantProps<typeof inputVariants>
>(({ className, type, variant, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    role="input"
    className={cn(inputVariants({ variant }), className)}
    {...props}
  />
));

Input.displayName = "Input";

export { Input };
