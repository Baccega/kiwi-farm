import { type MetadataRoute } from "next";
import { getAllProductsSlugs } from "~/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const PATHS = [
    "/",
    "/services/dog-training",
    "/services/farmers-market",
    "/services/self-picking",
    "/terms-and-conditions",
    "/privacy",
    "/contacts",
    "/returns",
    ...getAllProductsSlugs().map((cur) => `/products/${cur}`),
  ];

  return PATHS.map((path) => ({
    url: `https://legiumelle.com/it${path}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `https://legiumelle.com/en${path}`,
      },
    },
  }));
}

// import type { MetadataRoute } from "next";
// import { getPathname, routing } from "~/i18n/routing";
// import { host } from "~/config";
// import type { Locale } from "~/i18n/routing";

// export default function sitemap(): MetadataRoute.Sitemap {
//   return [getEntry("/"), getEntry("/pathnames")];
// }

// type Href = Parameters<typeof getPathname>[0]["href"];

// function getEntry(href: Href) {
//   return {
//     url: getUrl(href, routing.defaultLocale),
//     alternates: {
//       languages: Object.fromEntries(
//         routing.locales.map((locale) => [locale, getUrl(href, locale)]),
//       ),
//     },
//   };
// }

// function getUrl(href: Href, locale: Locale) {
//   const pathname = getPathname({ locale, href });
//   return host + pathname;
// }

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "error";
