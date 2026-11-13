import { NextRequest, NextResponse } from "next/server";

const noStore = { "Cache-Control": "no-store" };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function getSession(request: NextRequest) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const token = /^Bearer\s+(.+)$/i.exec(request.headers.get("authorization") || "")?.[1];
  if (!base || !anon || !token || token.length > 8192) return null;
  const headers = { apikey: anon, Authorization: `Bearer ${token}` };
  const res = await fetch(`${base}/auth/v1/user`, { headers, cache: "no-store" }).catch(() => null);
  if (!res?.ok) return null;
  const user = await res.json();
  if (!UUID.test(user.id || "")) return null;
  return { base, headers, userId: user.id as string };
}

export async function GET(request: NextRequest) {
  const session = await getSession(request);
  if (!session) return NextResponse.json({ error: "Sign in required." }, { status: 401, headers: noStore });
  const url = new URL("/rest/v1/ggs_academy_progress", session.base);
  url.searchParams.set("select", "lesson_id,completed_at");
  const res = await fetch(url, { headers: session.headers, cache: "no-store" });
  if (!res.ok) return NextResponse.json({ error: "Progress unavailable." }, { status: 503, headers: noStore });
  return NextResponse.json({ completed: await res.json() }, { headers: noStore });
}

export async function POST(request: NextRequest) {
  const session = await getSession(request);
  if (!session) return NextResponse.json({ error: "Sign in required." }, { status: 401, headers: noStore });
  let lessonId: unknown;
  try { lessonId = (await request.json()).lessonId; } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400, headers: noStore });
  }
  if (typeof lessonId !== "string" || !UUID.test(lessonId)) {
    return NextResponse.json({ error: "Invalid lesson ID." }, { status: 400, headers: noStore });
  }
  // Existing Supabase RLS verifies that the authenticated user owns the row
  // and the lesson/course are both published.
  const res = await fetch(`${session.base}/rest/v1/ggs_academy_progress`, {
    method: "POST",
    headers: { ...session.headers, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ user_id: session.userId, lesson_id: lessonId, completed_at: new Date().toISOString() }),
    cache: "no-store"
  });
  if (!res.ok) return NextResponse.json({ error: "Could not save progress." }, { status: res.status === 403 ? 403 : 503, headers: noStore });
  return NextResponse.json({ completed: true }, { headers: noStore });
}
