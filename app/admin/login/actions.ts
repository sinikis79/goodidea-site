"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createAdminSessionCookie,
  verifyAdminPassword,
} from "@/lib/admin/session";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(createAdminSessionCookie());

  redirect("/admin");
}
