import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type Stripe from "stripe";
import { CustomBorder } from "~/components/customBorder";
import CdnImage from "~/components/cdnImage";
import { getTranslations } from "next-intl/server";
import { cn, getFormattedPrice } from "~/lib/utils";

const productImageVariants = cva("z-20 rounded-lg object-cover", {
  variants: {
    variant: {
      default: "",
      outOfStock: "grayscale",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ProductProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof productImageVariants> {
  href: string;
  product: Stripe.Product;
}

const Product = React.forwardRef<HTMLAnchorElement, ProductProps>(
  async ({ className, variant, href, product, ...props }, ref) => {
    const t = await getTranslations("Products");
    const isOutOfStock = variant === "outOfStock";

    if (!product.default_price || typeof product.default_price === "string")
      return null;

    return (
      <Link ref={ref} href={href} scroll={false} {...props}>
        <CustomBorder className="intersect-once relative flex h-product w-product cursor-pointer items-end border-primary bg-primary-80 text-white transition-all intersect:motion-preset-expand hover:scale-105 hover:shadow-2xl active:scale-95 active:shadow-inner">
          {product.metadata?.images?.split(",")[0] !== null ? (
            <CdnImage
              src={
                product.metadata?.images?.split(",")?.[0] ?? "/placeholder.png"
              }
              sizes="20rem"
              fill={true}
              alt={product.name ?? ""}
              className={cn(productImageVariants({ variant }), className)}
            />
          ) : null}
          <span className="h-15 z-30 flex w-full items-center justify-between rounded-b-lg border-t-2 border-primary bg-primary-80 p-4 shadow-top">
            <h2 className="text-balance">{product.name}</h2>
            {isOutOfStock ? (
              <p>{t("outOfStock")}</p>
            ) : (
              <p className="text-nowrap">
                {product.default_price
                  ? t("pricePerUnitShort", {
                      price: getFormattedPrice(product.default_price),
                      unit: product.unit_label ?? "pz",
                    })
                  : null}
              </p>
            )}
          </span>
        </CustomBorder>
      </Link>
    );
  },
);
Product.displayName = "Product";

export { Product, productImageVariants };
