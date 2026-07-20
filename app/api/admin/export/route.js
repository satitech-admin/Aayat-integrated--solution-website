import { cookies } from "next/headers";
import { adminCookieName, verifyAdminSession } from "@/lib/server/auth";
import { listEnquiries } from "@/lib/server/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const store = await cookies();
  if (!verifyAdminSession(store.get(adminCookieName)?.value)) {
    return new Response("Unauthorized", { status: 401 });
  }
  const enquiries = await listEnquiries();
  const headers = ["reference", "service", "fullName", "companyName", "phone", "email", "city", "status", "createdAt"];
  const rows = [
    headers.join(","),
    ...enquiries.map((lead) =>
      headers
        .map((key) => `"${String(lead[key] ?? "").replace(/"/g, '""')}"`)
        .join(",")
    ),
  ];
  return new Response(rows.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="aayat-enquiries.csv"',
    },
  });
}
