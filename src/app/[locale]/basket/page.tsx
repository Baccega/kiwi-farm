"use client";

import { Button } from "~/components/ui/button";
import { AlertContext, useBasketStore } from "../providers";
import { AlertCircle, Coins, Trash } from "lucide-react";
import BasketProduct from "./_components/BasketProduct";
import { useContext } from "react";
import { getFormattedPrice } from "~/lib/utils";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "~/components/ui/select";
import { AVAILABLE_COUNTRIES_ZONES, WEIGHT_LIMIT } from "~/lib/dhl";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { Combobox } from "~/components/ui/combobox";
import { AVAILABLE_HOME_DELIVERIES } from "~/lib/homeDelivery";
import { useShipping } from "./_hooks/useShipping";

export default function BasketPage(props: { params: { locale: string } }) {
  const t = useTranslations("Basket");
  const basket = useBasketStore((state) => state.basket);
  const shippingLocation = useBasketStore((state) => state.shippingLocation);
  const emptyBasket = useBasketStore((state) => state.emptyBasket);
  const setShippingLocation = useBasketStore(
    (state) => state.setShippingLocation,
  );
  const router = useRouter();

  const {
    isHomeDelivery,
    isDHLDelivery,
    shippingPrice,
    isOverTheWeightLimit,
    freeOver,
    shouldProbablyUseDHL,
  } = useShipping(basket, shippingLocation);

  const isBuyButtonDisabled =
    !Boolean(shippingLocation) || isOverTheWeightLimit;

  const taxable = basket?.reduce(
    (acc, { price, quantity }) => getFormattedPrice(price) * quantity + acc,
    0,
  );

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
    router.push(
      `/${props.params.locale}/checkout?shippingLocation=${shippingLocation}`,
    );
  }

  function handleShippingModeClick(
    mode: "pickup" | "homeDelivery" | "delivery",
  ) {
    setShippingLocation(
      mode === "pickup"
        ? "pickup"
        : mode === "homeDelivery"
          ? "Villa del Conte"
          : "IT",
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
              <h4 className="text-xl">{t("shippingMode")}</h4>
              <RadioGroup
                className="pb-2"
                defaultValue={
                  shippingLocation === undefined ||
                  shippingLocation === "pickup"
                    ? shippingLocation
                    : isHomeDelivery
                      ? "homeDelivery"
                      : "delivery"
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    onClick={() => handleShippingModeClick("pickup")}
                    value="pickup"
                    id="pickup"
                  />
                  <Label htmlFor="pickup" className="cursor-pointer">
                    {t("pickup")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    onClick={() => handleShippingModeClick("homeDelivery")}
                    value="homeDelivery"
                    id="homeDelivery"
                  />
                  <Label htmlFor="homeDelivery" className="cursor-pointer">
                    {t("homeDelivery")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    onClick={() => handleShippingModeClick("delivery")}
                    value="delivery"
                    id="delivery"
                  />
                  <Label htmlFor="delivery" className="cursor-pointer">
                    {t("delivery")}
                  </Label>
                </div>
              </RadioGroup>
              {shippingLocation && isDHLDelivery ? (
                <Combobox
                  defaultValue={
                    AVAILABLE_COUNTRIES_ZONES[shippingLocation]?.label ?? ""
                  }
                  onValueChange={handleShippingLocationChange}
                  label={t("country")}
                  placeholder={t("countryPlaceholder")}
                  searchPlaceholder={t("countrySearchPlaceholder")}
                  options={Object.entries(AVAILABLE_COUNTRIES_ZONES).map(
                    ([key, { label }]) => ({
                      key,
                      value: label,
                      label,
                    }),
                  )}
                />
              ) : null}
              {isHomeDelivery ? (
                <>
                  <Combobox
                    defaultValue={shippingLocation ?? ""}
                    onValueChange={handleShippingLocationChange}
                    label={t("comune")}
                    placeholder={t("comunePlaceholder")}
                    searchPlaceholder={t("comuneSearchPlaceholder")}
                    options={Object.entries(AVAILABLE_HOME_DELIVERIES).map(
                      ([key, { label }]) => ({
                        value: label,
                        key,
                        label,
                      }),
                    )}
                  />
                  {shouldProbablyUseDHL ? (
                    <Alert variant="default">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>{t("shouldProbablyUseDHLTitle")}</AlertTitle>
                      <AlertDescription>
                        {t("shouldProbablyUseDHLDescription")}
                      </AlertDescription>
                    </Alert>
                  ) : null}
                </>
              ) : null}
              {shippingLocation && (
                <>
                  <hr className="w-full max-w-96" />
                  <span className="flex w-full max-w-96 items-baseline justify-between gap-3">
                    <h4 className="text-xl">{t("taxable")}</h4>
                    <p className="text-lg font-bold">{taxable} €</p>
                  </span>
                  <span className="w-full">
                    <span className="flex w-full max-w-96 items-baseline justify-between gap-3">
                      <h4 className="text-xl">{t("shipping")}</h4>
                      <p className="text-lg font-bold">
                        {t("shippingPrice", { shippingPrice })}
                      </p>
                    </span>
                    {freeOver > 0 ? (
                      <h5 className="text-md text-primary-60">
                        {t("freeShippingOver", { freeOver })}
                      </h5>
                    ) : null}
                  </span>
                  <span className="flex w-full max-w-96 items-baseline justify-between gap-3">
                    <h3 className="text-3xl font-bold">{t("total")}</h3>
                    <p className="text-2xl font-bold">
                      {t("totalPrice", {
                        total: Number(taxable + shippingPrice).toFixed(2),
                      })}
                    </p>
                  </span>
                </>
              )}
            </div>

            {isDHLDelivery && isOverTheWeightLimit && (
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
