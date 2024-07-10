"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function setHasCookiesConsent(consent: boolean) {
  try {
    if (consent) {
      cookies().set({
        name: "hasCookiesConsent",
        value: "true",
        httpOnly: true,
        path: "/",
      });
    } else {
      cookies().delete("hasCookiesConsent");
    }
  } catch (err) {
    console.error("Something went wrong", err);
    return new NextResponse("Internal server Error", { status: 500 });
  }
}
