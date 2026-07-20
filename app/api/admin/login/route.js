import { NextResponse } from "next/server";
import { adminCookieName, createAdminSession, validateAdminCode } from "@/lib/server/auth";
import { adminLoginSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request) {
  const body = await request.json();
  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success || !validateAdminCode(parsed.data.code)) {
    return NextResponse.json({ error: "Invalid admin access code." }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName, createAdminSession(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
