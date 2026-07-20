import crypto from "node:crypto";

export const adminCookieName = "aayat_admin_session";

function secret() {
  return process.env.ADMIN_SESSION_SECRET || "replace-this-secret-before-production";
}

function sign(payload) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createAdminSession() {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 8;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSession(value) {
  if (!value) return false;
  const [expiresAt, signature] = value.split(".");
  if (!expiresAt || !signature) return false;
  if (Number(expiresAt) < Date.now()) return false;
  const expected = sign(expiresAt);
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export function validateAdminCode(code) {
  const expected = process.env.ADMIN_ACCESS_CODE || "change-me-before-launch";
  const a = Buffer.from(code);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
