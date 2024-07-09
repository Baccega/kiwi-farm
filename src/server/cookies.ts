'use server' 
import { cookies } from 'next/headers'

export default async function setHasCookiesConsent() {
  cookies().set({
    name: "hasCookiesConsent",
    value: "true",
    httpOnly: true,
    path: "/",
  });
}
