import { notFound } from "next/navigation";
import { PublicPage } from "@/components/PageTemplates";
import { pageList, services } from "@/lib/siteData";

export function generateStaticParams() {
  return pageList.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = pageList.find((item) => item.slug === slug);
  const service = services.find((item) => item.slug === slug);
  if (!page) return {};
  const description = service
    ? service.summary
    : `${page.title} for AAYAT Integrated Solutions, covering industrial packaging, warehousing, property, waste management, and factory setup support.`;
  return {
    title: page.title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: `${page.title} | AAYAT Integrated Solutions`,
      description,
      url: `/${slug}`,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!pageList.some((page) => page.slug === slug)) notFound();
  const page = PublicPage({ slug });
  if (!page) notFound();
  return page;
}
