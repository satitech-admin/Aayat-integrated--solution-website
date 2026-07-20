"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/lib/siteData";

export function FaqAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {faqs.map((faq, index) => (
        <div className="faq-item" key={faq.question}>
          <button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
            <span>{faq.question}</span>
            <ChevronDown size={18} aria-hidden="true" />
          </button>
          <div className="faq-answer" hidden={open !== index}>
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
