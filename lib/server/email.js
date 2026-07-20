import nodemailer from "nodemailer";
import { company } from "@/lib/siteData";

export async function sendMail({ to, subject, html, text }) {
  if (process.env.RESEND_API_KEY) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || `AAYAT Integrated Solutions <${company.emails[1]}>`,
        to: to || process.env.LEAD_NOTIFICATION_EMAIL || company.emails,
        subject,
        html,
        text,
      }),
    });
    return response.ok;
  }

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: to || process.env.LEAD_NOTIFICATION_EMAIL || company.emails.join(","),
      subject,
      html,
      text,
    });
    return true;
  }

  return false;
}
