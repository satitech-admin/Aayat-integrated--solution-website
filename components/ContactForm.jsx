"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSubmissionSchema } from "@/lib/validation";

export function ContactForm({ compact = false }) {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const form = useForm({
    resolver: zodResolver(contactSubmissionSchema),
    defaultValues: {
      intent: compact ? "callback" : "contact",
      fullName: "",
      companyName: "",
      phone: "",
      email: "",
      city: "",
      message: "",
      urgent: "",
      honeypot: "",
    },
  });

  const onSubmit = async (values) => {
    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to submit");
      setStatus("success");
      setMessage("Thanks. Your contact request has been recorded.");
      form.reset({ intent: compact ? "callback" : "contact", email: "", honeypot: "" });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  };

  return (
    <form className={`contact-form ${compact ? "compact" : ""}`} onSubmit={form.handleSubmit(onSubmit)}>
      <input className="sr-only" tabIndex={-1} autoComplete="off" {...form.register("honeypot")} aria-hidden="true" />
      <input type="hidden" {...form.register("intent")} />
      {!compact ? (
        <div className="grid two">
          <Field label="Full name" {...form.register("fullName")} />
          <Field label="Company name" {...form.register("companyName")} />
        </div>
      ) : null}
      <div className="grid two">
        <Field label="Phone number" {...form.register("phone")} />
        <Field label="Email" type="email" error={form.formState.errors.email?.message} {...form.register("email")} />
      </div>
      {!compact ? <Field label="City" {...form.register("city")} /> : null}
      <label className="field">
        <span>Message</span>
        <textarea className="textarea" {...form.register("message")} placeholder="Tell us about the requirement, timing, city, and preferred response method." />
      </label>
      {!compact ? (
        <label className="urgent-check">
          <input type="checkbox" value="urgent" {...form.register("urgent")} />
          <span>Mark this as an urgent industrial requirement</span>
        </label>
      ) : null}
      {message ? (
        <div className={`form-status ${status}`} role="status" aria-live="polite">
          {status === "success" ? <CheckCircle2 size={18} aria-hidden="true" /> : null}
          <span>{message}</span>
        </div>
      ) : null}
      <button className="btn btn-primary" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? <Loader2 className="spin" size={17} aria-hidden="true" /> : <Send size={17} aria-hidden="true" />}
        {compact ? "Request Callback" : "Send Message"}
      </button>
    </form>
  );
}

function Field({ label, error, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input className="input" placeholder={label} {...props} />
      {error ? <small>{error}</small> : null}
    </label>
  );
}
