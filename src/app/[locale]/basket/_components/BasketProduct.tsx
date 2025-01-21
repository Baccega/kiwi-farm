"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import CdnImage from "~/components/cdnImage";
import ProductQuantityChanger from "~/components/productQuantityChanger";
import { getFormattedPrice } from "~/lib/utils";
import { type BasketProduct } from "~/types/Product";

export interface BasketProductProps
  extends React.HTMLAttributes<HTMLDivElement> {
  basketProduct: BasketProduct;
}

export default function BasketProduct(props: BasketProductProps) {
  const { basketProduct } = props;
  const { product, price, quantity } = basketProduct;
  const locale = useLocale();
  const t = useTranslations("Basket");

  return (
    <div className="min-h-36 gap-4 rounded-xl border-2 border-primary bg-accent shadow-lg @container/basket-product">
      <div className="grid-areas-basket-product-xs grid h-full w-full grid-cols-basket-product grid-rows-basket-product items-center gap-2 @xs/basket-product:grid-areas-basket-product-sm @md/basket-product:grid-areas-basket-product">
        <figure className="relative h-full min-h-32 min-w-32 rounded-lg rounded-b-none border-b-2 border-primary bg-primary grid-in-image @xs/basket-product:rounded-r-none @xs/basket-product:rounded-bl-lg @xs/basket-product:border-b-0 @xs/basket-product:border-r-2">
          <CdnImage
            src={
              product.metadata?.images?.split(",")?.[0] ?? "/placeholder.png"
            }
            className="rounded-lg rounded-b-none object-cover @xs/basket-product:rounded-r-none @xs/basket-product:rounded-bl-lg"
            fill
            sizes="8rem"
            alt={product.name}
          />
        </figure>
        <Link
          className="grid-in-name"
          href={`/${locale}/products/${product?.metadata?.slug ?? product.id}`}
        >
          <h3 className="pb-1 pl-2 pr-2 pt-2 text-lg font-bold hover:underline">
            {product.name}
          </h3>
        </Link>

        <p className="flex flex-row items-baseline gap-x-2 self-center pl-2 pr-2 text-lg font-bold grid-in-price @md/basket-product:flex-col-reverse @md/basket-product:self-end @md/basket-product:pb-4 @md/basket-product:pr-0">
          <span className="text-nowrap">
            {t("totalPrice", {
              total: Number(getFormattedPrice(price) * quantity).toFixed(2),
            })}
          </span>
          <span className="text-balance text-sm font-light tracking-wide">
            {t("pricePerUnit", {
              price: getFormattedPrice(price),
              unit: product.unit_label ?? "pz",
            })}
          </span>
        </p>
        <span className="flex items-center justify-start self-end pb-4 pl-2 pr-2 grid-in-quantity @md/basket-product:justify-end">
          <ProductQuantityChanger basketProduct={basketProduct} />
        </span>
      </div>
    </div>
  );
}
