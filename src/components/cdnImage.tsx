"use client";

import { twicpicsLoader } from "@twicpics/components/next";
import Image, { type ImageProps } from "next/image";

export default function CdnImage(props: ImageProps) {
  return <Image loader={twicpicsLoader} {...props} alt={props?.alt ?? ""} />;
}
