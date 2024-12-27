import type Stripe from "stripe";

const isProduction = process.env.NODE_ENV === "production";

export const WEIGHT_LIMIT = 30;

export const AVAILABLE_COUNTRIES_ZONES: Record<
  string,
  { zone: Zone; label: string }
> = {
  AT: { zone: "1", label: "Austria" },
  BE: { zone: "1", label: "Belgium" },
  BG: { zone: "4", label: "Bulgaria" },
  HR: { zone: "3", label: "Croatia" },
  CZ: { zone: "4", label: "Czech Republic" },
  DK: { zone: "3", label: "Denmark" },
  EE: { zone: "4", label: "Estonia" },
  FI: { zone: "3", label: "Finland" },
  FR: { zone: "1", label: "France" },
  DE: { zone: "1", label: "Germany" },
  GR: { zone: "3", label: "Greece" },
  HU: { zone: "4", label: "Hungary" },
  IE: { zone: "3", label: "Ireland" },
  IT: { zone: "Italy", label: "Italy" },
  LV: { zone: "4", label: "Latvia" },
  LT: { zone: "4", label: "Lithuania" },
  LU: { zone: "1", label: "Luxembourg" },
  NL: { zone: "1", label: "Netherlands" },
  PL: { zone: "4", label: "Poland" },
  PT: { zone: "3", label: "Portugal" },
  RO: { zone: "4", label: "Romania" },
  SK: { zone: "4", label: "Slovakia" },
  SI: { zone: "4", label: "Slovenia" },
  ES: { zone: "3", label: "Spain" },
  SE: { zone: "3", label: "Sweden" },
};

export const AVAILABLE_COUNTRIES = Object.keys(
  AVAILABLE_COUNTRIES_ZONES,
) as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[];

type Zone = "1" | "2" | "3" | "4" | "5" | "Italy";

// const additionalChargesItaly = {
//   "10.1": 5.34,
//   "20.1": 4.17,
// } as const;

// const additionalChargesOver30: Record<Zone, number> = {
//   "1": 12.13,
//   "2": 13.34,
//   "3": 12.13,
//   "4": 12.13,
//   "5": 13.34,
// };

// const additionalChargesOver70: Record<Zone, number> = {
//   "1": 6.06,
//   "2": 6.06,
//   "3": 6.06,
//   "4": 6.06,
//   "5": 6.06,
// };

// Current limit: 30kg
export function getShippingPrice(totalWeight: number, zone?: Zone) {
  // To remove this limit we need to add the additional charges for each zone
  if (!zone || totalWeight > WEIGHT_LIMIT) {
    return { price: Infinity, shipping_id: "NO_SHIPPING_ID" };
  }

  const basePrice = DHL_BASE_PRICES[zone][Math.ceil(totalWeight)];

  if (!basePrice) {
    return { price: Infinity, shipping_id: "NO_SHIPPING_ID" };
  }

  return { price: basePrice?.price, shipping_id: basePrice?.shipping_id };
}

export function getPickupShippingOption() {
  return {
    price: 0,
    shipping_id: isProduction
      ? "shr_1Qad9rL58FsTMD3c13V7FB3H"
      : "shr_1Qacz3L58FsTMD3cNtrgC7nl",
  };
}

export const DHL_BASE_PRICES: Record<
  Zone,
  Record<number, { price: number; shipping_id: string }>
> = {
  "1": {
    1: {
      price: 16.96,
      shipping_id: isProduction
        ? "shr_1QJCsCL58FsTMD3cy2qaJGME"
        : "shr_1QJBlkL58FsTMD3cIlCa3xVO",
    },
    2: {
      price: 16.96,
      shipping_id: isProduction
        ? "shr_1QJCsCL58FsTMD3cy2qaJGME"
        : "shr_1QJBlkL58FsTMD3cIlCa3xVO",
    },
    3: {
      price: 16.96,
      shipping_id: isProduction
        ? "shr_1QJCsCL58FsTMD3cy2qaJGME"
        : "shr_1QJBlkL58FsTMD3cIlCa3xVO",
    },
    4: {
      price: 16.96,
      shipping_id: isProduction
        ? "shr_1QJCsCL58FsTMD3cy2qaJGME"
        : "shr_1QJBlkL58FsTMD3cIlCa3xVO",
    },
    5: {
      price: 16.96,
      shipping_id: isProduction
        ? "shr_1QJCsCL58FsTMD3cy2qaJGME"
        : "shr_1QJBlkL58FsTMD3cIlCa3xVO",
    },
    6: {
      price: 19.4,
      shipping_id: isProduction
        ? "shr_1QJCsAL58FsTMD3c8lCnNoX2"
        : "shr_1QJBlyL58FsTMD3c4C4v6HJd",
    },
    7: {
      price: 19.4,
      shipping_id: isProduction
        ? "shr_1QJCsAL58FsTMD3c8lCnNoX2"
        : "shr_1QJBlyL58FsTMD3c4C4v6HJd",
    },
    8: {
      price: 19.4,
      shipping_id: isProduction
        ? "shr_1QJCsAL58FsTMD3c8lCnNoX2"
        : "shr_1QJBlyL58FsTMD3c4C4v6HJd",
    },
    9: {
      price: 19.4,
      shipping_id: isProduction
        ? "shr_1QJCsAL58FsTMD3c8lCnNoX2"
        : "shr_1QJBlyL58FsTMD3c4C4v6HJd",
    },
    10: {
      price: 19.4,
      shipping_id: isProduction
        ? "shr_1QJCsAL58FsTMD3c8lCnNoX2"
        : "shr_1QJBlyL58FsTMD3c4C4v6HJd",
    },
    11: {
      price: 23.07,
      shipping_id: isProduction
        ? "shr_1QJCs6L58FsTMD3cWYKc2q40"
        : "shr_1QJBmZL58FsTMD3cjEVCfhe2",
    },
    12: {
      price: 23.07,
      shipping_id: isProduction
        ? "shr_1QJCs6L58FsTMD3cWYKc2q40"
        : "shr_1QJBmZL58FsTMD3cjEVCfhe2",
    },
    13: {
      price: 23.07,
      shipping_id: isProduction
        ? "shr_1QJCs6L58FsTMD3cWYKc2q40"
        : "shr_1QJBmZL58FsTMD3cjEVCfhe2",
    },
    14: {
      price: 23.07,
      shipping_id: isProduction
        ? "shr_1QJCs6L58FsTMD3cWYKc2q40"
        : "shr_1QJBmZL58FsTMD3cjEVCfhe2",
    },
    15: {
      price: 23.07,
      shipping_id: isProduction
        ? "shr_1QJCs6L58FsTMD3cWYKc2q40"
        : "shr_1QJBmZL58FsTMD3cjEVCfhe2",
    },
    16: {
      price: 26.73,
      shipping_id: isProduction
        ? "shr_1QJCrzL58FsTMD3cUjw0LWmq"
        : "shr_1QJBmnL58FsTMD3cxIVg8f5k",
    },
    17: {
      price: 26.73,
      shipping_id: isProduction
        ? "shr_1QJCrzL58FsTMD3cUjw0LWmq"
        : "shr_1QJBmnL58FsTMD3cxIVg8f5k",
    },
    18: {
      price: 26.73,
      shipping_id: isProduction
        ? "shr_1QJCrzL58FsTMD3cUjw0LWmq"
        : "shr_1QJBmnL58FsTMD3cxIVg8f5k",
    },
    19: {
      price: 26.73,
      shipping_id: isProduction
        ? "shr_1QJCrzL58FsTMD3cUjw0LWmq"
        : "shr_1QJBmnL58FsTMD3cxIVg8f5k",
    },
    20: {
      price: 26.73,
      shipping_id: isProduction
        ? "shr_1QJCrzL58FsTMD3cUjw0LWmq"
        : "shr_1QJBmnL58FsTMD3cxIVg8f5k",
    },
    21: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrwL58FsTMD3cScbtJZk5"
        : "shr_1QJBnWL58FsTMD3ccdhFBFE3",
    },
    22: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrwL58FsTMD3cScbtJZk5"
        : "shr_1QJBnWL58FsTMD3ccdhFBFE3",
    },
    23: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrwL58FsTMD3cScbtJZk5"
        : "shr_1QJBnWL58FsTMD3ccdhFBFE3",
    },
    24: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrwL58FsTMD3cScbtJZk5"
        : "shr_1QJBnWL58FsTMD3ccdhFBFE3",
    },
    25: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrwL58FsTMD3cScbtJZk5"
        : "shr_1QJBnWL58FsTMD3ccdhFBFE3",
    },
    26: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrwL58FsTMD3cScbtJZk5"
        : "shr_1QJBnWL58FsTMD3ccdhFBFE3",
    },
    27: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrwL58FsTMD3cScbtJZk5"
        : "shr_1QJBnWL58FsTMD3ccdhFBFE3",
    },
    28: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrwL58FsTMD3cScbtJZk5"
        : "shr_1QJBnWL58FsTMD3ccdhFBFE3",
    },
    29: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrwL58FsTMD3cScbtJZk5"
        : "shr_1QJBnWL58FsTMD3ccdhFBFE3",
    },
    30: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrwL58FsTMD3cScbtJZk5"
        : "shr_1QJBnWL58FsTMD3ccdhFBFE3",
    },
    40: { price: 43.75, shipping_id: "NO_SHIPPING_ID" },
    50: { price: 72.8, shipping_id: "NO_SHIPPING_ID" },
    60: { price: 98.26, shipping_id: "NO_SHIPPING_ID" },
    70: { price: 127.31, shipping_id: "NO_SHIPPING_ID" },
    80: { price: 139.43, shipping_id: "NO_SHIPPING_ID" },
    90: { price: 151.55, shipping_id: "NO_SHIPPING_ID" },
    100: { price: 163.67, shipping_id: "NO_SHIPPING_ID" },
  },
  "2": {
    1: {
      price: 22.83,
      shipping_id: isProduction
        ? "shr_1QJCrtL58FsTMD3cZVVCS7ow"
        : "shr_1QJBoOL58FsTMD3cQDWdhoht",
    },
    2: {
      price: 22.83,
      shipping_id: isProduction
        ? "shr_1QJCrtL58FsTMD3cZVVCS7ow"
        : "shr_1QJBoOL58FsTMD3cQDWdhoht",
    },
    3: {
      price: 22.83,
      shipping_id: isProduction
        ? "shr_1QJCrtL58FsTMD3cZVVCS7ow"
        : "shr_1QJBoOL58FsTMD3cQDWdhoht",
    },
    4: {
      price: 22.83,
      shipping_id: isProduction
        ? "shr_1QJCrtL58FsTMD3cZVVCS7ow"
        : "shr_1QJBoOL58FsTMD3cQDWdhoht",
    },
    5: {
      price: 22.83,
      shipping_id: isProduction
        ? "shr_1QJCrtL58FsTMD3cZVVCS7ow"
        : "shr_1QJBoOL58FsTMD3cQDWdhoht",
    },
    6: {
      price: 24.29,
      shipping_id: isProduction
        ? "shr_1QJCrqL58FsTMD3cM9nwqxEK"
        : "shr_1QJBogL58FsTMD3cIiIJxumW",
    },
    7: {
      price: 24.29,
      shipping_id: isProduction
        ? "shr_1QJCrqL58FsTMD3cM9nwqxEK"
        : "shr_1QJBogL58FsTMD3cIiIJxumW",
    },
    8: {
      price: 24.29,
      shipping_id: isProduction
        ? "shr_1QJCrqL58FsTMD3cM9nwqxEK"
        : "shr_1QJBogL58FsTMD3cIiIJxumW",
    },
    9: {
      price: 24.29,
      shipping_id: isProduction
        ? "shr_1QJCrqL58FsTMD3cM9nwqxEK"
        : "shr_1QJBogL58FsTMD3cIiIJxumW",
    },
    10: {
      price: 24.29,
      shipping_id: isProduction
        ? "shr_1QJCrqL58FsTMD3cM9nwqxEK"
        : "shr_1QJBogL58FsTMD3cIiIJxumW",
    },
    11: {
      price: 29.17,
      shipping_id: isProduction
        ? "shr_1QJCrnL58FsTMD3ccQIfV4oq"
        : "shr_1QJBovL58FsTMD3cCiSxIb2x",
    },
    12: {
      price: 29.17,
      shipping_id: isProduction
        ? "shr_1QJCrnL58FsTMD3ccQIfV4oq"
        : "shr_1QJBovL58FsTMD3cCiSxIb2x",
    },
    13: {
      price: 29.17,
      shipping_id: isProduction
        ? "shr_1QJCrnL58FsTMD3ccQIfV4oq"
        : "shr_1QJBovL58FsTMD3cCiSxIb2x",
    },
    14: {
      price: 29.17,
      shipping_id: isProduction
        ? "shr_1QJCrnL58FsTMD3ccQIfV4oq"
        : "shr_1QJBovL58FsTMD3cCiSxIb2x",
    },
    15: {
      price: 29.17,
      shipping_id: isProduction
        ? "shr_1QJCrnL58FsTMD3ccQIfV4oq"
        : "shr_1QJBovL58FsTMD3cCiSxIb2x",
    },
    16: {
      price: 34.07,
      shipping_id: isProduction
        ? "shr_1QJCrkL58FsTMD3cbzkE7G11"
        : "shr_1QJBpGL58FsTMD3cl8ikoTTx",
    },
    17: {
      price: 34.07,
      shipping_id: isProduction
        ? "shr_1QJCrkL58FsTMD3cbzkE7G11"
        : "shr_1QJBpGL58FsTMD3cl8ikoTTx",
    },
    18: {
      price: 34.07,
      shipping_id: isProduction
        ? "shr_1QJCrkL58FsTMD3cbzkE7G11"
        : "shr_1QJBpGL58FsTMD3cl8ikoTTx",
    },
    19: {
      price: 34.07,
      shipping_id: isProduction
        ? "shr_1QJCrkL58FsTMD3cbzkE7G11"
        : "shr_1QJBpGL58FsTMD3cl8ikoTTx",
    },
    20: {
      price: 34.07,
      shipping_id: isProduction
        ? "shr_1QJCrkL58FsTMD3cbzkE7G11"
        : "shr_1QJBpGL58FsTMD3cl8ikoTTx",
    },
    21: {
      price: 40.13,
      shipping_id: isProduction
        ? "shr_1QJCrhL58FsTMD3cVQs8kaSx"
        : "shr_1QJBpXL58FsTMD3cQW4m2iUF",
    },
    22: {
      price: 40.13,
      shipping_id: isProduction
        ? "shr_1QJCrhL58FsTMD3cVQs8kaSx"
        : "shr_1QJBpXL58FsTMD3cQW4m2iUF",
    },
    23: {
      price: 40.13,
      shipping_id: isProduction
        ? "shr_1QJCrhL58FsTMD3cVQs8kaSx"
        : "shr_1QJBpXL58FsTMD3cQW4m2iUF",
    },
    24: {
      price: 40.13,
      shipping_id: isProduction
        ? "shr_1QJCrhL58FsTMD3cVQs8kaSx"
        : "shr_1QJBpXL58FsTMD3cQW4m2iUF",
    },
    25: {
      price: 40.13,
      shipping_id: isProduction
        ? "shr_1QJCrhL58FsTMD3cVQs8kaSx"
        : "shr_1QJBpXL58FsTMD3cQW4m2iUF",
    },
    26: {
      price: 40.13,
      shipping_id: isProduction
        ? "shr_1QJCrhL58FsTMD3cVQs8kaSx"
        : "shr_1QJBpXL58FsTMD3cQW4m2iUF",
    },
    27: {
      price: 40.13,
      shipping_id: isProduction
        ? "shr_1QJCrhL58FsTMD3cVQs8kaSx"
        : "shr_1QJBpXL58FsTMD3cQW4m2iUF",
    },
    28: {
      price: 40.13,
      shipping_id: isProduction
        ? "shr_1QJCrhL58FsTMD3cVQs8kaSx"
        : "shr_1QJBpXL58FsTMD3cQW4m2iUF",
    },
    29: {
      price: 40.13,
      shipping_id: isProduction
        ? "shr_1QJCrhL58FsTMD3cVQs8kaSx"
        : "shr_1QJBpXL58FsTMD3cQW4m2iUF",
    },
    30: {
      price: 40.13,
      shipping_id: isProduction
        ? "shr_1QJCrhL58FsTMD3cVQs8kaSx"
        : "shr_1QJBpXL58FsTMD3cQW4m2iUF",
    },
    40: { price: 53.47, shipping_id: "NO_SHIPPING_ID" },
    50: { price: 87.38, shipping_id: "NO_SHIPPING_ID" },
    60: { price: 117.67, shipping_id: "NO_SHIPPING_ID" },
    70: { price: 146.73, shipping_id: "NO_SHIPPING_ID" },
    80: { price: 158.85, shipping_id: "NO_SHIPPING_ID" },
    90: { price: 170.97, shipping_id: "NO_SHIPPING_ID" },
    100: { price: 183.09, shipping_id: "NO_SHIPPING_ID" },
  },
  "3": {
    1: {
      price: 16.96,
      shipping_id: isProduction
        ? "shr_1QJCrdL58FsTMD3ceE3IbhtT"
        : "shr_1QJBpvL58FsTMD3cV6anK2pR",
    },
    2: {
      price: 16.96,
      shipping_id: isProduction
        ? "shr_1QJCrdL58FsTMD3ceE3IbhtT"
        : "shr_1QJBpvL58FsTMD3cV6anK2pR",
    },
    3: {
      price: 16.96,
      shipping_id: isProduction
        ? "shr_1QJCrdL58FsTMD3ceE3IbhtT"
        : "shr_1QJBpvL58FsTMD3cV6anK2pR",
    },
    4: {
      price: 16.96,
      shipping_id: isProduction
        ? "shr_1QJCrdL58FsTMD3ceE3IbhtT"
        : "shr_1QJBpvL58FsTMD3cV6anK2pR",
    },
    5: {
      price: 16.96,
      shipping_id: isProduction
        ? "shr_1QJCrdL58FsTMD3ceE3IbhtT"
        : "shr_1QJBpvL58FsTMD3cV6anK2pR",
    },
    6: {
      price: 19.4,
      shipping_id: isProduction
        ? "shr_1QJCraL58FsTMD3cItJToQ7R"
        : "shr_1QJBqAL58FsTMD3c2suWnJQZ",
    },
    7: {
      price: 19.4,
      shipping_id: isProduction
        ? "shr_1QJCraL58FsTMD3cItJToQ7R"
        : "shr_1QJBqAL58FsTMD3c2suWnJQZ",
    },
    8: {
      price: 19.4,
      shipping_id: isProduction
        ? "shr_1QJCraL58FsTMD3cItJToQ7R"
        : "shr_1QJBqAL58FsTMD3c2suWnJQZ",
    },
    9: {
      price: 19.4,
      shipping_id: isProduction
        ? "shr_1QJCraL58FsTMD3cItJToQ7R"
        : "shr_1QJBqAL58FsTMD3c2suWnJQZ",
    },
    10: {
      price: 19.4,
      shipping_id: isProduction
        ? "shr_1QJCraL58FsTMD3cItJToQ7R"
        : "shr_1QJBqAL58FsTMD3c2suWnJQZ",
    },
    11: {
      price: 23.07,
      shipping_id: isProduction
        ? "shr_1QJCrWL58FsTMD3cRigaHGIs"
        : "shr_1QJBqUL58FsTMD3cWrhXypMR",
    },
    12: {
      price: 23.07,
      shipping_id: isProduction
        ? "shr_1QJCrWL58FsTMD3cRigaHGIs"
        : "shr_1QJBqUL58FsTMD3cWrhXypMR",
    },
    13: {
      price: 23.07,
      shipping_id: isProduction
        ? "shr_1QJCrWL58FsTMD3cRigaHGIs"
        : "shr_1QJBqUL58FsTMD3cWrhXypMR",
    },
    14: {
      price: 23.07,
      shipping_id: isProduction
        ? "shr_1QJCrWL58FsTMD3cRigaHGIs"
        : "shr_1QJBqUL58FsTMD3cWrhXypMR",
    },
    15: {
      price: 23.07,
      shipping_id: isProduction
        ? "shr_1QJCrWL58FsTMD3cRigaHGIs"
        : "shr_1QJBqUL58FsTMD3cWrhXypMR",
    },
    16: {
      price: 26.73,
      shipping_id: isProduction
        ? "shr_1QJCrSL58FsTMD3cyQy2uYpT"
        : "shr_1QJBqlL58FsTMD3ct1huJ3kt",
    },
    17: {
      price: 26.73,
      shipping_id: isProduction
        ? "shr_1QJCrSL58FsTMD3cyQy2uYpT"
        : "shr_1QJBqlL58FsTMD3ct1huJ3kt",
    },
    18: {
      price: 26.73,
      shipping_id: isProduction
        ? "shr_1QJCrSL58FsTMD3cyQy2uYpT"
        : "shr_1QJBqlL58FsTMD3ct1huJ3kt",
    },
    19: {
      price: 26.73,
      shipping_id: isProduction
        ? "shr_1QJCrSL58FsTMD3cyQy2uYpT"
        : "shr_1QJBqlL58FsTMD3ct1huJ3kt",
    },
    20: {
      price: 26.73,
      shipping_id: isProduction
        ? "shr_1QJCrSL58FsTMD3cyQy2uYpT"
        : "shr_1QJBqlL58FsTMD3ct1huJ3kt",
    },
    21: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrAL58FsTMD3cZpZGly0z"
        : "shr_1QJBr0L58FsTMD3cJTu4RSTw",
    },
    22: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrAL58FsTMD3cZpZGly0z"
        : "shr_1QJBr0L58FsTMD3cJTu4RSTw",
    },
    23: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrAL58FsTMD3cZpZGly0z"
        : "shr_1QJBr0L58FsTMD3cJTu4RSTw",
    },
    24: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrAL58FsTMD3cZpZGly0z"
        : "shr_1QJBr0L58FsTMD3cJTu4RSTw",
    },
    25: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrAL58FsTMD3cZpZGly0z"
        : "shr_1QJBr0L58FsTMD3cJTu4RSTw",
    },
    26: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrAL58FsTMD3cZpZGly0z"
        : "shr_1QJBr0L58FsTMD3cJTu4RSTw",
    },
    27: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrAL58FsTMD3cZpZGly0z"
        : "shr_1QJBr0L58FsTMD3cJTu4RSTw",
    },
    28: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrAL58FsTMD3cZpZGly0z"
        : "shr_1QJBr0L58FsTMD3cJTu4RSTw",
    },
    29: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrAL58FsTMD3cZpZGly0z"
        : "shr_1QJBr0L58FsTMD3cJTu4RSTw",
    },
    30: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCrAL58FsTMD3cZpZGly0z"
        : "shr_1QJBr0L58FsTMD3cJTu4RSTw",
    },
    40: { price: 43.75, shipping_id: "NO_SHIPPING_ID" },
    50: { price: 72.8, shipping_id: "NO_SHIPPING_ID" },
    60: { price: 98.26, shipping_id: "NO_SHIPPING_ID" },
    70: { price: 127.31, shipping_id: "NO_SHIPPING_ID" },
    80: { price: 139.43, shipping_id: "NO_SHIPPING_ID" },
    90: { price: 151.55, shipping_id: "NO_SHIPPING_ID" },
    100: { price: 163.67, shipping_id: "NO_SHIPPING_ID" },
  },
  "4": {
    1: {
      price: 16.96,
      shipping_id: isProduction
        ? "shr_1QJCr2L58FsTMD3cUfxLrIGM"
        : "shr_1QJBsIL58FsTMD3cTnbHSsk1",
    },
    2: {
      price: 16.96,
      shipping_id: isProduction
        ? "shr_1QJCr2L58FsTMD3cUfxLrIGM"
        : "shr_1QJBsIL58FsTMD3cTnbHSsk1",
    },
    3: {
      price: 16.96,
      shipping_id: isProduction
        ? "shr_1QJCr2L58FsTMD3cUfxLrIGM"
        : "shr_1QJBsIL58FsTMD3cTnbHSsk1",
    },
    4: {
      price: 16.96,
      shipping_id: isProduction
        ? "shr_1QJCr2L58FsTMD3cUfxLrIGM"
        : "shr_1QJBsIL58FsTMD3cTnbHSsk1",
    },
    5: {
      price: 16.96,
      shipping_id: isProduction
        ? "shr_1QJCr2L58FsTMD3cUfxLrIGM"
        : "shr_1QJBsIL58FsTMD3cTnbHSsk1",
    },
    6: {
      price: 19.4,
      shipping_id: isProduction
        ? "shr_1QJCqxL58FsTMD3cZcHbHuaC"
        : "shr_1QJBsTL58FsTMD3ctvcvK2wj",
    },
    7: {
      price: 19.4,
      shipping_id: isProduction
        ? "shr_1QJCqxL58FsTMD3cZcHbHuaC"
        : "shr_1QJBsTL58FsTMD3ctvcvK2wj",
    },
    8: {
      price: 19.4,
      shipping_id: isProduction
        ? "shr_1QJCqxL58FsTMD3cZcHbHuaC"
        : "shr_1QJBsTL58FsTMD3ctvcvK2wj",
    },
    9: {
      price: 19.4,
      shipping_id: isProduction
        ? "shr_1QJCqxL58FsTMD3cZcHbHuaC"
        : "shr_1QJBsTL58FsTMD3ctvcvK2wj",
    },
    10: {
      price: 19.4,
      shipping_id: isProduction
        ? "shr_1QJCqxL58FsTMD3cZcHbHuaC"
        : "shr_1QJBsTL58FsTMD3ctvcvK2wj",
    },
    11: {
      price: 23.07,
      shipping_id: isProduction
        ? "shr_1QJCqsL58FsTMD3caKnA8QqI"
        : "shr_1QJBsiL58FsTMD3cCpmnN6tY",
    },
    12: {
      price: 23.07,
      shipping_id: isProduction
        ? "shr_1QJCqsL58FsTMD3caKnA8QqI"
        : "shr_1QJBsiL58FsTMD3cCpmnN6tY",
    },
    13: {
      price: 23.07,
      shipping_id: isProduction
        ? "shr_1QJCqsL58FsTMD3caKnA8QqI"
        : "shr_1QJBsiL58FsTMD3cCpmnN6tY",
    },
    14: {
      price: 23.07,
      shipping_id: isProduction
        ? "shr_1QJCqsL58FsTMD3caKnA8QqI"
        : "shr_1QJBsiL58FsTMD3cCpmnN6tY",
    },
    15: {
      price: 23.07,
      shipping_id: isProduction
        ? "shr_1QJCqsL58FsTMD3caKnA8QqI"
        : "shr_1QJBsiL58FsTMD3cCpmnN6tY",
    },
    16: {
      price: 26.73,
      shipping_id: isProduction
        ? "shr_1QJCqmL58FsTMD3cduoFNdFx"
        : "shr_1QJBsvL58FsTMD3caAXqzEHE",
    },
    17: {
      price: 26.73,
      shipping_id: isProduction
        ? "shr_1QJCqmL58FsTMD3cduoFNdFx"
        : "shr_1QJBsvL58FsTMD3caAXqzEHE",
    },
    18: {
      price: 26.73,
      shipping_id: isProduction
        ? "shr_1QJCqmL58FsTMD3cduoFNdFx"
        : "shr_1QJBsvL58FsTMD3caAXqzEHE",
    },
    19: {
      price: 26.73,
      shipping_id: isProduction
        ? "shr_1QJCqmL58FsTMD3cduoFNdFx"
        : "shr_1QJBsvL58FsTMD3caAXqzEHE",
    },
    20: {
      price: 26.73,
      shipping_id: isProduction
        ? "shr_1QJCqmL58FsTMD3cduoFNdFx"
        : "shr_1QJBsvL58FsTMD3caAXqzEHE",
    },
    21: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCqhL58FsTMD3cel5lUGAh"
        : "shr_1QJBt8L58FsTMD3cKjBEhYv9",
    },
    22: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCqhL58FsTMD3cel5lUGAh"
        : "shr_1QJBt8L58FsTMD3cKjBEhYv9",
    },
    23: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCqhL58FsTMD3cel5lUGAh"
        : "shr_1QJBt8L58FsTMD3cKjBEhYv9",
    },
    24: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCqhL58FsTMD3cel5lUGAh"
        : "shr_1QJBt8L58FsTMD3cKjBEhYv9",
    },
    25: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCqhL58FsTMD3cel5lUGAh"
        : "shr_1QJBt8L58FsTMD3cKjBEhYv9",
    },
    26: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCqhL58FsTMD3cel5lUGAh"
        : "shr_1QJBt8L58FsTMD3cKjBEhYv9",
    },
    27: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCqhL58FsTMD3cel5lUGAh"
        : "shr_1QJBt8L58FsTMD3cKjBEhYv9",
    },
    28: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCqhL58FsTMD3cel5lUGAh"
        : "shr_1QJBt8L58FsTMD3cKjBEhYv9",
    },
    29: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCqhL58FsTMD3cel5lUGAh"
        : "shr_1QJBt8L58FsTMD3cKjBEhYv9",
    },
    30: {
      price: 31.62,
      shipping_id: isProduction
        ? "shr_1QJCqhL58FsTMD3cel5lUGAh"
        : "shr_1QJBt8L58FsTMD3cKjBEhYv9",
    },
    40: { price: 43.75, shipping_id: "NO_SHIPPING_ID" },
    50: { price: 72.8, shipping_id: "NO_SHIPPING_ID" },
    60: { price: 98.26, shipping_id: "NO_SHIPPING_ID" },
    70: { price: 127.31, shipping_id: "NO_SHIPPING_ID" },
    80: { price: 139.43, shipping_id: "NO_SHIPPING_ID" },
    90: { price: 151.55, shipping_id: "NO_SHIPPING_ID" },
    100: { price: 163.67, shipping_id: "NO_SHIPPING_ID" },
  },
  "5": {
    1: { price: 22.83, shipping_id: "NO_SHIPPING_ID" },
    2: { price: 22.83, shipping_id: "NO_SHIPPING_ID" },
    3: { price: 22.83, shipping_id: "NO_SHIPPING_ID" },
    4: { price: 22.83, shipping_id: "NO_SHIPPING_ID" },
    5: { price: 22.83, shipping_id: "NO_SHIPPING_ID" },
    6: { price: 24.29, shipping_id: "NO_SHIPPING_ID" },
    7: { price: 24.29, shipping_id: "NO_SHIPPING_ID" },
    8: { price: 24.29, shipping_id: "NO_SHIPPING_ID" },
    9: { price: 24.29, shipping_id: "NO_SHIPPING_ID" },
    10: { price: 24.29, shipping_id: "NO_SHIPPING_ID" },
    11: { price: 29.17, shipping_id: "NO_SHIPPING_ID" },
    12: { price: 29.17, shipping_id: "NO_SHIPPING_ID" },
    13: { price: 29.17, shipping_id: "NO_SHIPPING_ID" },
    14: { price: 29.17, shipping_id: "NO_SHIPPING_ID" },
    15: { price: 29.17, shipping_id: "NO_SHIPPING_ID" },
    16: { price: 34.07, shipping_id: "NO_SHIPPING_ID" },
    17: { price: 34.07, shipping_id: "NO_SHIPPING_ID" },
    18: { price: 34.07, shipping_id: "NO_SHIPPING_ID" },
    19: { price: 34.07, shipping_id: "NO_SHIPPING_ID" },
    20: { price: 34.07, shipping_id: "NO_SHIPPING_ID" },
    21: { price: 40.13, shipping_id: "NO_SHIPPING_ID" },
    22: { price: 40.13, shipping_id: "NO_SHIPPING_ID" },
    23: { price: 40.13, shipping_id: "NO_SHIPPING_ID" },
    24: { price: 40.13, shipping_id: "NO_SHIPPING_ID" },
    25: { price: 40.13, shipping_id: "NO_SHIPPING_ID" },
    26: { price: 40.13, shipping_id: "NO_SHIPPING_ID" },
    27: { price: 40.13, shipping_id: "NO_SHIPPING_ID" },
    28: { price: 40.13, shipping_id: "NO_SHIPPING_ID" },
    29: { price: 40.13, shipping_id: "NO_SHIPPING_ID" },
    30: { price: 40.13, shipping_id: "NO_SHIPPING_ID" },
    40: { price: 53.47, shipping_id: "NO_SHIPPING_ID" },
    50: { price: 87.38, shipping_id: "NO_SHIPPING_ID" },
    60: { price: 117.67, shipping_id: "NO_SHIPPING_ID" },
    70: { price: 146.73, shipping_id: "NO_SHIPPING_ID" },
    80: { price: 158.85, shipping_id: "NO_SHIPPING_ID" },
    90: { price: 170.97, shipping_id: "NO_SHIPPING_ID" },
    100: { price: 183.09, shipping_id: "NO_SHIPPING_ID" },
  },
  Italy: {
    0.5: {
      price: 8.01,
      shipping_id: isProduction
        ? "shr_1QJCsRL58FsTMD3cUErmRTbS"
        : "shr_1QJBYrL58FsTMD3c2q6iETXI",
    },
    1: {
      price: 8.01,
      shipping_id: isProduction
        ? "shr_1QJCsRL58FsTMD3cUErmRTbS"
        : "shr_1QJBYrL58FsTMD3c2q6iETXI",
    },
    1.5: {
      price: 8.01,
      shipping_id: isProduction
        ? "shr_1QJCsRL58FsTMD3cUErmRTbS"
        : "shr_1QJBYrL58FsTMD3c2q6iETXI",
    },
    2: {
      price: 8.01,
      shipping_id: isProduction
        ? "shr_1QJCsRL58FsTMD3cUErmRTbS"
        : "shr_1QJBYrL58FsTMD3c2q6iETXI",
    },
    2.5: {
      price: 8.01,
      shipping_id: isProduction
        ? "shr_1QJCsRL58FsTMD3cUErmRTbS"
        : "shr_1QJBYrL58FsTMD3c2q6iETXI",
    },
    3: {
      price: 8.01,
      shipping_id: isProduction
        ? "shr_1QJCsRL58FsTMD3cUErmRTbS"
        : "shr_1QJBYrL58FsTMD3c2q6iETXI",
    },
    3.5: {
      price: 9.78,
      shipping_id: isProduction
        ? "shr_1QJCsOL58FsTMD3cNWes3cCX"
        : "shr_1QJBZRL58FsTMD3crXFg15bd",
    },
    4: {
      price: 9.78,
      shipping_id: isProduction
        ? "shr_1QJCsOL58FsTMD3cNWes3cCX"
        : "shr_1QJBZRL58FsTMD3crXFg15bd",
    },
    4.5: {
      price: 9.78,
      shipping_id: isProduction
        ? "shr_1QJCsOL58FsTMD3cNWes3cCX"
        : "shr_1QJBZRL58FsTMD3crXFg15bd",
    },
    5: {
      price: 9.78,
      shipping_id: isProduction
        ? "shr_1QJCsOL58FsTMD3cNWes3cCX"
        : "shr_1QJBZRL58FsTMD3crXFg15bd",
    },
    5.5: {
      price: 11.06,
      shipping_id: isProduction
        ? "shr_1QJCsML58FsTMD3c7INhrRtT"
        : "shr_1QJBZkL58FsTMD3ckPfe8K4y",
    },
    6: {
      price: 11.06,
      shipping_id: isProduction
        ? "shr_1QJCsML58FsTMD3c7INhrRtT"
        : "shr_1QJBZkL58FsTMD3ckPfe8K4y",
    },
    6.5: {
      price: 11.06,
      shipping_id: isProduction
        ? "shr_1QJCsML58FsTMD3c7INhrRtT"
        : "shr_1QJBZkL58FsTMD3ckPfe8K4y",
    },
    7: {
      price: 11.06,
      shipping_id: isProduction
        ? "shr_1QJCsML58FsTMD3c7INhrRtT"
        : "shr_1QJBZkL58FsTMD3ckPfe8K4y",
    },
    7.5: {
      price: 11.06,
      shipping_id: isProduction
        ? "shr_1QJCsML58FsTMD3c7INhrRtT"
        : "shr_1QJBZkL58FsTMD3ckPfe8K4y",
    },
    8: {
      price: 11.06,
      shipping_id: isProduction
        ? "shr_1QJCsML58FsTMD3c7INhrRtT"
        : "shr_1QJBZkL58FsTMD3ckPfe8K4y",
    },
    8.5: {
      price: 11.06,
      shipping_id: isProduction
        ? "shr_1QJCsML58FsTMD3c7INhrRtT"
        : "shr_1QJBZkL58FsTMD3ckPfe8K4y",
    },
    9: {
      price: 11.06,
      shipping_id: isProduction
        ? "shr_1QJCsML58FsTMD3c7INhrRtT"
        : "shr_1QJBZkL58FsTMD3ckPfe8K4y",
    },
    9.5: {
      price: 11.06,
      shipping_id: isProduction
        ? "shr_1QJCsML58FsTMD3c7INhrRtT"
        : "shr_1QJBZkL58FsTMD3ckPfe8K4y",
    },
    10: {
      price: 11.06,
      shipping_id: isProduction
        ? "shr_1QJCsML58FsTMD3c7INhrRtT"
        : "shr_1QJBZkL58FsTMD3ckPfe8K4y",
    },
    11: {
      price: 16.4,
      shipping_id: isProduction
        ? "shr_1QJCsKL58FsTMD3cAk88BOXf"
        : "shr_1QJBa5L58FsTMD3c4VdHYaUK",
    },
    12: {
      price: 16.4,
      shipping_id: isProduction
        ? "shr_1QJCsKL58FsTMD3cAk88BOXf"
        : "shr_1QJBa5L58FsTMD3c4VdHYaUK",
    },
    13: {
      price: 16.4,
      shipping_id: isProduction
        ? "shr_1QJCsKL58FsTMD3cAk88BOXf"
        : "shr_1QJBa5L58FsTMD3c4VdHYaUK",
    },
    14: {
      price: 16.4,
      shipping_id: isProduction
        ? "shr_1QJCsKL58FsTMD3cAk88BOXf"
        : "shr_1QJBa5L58FsTMD3c4VdHYaUK",
    },
    15: {
      price: 16.4,
      shipping_id: isProduction
        ? "shr_1QJCsKL58FsTMD3cAk88BOXf"
        : "shr_1QJBa5L58FsTMD3c4VdHYaUK",
    },
    16: {
      price: 16.4,
      shipping_id: isProduction
        ? "shr_1QJCsKL58FsTMD3cAk88BOXf"
        : "shr_1QJBa5L58FsTMD3c4VdHYaUK",
    },
    17: {
      price: 16.4,
      shipping_id: isProduction
        ? "shr_1QJCsKL58FsTMD3cAk88BOXf"
        : "shr_1QJBa5L58FsTMD3c4VdHYaUK",
    },
    18: {
      price: 16.4,
      shipping_id: isProduction
        ? "shr_1QJCsKL58FsTMD3cAk88BOXf"
        : "shr_1QJBa5L58FsTMD3c4VdHYaUK",
    },
    19: {
      price: 16.4,
      shipping_id: isProduction
        ? "shr_1QJCsKL58FsTMD3cAk88BOXf"
        : "shr_1QJBa5L58FsTMD3c4VdHYaUK",
    },
    20: {
      price: 16.4,
      shipping_id: isProduction
        ? "shr_1QJCsKL58FsTMD3cAk88BOXf"
        : "shr_1QJBa5L58FsTMD3c4VdHYaUK",
    },
    21: {
      price: 20.57,
      shipping_id: isProduction
        ? "shr_1QJCsIL58FsTMD3cCQ1bJsWe"
        : "shr_1QJBaQL58FsTMD3cUjvDPBM2",
    },
    22: {
      price: 20.57,
      shipping_id: isProduction
        ? "shr_1QJCsIL58FsTMD3cCQ1bJsWe"
        : "shr_1QJBaQL58FsTMD3cUjvDPBM2",
    },
    23: {
      price: 20.57,
      shipping_id: isProduction
        ? "shr_1QJCsIL58FsTMD3cCQ1bJsWe"
        : "shr_1QJBaQL58FsTMD3cUjvDPBM2",
    },
    24: {
      price: 20.57,
      shipping_id: isProduction
        ? "shr_1QJCsIL58FsTMD3cCQ1bJsWe"
        : "shr_1QJBaQL58FsTMD3cUjvDPBM2",
    },
    25: {
      price: 20.57,
      shipping_id: isProduction
        ? "shr_1QJCsIL58FsTMD3cCQ1bJsWe"
        : "shr_1QJBaQL58FsTMD3cUjvDPBM2",
    },
    26: {
      price: 20.57,
      shipping_id: isProduction
        ? "shr_1QJCsIL58FsTMD3cCQ1bJsWe"
        : "shr_1QJBaQL58FsTMD3cUjvDPBM2",
    },
    27: {
      price: 20.57,
      shipping_id: isProduction
        ? "shr_1QJCsIL58FsTMD3cCQ1bJsWe"
        : "shr_1QJBaQL58FsTMD3cUjvDPBM2",
    },
    28: {
      price: 20.57,
      shipping_id: isProduction
        ? "shr_1QJCsIL58FsTMD3cCQ1bJsWe"
        : "shr_1QJBaQL58FsTMD3cUjvDPBM2",
    },
    29: {
      price: 20.57,
      shipping_id: isProduction
        ? "shr_1QJCsIL58FsTMD3cCQ1bJsWe"
        : "shr_1QJBaQL58FsTMD3cUjvDPBM2",
    },
    30: {
      price: 20.57,
      shipping_id: isProduction
        ? "shr_1QJCsIL58FsTMD3cCQ1bJsWe"
        : "shr_1QJBaQL58FsTMD3cUjvDPBM2",
    },
    40: { price: 34.37, shipping_id: "NO_SHIPPING_ID" },
    50: { price: 48.17, shipping_id: "NO_SHIPPING_ID" },
    60: { price: 61.97, shipping_id: "NO_SHIPPING_ID" },
    70: { price: 75.77, shipping_id: "NO_SHIPPING_ID" },
  },
};
