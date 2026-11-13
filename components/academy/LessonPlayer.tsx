"use client";

import { useEffect, useState } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type Video = { id: string; source_type: string; youtube_video_id: string | null };
type Props = { lessonId: string; video?: Video | null };
let client: SupabaseClient | null = null;
function supabase() {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  client = createClient(url, key);
  return client;
}
export default function LessonPlayer({ lessonId, video }: Props) {
  const [token, setToken] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [completed, setCompleted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const api = supabase();
    if (!api) { setMessage("Academy sign-in is not configured."); return; }
    let active = true;
    api.auth.getSession().then(({ data }) => { if (active) setToken(data.session?.access_token || null); });
    const { data: { subscription } } = api.auth.onAuthStateChange((_event, session) => {
      setToken(session?.access_token || null);
      setVideoUrl("");
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);
  useEffect(() => {
    if (!token) { setCompleted(false); return; }
    fetch("/api/academy/progress", { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => setCompleted(Array.isArray(data.completed) && data.completed.some((x: { lesson_id: string }) => x.lesson_id === lessonId)))
      .catch(() => setMessage("Could not load progress."));
  }, [token, lessonId]);
  async function play() {
    if (!token || !video) return;
    setBusy(true); setMessage("");
    try {
      const res = await fetch("/api/academy/video", {
        method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: video.id })
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Video unavailable.");
      setVideoUrl(data.url);
    } catch (e) { setMessage(e instanceof Error ? e.message : "Video unavailable."); }
    finally { setBusy(false); }
  }
  async function markComplete() {
    if (!token) return;
    setBusy(true); setMessage("");
    try {
      const res = await fetch("/api/academy/progress", {
        method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId })
      });
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || "Progress could not be saved."); }
      setCompleted(true);
    } catch (e) { setMessage(e instanceof Error ? e.message : "Progress could not be saved."); }
    finally { setBusy(false); }
  }
  const youtubeId = video?.source_type === "youtube" && /^[A-Za-z0-9_-]{11}$/.test(video.youtube_video_id || "") ? video.youtube_video_id : null;
  return <div style={{ marginTop: 14 }}>
    {youtubeId && <iframe title="Academy lesson video" src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ width: "100%", maxWidth: 760, aspectRatio: "16 / 9", border: 0, borderRadius: 12 }} />}
    {!token && <p role="status">Sign in to your existing GGS surveyor account to save progress and watch private lessons. No separate Academy account is required.</p>}
    {token && <>
      {video?.source_type === "storage" && <div>
        <button type="button" disabled={busy} onClick={play}>Play private video</button>
        {videoUrl && <video controls playsInline src={videoUrl} style={{ width: "100%", maxWidth: 760, display: "block", marginTop: 12 }} onError={() => setMessage("Playback failed. Reload the video link.")} />}
      </div>}
      <button type="button" disabled={busy || completed} onClick={markComplete} style={{ marginTop: 12 }}>
        {completed ? "✓ Completed" : "Mark lesson complete"}
      </button>
    </>}
    {!video && <p>Private video pending review and approval. Written lesson content may be available above.</p>}
    {message && <p role="status" style={{ color: "#9b3d2d" }}>{message}</p>}
  </div>;
}
