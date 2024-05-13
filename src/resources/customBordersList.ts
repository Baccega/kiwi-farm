import { getRandomElement } from "~/lib/utils";

const flowers = [
  "flower-1-mono.svg",
  "flower-2-mono.svg",
  "flower-3-mono.svg",
  "flower-4-mono.svg",
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

  return positions.map((position) => ({
    src: getRandomElement(flowers) ?? flowers[0],
    position,
    size: getRandomElement(sizes),
  }));
}
