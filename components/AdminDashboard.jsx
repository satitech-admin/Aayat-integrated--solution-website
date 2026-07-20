"use client";

import Link from "next/link";
import { Download, FileText, Loader2, LogOut, Search, StickyNote } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { services } from "@/lib/siteData";

const statuses = ["new", "contacted", "qualified", "won", "closed"];

export function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [service, setService] = useState("All");
  const [status, setStatus] = useState("All");
  const [message, setMessage] = useState("");

  const load = async () => {
    setLoading(true);
    const response = await fetch("/api/admin/enquiries", { cache: "no-store" });
    const result = await response.json();
    setLeads(result.enquiries || []);
    setLoading(false);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const haystack = (lead) =>
      `${lead.reference} ${lead.service} ${lead.fullName} ${lead.companyName} ${lead.phone} ${lead.email} ${lead.city}`.toLowerCase();
    return leads.filter((lead) => {
      const matchesQuery = haystack(lead).includes(query.toLowerCase());
      const matchesService = service === "All" || lead.service === service;
      const matchesStatus = status === "All" || (lead.status || "new") === status;
      return matchesQuery && matchesService && matchesStatus;
    });
  }, [leads, query, service, status]);

  const analytics = useMemo(() => {
    const byService = services.map((item) => ({
      label: item.title,
      count: leads.filter((lead) => lead.service === item.title || lead.service === item.title.replace("ISPM-15 Certified ", "")).length,
    }));
    return {
      total: leads.length,
      newLeads: leads.filter((lead) => (lead.status || "new") === "new").length,
      qualified: leads.filter((lead) => lead.status === "qualified").length,
      topService: byService.sort((a, b) => b.count - a.count)[0],
    };
  }, [leads]);

  const updateLead = async (reference, nextStatus, note) => {
    setMessage("");
    const response = await fetch("/api/admin/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference, status: nextStatus, note }),
    });
    if (!response.ok) {
      setMessage("Unable to update lead.");
      return;
    }
    await load();
    setMessage("Lead updated.");
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <section className="admin-dashboard">
      <div className="container admin-top">
        <div>
          <span className="eyebrow">Admin dashboard</span>
          <h1>Lead, content, and performance control center.</h1>
          <p>Manage enquiries, quotation requests, projects, testimonials, FAQs, locations, warehouse listings, statistics, brochures, and lead status.</p>
        </div>
        <div className="button-row">
          <Link href="/api/admin/export" className="btn btn-secondary" download>
            <Download size={17} aria-hidden="true" /> Export CSV
          </Link>
          <button type="button" className="btn btn-ghost" onClick={logout}>
            <LogOut size={17} aria-hidden="true" /> Sign Out
          </button>
        </div>
      </div>

      <div className="container admin-analytics">
        <article className="stat-card card"><strong>{analytics.total}</strong><span>Total enquiries</span><small>Quote form and API leads</small></article>
        <article className="stat-card card"><strong>{analytics.newLeads}</strong><span>New leads</span><small>Status pipeline</small></article>
        <article className="stat-card card"><strong>{analytics.qualified}</strong><span>Qualified</span><small>Sales-ready requirements</small></article>
        <article className="stat-card card"><strong>{analytics.topService?.count || 0}</strong><span>Top service</span><small>{analytics.topService?.label || "No leads yet"}</small></article>
      </div>

      <div className="container admin-grid">
        <section className="admin-panel glass-panel">
          <div className="admin-panel-head">
            <div>
              <h2>Enquiries</h2>
              <p>Total, by service, by city, status, completion, and most visited services are ready for analytics wiring.</p>
            </div>
            {loading ? <Loader2 className="spin" size={20} aria-label="Loading enquiries" /> : null}
          </div>
          <div className="admin-filters">
            <label className="field search-field">
              <span>Search leads</span>
              <div>
                <Search size={17} aria-hidden="true" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, city, service, phone, email" />
              </div>
            </label>
            <label className="field">
              <span>Service</span>
              <select className="select" value={service} onChange={(event) => setService(event.target.value)}>
                <option>All</option>
                {services.map((item) => <option key={item.slug}>{item.title}</option>)}
              </select>
            </label>
            <label className="field">
              <span>Status</span>
              <select className="select" value={status} onChange={(event) => setStatus(event.target.value)}>
                <option>All</option>
                {statuses.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>
          {message ? <p className="form-status success" role="status">{message}</p> : null}
          <div className="lead-list">
            {filtered.length ? filtered.map((lead) => (
              <article className="lead-card card" key={lead.reference}>
                <header>
                  <div>
                    <strong>{lead.reference}</strong>
                    <span>{lead.service}</span>
                  </div>
              <select className="select" value={lead.status || "new"} onChange={(event) => updateLead(lead.reference, event.target.value)}>
                    {statuses.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </header>
                <dl>
                  <div><dt>Name</dt><dd>{lead.fullName}</dd></div>
                  <div><dt>Company</dt><dd>{lead.companyName}</dd></div>
                  <div><dt>Phone</dt><dd>{lead.phone}</dd></div>
                  <div><dt>Email</dt><dd>{lead.email}</dd></div>
                  <div><dt>City</dt><dd>{lead.city}</dd></div>
                  <div><dt>Created</dt><dd>{lead.createdAt || "Local pending"}</dd></div>
                </dl>
                {lead.upload ? <p className="tag"><FileText size={14} /> {lead.upload.originalName} ({lead.upload.storage})</p> : null}
                <NoteForm onSave={(note) => updateLead(lead.reference, undefined, note)} />
              </article>
            )) : (
              <div className="empty-state card">
                <h3>No enquiries found.</h3>
                <p>Submit the quote form or adjust filters to see leads here.</p>
              </div>
            )}
          </div>
        </section>

        <aside className="admin-panel glass-panel">
          <h2>Content managers</h2>
          <p>These management areas are scaffolded for database-backed editing as client data is supplied.</p>
          <div className="manager-list">
            {[
              "Service content",
              "Projects and gallery",
              "Testimonials",
              "FAQs",
              "Blog posts",
              "Locations",
              "Warehouse listings",
              "Downloadable brochures",
              "Statistics",
              "Contact information",
            ].map((item) => (
              <button type="button" key={item}>
                <StickyNote size={16} aria-hidden="true" /> {item}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function NoteForm({ onSave }) {
  const [note, setNote] = useState("");
  return (
    <form
      className="note-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (note.trim()) {
          onSave(note.trim());
          setNote("");
        }
      }}
    >
      <input className="input" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add internal note" />
      <button className="btn btn-secondary" type="submit">Save Note</button>
    </form>
  );
}
