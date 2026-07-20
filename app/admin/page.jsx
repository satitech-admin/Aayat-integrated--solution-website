import { cookies } from "next/headers";
import { AdminDashboard } from "@/components/AdminDashboard";
import { AdminLogin } from "@/components/AdminLogin";
import { adminCookieName, verifyAdminSession } from "@/lib/server/auth";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Admin Dashboard",
  description: "Secure AAYAT admin dashboard for enquiries, content, and lead management.",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const store = await cookies();
  const authed = verifyAdminSession(store.get(adminCookieName)?.value);
  return authed ? <AdminDashboard /> : <AdminLogin />;
}
