"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
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

  return (
    <div className="min-h-36 gap-4 rounded-xl border-2 border-primary bg-accent shadow-lg @container/basket-product">
      <div className="grid h-full w-full grid-cols-basket-product grid-rows-basket-product items-center gap-2 grid-areas-basket-product-sm @md/basket-product:grid-areas-basket-product">
        <figure className="relative h-full w-32 rounded-lg rounded-r-none border-r-2 border-primary bg-primary grid-in-image">
          <Image
            src={product?.images?.[0] ?? "/placeholder.png"}
            className="rounded-lg rounded-r-none object-cover"
            fill
            sizes="8rem"
            alt={""}
          />
        </figure>
        <Link href={`/${locale}/products/${product.id}`}>
          <h3 className="text-lg font-bold grid-in-name hover:underline">
            {product.name}
          </h3>
        </Link>

        <p className="flex flex-row items-baseline gap-x-2 self-center pb-4 text-lg font-bold grid-in-price @md/basket-product:flex-col-reverse @md/basket-product:self-end">
          {Number(getFormattedPrice(price) * quantity).toFixed(2)} €
          <span className="text-sm font-light tracking-wide">
            {getFormattedPrice(price)} € / {product.unit_label ?? "pz"}
          </span>
        </p>
        <span className="flex items-center justify-start gap-2 self-end pb-4 pr-2 grid-in-quantity @md/basket-product:justify-end">
          <ProductQuantityChanger basketProduct={basketProduct} />
        </span>
      </div>
    </div>
  );
}
