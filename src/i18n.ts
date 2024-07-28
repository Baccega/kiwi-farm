import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { AVAILABLE_LOCALES } from "./middleware";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!AVAILABLE_LOCALES.includes(locale)) notFound();

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    messages: (await import(`../messages/${locale}.json`))?.default,
  };
});
