import { NextResponse } from "next/server";
import { contactSubmissionSchema } from "@/lib/validation";
import { sendMail } from "@/lib/server/email";
import { rateLimit, requestIp } from "@/lib/server/rateLimit";
import { createReference, saveContact } from "@/lib/server/storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  const limit = rateLimit(`contact:${requestIp(request)}`, 20, 60_000);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many submissions. Please wait and try again." }, { status: 429 });
  }

  try {
    const contentType = request.headers.get("content-type") || "";
    const body = contentType.includes("application/json")
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());
    const parsed = contactSubmissionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid contact request." }, { status: 400 });
    }
    if (parsed.data.honeypot) {
      return NextResponse.json({ error: "Submission rejected." }, { status: 400 });
    }
    const reference = createReference("ACT");
    const saved = await saveContact({
      ...parsed.data,
      reference,
      urgent: parsed.data.urgent === "urgent",
    });
    await sendMail({
      subject: `AAYAT contact request (${reference})`,
      html: `<h2>Contact request ${reference}</h2><p><strong>Email:</strong> ${saved.email}</p><p><strong>Phone:</strong> ${saved.phone || "Not provided"}</p><p>${saved.message || ""}</p>`,
      text: `Contact request ${reference} from ${saved.email}. ${saved.message || ""}`,
    });
    return NextResponse.json({ ok: true, reference });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to submit contact request." },
      { status: 500 }
    );
  }
}
