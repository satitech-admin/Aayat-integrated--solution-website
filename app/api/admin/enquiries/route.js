import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminCookieName, verifyAdminSession } from "@/lib/server/auth";
import { listEnquiries, updateEnquiry } from "@/lib/server/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function requireAdmin() {
  const store = await cookies();
  return verifyAdminSession(store.get(adminCookieName)?.value);
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const enquiries = await listEnquiries();
  return NextResponse.json({ enquiries });
}

export async function PATCH(request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  if (!body.reference) return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  const enquiry = await updateEnquiry(body.reference, body.status, body.note);
  return NextResponse.json({ enquiry });
}
