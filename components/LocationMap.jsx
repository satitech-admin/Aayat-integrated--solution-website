"use client";

import Link from "next/link";
import { MapPinned } from "lucide-react";
import { useState } from "react";
import { locations } from "@/lib/siteData";

export function LocationMap() {
  const [active, setActive] = useState(locations[0]);

  return (
    <div className="location-map glass-panel" id="service-coverage-map">
      <div className="india-map" aria-label="Animated India service coverage map">
        <div className="map-shape" />
        {locations.map((location) => (
          <button
            type="button"
            className={`location-pin ${active.name === location.name ? "active" : ""}`}
            style={{ left: `${location.x}%`, top: `${location.y}%` }}
            key={location.name}
            onClick={() => setActive(location)}
            aria-label={`View services for ${location.name}`}
          >
            <MapPinned size={18} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="location-panel">
        <span className="eyebrow">Service coverage</span>
        <h3>{active.name}</h3>
        <p>Available services for this service area can be discussed through phone, WhatsApp, or a site visit request.</p>
        <div className="tag-list">
          {active.services.map((service) => (
            <span className="tag" key={service}>
              {service}
            </span>
          ))}
        </div>
        <div className="button-row">
          <Link href={`/request-a-quote?city=${encodeURIComponent(active.name)}`} className="btn btn-primary">
            Request Site Visit
          </Link>
          <Link href="/contact-us#map" className="btn btn-secondary">
            View Location
          </Link>
        </div>
      </div>
    </div>
  );
}
