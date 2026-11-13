import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const bucket = "ggs-academy-private-videos";
const fail = (error: string, status = 403) => NextResponse.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
type Video = { lesson_id: string; storage_path: string | null; source_type: string };
type Lesson = { course_id: string };
type Grant = { course_id: string | null; expires_at: string | null };
export async function POST(req: NextRequest) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!base || !service || !anon) return fail("Playback is not configured", 503);
  const bearer = /^Bearer ([^\s]+)$/.exec(req.headers.get("authorization") || "");
  if (!bearer) return fail("Sign in required", 401);
  let videoId: unknown;
  try { videoId = (await req.json()).videoId; } catch { return fail("Invalid JSON", 400); }
  if (typeof videoId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(videoId)) return fail("Invalid video ID", 400);
  const userRes = await fetch(new URL("/auth/v1/user", base), { headers: { apikey: anon, Authorization: `Bearer ${bearer[1]}` }, cache: "no-store" }).catch(() => null);
  if (!userRes?.ok) return fail("Invalid session", 401);
  const user = await userRes.json();
  if (typeof user?.id !== "string") return fail("Invalid session", 401);
  async function rows<T>(table: string, filters: Record<string,string>): Promise<T[] | null> {
    const url = new URL(`/rest/v1/${table}`, base!);
    Object.entries(filters).forEach(([k,v]) => url.searchParams.set(k,v));
    const response = await fetch(url, { headers: { apikey: service!, Authorization: `Bearer ${service!}` }, cache: "no-store" }).catch(() => null);
    return response?.ok ? response.json() : null;
  }
  const videos = await rows<Video>("ggs_academy_videos", { select: "lesson_id,storage_path,source_type", id: `eq.${videoId}`, is_published: "eq.true", limit: "1" });
  if (!videos) return fail("Video lookup unavailable", 503);
  const video = videos[0];
  if (!video?.storage_path || video.source_type !== "private") return fail("Video not available");
  const lessons = await rows<Lesson>("ggs_academy_lessons", { select: "course_id", id: `eq.${video.lesson_id}`, is_published: "eq.true", limit: "1" });
  if (!lessons) return fail("Lesson lookup unavailable", 503);
  const lesson = lessons[0];
  if (!lesson) return fail("Lesson not available");
  const courses = await rows<{id:string}>("ggs_academy_courses", { select: "id", id: `eq.${lesson.course_id}`, is_published: "eq.true", limit: "1" });
  if (!courses) return fail("Course lookup unavailable", 503);
  if (!courses[0]) return fail("Course not available");
  const grants = await rows<Grant>("ggs_academy_entitlements", { select: "course_id,expires_at", user_id: `eq.${user.id}`, status: "eq.active" });
  if (!grants) return fail("Subscription verification unavailable", 503);
  if (!grants.some(g => (g.course_id === null || g.course_id === lesson.course_id) && (!g.expires_at || Date.parse(g.expires_at) > Date.now()))) return fail("Active subscription required");
  const path = video.storage_path;
  if (path.startsWith("/") || path.includes("\\") || /^https?:/i.test(path) || path.split("/").some(p => !p || p === "." || p === "..")) return fail("Invalid asset path", 503);
  const endpoint = new URL(`/storage/v1/object/sign/${bucket}/${path.split("/").map(encodeURIComponent).join("/")}`, base);
  const response = await fetch(endpoint, { method: "POST", headers: { apikey: service, Authorization: `Bearer ${service}`, "Content-Type": "application/json" }, body: JSON.stringify({ expiresIn: 120 }), cache: "no-store" }).catch(() => null);
  if (!response?.ok) return fail("Asset unavailable", 503);
  const signed = await response.json();
  if (typeof signed.signedURL !== "string" || !signed.signedURL.startsWith("/")) return fail("Signing failed", 503);
  return NextResponse.json({ url: new URL(signed.signedURL, base).toString(), expiresIn: 120 }, { headers: { "Cache-Control": "no-store" } });
}
