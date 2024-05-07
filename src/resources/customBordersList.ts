import { getRandomElement } from "~/lib/utils";

const flowers = [
  [
    `flower-1-white.svg`,
    `flower-1-orange.svg`,
    `flower-1-blue.svg`,
    `flower-1-red.svg`,
  ],
  [
    `flower-2-white.svg`,
    `flower-2-orange.svg`,
    `flower-2-blue.svg`,
    `flower-2-red.svg`,
  ],
  ["fiore3.svg"],
  [
    `flower-4-white.svg`,
    `flower-4-orange.svg`,
    `flower-4-blue.svg`,
    `flower-4-red.svg`,
  ],
] as const;

export const TOP_LEFT = "-top-6 -left-5";
export const TOP_LEFT_2 = "-top-6 left-1";
export const TOP_LEFT_3 = "top-1 -left-5";
// export const TOP_RIGHT = "-top-7 -right-5";
export const BOTTOM_LEFT = "-bottom-7 -left-5";
export const BOTTOM_RIGHT = "-bottom-7 -right-6";
export const BOTTOM_RIGHT_2 = "-bottom-7 right-0";
export const BOTTOM_RIGHT_3 = "bottom-0 -right-6";

const sizes = [32, 35, 37] as const;
// const extraFlowers = [0, 1, 2, 3];
// const positions =

export function getRandomCustomBorder(
  positions = [
    TOP_LEFT,
    TOP_LEFT_2,
    TOP_LEFT_3,
    BOTTOM_RIGHT,
    BOTTOM_RIGHT_2,
    BOTTOM_RIGHT_3,
  ],
) {
  const flowerType = getRandomElement(flowers) ?? flowers[0];

  return positions.map((position) => ({
    src: getRandomElement(flowerType),
    position,
    size: getRandomElement(sizes),
  }));
}
