"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2, FileUp, Loader2, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { quoteSubmissionSchema, allowedUploadTypes, maxUploadSize } from "@/lib/validation";

const services = [
  "Wooden Pallets",
  "Export Packaging",
  "Waste Management",
  "Industrial Racking",
  "Warehouse Leasing",
  "Warehouse Purchase",
  "Pre-Leased Investment",
  "Industrial Land",
  "Factory Setup",
  "Other",
];

const serviceFields = {
  "Wooden Pallets": [
    { name: "palletType", label: "Pallet type" },
    { name: "size", label: "Size", placeholder: "Length x width x height" },
    { name: "quantity", label: "Quantity" },
    { name: "loadCapacity", label: "Load capacity" },
    { name: "materialOption", label: "New or recycled" },
    { name: "usage", label: "Export or domestic" },
    { name: "deliveryLocation", label: "Delivery location" },
  ],
  "Export Packaging": [
    { name: "machineType", label: "Product or machine type" },
    { name: "dimensions", label: "Dimensions" },
    { name: "weight", label: "Weight" },
    { name: "destination", label: "Packaging destination" },
    { name: "exportCountry", label: "Export country" },
    { name: "onSite", label: "On-site service required" },
  ],
  "Industrial Racking": [
    { name: "requiredArea", label: "Required area" },
    { name: "preferredLocation", label: "Preferred location" },
    { name: "rackType", label: "Rack type" },
    { name: "budget", label: "Budget range" },
    { name: "possession", label: "Required installation date" },
  ],
  "Warehouse Leasing": [
    { name: "requiredArea", label: "Required area" },
    { name: "preferredLocation", label: "Preferred location" },
    { name: "budget", label: "Budget range" },
    { name: "possession", label: "Required possession date" },
  ],
  "Warehouse Purchase": [
    { name: "requiredArea", label: "Required area" },
    { name: "preferredLocation", label: "Preferred location" },
    { name: "budget", label: "Budget range" },
    { name: "possession", label: "Required possession date" },
  ],
  "Industrial Land": [
    { name: "requiredArea", label: "Required area" },
    { name: "preferredState", label: "Preferred state or city" },
    { name: "intendedIndustry", label: "Intended industry" },
    { name: "budget", label: "Budget" },
    { name: "timeline", label: "Timeline" },
  ],
  "Factory Setup": [
    { name: "requiredArea", label: "Required area" },
    { name: "preferredState", label: "Preferred state or city" },
    { name: "intendedIndustry", label: "Intended industry" },
    { name: "budget", label: "Budget" },
    { name: "timeline", label: "Timeline" },
  ],
};

export function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState("Wooden Pallets");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const form = useForm({
    resolver: zodResolver(quoteSubmissionSchema),
    defaultValues: {
      service: "Wooden Pallets",
      fullName: "",
      companyName: "",
      phone: "",
      whatsapp: "",
      email: "",
      city: "",
      preferredContact: "WhatsApp",
      message: "",
      honeypot: "",
      details: {},
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const incomingService = params.get("service");
    if (incomingService) {
      const timer = window.setTimeout(() => {
        form.setValue("service", incomingService);
        setSelectedService(incomingService);
      }, 0);
      return () => window.clearTimeout(timer);
    }
  }, [form]);

  const fields = serviceFields[selectedService] || [
    { name: "requirement", label: "Requirement details" },
    { name: "timeline", label: "Timeline" },
  ];
  const progress = ((step + 1) / 5) * 100;
  const values = form.getValues();
  const summary = [
    ["Service", values.service],
    ["Name", values.fullName],
    ["Company", values.companyName],
    ["Phone", values.phone],
    ["Email", values.email],
    ["City", values.city],
    ["Contact method", values.preferredContact],
    ["Upload", file ? `${file.name} (${Math.round(file.size / 1024)} KB)` : "No file selected"],
  ];
  const serviceRegistration = form.register("service");

  const next = async () => {
    const fieldsToValidate =
      step === 0
        ? ["service"]
        : step === 2
          ? ["fullName", "companyName", "phone", "email", "city", "preferredContact"]
          : undefined;
    const ok = fieldsToValidate ? await form.trigger(fieldsToValidate) : true;
    if (ok) setStep((value) => Math.min(value + 1, 4));
  };

  const onFile = (selected) => {
    setFileError("");
    if (!selected) {
      setFile(null);
      return;
    }
    if (!allowedUploadTypes.includes(selected.type)) {
      setFileError("Upload PDF, JPG, PNG, DOCX, or XLSX files only.");
      setFile(null);
      return;
    }
    if (selected.size > maxUploadSize) {
      setFileError("File size must be 8 MB or less.");
      setFile(null);
      return;
    }
    setFile(selected);
  };

  const onSubmit = async (values) => {
    setStatus("submitting");
    setMessage("");
    setReference("");
    const payload = new FormData();
    payload.set("payload", JSON.stringify(values));
    if (file) payload.set("file", file);

    try {
      const response = await fetch("/api/enquiries", { method: "POST", body: payload });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Submission failed");
      setStatus("success");
      setReference(result.reference);
      setMessage("Your requirement has been submitted. AAYAT will contact you shortly.");
      form.reset({ ...form.getValues(), message: "" });
      setFile(null);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit the requirement. Please try again.");
    }
  };

  return (
    <section className="quote-wizard glass-panel" aria-labelledby="quote-wizard-title">
      <div className="wizard-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="wizard-head">
        <span className="eyebrow">Step {step + 1} of 5</span>
        <h2 id="quote-wizard-title">Submit your industrial requirement</h2>
        <p>Service-specific fields, secure validation, file upload checks, confirmation messaging, and admin-ready lead capture.</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="wizard-form">
        <input className="sr-only" tabIndex={-1} autoComplete="off" {...form.register("honeypot")} aria-hidden="true" />

        {step === 0 ? (
          <div className="service-select-grid">
            {services.map((service) => (
              <label className={selectedService === service ? "active" : ""} key={service}>
                <input
                  type="radio"
                  value={service}
                  checked={selectedService === service}
                  name={serviceRegistration.name}
                  ref={serviceRegistration.ref}
                  onBlur={serviceRegistration.onBlur}
                  onChange={(event) => {
                    void serviceRegistration.onChange(event);
                    setSelectedService(event.target.value);
                  }}
                />
                <span>{service}</span>
              </label>
            ))}
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid two">
            {fields.map((field) => (
              <label className="field" key={field.name}>
                <span>{field.label}</span>
                <input className="input" placeholder={field.placeholder || field.label} {...form.register(`details.${field.name}`)} />
              </label>
            ))}
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid two">
            <TextInput label="Full name" error={form.formState.errors.fullName?.message} {...form.register("fullName")} />
            <TextInput label="Company name" error={form.formState.errors.companyName?.message} {...form.register("companyName")} />
            <TextInput label="Phone number" error={form.formState.errors.phone?.message} {...form.register("phone")} />
            <TextInput label="WhatsApp number" {...form.register("whatsapp")} />
            <TextInput label="Email" type="email" error={form.formState.errors.email?.message} {...form.register("email")} />
            <TextInput label="City" error={form.formState.errors.city?.message} {...form.register("city")} />
            <label className="field">
              <span>Preferred contact method</span>
              <select className="select" {...form.register("preferredContact")}>
                <option>WhatsApp</option>
                <option>Phone</option>
                <option>Email</option>
              </select>
            </label>
            <label className="field full">
              <span>Message</span>
              <textarea className="textarea" {...form.register("message")} placeholder="Share delivery timing, drawings, site notes, or any other requirement." />
            </label>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="upload-zone">
            <FileUp size={34} aria-hidden="true" />
            <h3>Upload drawings, photos, or requirement documents</h3>
            <p>Allowed files: PDF, JPG, PNG, DOCX, XLSX. Maximum size: 8 MB.</p>
            <label className="btn btn-secondary">
              Select File
              <input className="sr-only" type="file" accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx" onChange={(event) => onFile(event.target.files?.[0] || null)} />
            </label>
            {file ? (
              <div className="upload-progress">
                <span>{file.name}</span>
                <strong>Validated</strong>
                <i />
              </div>
            ) : null}
            {fileError ? <p className="error-text">{fileError}</p> : null}
          </div>
        ) : null}

        {step === 4 ? (
          <div className="review-list">
            {summary.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value || "Not provided"}</strong>
              </div>
            ))}
          </div>
        ) : null}

        {message ? (
          <div className={`form-status ${status}`} role="status" aria-live="polite">
            {status === "success" ? <CheckCircle2 size={20} aria-hidden="true" /> : null}
            <span>{message}</span>
            {reference ? <strong>Reference: {reference}</strong> : null}
          </div>
        ) : null}

        <div className="wizard-actions">
          <button type="button" className="btn btn-secondary" onClick={() => setStep((value) => Math.max(value - 1, 0))} disabled={step === 0 || status === "submitting"}>
            <ArrowLeft size={17} aria-hidden="true" /> Back
          </button>
          {step < 4 ? (
            <button type="button" className="btn btn-primary" onClick={next}>
              Continue <ArrowRight size={17} aria-hidden="true" />
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
              {status === "submitting" ? <Loader2 className="spin" size={17} aria-hidden="true" /> : <Send size={17} aria-hidden="true" />}
              Submit Requirement
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

function TextInput({ label, error, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input className="input" placeholder={label} {...props} />
      {error ? <small>{error}</small> : null}
    </label>
  );
}
