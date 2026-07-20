"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Download,
  Factory,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Warehouse,
} from "lucide-react";
import { HeroScene } from "@/components/HeroScene";
import { PalletVisualizer } from "@/components/PalletVisualizer";
import { RackConfigurator } from "@/components/RackConfigurator";
import { ProjectGallery } from "@/components/ProjectGallery";
import { LocationMap } from "@/components/LocationMap";
import { IndustryGrid } from "@/components/IndustryGrid";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ContactForm } from "@/components/ContactForm";
import { PreviewImage } from "@/components/ImagePreview";
import {
  businessHighlights,
  collaborationServices,
  company,
  editableStats,
  factorySteps,
  packagingProcess,
  processSteps,
  propertyDemo,
  services,
  trustPlaceholders,
  wasteStreams,
  whatsappLink,
  whatsappMessages,
  whyChoose,
} from "@/lib/siteData";

export function HomePage() {
  return (
    <>
      <section className="hero">
        <HeroScene />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <ShieldCheck size={15} aria-hidden="true" /> Manufacturer and supplier since {company.established}
            </span>
            <h1>
              ISPM-15 Pallets, Export Packaging & Industrial Support
            </h1>
            <p className="lead">
              AAYAT Integrated Solutions (AAYAT Pallet) supports reputed corporates, MNCs, exporters, manufacturers, logistics teams, and growing businesses with compliance-ready packaging, warehouse infrastructure, waste management, property support, and factory setup assistance across India.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary magnetic" href="/request-a-quote">
                Request Services <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="btn btn-secondary" href="/projects-and-gallery">
                View Real Gallery
              </Link>
              <a className="btn btn-ghost" href={whatsappLink(whatsappMessages.general)} target="_blank" rel="noreferrer">
                <Send size={17} aria-hidden="true" /> Call / WhatsApp Now
              </a>
            </div>
            <div className="trust-chips">
              <span>
                <Phone size={15} aria-hidden="true" /> {company.phone}
              </span>
              <span>
                <Factory size={15} aria-hidden="true" /> 500 pallets/day
              </span>
              <span>
                <Globe2 size={15} aria-hidden="true" /> {company.followers}
              </span>
              <span>
                <Award size={15} aria-hidden="true" /> {company.teamSize}
              </span>
              <span>
                <CheckCircle2 size={15} aria-hidden="true" /> ISPM-15 export quality
              </span>
              <span>
                <Warehouse size={15} aria-hidden="true" /> Bhiwandi, Maharashtra
              </span>
            </div>
            <div className="hero-proof-grid" aria-label="AAYAT capability highlights">
              {businessHighlights.slice(0, 3).map((item) => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>
          </div>
        </div>
        <a className="scroll-indicator" href="#trust-strip" aria-label="Scroll to trust strip">
          <ArrowDown size={18} aria-hidden="true" />
        </a>
      </section>

      <MarqueeBand />

      <section className="trust-strip" id="trust-strip" data-reveal>
        <div className="container trust-grid">
          {trustPlaceholders.map((item) => (
            <div className="trust-placeholder" key={item}>
              <Sparkles size={16} aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="container intro-grid">
          <div className="section-heading">
            <span className="eyebrow">Company introduction</span>
            <h2>One Partner for Industrial Growth</h2>
            <p>
              Established in 2020, AAYAT has been serving reputed corporates, MNCs, and export-oriented organizations with high-quality packaging solutions designed to minimize transit risk, simplify customs clearance, and keep dispatch schedules moving.
            </p>
            <p>
              Primary location: {company.primaryLocation}. Service coverage includes {company.coverage.join(", ")}.
            </p>
            <Link href="/request-a-quote" className="btn btn-primary">
              Schedule a Consultation
            </Link>
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

      <section className="section compact collaboration-section" data-reveal>
        <div className="container collaboration-panel glass-panel">
          <div className="section-heading">
            <span className="eyebrow">Business collaboration proposal</span>
            <h2>Built for Export, Storage, Scrap Flow and Scale</h2>
            <p>
              AAYAT is equipped for bulk volumes, long-term rate contracts, recurring dispatch schedules, and urgent export requirements while maintaining strict quality standards and on-time delivery.
            </p>
            <div className="tag-list">
              <span className="tag"><Mail size={14} aria-hidden="true" /> {company.emails[0]}</span>
              <span className="tag"><Mail size={14} aria-hidden="true" /> {company.emails[1]}</span>
            </div>
          </div>
          <div className="offering-grid">
            {collaborationServices.map((group) => (
              <article className="offering-card card" key={group.title}>
                <h3>{group.title}</h3>
                <ul className="check-list">
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <div className="waste-stream-panel">
            <strong>Non-hazardous scrap streams handled</strong>
            <div className="tag-list">
              {wasteStreams.map((item) => <span className="tag" key={item}>{item}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section service-showcase" data-reveal>
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">Services showcase</span>
            <h2>Core Services for Industrial Operations</h2>
            <p>Each service path is designed for quick enquiry, consultative scope capture, and clean handoff to the AAYAT operations team.</p>
          </div>
          <div className="grid three service-card-grid">
            {services.map((service) => (
              <article className="service-card card" key={service.slug}>
                <div className="service-icon" style={{ color: service.accent }}>
                  <service.Icon size={25} aria-hidden="true" />
                </div>
                <div className="industrial-media small">
                  <PreviewImage src={service.image} alt={service.imageAlt} label={service.title} sizes="(max-width: 760px) 100vw, 31vw" />
                  <span>{service.category}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <div className="button-row">
                  <Link className="btn btn-secondary" href={`/services/${service.slug}`}>
                    Learn More
                  </Link>
                  <Link className="btn btn-primary" href={`/request-a-quote?service=${encodeURIComponent(service.title)}`}>
                    Request Quote
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section compact" data-reveal>
        <div className="container">
          <PalletVisualizer />
        </div>
      </section>

      <section className="section process-band" data-reveal id="export-packaging-process">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Export packaging</span>
            <h2>Export Packaging Planned for Safe Transit</h2>
            <p>Wooden boxes, export crates, heavy machinery packaging, on-site packing, vacuum packing, shrink wrapping, corrosion protection, industrial equipment packing, and containerization support.</p>
          </div>
          <ProcessRail steps={packagingProcess} />
        </div>
      </section>

      <section className="section compact" data-reveal>
        <div className="container">
          <RackConfigurator />
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Warehouse leasing and sales</span>
            <h2>Warehouse Leasing, Sales, and Property Support</h2>
            <p>Demo entries are clearly marked for replacement until verified warehouse, shed, and land opportunities are uploaded through the admin dashboard.</p>
          </div>
          <div className="grid three">
            {propertyDemo.map((property, index) => (
              <article className="property-card card" key={`${property.location}-${index}`}>
                <Building2 size={26} aria-hidden="true" />
                <h3>{property.title}</h3>
                <dl>
                  <div><dt>Location</dt><dd>{property.location}</dd></div>
                  <div><dt>Area</dt><dd>{property.area}</dd></div>
                  <div><dt>Type</dt><dd>{property.type}</dd></div>
                  <div><dt>Availability</dt><dd>{property.availability}</dd></div>
                  <div><dt>Mode</dt><dd>{property.mode}</dd></div>
                </dl>
                <Link className="btn btn-primary" href="/request-a-quote?service=Warehouse%20Leasing">
                  Enquire
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section investor-section" data-reveal>
        <div className="container investor-grid glass-panel">
          <div className="section-heading">
            <span className="eyebrow">Industrial investment</span>
            <h2>Investment Opportunities with Clear Due Diligence</h2>
            <p>
              Investor support can include tenant profile assessment, location analysis, documentation coordination, return evaluation, and site due diligence. The site avoids guaranteed-return claims until verified documentation supports a specific opportunity.
            </p>
            <div className="button-row">
              <Link href="/request-a-quote?service=Pre-Leased%20Investment" className="btn btn-primary">
                Book Investor Consultation
              </Link>
              <Link href="/investment-opportunities" className="btn btn-secondary">
                View Opportunities
              </Link>
              <Link href="/api/company-profile" className="btn btn-ghost" download>
                <Download size={17} aria-hidden="true" /> Download Investment Brief
              </Link>
            </div>
          </div>
          <div className="investment-stack" aria-hidden="true">
            <span>Tenant review</span>
            <span>Location analysis</span>
            <span>Document support</span>
            <span>Return evaluation</span>
          </div>
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="container timeline-grid">
          <div className="section-heading">
            <span className="eyebrow">Industrial land and factory setup</span>
            <h2>Factory Setup Support from Planning to Handover</h2>
            <p>Use the process map to discuss industrial land identification, legal and document coordination, infrastructure planning, vendors, and factory setup support.</p>
          </div>
          <ProcessRail steps={factorySteps} numbered />
        </div>
      </section>

      <section className="section waste-section" data-reveal>
        <div className="container waste-grid">
          <div className="sustainability-visual" aria-hidden="true">
            <RecycleMark />
          </div>
          <div className="section-heading">
            <span className="eyebrow">Waste management</span>
            <h2>Waste Management for Cleaner Industrial Flow</h2>
            <p>
              Industrial waste assessment, segregation planning, packaging waste management, wooden pallet recycling, scrap coordination, sustainable disposal support, and waste reduction consultation.
            </p>
            <Link className="btn btn-primary" href="/request-a-quote?service=Waste%20Management">
              Share Waste Requirement
            </Link>
          </div>
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">Industries we serve</span>
            <h2>Industries Served Across Industrial Supply Chains</h2>
          </div>
          <IndustryGrid />
        </div>
      </section>

      <section className="section why-section" data-reveal>
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Why choose AAYAT</span>
            <h2>Why Businesses Choose AAYAT</h2>
          </div>
          <div className="grid five why-grid">
            {whyChoose.map((item) => (
              <article className="why-card card" key={item}>
                <CheckCircle2 size={20} aria-hidden="true" />
                <span>{item}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-band" data-reveal>
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">Process</span>
            <h2>A Clear Process from Requirement to Support</h2>
          </div>
          <ProcessRail steps={processSteps} />
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Featured projects</span>
            <h2>AAYAT Work Gallery and Industrial Proof</h2>
          </div>
          <ProjectGallery />
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Service coverage map</span>
            <h2>Mumbai, Bhiwandi, Pune, Gujarat, Madhya Pradesh, and Pan-India operations.</h2>
          </div>
          <LocationMap />
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="container testimonials-grid">
          <div className="section-heading">
            <span className="eyebrow">Testimonials</span>
            <h2>Client Feedback, Published Only After Approval</h2>
            <p>Placeholder records are labelled so the site never presents unverified client claims as real testimonials.</p>
          </div>
          <TestimonialsSlider />
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="container faq-grid">
          <div className="section-heading">
            <span className="eyebrow">FAQ</span>
            <h2>Quick Answers Before You Request a Quote</h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      <section className="section final-cta" data-reveal>
        <div className="container final-cta-inner glass-panel">
          <div>
            <span className="eyebrow">Talk to AAYAT</span>
            <h2>Let&apos;s Build the Right Industrial Solution</h2>
            <p>Share your packaging, warehouse, investment, land, or factory setup requirement with our team.</p>
          </div>
          <div className="button-row">
            <Link href="/request-a-quote" className="btn btn-primary">
              Request a Quote
            </Link>
            <a href={company.phoneHref} className="btn btn-secondary">
              <Phone size={17} aria-hidden="true" /> Call {company.phone}
            </a>
            <a href={whatsappLink()} className="btn btn-ghost" target="_blank" rel="noreferrer">
              <Send size={17} aria-hidden="true" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section compact" data-reveal>
        <div className="container callback-panel glass-panel">
          <div>
            <span className="eyebrow">Callback</span>
            <h2>Need a quick response?</h2>
            <p>Send a phone or email request and mark urgent requirements on the contact page when needed.</p>
          </div>
          <ContactForm compact />
        </div>
      </section>
    </>
  );
}

function ProcessRail({ steps, numbered = false }) {
  return (
    <ol className={`process-rail ${numbered ? "numbered" : ""}`}>
      {steps.map((step, index) => (
        <li key={step}>
          <span>{numbered ? index + 1 : <Warehouse size={18} aria-hidden="true" />}</span>
          <strong>{step}</strong>
        </li>
      ))}
    </ol>
  );
}

function MarqueeBand() {
  const items = [
    "ISPM-15 Heat-Treated Pallets",
    "Export Boxes and Crates",
    "500 Pallets Per Day Capacity",
    "Warehouse Racking Systems",
    "Industrial Waste Management",
    "Bhiwandi",
    "Pune",
    "Gujarat",
    "Pan-India Service Coverage",
    "Pre-Leased Opportunities",
    "Factory Setup Support",
  ];

  return (
    <section className="marquee-band" aria-label="AAYAT service highlights">
      <div className="container marquee-shell">
        <strong className="marquee-label">AAYAT Highlights</strong>
        <div className="marquee-window">
          <div className="marquee-track">
            {[...items, ...items].map((item, index) => (
              <span key={`${item}-${index}`}>
                <CheckCircle2 size={16} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <a className="marquee-action" href={whatsappLink(whatsappMessages.general)} target="_blank" rel="noreferrer">
          Quick Enquiry
        </a>
      </div>
    </section>
  );
}

function RecycleMark() {
  return (
    <div className="recycle-mark">
      <div />
      <div />
      <div />
      <Factory size={46} />
      <MapPin size={22} />
      <Mail size={22} />
    </div>
  );
}
