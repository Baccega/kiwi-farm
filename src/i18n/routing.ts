import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

// A list of all locales that are supported
export const AVAILABLE_LOCALES = ["it", "en"];

export const routing = defineRouting({
  locales: AVAILABLE_LOCALES,

  defaultLocale: "it",
});

export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
