"use client";

import Link from "next/link";
import { Factory, X } from "lucide-react";
import { useEffect, useState } from "react";
import { industries, services } from "@/lib/siteData";

export function IndustryGrid() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="industry-grid">
        {industries.map((industry) => (
          <button type="button" className="industry-card" key={industry} onClick={() => setActive(industry)}>
            <Factory size={20} aria-hidden="true" />
            <span>{industry}</span>
          </button>
        ))}
      </div>
      {active ? (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setActive(null)}>
          <section
            className="industry-modal glass-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="industry-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button type="button" className="icon-pill modal-close" onClick={() => setActive(null)} aria-label="Close industry details">
              <X size={18} aria-hidden="true" />
            </button>
            <span className="eyebrow">Industry fit</span>
            <h3 id="industry-modal-title">{active}</h3>
            <p>
              AAYAT can align packaging, racking, warehouse, property, waste management, and setup support around the operating realities of {active.toLowerCase()} businesses.
            </p>
            <div className="grid two">
              {services.slice(0, 4).map((service) => (
                <Link href={`/services/${service.slug}`} className="card mini-card" key={service.slug}>
                  <service.Icon size={20} aria-hidden="true" />
                  <strong>{service.title}</strong>
                  <small>{service.summary}</small>
                </Link>
              ))}
            </div>
            <Link className="btn btn-primary" href={`/request-a-quote?industry=${encodeURIComponent(active)}`}>
              Submit {active} Requirement
            </Link>
          </section>
        </div>
      ) : null}
    </>
  );
}
