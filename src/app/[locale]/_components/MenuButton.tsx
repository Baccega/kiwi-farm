"use client";

import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Navigation } from "./Navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Menu } from "lucide-react";

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return {
    props: {
      open: isOpen,
      onOpenChange: setIsOpen,
    },
    trigger: () => setIsOpen(true),
    dismiss: () => setIsOpen(false),
  };
}

export default function MenuButton(props: { locale: string }) {
  const menuDialog = useDialog();

  function handleLinkClick() {
    menuDialog.dismiss();
  }

  return (
    <>
      <Navigation
        className="hidden @3xl/header:flex"
        onLinkClick={handleLinkClick}
        locale={props.locale}
      />
      <Sheet {...menuDialog.props}>
        <SheetContent>
          <Navigation
            locale={props.locale}
            variant="vertical"
            onLinkClick={handleLinkClick}
          />
        </SheetContent>
        <SheetTrigger
          asChild
          onClick={menuDialog.trigger}
          className="@3xl/header:hidden"
        >
          <Button variant={"ghost"} size={"icon"}>
            <Menu className="fill-primary" />
          </Button>
        </SheetTrigger>
      </Sheet>
    </>
  );
}
