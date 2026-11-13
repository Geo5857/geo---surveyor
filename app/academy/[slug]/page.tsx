import Link from "next/link";
import { notFound } from "next/navigation";

type Course = { id: string; title: string; description: string | null; slug: string };
type Lesson = { id: string; title: string; position: number; body: string | null };
type Video = { lesson_id: string; title: string; source_type: string; youtube_video_id: string | null };
export const dynamic = "force-dynamic";

async function readTable<T>(table: string, params: Record<string, string>): Promise<T[]> {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !key) return [];
  const url = new URL(`/rest/v1/${table}`, base);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url, { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [course] = await readTable<Course>("ggs_academy_courses", {
    select: "id,title,description,slug", slug: `eq.${slug}`, is_published: "eq.true", limit: "1"
  });
  if (!course) notFound();
  const lessons = await readTable<Lesson>("ggs_academy_lessons", {
    select: "id,title,position,body", course_id: `eq.${course.id}`, is_published: "eq.true", order: "position.asc"
  });
  const videos = lessons.length ? await readTable<Video>("ggs_academy_videos", {
    select: "lesson_id,title,source_type,youtube_video_id",
    lesson_id: `in.(${lessons.map(l => l.id).join(",")})`,
    is_published: "eq.true"
  }) : [];
  const videosByLesson = new Map(videos.map(v => [v.lesson_id, v]));
  return <main style={{ minHeight: "100vh", background: "#f6f8fb", padding: "48px max(24px, 8vw)", fontFamily: "Arial, sans-serif", color: "#14263e" }}>
    <Link href="/academy">← Academy</Link>
    <h1>{course.title}</h1><p>{course.description}</p>
    <p style={{ color: "#536579" }}>Academy learning is optional. The AED 49 payment is for company profile visibility, not for Academy lessons.</p>
    <h2>Lessons</h2>
    {lessons.length ? <ol style={{ paddingLeft: 24 }}>
      {lessons.map(lesson => {
        const video = videosByLesson.get(lesson.id);
        const youtubeId = video?.source_type === "youtube" && /^[a-zA-Z0-9_-]{11}$/.test(video.youtube_video_id || "") ? video.youtube_video_id : null;
        return <li key={lesson.id} style={{ background: "#fff", padding: 22, borderRadius: 14, margin: "16px 0", lineHeight: 1.7 }}>
          <h3>{lesson.title}</h3>
          {lesson.body ? <p style={{ whiteSpace: "pre-wrap" }}>{lesson.body}</p> : <p>Lesson materials are being prepared.</p>}
          {youtubeId ? <p><a href={`https://www.youtube.com/watch?v=${youtubeId}`} target="_blank" rel="noopener noreferrer">Watch published lesson video ↗</a></p> :
            <p style={{ color: "#66768a" }}>Private training video is not yet approved for playback.</p>}
        </li>;
      })}
    </ol> : <p>Lessons are being reviewed before release.</p>}
  </main>;
}
