# GGS Academy private playback — integration checklist

This branch contains a **server-side entitlement-gated signed URL endpoint**, but is not production-ready until configured, reviewed and tested.

1. Review `supabase/migrations/20261113_ggs_academy_entitlements.sql` against real payment and enrollment records, then apply in Supabase. **Do not create active entitlements without verified payment or administrator authorization.**
2. Set Vercel server variables `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` (the last must never be NEXT_PUBLIC).
3. Confirm `ggs-academy-private-videos` remains private. Upload only reviewed MP4s through an authorized uploader. Verify each object exists.
4. Create approved `ggs_academy_videos` records with `source_type='supabase_storage'`, a verified relative `storage_path`, and `is_published=true` **only after review**. Lessons and courses must also be published.
5. On an authenticated client, POST `{ "videoId": "<uuid>" }` to `/api/academy/video` with `Authorization: Bearer <Supabase access token>`. Response provides a short-lived URL only for active authorized entitlements.
6. Test no token, invalid token, expired entitlement, wrong course, unpublished video, missing object, valid subscriber, and URL expiry. Protect from abuse with hosting-level rate limits before launch.
7. Review Supabase project security advisors, Vercel environment, and deployment checks before merging.

**Important:** This endpoint returns a temporary media URL, not DRM. It is not a guarantee against recording or redistribution. Video binaries are not uploaded and billing integration is not implemented by this PR.
