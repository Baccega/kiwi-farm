"use client";

import { Button, buttonVariants } from "~/components/ui/button";
import { AlertContext, useBasketStore } from "../providers";
import { Coins, Trash } from "lucide-react";
import BasketProduct from "./_components/BasketProduct";
import { useContext } from "react";
import Link from "next/link";
import { cn, getFormattedPrice } from "~/lib/utils";
import { useTranslations } from "next-intl";

export default function BasketPage() {
  const t = useTranslations("Basket");
  const basket = useBasketStore((state) => state.basket);
  const emptyBasket = useBasketStore((state) => state.emptyBasket);

  const { openAlert } = useContext(AlertContext) ?? {};

  function handleEmptyBasket() {
    if (!openAlert) return;
    openAlert({
      title: t("emptyCartAlertTitle"),
      description: t("emptyCartAlertDescription"),
      onConfirm: emptyBasket,
    });
  }

  return (
    <main className="pt-header text-primary-80">
      <section
        id="basket"
        className="container relative flex h-full min-h-section scroll-mt-[--header-height] flex-col gap-8 py-8 md:px-16"
      >
        <span>
          <h1 className="text-5xl">{t("title")}</h1>
          <h2 className="pl-1 text-xl">
            {t("youHaveXProducts", { products: basket?.length ?? 0 })}
          </h2>
        </span>

        {basket?.length !== 0 ? (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {basket?.map((product) => (
                <BasketProduct basketProduct={product} key={product.id} />
              ))}
            </div>

            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl">{t("total")}</h3>
              <p className="text-2xl font-bold">
                {Number(
                  basket?.reduce(
                    (acc, { price, quantity }) =>
                      getFormattedPrice(price) * quantity + acc,
                    0,
                  ),
                ).toFixed(2)}{" "}
                €
              </p>
            </div>

            <div className="flex flex-col gap-2 md:flex-row">
              <Link
                href="/checkout"
                className={cn(buttonVariants(), "flex items-center gap-2")}
              >
                <Coins /> {t("buyButton")}
              </Link>
              <Button
                className="flex items-center gap-2"
                variant={"outline"}
                onClick={handleEmptyBasket}
              >
                <Trash /> {t("emptyButton")}
              </Button>
            </div>
          </>
        ) : null}
      </section>
    </main>
  );
}
