import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "dasibom_admin_session";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

type AdminSessionCookie = {
  name: string;
  value: string;
  httpOnly: true;
  sameSite: "lax";
  secure: boolean;
  path: "/";
  maxAge: number;
};

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

export function verifyAdminPassword(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return false;
  }

  return safeEqual(password, adminPassword);
}

export function createAdminSessionCookie(): AdminSessionCookie {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `admin.${expiresAt}`;
  const signature = sign(payload);

  return {
    name: ADMIN_SESSION_COOKIE,
    value: `${payload}.${signature}`,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

export function verifyAdminSessionValue(value?: string) {
  if (!value || !getSessionSecret()) {
    return false;
  }

  const [role, expiresAt, signature] = value.split(".");

  if (role !== "admin" || !expiresAt || !signature) {
    return false;
  }

  if (Number(expiresAt) <= Date.now()) {
    return false;
  }

  return safeEqual(sign(`${role}.${expiresAt}`), signature);
}

export async function hasAdminSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_SESSION_COOKIE);

  return verifyAdminSessionValue(sessionCookie?.value);
}
