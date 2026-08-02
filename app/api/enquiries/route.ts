import { NextResponse } from "next/server";
import { projectTypeOptions } from "@/data/services";

export const runtime = "edge";

const validProjectTypes = new Set(projectTypeOptions.map((option) => option.value));
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type EnquiryPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  phone?: unknown;
  projectTypes?: unknown;
  description?: unknown;
  budget?: unknown;
  timeline?: unknown;
  reference?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

function clean(value: unknown, maximum: number) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function badRequest(message: string) {
  return NextResponse.json({ ok: false, message }, { status: 400 });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 32_000) return badRequest("The enquiry is too large.");

  let payload: EnquiryPayload;
  try {
    payload = (await request.json()) as EnquiryPayload;
  } catch {
    return badRequest("The enquiry could not be read.");
  }

  const website = clean(payload.website, 200);
  const startedAt = typeof payload.startedAt === "number" ? payload.startedAt : 0;
  if (website || (startedAt > 0 && Date.now() - startedAt < 500)) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const name = clean(payload.name, 100);
  const email = clean(payload.email, 200).toLowerCase();
  const company = clean(payload.company, 160);
  const phone = clean(payload.phone, 80);
  const description = clean(payload.description, 4_000);
  const budget = clean(payload.budget, 200);
  const timeline = clean(payload.timeline, 200);
  const reference = clean(payload.reference, 600);
  const projectTypes = Array.isArray(payload.projectTypes)
    ? [...new Set(payload.projectTypes.map((value) => clean(value, 80)))].filter((value) => validProjectTypes.has(value))
    : [];

  if (name.length < 2) return badRequest("Please share your name.");
  if (!emailPattern.test(email)) return badRequest("Please enter a valid email address.");
  if (company.length < 2) return badRequest("Please share your brand or company.");
  if (phone.replace(/\D/g, "").length < 7) return badRequest("Please enter a valid phone or WhatsApp number.");
  if (projectTypes.length === 0) return badRequest("Please choose a project type.");
  if (!budget) return badRequest("Please choose a budget range.");
  if (!timeline) return badRequest("Please choose a timeline.");
  if (description.length < 20) return badRequest("Please add a little more project detail.");

  if (reference) {
    try {
      const url = new URL(reference);
      if (!/^https?:$/.test(url.protocol)) return badRequest("Please enter a valid reference link.");
    } catch {
      return badRequest("Please enter a valid reference link.");
    }
  }

  try {
    const { saveEnquiry } = await import("@/db/enquiries");
    await saveEnquiry({
      name,
      email,
      company,
      phone,
      projectTypes,
      description,
      budget,
      timeline,
      reference,
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, message: "The enquiry could not be saved. Please try again." },
      { status: 503 },
    );
  }
}
