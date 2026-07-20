import { notFound } from "next/navigation";
import { PublicPage } from "@/components/PageTemplates";
import { servicePageList, services } from "@/lib/siteData";

export function generateStaticParams() {
  return servicePageList.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.title} | AAYAT Integrated Solutions`,
      description: service.summary,
      url: `/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  if (!servicePageList.some((page) => page.slug === slug)) notFound();
  const page = PublicPage({ slug });
  if (!page) notFound();
  return page;
}
