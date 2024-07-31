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

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "error";
