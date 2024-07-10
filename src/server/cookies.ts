"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function setHasCookiesConsent() {
  try {
    cookies().set({
      name: "hasCookiesConsent",
      value: "true",
      httpOnly: true,
      path: "/",
    });
  } catch (err) {
    console.error("Something went wrong", err);
    return new NextResponse("Internal server Error", { status: 500 });
  }
}
