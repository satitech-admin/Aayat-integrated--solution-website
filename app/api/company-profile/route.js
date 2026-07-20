export const runtime = "nodejs";

export async function GET() {
  const body = [
    "AAYAT Integrated Solutions",
    "",
    "Company profile placeholder",
    "",
    "Replace this generated placeholder with the client-approved PDF brochure in production.",
    "",
    "Services: wooden pallets, export packaging, warehousing systems, warehouse leasing and sales, pre-leased investment support, industrial land, factory setup, and waste management.",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="aayat-company-profile-placeholder.txt"',
    },
  });
}
