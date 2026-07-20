import Image from "next/image";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Factory,
  FileText,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { BlogExplorer } from "@/components/BlogExplorer";
import { ContactForm } from "@/components/ContactForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { IndustryGrid } from "@/components/IndustryGrid";
import { LocationMap } from "@/components/LocationMap";
import { PalletVisualizer } from "@/components/PalletVisualizer";
import { ProjectGallery } from "@/components/ProjectGallery";
import { QuoteWizard } from "@/components/QuoteWizard";
import { RackConfigurator } from "@/components/RackConfigurator";
import { PreviewImage } from "@/components/ImagePreview";
import {
  blogPosts,
  company,
  editableStats,
  industries,
  packagingProcess,
  routes,
  services,
  trustPlaceholders,
  whatsappLink,
  whatsappMessages,
  whyChoose,
} from "@/lib/siteData";

const heroStatIcons = [ShieldCheck, Factory, MapPin];
const serviceHeroVariants = {
  "ispm-15-wooden-pallets": "zoom",
  "export-packaging": "tilt",
  "warehouse-racking": "pan",
  "waste-management": "scan",
  "warehouse-leasing": "lift",
  "pre-leased-investments": "stamp",
  "industrial-land": "pan",
  "factory-setup": "scan",
};

function serviceHeroVariant(slug) {
  return serviceHeroVariants[slug] || "lift";
}

export function PublicPage({ slug }) {
  const service = services.find((item) => item.slug === slug);
  if (service) return <ServicePage service={service} />;

  switch (slug) {
    case "about-us":
      return <AboutPage />;
    case "services":
      return <ServicesPage />;
    case "industries-we-serve":
      return <IndustriesPage />;
    case "projects-and-gallery":
      return <ProjectsPage />;
    case "certifications-and-quality":
      return <CertificationsPage />;
    case "service-locations":
      return <LocationsPage />;
    case "investment-opportunities":
      return <ServicePage service={services.find((item) => item.slug === "pre-leased-investments")} />;
    case "blog":
    case "insights":
      return <InsightsPage />;
    case "request-a-quote":
      return <QuotePage />;
    case "contact-us":
      return <ContactPage />;
    case "privacy-policy":
      return <PrivacyPage />;
    case "terms-and-conditions":
      return <TermsPage />;
    case "sitemap":
      return <SitemapPage />;
    default:
      return null;
  }
}

export function PageHero({
  eyebrow,
  title,
  description,
  cta,
  image = "/images/aayat-warehouse-exterior.jpg",
  imagePosition = "center",
  stats = ["ISPM-15 Ready", "500 Pallets/Day", "Pan-India"],
  variant = "lift",
}) {
  return (
    <section
      className={`page-hero page-hero-${variant}`}
      style={{
        "--page-hero-bg": `url("${image}")`,
        "--hero-image-position": imagePosition,
      }}
    >
      <div className="container page-hero-inner">
        <div className="section-heading">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          {cta}
        </div>
        <div className="page-hero-visual" aria-hidden="true">
          <Image src={image} alt="" fill unoptimized sizes="(max-width: 900px) 100vw, 34vw" />
          <div className="page-hero-stats">
            {stats.map((item, index) => {
              const Icon = heroStatIcons[index % heroStatIcons.length];
              return (
                <span key={item}>
                  <Icon size={16} aria-hidden="true" /> {item}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About AAYAT"
        title="Manufacturer and supplier of ISPM-15 pallets, export packaging, and industrial support."
        description="Established in 2020, AAYAT Integrated Solutions serves corporates, MNCs, exporters, manufacturers, logistics teams, and warehouse operators across India."
        cta={<Link href="/request-a-quote" className="btn btn-primary">Schedule a Consultation</Link>}
        image="/images/aayat-warehouse-exterior.jpg"
        stats={["Bhiwandi Base", "500 Pallets/Day", "MNC Support"]}
        variant="lift"
      />
      <section className="section">
        <div className="container intro-grid">
          <div className="section-heading">
            <h2>Reliable Support for Industrial Requirements</h2>
            <p>
              AAYAT Pallet is equipped for ISPM-15 heat-treated pinewood pallets, EPAL / EURO pallets, custom crates, industrial packaging works, waste management, warehouse racking, leasing, land acquisition, and factory setup support.
            </p>
            <p>
              Primary location: {company.primaryLocation}. Manufacturing capacity: 500 pallets per day.
            </p>
            <div className="tag-list">
              {company.coverage.map((item) => <span className="tag" key={item}>{item}</span>)}
            </div>
          </div>
          <div className="stats-grid">
            {editableStats.map((stat) => (
              <article className="stat-card card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
                <small>AAYAT company detail</small>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section compact">
        <div className="container grid three">
          {whyChoose.slice(0, 9).map((item) => (
            <article className="card mini-card" key={item}>
              <CheckCircle2 size={20} aria-hidden="true" />
              <h3>{item}</h3>
              <p>Requirement-led support for B2B teams that need clarity, speed, and accountable coordination.</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Packaging, warehousing, waste management, property, and factory setup support."
        description="Explore ISPM-15 pallets, export boxes, crates, racking systems, warehouse leasing, pre-leased investment support, industrial land acquisition, and factory setup assistance."
        cta={<Link href="/request-a-quote" className="btn btn-primary">Submit Requirements</Link>}
        image="/images/aayat-pallet-frame.jpg"
        stats={["Pallets", "Crates", "Racking"]}
        variant="pan"
      />
      <section className="section">
        <div className="container grid three">
          {services.map((service) => (
            <article className="service-card card" key={service.slug}>
              <div className="service-icon" style={{ color: service.accent }}>
                <service.Icon size={26} aria-hidden="true" />
              </div>
              <div className="industrial-media small">
                <PreviewImage src={service.image} alt={service.imageAlt} label={service.title} sizes="(max-width: 760px) 100vw, 31vw" />
                <span>{service.category}</span>
              </div>
              <h2>{service.title}</h2>
              <p>{service.summary}</p>
              <div className="button-row">
                <Link className="btn btn-secondary" href={`/services/${service.slug}`}>View Service</Link>
                <Link className="btn btn-primary" href={`/request-a-quote?service=${encodeURIComponent(service.title)}`}>Request Quote</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ServicePage({ service }) {
  const message = whatsappMessages[service.messageKey] || whatsappMessages.general;
  return (
    <>
      <PageHero
        eyebrow={service.category}
        title={service.title}
        description={service.summary}
        image={service.image}
        stats={[service.category, "Quote Ready", "Pan-India"]}
        variant={serviceHeroVariant(service.slug)}
        cta={
          <div className="button-row">
            <Link href={`/request-a-quote?service=${encodeURIComponent(service.title)}`} className="btn btn-primary">Request Quote</Link>
            <a href={whatsappLink(message)} className="btn btn-ghost" target="_blank" rel="noreferrer"><Send size={17} aria-hidden="true" /> WhatsApp CTA</a>
            <a href={company.phoneHref} className="btn btn-secondary"><Phone size={17} aria-hidden="true" /> Call CTA</a>
          </div>
        }
      />
      <section className="section">
        <div className="container service-detail-grid">
          <div className="glass-panel service-visual">
            <div className="industrial-media tall">
              <PreviewImage src={service.image} alt={service.imageAlt} label={service.title} sizes="(max-width: 900px) 100vw, 44vw" />
              <span>{service.title}</span>
            </div>
            {service.slug === "ispm-15-wooden-pallets" ? <PalletVisualizer /> : null}
            {service.slug === "warehouse-racking" ? <RackConfigurator /> : null}
          </div>
          <div className="service-detail-copy">
            <ContentList title="Problems this solves" items={service.problems} />
            <ContentList title="Types of solutions offered" items={service.solutions} />
            <ContentList title="Quality standards" items={service.quality} />
          </div>
        </div>
      </section>
      <section className="section compact">
        <div className="container grid three">
          <InfoBlock title="Industries served" items={industries.slice(0, 9)} />
          <InfoBlock title="Benefits" items={["Requirement-based quotation", "Professional coordination", "Service-specific consultation", "Clear next steps"]} />
          <InfoBlock title="Related services" items={services.filter((item) => item.slug !== service.slug).slice(0, 4).map((item) => item.title)} />
        </div>
      </section>
      <section className="section compact process-band">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Process</span>
            <h2>{service.slug === "export-packaging" ? "Export Packaging Process" : "Project Process"}</h2>
          </div>
          <ol className="process-rail">
            {(service.slug === "export-packaging" ? packagingProcess : ["Consultation", "Assessment", "Proposal", "Execution", "Quality Check", "Support"]).map((step) => (
              <li key={step}><span><CheckCircle2 size={18} /></span><strong>{step}</strong></li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Project gallery</span>
            <h2>Relevant Project Examples</h2>
          </div>
          <ProjectGallery />
        </div>
      </section>
      <section className="section compact">
        <div className="container faq-grid">
          <div className="section-heading">
            <span className="eyebrow">Service FAQ</span>
            <h2>Common questions</h2>
            <ul className="check-list">
              {service.faqs.map((faq) => <li key={faq}>{faq}</li>)}
            </ul>
          </div>
          <FaqAccordion />
        </div>
      </section>
      <section className="section compact">
        <div className="container quote-inline glass-panel">
          <div>
            <h2>Ready to discuss {service.title.toLowerCase()}?</h2>
            <p>Share your dimensions, load, location, budget, drawings, photos, or timeline with AAYAT.</p>
          </div>
          <Link href={`/request-a-quote?service=${encodeURIComponent(service.title)}`} className="btn btn-primary">Open Quote Form</Link>
        </div>
      </section>
    </>
  );
}

function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Industrial services aligned to sector-specific needs."
        description="Each industry card opens a service-fit modal with relevant AAYAT support areas."
        image="/images/web-industrial-forklift-worker.jpg"
        stats={["Sector Fit", "B2B Flow", "Ops Support"]}
        variant="scan"
      />
      <section className="section">
        <div className="container">
          <IndustryGrid />
        </div>
      </section>
    </>
  );
}

function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects and gallery"
        title="Real AAYAT gallery images with older industrial visuals retained."
        description="Browse pallets, export crates, warehouse racking, warehouse property, and legacy industrial visuals in one filterable gallery."
        image="/images/web-warehouse-pallet-forklift.jpg"
        stats={["Real Gallery", "Project Proof", "Image Preview"]}
        variant="zoom"
      />
      <section className="section">
        <div className="container">
          <ProjectGallery />
        </div>
      </section>
    </>
  );
}

function CertificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Certifications and quality"
        title="Quality-first execution with verified proof points kept editable."
        description="No unverified certificate, membership, or client badge is presented as fact. Add approved evidence through the admin dashboard."
        image="/images/aayat-premium-bin-poster.jpg"
        stats={["Export Quality", "Proof Ready", "Editable"]}
        variant="stamp"
      />
      <section className="section">
        <div className="container grid three">
          {trustPlaceholders.map((item) => (
            <article className="card mini-card" key={item}>
              <Award size={24} aria-hidden="true" />
              <h2>{item}</h2>
              <p>Replace with a verified document, logo, membership, or certification record before publishing as proof.</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="Bhiwandi base with Mumbai, Pune, Gujarat, MP, and Pan-India coverage."
        description={company.primaryLocation}
        image="/images/aayat-warehouse-racking.jpg"
        stats={["Bhiwandi", "Mumbai", "Pan-India"]}
        variant="pan"
      />
      <section className="section">
        <div className="container">
          <LocationMap />
        </div>
      </section>
    </>
  );
}

function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="SEO-ready industrial knowledge base for serious B2B buyers."
        description="Draft article records include categories, tags-ready structure, author, date, reading time, social sharing, and schema-ready metadata."
        image="/images/wooden-crates.jpg"
        stats={["Insights", "SEO Ready", "B2B Buyers"]}
        variant="scan"
      />
      <section className="section">
        <div className="container">
          <BlogExplorer />
        </div>
      </section>
      <section className="section compact">
        <div className="container grid three">
          {blogPosts.slice(0, 3).map((post) => (
            <article className="card mini-card" key={post.slug} id={post.slug}>
              <FileText size={22} aria-hidden="true" />
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="A complete multi-step quotation flow."
        description="Select the service, add requirement details, share contact information, upload documents, review, and submit."
        image="/images/aayat-open-crate.jpg"
        stats={["Step Flow", "Upload Ready", "Fast Review"]}
        variant="tilt"
      />
      <section className="section">
        <div className="container">
          <QuoteWizard />
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach AAYAT for pallets, export packaging, waste, warehouse, and factory support."
        description="Call, WhatsApp, email, request a callback, or share a service requirement for Bhiwandi, Mumbai, Pune, Gujarat, MP, and Pan-India support."
        image="/images/web-yellow-forklift.jpg"
        stats={["Call", "WhatsApp", "Email"]}
        variant="lift"
      />
      <section className="section">
        <div className="container contact-grid">
          <div className="contact-card glass-panel">
            <h2>Contact information</h2>
            <a href={company.phoneHref}><Phone size={18} aria-hidden="true" /> {company.phone}</a>
            <a href={whatsappLink()} target="_blank" rel="noreferrer"><Send size={18} aria-hidden="true" /> {company.whatsapp}</a>
            {company.emails.map((email) => (
              <a href={`mailto:${email}`} key={email}><Mail size={18} aria-hidden="true" /> {email}</a>
            ))}
            <p><Globe2 size={18} aria-hidden="true" /> {company.coverage.join(", ")}</p>
            <p><ShieldCheck size={18} aria-hidden="true" /> Established {company.established}. Manufacturing capacity: 500 pallets per day.</p>
            <p><MapPin size={18} aria-hidden="true" /> {company.primaryLocation}</p>
            <div className="button-row">
              <a className="btn btn-primary" href={company.phoneHref}>Call Now</a>
              <a className="btn btn-ghost" href={whatsappLink()} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
          <div className="glass-panel contact-form-panel">
            <h2>Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
      <section className="section compact" id="map">
        <div className="container">
          <LocationMap />
        </div>
      </section>
    </>
  );
}

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy Policy"
        title="Privacy Policy"
        description="How enquiry, contact, upload, and admin data should be handled for this website."
        image="/images/industrial-pallets.jpg"
        stats={["Forms", "Uploads", "Data Care"]}
        variant="scan"
      />
      <PolicyContent title="Privacy Policy" />
    </>
  );
}

function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms and Conditions"
        title="Terms and Conditions"
        description="Business website terms for enquiries, quotations, site visits, downloadable material, and informational content."
        image="/images/warehouse-aisle.jpg"
        stats={["Quotes", "Site Visits", "Scope"]}
        variant="pan"
      />
      <PolicyContent title="Terms and Conditions" />
    </>
  );
}

function SitemapPage() {
  return (
    <>
      <PageHero
        eyebrow="Sitemap"
        title="AAYAT website sitemap"
        description="Quick access to core pages, service detail pages, contact routes, and industrial insights."
        image="/images/wooden-pallets.jpg"
        stats={["Pages", "Services", "Contact"]}
        variant="zoom"
      />
      <section className="section">
        <div className="container grid three">
          <ContentList title="Pages" items={routes.map((route) => route.label)} />
          <ContentList title="Services" items={services.map((service) => service.title)} />
          <InfoBlock title="Contact paths" items={["Request a Quote", "Contact Us", "WhatsApp", "Call Now"]} />
        </div>
      </section>
    </>
  );
}

function PolicyContent({ title }) {
  const items =
    title === "Privacy Policy"
      ? [
          "Form submissions are processed for quotation, callback, and business communication purposes.",
          "Uploaded files are validated by type and size before storage or transfer to Cloudinary when configured.",
          "Email and database services require private environment variables and should not expose credentials in the browser.",
          "Client logos, testimonials, certifications, and addresses should be published only after permission and verification.",
        ]
      : [
          "All quotations are requirement-based and subject to final review by AAYAT Integrated Solutions.",
          "Website content is informational and should not be treated as a guaranteed investment return, legal opinion, or final technical specification.",
          "Demo projects, testimonials, properties, and statistics must be replaced with verified client-approved data before public use.",
          "Site visits, delivery timelines, and service availability depend on scope, location, documentation, and operational feasibility.",
        ];
  return (
    <section className="section">
      <div className="container narrow policy-card glass-panel">
        <h2>{title}</h2>
        <ul className="check-list">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </section>
  );
}

function ContentList({ title, items }) {
  return (
    <section className="card content-list">
      <h2>{title}</h2>
      <ul className="check-list">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

function InfoBlock({ title, items }) {
  return (
    <article className="card mini-card">
      <Factory size={22} aria-hidden="true" />
      <h2>{title}</h2>
      <ul className="check-list">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}
