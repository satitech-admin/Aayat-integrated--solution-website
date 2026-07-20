import { pageList, servicePageList } from "@/lib/siteData";

export default function sitemap() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://aayat-integrated-solutions.vercel.app";
  const now = new Date();
  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pageList.map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified: now,
      changeFrequency: page.slug === "blog" ? "weekly" : "monthly",
      priority: page.slug === "request-a-quote" || page.slug === "contact-us" ? 0.95 : 0.75,
    })),
    ...servicePageList.map((page) => ({
      url: `${siteUrl}/services/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    })),
  ];
}
