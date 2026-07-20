import { company, faqs, services } from "@/lib/siteData";

export function StructuredData() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://aayat-integrated-solutions.vercel.app";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: company.name,
      url: siteUrl,
      email: company.emails,
      telephone: company.phone,
      areaServed: company.coverage,
      description: company.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: company.name,
      telephone: company.phone,
      email: company.emails[0],
      areaServed: company.coverage,
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressLocality: "Address pending client verification",
      },
    },
    ...services.map((service) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      provider: { "@type": "Organization", name: company.name },
      areaServed: company.coverage,
      description: service.summary,
      url: `${siteUrl}/services/${service.slug}`,
    })),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
