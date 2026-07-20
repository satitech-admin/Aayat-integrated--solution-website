import Link from "next/link";
import { Mail, Send, Phone, ArrowUp } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import { company, industries, routes, services, whatsappLink } from "@/lib/siteData";

export function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <LogoMark />
            <p>{company.description}</p>
            <div className="footer-cta-row">
              <Link href="/request-a-quote" className="btn btn-primary">
                Request Quote
              </Link>
              <a href={whatsappLink()} className="btn btn-secondary" target="_blank" rel="noreferrer">
                <Send size={17} aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </div>
          <div>
            <h2>Services</h2>
            <ul>
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Industries</h2>
            <ul>
              {industries.slice(0, 9).map((industry) => (
                <li key={industry}>
                  <Link href="/industries-we-serve">{industry}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Quick Links</h2>
            <ul>
              {routes.concat([
                { label: "Request Quote", href: "/request-a-quote" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms", href: "/terms-and-conditions" },
              ]).map((route) => (
                <li key={route.href}>
                  <Link href={route.href}>{route.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li>
                <a href={company.phoneHref}>
                  <Phone size={15} aria-hidden="true" /> {company.phone}
                </a>
              </li>
              {company.emails.map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`}>
                    <Mail size={15} aria-hidden="true" /> {email}
                  </a>
                </li>
              ))}
              <li>{company.coverage.join(", ")}</li>
            </ul>
            <form className="newsletter" action="/api/contact" method="post">
              <input type="hidden" name="intent" value="newsletter" />
              <label className="sr-only" htmlFor="newsletter-email">
                Email for newsletter
              </label>
              <input id="newsletter-email" name="email" type="email" placeholder="Business email" required />
              <button type="submit" aria-label="Subscribe">
                <Send size={16} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>Copyright {new Date().getFullYear()} AAYAT Integrated Solutions. All rights reserved.</p>
          <button type="button" className="back-to-top-link" data-back-top>
            <ArrowUp size={16} aria-hidden="true" /> Back to top
          </button>
        </div>
      </footer>
    </>
  );
}
