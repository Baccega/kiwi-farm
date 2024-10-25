import { type MetadataRoute } from "next";

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
  ];

  return PATHS.map((path) => ({
    url: `https://legiumelle.it/it${path}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `https://legiumelle.it/en${path}`,
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
