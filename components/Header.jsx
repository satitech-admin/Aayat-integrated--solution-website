"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/LogoMark";
import { company, routes, serviceGroups, whatsappLink, whatsappMessages } from "@/lib/siteData";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setMegaOpen(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const closeMenus = () => {
    setMenuOpen(false);
    setMegaOpen(false);
  };

  const nav = (
    <>
      {routes.map((route) => {
        const active = route.href === "/" ? pathname === "/" : pathname.startsWith(route.href);
        if (route.label === "Services") {
          return (
            <div
              className="nav-mega-wrap"
              key={route.href}
              ref={megaRef}
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button
                type="button"
                className={`nav-link ${active ? "active" : ""}`}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                onClick={() => setMegaOpen((value) => !value)}
              >
                Services <ChevronDown size={15} aria-hidden="true" />
              </button>
              {megaOpen ? (
                <div
                  className="mega-menu"
                >
                  {serviceGroups.map((group) => (
                    <div key={group.title}>
                      <p>{group.title}</p>
                      {group.items.map((item) => (
                        <Link href={item.href} key={item.href} onClick={closeMenus}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        }

        return (
          <Link
            href={route.href}
            className={`nav-link ${active ? "active" : ""}`}
            key={route.href}
            onClick={closeMenus}
          >
            {route.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className={`site-header ${scrolled || menuOpen ? "solid" : ""}`}>
        <div className="container header-inner">
          <LogoMark />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {nav}
          </nav>
          <div className="header-actions">
            <a className="icon-pill" href={whatsappLink(whatsappMessages.general)} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
              <Send size={18} aria-hidden="true" />
            </a>
            <a className="icon-pill phone-pulse" href={company.phoneHref} aria-label={`Call ${company.phone}`}>
              <Phone size={18} aria-hidden="true" />
            </a>
            <Link className="btn btn-primary quote-btn" href="/request-a-quote">
              Request Services
            </Link>
            <button
              className="mobile-menu-button icon-pill"
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {nav}
            <div className="mobile-nav-ctas">
              <Link className="btn btn-primary" href="/request-a-quote" onClick={closeMenus}>
                Request Services
              </Link>
              <a className="btn btn-secondary" href={company.phoneHref} onClick={closeMenus}>
                Call Now
              </a>
              <a className="btn btn-ghost" href={whatsappLink()} target="_blank" rel="noreferrer" onClick={closeMenus}>
                WhatsApp Us
              </a>
            </div>
          </nav>
        ) : null}
      </header>
    </>
  );
}
