# GGS Academy integration — review stage

This branch adds a read-only Academy catalog and course pages, backed by the existing Supabase tables `ggs_academy_courses` and `ggs_academy_lessons`.

## Environment variables (Vercel, server only)
- `NEXT_PUBLIC_SUPABASE_URL`: your Supabase project URL.
- `SUPABASE_SERVICE_ROLE_KEY`: secret, **server-side only**. Never prefix with NEXT_PUBLIC, commit to Git, or log it. If absent, catalog fails closed to an empty list.

## Publication controls
- Catalog only lists `is_published=true` courses.
- Course page only lists `is_published=true` lessons.
- No video URLs are exposed.
- `/api/academy/video` intentionally returns HTTP 403 until real user authentication, subscription entitlements, and private Storage signed URLs have been implemented and tested.
- No video binaries were uploaded by this change. The private bucket was confirmed empty before implementation.
- The 20 local illustrated videos are **drafts** and require technical review, rights clearance, real field/software demonstrations where necessary, captions QA, and approved publication.

## Next implementation gates
1. Establish user login and a trusted server-side subscription entitlement source.
2. Verify authenticated identity on the server; authorize lesson and video publication and ownership/entitlement.
3. Look up approved `ggs_academy_videos.storage_path` server-side, validate path belongs to private bucket and sign a short-lived URL. Do not accept client-provided paths.
4. Upload reviewed MP4s via an authorized Storage client; verify objects exist, then create video metadata.
5. Test subscribed and unsubscribed users, revoked subscriptions, missing files, and link expiry.
6. Run `npm run build` and test a Vercel preview deployment before merging.

This is an intentionally non-publishing first integration; it does not represent completed paid video playback.
