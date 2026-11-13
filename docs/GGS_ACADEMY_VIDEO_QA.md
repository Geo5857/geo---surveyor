# GGS Academy — automated source-package QA

Source: Library file `GGS_Academy_20_Lessons_Review_Bundle.zip` (68,414,298 bytes). This is **file integrity and subtitle-structure QA**, not technical content approval or audiovisual review.

## Results
- ZIP CRC test: pass (no damaged entries).
- 20 of 20 MP4 videos present; 20 of 20 SHA-256 hashes match `manifest.json`.
- 20 of 20 narration TXT files and 20 of 20 draft SRT files present.
- Total declared runtime: 4,123 seconds = **68 min 43 sec**.
- All 20 episodes explicitly marked `DRAFT - not approved` and `storage_uploaded=false`.
- Subtitle cues: EP01–EP07 have **5 cues each**, EP08–EP09 have **10 cues each**, EP10–EP20 have **7 cues each**. This is unusually sparse for 2–9 minute instructional videos; verify actual synchronization/readability and regenerate properly timed captions before publishing.
- No MP4 has been approved for publishing by this QA.

| Episode | Duration (sec) | Subtitle cues | SHA-256 |
|---|---:|---:|---|
| EP01 | 180.0 | 5 | pass |
| EP02 | 166.3 | 5 | pass |
| EP03 | 163.1 | 5 | pass |
| EP04 | 157.9 | 5 | pass |
| EP05 | 155.3 | 5 | pass |
| EP06 | 143.3 | 5 | pass |
| EP07 | 136.1 | 5 | pass |
| EP08 | 537.7 | 10 | pass |
| EP09 | 366.4 | 10 | pass |
| EP10 | 210.5 | 7 | pass |
| EP11 | 203.1 | 7 | pass |
| EP12 | 207.0 | 7 | pass |
| EP13 | 195.7 | 7 | pass |
| EP14 | 189.2 | 7 | pass |
| EP15 | 189.5 | 7 | pass |
| EP16 | 192.8 | 7 | pass |
| EP17 | 182.2 | 7 | pass |
| EP18 | 174.2 | 7 | pass |
| EP19 | 185.2 | 7 | pass |
| EP20 | 187.5 | 7 | pass |

## Publication gates
1. Review each episode's technical script against surveying practice; add real-world instrument/software demonstrations where the instructional goal needs them.
2. Review representative frames and listen to full narration; check captions for timing, segmentation and readability.
3. Confirm media rights and approval per episode.
4. Upload approved originals to private Supabase storage, attach lesson IDs, implement authenticated signed playback and progress; test mobile and desktop.
5. Only then mark corresponding video rows `is_published=true`.

**Do not interpret this report as approval to publish.**
