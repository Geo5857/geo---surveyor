import Link from "next/link";
import { headers } from "next/headers";

type Course = { id: string; slug: string; title: string; description: string | null; category: string | null; level: string | null };
export const dynamic = "force-dynamic";
export const metadata = { title: "GGS Academy | Geo Group Survey" };

async function getCourses(): Promise<Course[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // Server-side only. Fail closed if credentials are not configured.
  if (!url || !key) return [];
  const endpoint = new URL("/rest/v1/ggs_academy_courses", url);
  endpoint.searchParams.set("select", "id,slug,title,description,category,level");
  endpoint.searchParams.set("is_published", "eq.true");
  endpoint.searchParams.set("order", "title.asc");
  const response = await fetch(endpoint, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cache: "no-store"
  });
  if (!response.ok) { console.error("Academy catalog unavailable:", response.status); return []; }
  return response.json();
}

export default async function AcademyPage() {
  // Mark as dynamic; do not expose any privileged credentials to client bundles.
  await headers();
  const courses = await getCourses();
  return (
    <main style={{ minHeight: "100vh", background: "#f6f8fb", color: "#14263e", padding: "40px max(24px, 7vw)", fontFamily: "Arial, sans-serif" }}>
      <nav style={{ marginBottom: 50 }}><Link href="/" style={{ color: "#123b5a", textDecoration: "none" }}>← GEO GROUP SURVEY</Link></nav>
      <div style={{ maxWidth: 820, marginBottom: 38 }}>
        <p style={{ color: "#a17c33", fontWeight: 700, letterSpacing: 3 }}>GGS ACADEMY</p>
        <h1 style={{ fontSize: "clamp(34px, 5vw, 58px)", margin: "8px 0 16px" }}>Professional Surveying Education</h1>
        <p style={{ lineHeight: 1.8, color: "#536579" }}>Surveying, GNSS, LiDAR, Civil 3D, UAV mapping and field quality assurance. Only approved and published courses appear here.</p>
      </div>
      {courses.length === 0 ? <section style={{ background: "white", borderRadius: 16, padding: 28, maxWidth: 720 }}>
        <h2>Courses are being prepared</h2>
        <p>The GGS Academy catalog will appear here after configuration and content approval. No draft training videos are publicly accessible.</p>
      </section> : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
        {courses.map(course => <article key={course.id} style={{ background: "white", border: "1px solid #e0e6ed", borderRadius: 16, padding: 24 }}>
          <p style={{ color: "#a17c33", fontWeight: 700 }}>{course.category || "Surveying"} · {course.level || "All levels"}</p>
          <h2 style={{ fontSize: 22 }}>{course.title}</h2>
          <p style={{ color: "#536579", lineHeight: 1.6 }}>{course.description || "Course details coming soon."}</p>
          <Link href={`/academy/${encodeURIComponent(course.slug)}`} style={{ color: "#174f78" }}>View course →</Link>
        </article>)}
      </div>}
    </main>
  );
}
