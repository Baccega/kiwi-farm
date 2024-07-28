import createMiddleware from "next-intl/middleware";

// A list of all locales that are supported
export const AVAILABLE_LOCALES = ["it", "en"];

export default createMiddleware({
  locales: AVAILABLE_LOCALES,

  // Used when no locale matches
  defaultLocale: "it",
});

export const config = {
  matcher: ["/", "/(it|en)/:path*"],
};
