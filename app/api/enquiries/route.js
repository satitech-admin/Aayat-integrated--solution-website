import { NextResponse } from "next/server";
import { quoteSubmissionSchema } from "@/lib/validation";
import { sendMail } from "@/lib/server/email";
import { rateLimit, requestIp } from "@/lib/server/rateLimit";
import { createReference, saveEnquiry } from "@/lib/server/storage";
import { handleUpload } from "@/lib/server/uploads";
import { company, whatsappLink } from "@/lib/siteData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  const limit = rateLimit(`quote:${requestIp(request)}`, 8, 60_000);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many submissions. Please wait and try again." }, { status: 429 });
  }

  try {
    const formData = await request.formData();
    let payload;
    try {
      payload = JSON.parse(String(formData.get("payload") || "{}"));
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }
    const parsed = quoteSubmissionSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid request." }, { status: 400 });
    }
    if (parsed.data.honeypot) {
      return NextResponse.json({ error: "Submission rejected." }, { status: 400 });
    }

    const reference = createReference();
    const upload = await handleUpload(formData.get("file") || null, reference);
    const saved = await saveEnquiry({ reference, ...parsed.data, upload });

    const businessHtml = `<h2>New AAYAT enquiry ${reference}</h2><p><strong>Service:</strong> ${saved.service}</p><p><strong>Name:</strong> ${saved.fullName}</p><p><strong>Company:</strong> ${saved.companyName}</p><p><strong>Phone:</strong> ${saved.phone}</p><p><strong>Email:</strong> ${saved.email}</p><p><strong>City:</strong> ${saved.city}</p>`;
    await sendMail({
      subject: `New AAYAT enquiry: ${saved.service} (${reference})`,
      html: businessHtml,
      text: `New enquiry ${reference} for ${saved.service} from ${saved.fullName}, ${saved.phone}, ${saved.email}`,
    });
    await sendMail({
      to: saved.email,
      subject: `AAYAT enquiry received: ${reference}`,
      html: `<p>Thank you for contacting ${company.name}. Your enquiry reference is <strong>${reference}</strong>. Our team will review your requirement and contact you.</p>`,
      text: `Thank you for contacting ${company.name}. Your enquiry reference is ${reference}.`,
    });

    return NextResponse.json({
      ok: true,
      reference,
      whatsapp: whatsappLink(`Hello AAYAT Integrated Solutions, my enquiry reference is ${reference}. Please contact me.`),
      storage: process.env.MONGODB_URI ? "mongodb" : "local-development",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to submit enquiry." },
      { status: 500 }
    );
  }
}
