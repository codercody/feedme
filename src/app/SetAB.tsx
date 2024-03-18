"use server";

import { cookies } from "next/headers";

export async function setACookie(a: string) {
  "use server";
  cookies().set("a", a);
}

export async function setBCookie(b: string) {
  "use server";
  cookies().set("b", b);
}
