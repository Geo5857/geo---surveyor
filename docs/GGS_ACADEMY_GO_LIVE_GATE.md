# Academy go-live gate — 2026-11-13

## Confirmed
- `app/academy/[slug]/page.tsx` renders `LessonPlayer` with published video metadata.
- `components/academy/LessonPlayer.tsx` uses Supabase browser authentication, calls `/api/academy/video` and `/api/academy/progress`.
- `app/api/academy/video/route.ts` authenticates bearer token and signs private MP4 URL only for published video+lesson+course.
- `app/api/academy/progress/route.ts` reads/inserts completion using caller JWT and database RLS.
- Storage bucket `ggs-academy-private-videos` is **private**; verified by SQL.
- Storage currently has **zero** video objects; no original MP4 was uploaded.
- Source ZIP contains 20 MP4s with verified checksums, but all 20 remain draft.
- `scripts/upload_approved_academy_videos.py` is available for controlled upload from a machine that has the original ZIP and authorized environment variables. Upload requires a nonempty explicit list of approved episode IDs. It does not publish content.

## Release blockers (not verified)
1. **Editorial approval:** human technical reviewer must check engineering correctness, voice pronunciation and actual spoken captions, graphics legibility and asset rights for each episode. Audio pause-based timing is NOT forced alignment.
2. **Upload:** no direct connected storage object upload action available in current environment. Use approved upload script from a trusted workstation with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY configured locally; never paste key into chat or commit it.
3. **Metadata mapping:** map approved `EPxx` to real lesson IDs; insert `ggs_academy_videos` storage records only after upload and checks, publish only with explicit editorial authorization.
4. **Auth compatibility:** current branch has no `app/login/page.tsx` or `lib/supabase/client.ts`. Verify that existing GGS surveyor account uses the SAME Supabase project and browser session; browser player may require sign-in again.
5. **Browser smoke test:** actual surveyor account must verify sign-in, video playback, expired-link refresh, completion persistence after reload, cross-account progress isolation, unauthorized video 401, unpublished video 404.
6. **Build/deploy:** no successful Next.js build or Vercel preview smoke test was run for this branch. Dependency `@supabase/supabase-js` was added to package.json but lockfile was not found; generate and commit lockfile via npm install before deploying. Review CI errors and fix before merging PR #1.
7. **Security:** service-role key server only; storage bucket stays private; do not publish draft videos or commit credentials.

## Release decision
**NO GO** for private original video playback and production deployment until all blockers are cleared. Published written lessons and existing approved YouTube content are separate.
