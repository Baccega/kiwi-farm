"use client";

import { Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";
import { AVAILABLE_LOCALES } from "~/middleware";

export default function LanguageSwitcher(props: { locale: string }) {
  const [selectedLanguage, setSelectedLanguage] = useState(props.locale);
  const router = useRouter();
  const pathname = usePathname();

  function handleLanguageChange(locale: string) {
    const path = pathname.slice(4);
    setSelectedLanguage(locale);
    router.push(`/${locale}/${path}`);
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-8">
        <DropdownMenuRadioGroup
          value={selectedLanguage}
          onValueChange={handleLanguageChange}
        >
          {AVAILABLE_LOCALES.map((locale) => (
            <DropdownMenuRadioItem
              className={cn(
                "h-12",
                selectedLanguage === locale && "bg-primary-60 text-white",
              )}
              key={locale}
              value={locale}
            >
              {locale.toUpperCase()}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
