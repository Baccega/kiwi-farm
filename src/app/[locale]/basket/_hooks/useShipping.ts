import {
  AVAILABLE_COUNTRIES_ZONES,
  getDHLShippingPrice,
  WEIGHT_LIMIT,
} from "~/lib/dhl";
import {
  AVAILABLE_HOME_DELIVERIES,
  getHomeDeliveryShippingPrice,
} from "~/lib/homeDelivery";
import { type BasketProduct } from "~/types/Product";

export function useShipping(
  basket: BasketProduct[],
  shippingLocation: string | undefined,
) {
  if (!shippingLocation) {
    return {
      shippingPrice: 0,
      shippingZone: undefined,
      isOverTheWeightLimit: false,
      isPickup: false,
      isHomeDelivery: false,
      isDHLDelivery: false,
    };
  }

  const isPickup = shippingLocation === "pickup";
  const isHomeDelivery = Object.keys(AVAILABLE_HOME_DELIVERIES).includes(
    shippingLocation ?? "",
  );
  const isDHLDelivery = !isPickup && !isHomeDelivery;

  let shippingZone, shippingPrice, isOverTheWeightLimit;

  switch (true) {
    case isPickup:
      shippingPrice = 0;
      shippingZone = undefined;
      isOverTheWeightLimit = false;
      break;
    case isHomeDelivery:
      shippingZone = AVAILABLE_HOME_DELIVERIES[shippingLocation]?.zone;

      if (!shippingZone) throw new Error("Shipping Zone not found");

      shippingPrice = Number(
        getHomeDeliveryShippingPrice(0, shippingZone).price.toFixed(2),
      );
      isOverTheWeightLimit = false;
      break;
    default:
    case isDHLDelivery:
      const totalWeight = basket.reduce(
        (acc, { weight, quantity }) => Number(weight) * quantity + acc,
        0,
      );
      isOverTheWeightLimit = totalWeight > WEIGHT_LIMIT;

      shippingZone = AVAILABLE_COUNTRIES_ZONES[shippingLocation]?.zone;

      if (!shippingZone) throw new Error("Shipping Zone not found");

      shippingPrice = Number(
        getDHLShippingPrice(totalWeight, shippingZone).price.toFixed(2),
      );

      break;
  }

  return {
    shippingPrice,
    shippingZone,
    isOverTheWeightLimit,
    isPickup,
    isHomeDelivery,
    isDHLDelivery,
  };
}
