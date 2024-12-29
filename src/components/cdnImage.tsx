"use client";

import { twicpicsLoader } from "@twicpics/components/next";
import Image, { type ImageProps } from "next/image";

export default function CdnImage(props: ImageProps) {
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    return <Image loader={twicpicsLoader} {...props} alt={props?.alt ?? ""} />;
  }

  return <Image {...props} alt={props?.alt ?? ""} />;
}
