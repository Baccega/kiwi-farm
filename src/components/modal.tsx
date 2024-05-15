"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Dialog, DialogContent } from "./ui/dialog";

export function Modal({ children }: { children: React.ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(true);
  const router = useRouter();

  function handleOpenChange(newState: boolean) {
    setDialogOpen(newState);
    if (!newState) {
      router.back();
    }
  }

  return createPortal(
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent>{children}</DialogContent>
    </Dialog>,
    document.getElementById("modal-root")!,
  );
}
