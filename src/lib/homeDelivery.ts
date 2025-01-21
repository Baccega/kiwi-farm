const isProduction = process.env.NODE_ENV === "production";

export const AVAILABLE_HOME_DELIVERIES: Record<
  string,
  { zone: HomeDeliveryZone; label: string }
> = {
  Padova: { zone: "Veneto-1", label: "Padova" },
  Treviso: { zone: "Veneto-2", label: "Treviso" },
  Vicenza: { zone: "Veneto-2", label: "Vicenza" },
  Venezia: { zone: "Veneto-3", label: "Venezia" },
};

type HomeDeliveryZone = "Veneto-1" | "Veneto-2" | "Veneto-3";

const FREE_SHIPPING_ID = "shr_1Qjd4XL58FsTMD3ciPZAQtu5";

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
    shipping_id: "shr_1QjPOYL58FsTMD3cQX61tGuU",
    freeOver: 20,
  },
  "Veneto-2": {
    price: 10,
    shipping_id: "shr_1QjPPcL58FsTMD3cydGtnKQA",
    freeOver: 35,
  },
  "Veneto-3": {
    price: 15,
    shipping_id: "shr_1QjPPvL58FsTMD3cS5CL3Fzb",
    freeOver: 50,
  },
};
