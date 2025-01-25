import { COMUNI_VENETO_WITH_DISTANCES_FROM_SHOP } from "./comuni";

const isProduction = process.env.NODE_ENV === "production";

export const AVAILABLE_HOME_DELIVERIES: Record<
  string,
  { zone: HomeDeliveryZone; label: string }
> = {};
COMUNI_VENETO_WITH_DISTANCES_FROM_SHOP.forEach((cur) => {
  switch (true) {
    case cur.distance <= 10:
      AVAILABLE_HOME_DELIVERIES[cur.name] = {
        zone: "Veneto-1",
        label: cur.name,
      };
      break;
    case cur.distance > 10 && cur.distance <= 20:
      AVAILABLE_HOME_DELIVERIES[cur.name] = {
        zone: "Veneto-2",
        label: cur.name,
      };
      break;
    case cur.distance > 20 && cur.distance <= 50:
      AVAILABLE_HOME_DELIVERIES[cur.name] = {
        zone: "Veneto-3",
        label: cur.name,
      };
      break;
    default:
    case cur.distance > 50:
      AVAILABLE_HOME_DELIVERIES[cur.name] = {
        zone: "Veneto-4",
        label: cur.name,
      };
      break;
  }
});

type HomeDeliveryZone = "Veneto-1" | "Veneto-2" | "Veneto-3" | "Veneto-4";

const FREE_SHIPPING_ID = isProduction
  ? "shr_1QjhrdL58FsTMD3cHhpmbWVJ"
  : "shr_1Qjd4XL58FsTMD3ciPZAQtu5";

export function getHomeDeliveryShippingPrice(
  totalPrice: number,
  zone: HomeDeliveryZone,
) {
  const basePrice = HOME_DELIVERY_SHIPPING_PRICES[zone];

  if (!basePrice) {
    return { price: Infinity, shipping_id: "NO_SHIPPING_ID" };
  }

  if (totalPrice >= basePrice.freeOver) {
    return { price: 0, shipping_id: FREE_SHIPPING_ID };
  }

  return {
    price: basePrice?.price,
    shipping_id: basePrice?.shipping_id,
    freeOver: basePrice.freeOver,
  };
}

export const HOME_DELIVERY_SHIPPING_PRICES = {
  "Veneto-1": {
    price: 5,
    shipping_id: isProduction
      ? "shr_1QjhqnL58FsTMD3cgfArm1So"
      : "shr_1QjPOYL58FsTMD3cQX61tGuU",
    freeOver: 20,
  },
  "Veneto-2": {
    price: 10,
    shipping_id: isProduction
      ? "shr_1Qjhr2L58FsTMD3cz0tCe7Wj"
      : "shr_1QjPPcL58FsTMD3cydGtnKQA",
    freeOver: 50,
  },
  "Veneto-3": {
    price: 15,
    shipping_id: isProduction
      ? "shr_1QjhrLL58FsTMD3cCqmxdzPT"
      : "shr_1QjPPvL58FsTMD3cS5CL3Fzb",
    freeOver: 70,
  },
  "Veneto-4": {
    price: 25,
    shipping_id: isProduction
      ? "shr_1Qkq9KL58FsTMD3ccrpCs48H"
      : "shr_1Qkq8uL58FsTMD3cdidi8n88",
    freeOver: 100,
  },
};
