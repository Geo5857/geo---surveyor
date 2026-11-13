# GGS Academy — release checklist (2026-11-13)

## Agreed scope
- Academy is **optional learning** for surveyors, including before the AED 49 fee.
- Assessment results recommend lessons based on identified gaps; Academy completion is not an assessment prerequisite.
- AED 49 is for opt-in company profile visibility after assessment, not Academy access.

## Verified source package
- Library: `GGS_Academy_20_Lessons_Review_Bundle.zip` (68,414,298 bytes).
- Contains 20 `videos/EP01.mp4`–`EP20.mp4`, narration texts, draft SRT files, `manifest.json`/`manifest.csv`, Arabic README.
- Source manifest labels **every lesson DRAFT — not approved** and `storage_uploaded=false`.
- The videos use synthetic narration and illustrations. These are not certified field/software demonstrations.
- Source README calls for technical review, genuine demonstrations where needed, audio/subtitle improvement, rights review, private upload, and playback tests.
- Do **not** mark videos published without approvals.

## Existing Supabase schema
- `ggs_academy_courses`, `ggs_academy_lessons`, `ggs_academy_videos`, `ggs_academy_progress`.
- Existing course/lesson counts: 73/223; original MP4s in private storage: zero at last check.
- Academy catalog/course pages are scaffolded in GitHub; playback endpoint currently responds 503 (closed).

## Shortest completion path
1. **Approve content:** check all 20 scripts, terminology, subtitles, voice and representative frames; record per-episode approval or corrections. Do not publish drafts.
2. **Private video ingestion:** upload approved MP4s to `ggs-academy-private-videos`, map each to a real lesson ID and private `storage_path`, verify SHA-256. Never put MP4s in GitHub or make storage public.
3. **Authenticated player:** use user session to issue short-lived signed URLs, protect route against IDOR, display lesson and progress. Remove the old payment gate from Academy video access.
4. **Progress and recommendations:** allow authenticated surveyors to mark lessons complete, store in `ggs_academy_progress` with RLS; recommend courses from assessment report weakness areas.
5. **Acceptance test:** test mobile/desktop, unauthorized access, captions, video playback, lesson completion, recommendations. Launch only approved lessons.

## Still blocking publication
- No completed technical/audio/video/rights review of the 20 videos.
- No original MP4 uploaded to private Supabase storage.
- No authenticated player or end-to-end progress tests.
- Do not claim the Academy is launched until these pass.
