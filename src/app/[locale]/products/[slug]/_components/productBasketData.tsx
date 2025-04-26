"use client";
import { ShoppingCart, ShoppingBasket } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import type Stripe from "stripe";
import { useBasketStore } from "~/app/[locale]/providers";
import ProductQuantityChanger from "~/components/productQuantityChanger";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn, getFormattedPrice } from "~/lib/utils";

export function ProductBasketData(props: {
  product: Stripe.Product;
  price: Stripe.Price;
}) {
  const { product, price } = props;
  const t = useTranslations("Products");
  const locale = useLocale();
  const basket = useBasketStore((state) => state.basket);
  const outOfStock = product.metadata?.enabled === "false";

  const addProductToBasket = useBasketStore(
    (state) => state.addProductToBasket,
  );

  const basketProduct = basket.find(
    (basketProduct) => basketProduct.product.id === product.id,
  );

  if (outOfStock) {
    return <p className="text-bold text-2xl">{t("outOfStockLong")}</p>;
  }

  return (
    <div
      itemProp="offers"
      itemType="https://schema.org/AggregateOffer"
      itemScope
      className="grid-in-price"
    >
      <meta itemProp="priceCurrency" content="EUR" />
      <meta
        itemProp="lowPrice"
        content={`${getFormattedPrice(price).toFixed(2)}`}
      />
      <meta
        itemProp="highPrice"
        content={`${(getFormattedPrice(price) * 1.1).toFixed(2)}`}
      />
      <meta itemProp="offerCount" content="10" />
      {basketProduct ? (
        <div className="">
          <p className="flex flex-row items-baseline gap-x-2 self-center pb-4 text-lg font-bold grid-in-price @md/basket-product:flex-col-reverse @md/basket-product:self-end">
            {t("totalPrice", {
              total: Number(
                getFormattedPrice(price) * basketProduct.quantity,
              ).toFixed(2),
            })}
            <span className="text-sm font-light tracking-wide">
              {t("pricePerUnit", {
                price: getFormattedPrice(price),
                unit: product.unit_label ?? "pz",
              })}
            </span>
          </p>
          <ProductQuantityChanger basketProduct={basketProduct} />
          <Link
            href={`/${locale}/basket`}
            className={cn(
              buttonVariants(),
              "mt-4 flex w-fit items-center gap-2",
            )}
          >
            <ShoppingCart /> {t("proceedToBasket")}
          </Link>
        </div>
      ) : (
        <>
          <p className="flex flex-row items-baseline gap-x-2 self-center pb-4 text-lg font-bold grid-in-price @md/basket-product:flex-col-reverse @md/basket-product:self-end">
            {t("pricePerUnit", {
              price: getFormattedPrice(price),
              unit: product.unit_label ?? "pz",
            })}
          </p>
          <Button
            variant={"default"}
            className="gap-2"
            onClick={() => addProductToBasket(product, price)}
          >
            <ShoppingBasket />
            {t("addProductToBasket")}
          </Button>
        </>
      )}
    </div>
  );
}
