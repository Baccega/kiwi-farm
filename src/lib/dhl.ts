const WEIGHT_LIMIT = 30;

export const AVAILABLE_COUNTRIES_ZONES: Record<string, Zone> = {
  AT: "1",
  BE: "1",
  BG: "4",
  HR: "3",
  CZ: "4",
  DK: "3",
  EE: "4",
  FI: "3",
  FR: "1",
  DE: "1",
  GR: "3",
  HU: "4",
  IE: "3",
  IT: "Italy",
  LV: "4",
  LT: "4",
  LU: "1",
  NL: "1",
  PL: "4",
  PT: "3",
  RO: "4",
  SK: "4",
  SI: "4",
  ES: "3",
  SE: "3",
};

export const AVAILABLE_COUNTRIES = Object.keys(AVAILABLE_COUNTRIES_ZONES);

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
export function getShippingPrice(weight: number, zone: Zone): number {
  // To remove this limit we need to add the additional charges for each zone
  if (weight > WEIGHT_LIMIT) {
    return Infinity;
  }

  const basePrice = DHL_BASE_PRICES[zone][Math.ceil(weight)];

  if (!basePrice) {
    return Infinity;
  }

  return basePrice;
}

const DHL_BASE_PRICES: Record<Zone, Record<number, number>> = {
  "1": {
    1: 16.96,
    2: 16.96,
    3: 16.96,
    4: 16.96,
    5: 16.96,
    6: 19.4,
    7: 19.4,
    8: 19.4,
    9: 19.4,
    10: 19.4,
    11: 23.07,
    12: 23.07,
    13: 23.07,
    14: 23.07,
    15: 23.07,
    16: 26.73,
    17: 26.73,
    18: 26.73,
    19: 26.73,
    20: 26.73,
    21: 31.62,
    22: 31.62,
    23: 31.62,
    24: 31.62,
    25: 31.62,
    26: 31.62,
    27: 31.62,
    28: 31.62,
    29: 31.62,
    30: 31.62,
    40: 43.75,
    50: 72.8,
    60: 98.26,
    70: 127.31,
    80: 139.43,
    90: 151.55,
    100: 163.67,
  },
  "2": {
    1: 22.83,
    2: 22.83,
    3: 22.83,
    4: 22.83,
    5: 22.83,
    6: 24.29,
    7: 24.29,
    8: 24.29,
    9: 24.29,
    10: 24.29,
    11: 29.17,
    12: 29.17,
    13: 29.17,
    14: 29.17,
    15: 29.17,
    16: 34.07,
    17: 34.07,
    18: 34.07,
    19: 34.07,
    20: 34.07,
    21: 40.13,
    22: 40.13,
    23: 40.13,
    24: 40.13,
    25: 40.13,
    26: 40.13,
    27: 40.13,
    28: 40.13,
    29: 40.13,
    30: 40.13,
    40: 53.47,
    50: 87.38,
    60: 117.67,
    70: 146.73,
    80: 158.85,
    90: 170.97,
    100: 183.09,
  },
  "3": {
    1: 16.96,
    2: 16.96,
    3: 16.96,
    4: 16.96,
    5: 16.96,
    6: 19.4,
    7: 19.4,
    8: 19.4,
    9: 19.4,
    10: 19.4,
    11: 23.07,
    12: 23.07,
    13: 23.07,
    14: 23.07,
    15: 23.07,
    16: 26.73,
    17: 26.73,
    18: 26.73,
    19: 26.73,
    20: 26.73,
    21: 31.62,
    22: 31.62,
    23: 31.62,
    24: 31.62,
    25: 31.62,
    26: 31.62,
    27: 31.62,
    28: 31.62,
    29: 31.62,
    30: 31.62,
    40: 43.75,
    50: 72.8,
    60: 98.26,
    70: 127.31,
    80: 139.43,
    90: 151.55,
    100: 163.67,
  },
  "4": {
    1: 16.96,
    2: 16.96,
    3: 16.96,
    4: 16.96,
    5: 16.96,
    6: 19.4,
    7: 19.4,
    8: 19.4,
    9: 19.4,
    10: 19.4,
    11: 23.07,
    12: 23.07,
    13: 23.07,
    14: 23.07,
    15: 23.07,
    16: 26.73,
    17: 26.73,
    18: 26.73,
    19: 26.73,
    20: 26.73,
    21: 31.62,
    22: 31.62,
    23: 31.62,
    24: 31.62,
    25: 31.62,
    26: 31.62,
    27: 31.62,
    28: 31.62,
    29: 31.62,
    30: 31.62,
    40: 43.75,
    50: 72.8,
    60: 98.26,
    70: 127.31,
    80: 139.43,
    90: 151.55,
    100: 163.67,
  },
  "5": {
    1: 22.83,
    2: 22.83,
    3: 22.83,
    4: 22.83,
    5: 22.83,
    6: 24.29,
    7: 24.29,
    8: 24.29,
    9: 24.29,
    10: 24.29,
    11: 29.17,
    12: 29.17,
    13: 29.17,
    14: 29.17,
    15: 29.17,
    16: 34.07,
    17: 34.07,
    18: 34.07,
    19: 34.07,
    20: 34.07,
    21: 40.13,
    22: 40.13,
    23: 40.13,
    24: 40.13,
    25: 40.13,
    26: 40.13,
    27: 40.13,
    28: 40.13,
    29: 40.13,
    30: 40.13,
    40: 53.47,
    50: 87.38,
    60: 117.67,
    70: 146.73,
    80: 158.85,
    90: 170.97,
    100: 183.09,
  },
  Italy: {
    0.5: 8.01,
    1: 8.01,
    1.5: 8.01,
    2: 8.01,
    2.5: 8.01,
    3: 8.01,
    3.5: 9.78,
    4: 9.78,
    4.5: 9.78,
    5: 9.78,
    5.5: 11.06,
    6: 11.06,
    6.5: 11.06,
    7: 11.06,
    7.5: 11.06,
    8: 11.06,
    8.5: 11.06,
    9: 11.06,
    9.5: 11.06,
    10: 11.06,
    11: 16.4,
    12: 16.4,
    13: 16.4,
    14: 16.4,
    15: 16.4,
    16: 16.4,
    17: 16.4,
    18: 16.4,
    19: 16.4,
    20: 16.4,
    21: 20.57,
    22: 20.57,
    23: 20.57,
    24: 20.57,
    25: 20.57,
    26: 20.57,
    27: 20.57,
    28: 20.57,
    29: 20.57,
    30: 20.57,
    40: 34.37,
    50: 48.17,
    60: 61.97,
    70: 75.77,
  },
};
