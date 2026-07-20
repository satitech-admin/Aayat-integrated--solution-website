"use client";

import { RotateCcw } from "lucide-react";

export default function ErrorPage({ reset }) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Server error</span>
          <h1>Something interrupted this page.</h1>
          <p>Please retry. If the issue continues, contact the AAYAT team through phone or WhatsApp.</p>
          <button type="button" className="btn btn-primary" onClick={reset}>
            <RotateCcw size={17} aria-hidden="true" /> Retry
          </button>
        </div>
      </div>
    </section>
  );
}
