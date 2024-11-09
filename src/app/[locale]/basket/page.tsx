"use client";

import { Button, buttonVariants } from "~/components/ui/button";
import { AlertContext, useBasketStore } from "../providers";
import { AlertCircle, Coins, Trash } from "lucide-react";
import BasketProduct from "./_components/BasketProduct";
import { useContext } from "react";
import Link from "next/link";
import { cn, getFormattedPrice } from "~/lib/utils";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
  SelectSeparator,
} from "~/components/ui/select";
import {
  AVAILABLE_COUNTRIES_ZONES,
  getShippingPrice,
  WEIGHT_LIMIT,
} from "~/lib/dhl";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { redirect } from "next/navigation";

export default function BasketPage(props: { params: { locale: string } }) {
  const t = useTranslations("Basket");
  const basket = useBasketStore((state) => state.basket);
  const shippingLocation = useBasketStore((state) => state.shippingLocation);
  const emptyBasket = useBasketStore((state) => state.emptyBasket);
  const setShippingLocation = useBasketStore(
    (state) => state.setShippingLocation,
  );

  const totalWeight = basket.reduce(
    (acc, { weight, quantity }) => Number(weight) * quantity + acc,
    0,
  );
  const isOverTheWeightLimit = totalWeight > WEIGHT_LIMIT;

  const isPickup = shippingLocation === "pickup";
  const shippingZone =
    !isPickup && AVAILABLE_COUNTRIES_ZONES[shippingLocation]?.zone;
  const shippingPrice = isPickup
    ? 0
    : Number(
        shippingZone &&
          getShippingPrice(totalWeight, shippingZone).price.toFixed(2),
      );

  const isBuyButtonDisabled = !isPickup && isOverTheWeightLimit;
  const { openAlert } = useContext(AlertContext) ?? {};

  function handleEmptyBasket() {
    if (!openAlert) return;
    openAlert({
      title: t("emptyCartAlertTitle"),
      description: t("emptyCartAlertDescription"),
      onConfirm: emptyBasket,
    });
  }

  function handleShippingLocationChange(value: string) {
    setShippingLocation(value);
  }

  function handleBuyButtonClick() {
    redirect(
      `/${props.params.locale}/checkout?shippingLocation=${shippingLocation}`,
    );
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

            <div className="flex flex-col items-baseline gap-3">
              <Select
                defaultValue={shippingLocation}
                onValueChange={handleShippingLocationChange}
              >
                <SelectTrigger className="w-96">
                  <SelectValue placeholder={t("shippingPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="pickup" value="pickup">
                    {t("pickup")}
                  </SelectItem>
                  <SelectSeparator />
                  {Object.entries(AVAILABLE_COUNTRIES_ZONES).map(
                    ([key, { label }]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
              <span className="flex w-full items-baseline justify-between gap-3 md:w-96">
                <h4 className="text-xl">{t("shipping")}</h4>
                <p className="text-lg font-bold">{shippingPrice} €</p>
              </span>
              <span className="flex w-full items-baseline justify-between gap-3 md:w-96">
                <h3 className="text-3xl font-bold">{t("total")}</h3>
                <p className="text-2xl font-bold">
                  {Number(
                    basket?.reduce(
                      (acc, { price, quantity }) =>
                        getFormattedPrice(price) * quantity + acc,
                      0,
                    ) + shippingPrice,
                  ).toFixed(2)}{" "}
                  €
                </p>
              </span>
            </div>

            {!isPickup && isOverTheWeightLimit && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t("weightLimitTitle")}</AlertTitle>
                <AlertDescription>
                  {t("weightLimitDescription", { weightLimit: WEIGHT_LIMIT })}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col gap-2 md:flex-row">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() =>
                      isBuyButtonDisabled ? null : handleBuyButtonClick()
                    }
                    variant={isBuyButtonDisabled ? "disabled" : "default"}
                    className="flex items-center gap-2"
                  >
                    <Coins /> {t("buyButton")}
                  </Button>
                </TooltipTrigger>
                {isBuyButtonDisabled ? (
                  <TooltipContent>
                    <p>
                      {t("disabledBuyButton", { weightLimit: WEIGHT_LIMIT })}
                    </p>
                  </TooltipContent>
                ) : null}
              </Tooltip>

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
