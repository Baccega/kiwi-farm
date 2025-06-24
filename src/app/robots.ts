import { type MetadataRoute } from "next";
import { AVAILABLE_LOCALES } from "~/i18n/routing";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        ...AVAILABLE_LOCALES.map((loc) => `/${loc}/checkout`),
        ...AVAILABLE_LOCALES.map((loc) => `/${loc}/basket`),
      ],
    },
    sitemap: "https://legiumelle.com/sitemap.xml",
  };
}

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "error";
