import { NextResponse } from "next/server";
import { normalize, validateContact } from "@/src/lib/contact";
import { saveSubmission } from "@/src/lib/submissions";

export const runtime = "nodejs"; // needs the file system
export const dynamic = "force-dynamic";

/* Very small in-memory rate limit: 5 submissions per IP per 10 minutes. */
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) ?? {};
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: real people never fill the hidden "website" field. Pretend success for bots.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const payload = normalize(body);
  const errors = validateContact(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    await saveSubmission({
      ...payload,
      locale: body.locale === "en" ? "en" : "uk",
      userAgent: request.headers.get("user-agent") ?? undefined,
    });
  } catch (err) {
    console.error("[contact] failed to save submission", err);
    return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
