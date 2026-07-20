import { z } from "zod";

export const allowedUploadTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export const maxUploadSize = 8 * 1024 * 1024;

export const quoteSubmissionSchema = z.object({
  service: z.string().min(1, "Select a service"),
  fullName: z.string().min(2, "Enter your full name"),
  companyName: z.string().min(2, "Enter company name"),
  phone: z.string().min(8, "Enter a valid phone number"),
  whatsapp: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  city: z.string().min(2, "Enter city"),
  preferredContact: z.string().min(1, "Choose a contact method"),
  message: z.string().optional(),
  honeypot: z.string().optional(),
  details: z.record(z.string(), z.string().optional()).optional(),
});

export const contactSubmissionSchema = z.object({
  intent: z.string().optional(),
  fullName: z.string().optional(),
  companyName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  city: z.string().optional(),
  message: z.string().optional(),
  urgent: z.string().optional(),
  honeypot: z.string().optional(),
});

export const adminLoginSchema = z.object({
  code: z.string().min(6, "Enter the admin access code"),
});
