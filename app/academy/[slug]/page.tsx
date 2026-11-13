import Link from "next/link";
import { notFound } from "next/navigation";

type Course = { id: string; title: string; description: string | null; slug: string };
type Lesson = { id: string; title: string; position: number };
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
  const [course] = await readTable<Course>("ggs_academy_courses", { select: "id,title,description,slug", slug: `eq.${slug}`, is_published: "eq.true", limit: "1" });
  if (!course) notFound();
  const lessons = await readTable<Lesson>("ggs_academy_lessons", { select: "id,title,position", course_id: `eq.${course.id}`, is_published: "eq.true", order: "position.asc" });
  return <main style={{ minHeight: "100vh", padding: "48px max(24px, 8vw)", fontFamily: "Arial, sans-serif", color: "#14263e" }}>
    <Link href="/academy">← Academy</Link><h1>{course.title}</h1><p>{course.description}</p>
    <h2>Published lessons</h2>
    {lessons.length ? <ol>{lessons.map(l => <li key={l.id} style={{ margin: "18px 0" }}>{l.title} — <span style={{ color: "#7b8794" }}>Video access requires an approved subscription; playback is not enabled yet.</span></li>)}</ol> : <p>Lessons are being reviewed before release.</p>}
  </main>;
}
