"use client";

import { Lock, Loader2 } from "lucide-react";
import { useState } from "react";

export function AdminLogin() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    if (response.ok) {
      window.location.reload();
      return;
    }
    const result = await response.json().catch(() => ({}));
    setStatus("error");
    setMessage(result.error || "Unable to sign in.");
  };

  return (
    <section className="page-hero admin-login-page">
      <div className="container">
        <form className="admin-login glass-panel" onSubmit={submit}>
          <span className="eyebrow">
            <Lock size={15} aria-hidden="true" /> Secure admin
          </span>
          <h1>AAYAT Admin Dashboard</h1>
          <p>Enter the admin access code configured in environment variables. For local development only, the fallback code is documented in the README.</p>
          <label className="field">
            <span>Admin access code</span>
            <input className="input" type="password" value={code} onChange={(event) => setCode(event.target.value)} autoComplete="current-password" required />
          </label>
          {message ? <p className="error-text" role="alert">{message}</p> : null}
          <button className="btn btn-primary" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? <Loader2 className="spin" size={17} aria-hidden="true" /> : <Lock size={17} aria-hidden="true" />}
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}
