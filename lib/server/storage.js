import fs from "node:fs/promises";
import path from "node:path";
import { connectMongo, hasMongoConfig } from "@/lib/server/mongodb";
import { ContactRequest, Enquiry } from "@/lib/server/models";

const enquiryFile = () => path.join(process.cwd(), "work", "enquiries.jsonl");
const contactFile = () => path.join(process.cwd(), "work", "contacts.jsonl");

async function appendJsonl(filePath, record) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8");
}

async function readJsonl(filePath) {
  try {
    const text = await fs.readFile(filePath, "utf8");
    return text
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => JSON.parse(line));
  } catch {
    return [];
  }
}

export async function saveEnquiry(record) {
  const saved = { ...record, status: record.status || "new", createdAt: new Date().toISOString() };
  if (hasMongoConfig()) {
    await connectMongo();
    await Enquiry.create(saved);
    return saved;
  }
  await appendJsonl(enquiryFile(), saved);
  return saved;
}

export async function saveContact(record) {
  const saved = { ...record, status: record.status || "new", createdAt: new Date().toISOString() };
  if (hasMongoConfig()) {
    await connectMongo();
    await ContactRequest.create(saved);
    return saved;
  }
  await appendJsonl(contactFile(), saved);
  return saved;
}

export async function listEnquiries() {
  if (hasMongoConfig()) {
    await connectMongo();
    return Enquiry.find().sort({ createdAt: -1 }).limit(500).lean();
  }
  const local = await readJsonl(enquiryFile());
  return local.reverse().slice(0, 500);
}

export async function updateEnquiry(reference, status, note) {
  if (hasMongoConfig()) {
    await connectMongo();
    const update = {};
    if (status) update.status = status;
    if (note) update.$push = { internalNotes: { note, createdAt: new Date() } };
    return Enquiry.findOneAndUpdate({ reference }, update, { new: true }).lean();
  }
  const all = await readJsonl(enquiryFile());
  const next = all.map((lead) =>
    lead.reference === reference
      ? {
          ...lead,
          status: status || lead.status,
          internalNotes: note
            ? [...(lead.internalNotes || []), { note, createdAt: new Date().toISOString() }]
            : lead.internalNotes,
        }
      : lead
  );
  await fs.writeFile(enquiryFile(), next.map((lead) => JSON.stringify(lead)).join("\n") + "\n", "utf8");
  return next.find((lead) => lead.reference === reference);
}

export function createReference(prefix = "AYT") {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}-${stamp}-${random}`;
}
