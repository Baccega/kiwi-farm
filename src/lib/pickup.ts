const isProduction = process.env.NODE_ENV === "production";

export function getPickupShippingOption() {
  return {
    price: 0,
    shipping_id: isProduction
      ? "shr_1Qad9rL58FsTMD3c13V7FB3H"
      : "shr_1Qacz3L58FsTMD3cNtrgC7nl",
  };
}
