import { NextRequest, NextResponse } from "next/server";

const noStore = { "Cache-Control": "no-store" };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const BUCKET = "ggs-academy-private-videos";

export async function POST(request: NextRequest) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const publicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!base || !serviceKey || !publicKey) {
    return NextResponse.json({ error: "Academy playback is not configured." }, { status: 503, headers: noStore });
  }
  const authorization = request.headers.get("authorization") || "";
  const token = /^Bearer\s+(.+)$/i.exec(authorization)?.[1];
  if (!token || token.length > 8192) {
    return NextResponse.json({ error: "Sign in to view this video." }, { status: 401, headers: noStore });
  }
  let videoId: unknown;
  try { videoId = (await request.json()).videoId; } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400, headers: noStore });
  }
  if (typeof videoId !== "string" || !UUID.test(videoId)) {
    return NextResponse.json({ error: "Invalid video ID." }, { status: 400, headers: noStore });
  }

  // Authenticate using Supabase Auth, not a user ID or entitlement from the browser.
  const userRes = await fetch(`${base}/auth/v1/user`, {
    headers: { apikey: publicKey, Authorization: `Bearer ${token}` }, cache: "no-store"
  }).catch(() => null);
  if (!userRes?.ok) {
    return NextResponse.json({ error: "Session expired or invalid." }, { status: 401, headers: noStore });
  }

  // Server-only lookup: only a published video attached to a published lesson/course is eligible.
  const adminHeaders = { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` };
  const lookup = async (table: string, query: Record<string, string>) => {
    const url = new URL(`/rest/v1/${table}`, base);
    Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, value));
    const res = await fetch(url, { headers: adminHeaders, cache: "no-store" });
    if (!res.ok) throw new Error("Academy lookup failed");
    return res.json();
  };
  try {
    const [video] = await lookup("ggs_academy_videos", {
      select: "lesson_id,storage_path,source_type", id: `eq.${videoId}`, is_published: "eq.true", limit: "1"
    });
    if (!video || video.source_type !== "storage" || typeof video.storage_path !== "string") {
      return NextResponse.json({ error: "Video is not available." }, { status: 404, headers: noStore });
    }
    const [lesson] = await lookup("ggs_academy_lessons", {
      select: "course_id", id: `eq.${video.lesson_id}`, is_published: "eq.true", limit: "1"
    });
    if (!lesson) return NextResponse.json({ error: "Video is not available." }, { status: 404, headers: noStore });
    const [course] = await lookup("ggs_academy_courses", {
      select: "id", id: `eq.${lesson.course_id}`, is_published: "eq.true", limit: "1"
    });
    if (!course) return NextResponse.json({ error: "Video is not available." }, { status: 404, headers: noStore });

    // Reject path traversal and unexpected keys. Never accept a storage path from the client.
    const path = video.storage_path;
    if (!path || path.startsWith("/") || path.split("/").some((part: string) => !part || part === "." || part === "..") || !/^[a-zA-Z0-9_./-]+\.mp4$/.test(path)) {
      return NextResponse.json({ error: "Invalid video configuration." }, { status: 503, headers: noStore });
    }
    const encodedPath = path.split("/").map(encodeURIComponent).join("/");
    const sign = await fetch(`${base}/storage/v1/object/sign/${BUCKET}/${encodedPath}`, {
      method: "POST", headers: { ...adminHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ expiresIn: 300 }), cache: "no-store"
    });
    if (!sign.ok) throw new Error("Video signing failed");
    const signed = await sign.json();
    if (typeof signed.signedURL !== "string") throw new Error("Missing signed URL");
    const url = new URL(signed.signedURL, `${base}/storage/v1/`);
    if (url.origin !== new URL(base).origin || !url.pathname.startsWith("/storage/v1/")) {
      throw new Error("Unexpected signing URL");
    }
    return NextResponse.json({ url: url.toString(), expiresIn: 300 }, { headers: noStore });
  } catch {
    return NextResponse.json({ error: "Video temporarily unavailable." }, { status: 503, headers: noStore });
  }
}
