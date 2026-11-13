# GGS Academy — caption remediation and editorial review (2026-11-13)

## Source and generated artifact
- Source: `GGS_Academy_20_Lessons_Review_Bundle.zip` (20 original videos and scripts).
- Generated local review artifact: `GGS_Academy_Caption_Review_Package.zip` containing `captions_RESEGMENTED_REVIEW/EP01.srt`–`EP20.srt`, the 20 original narration scripts, `QA_summary.csv`, and Arabic README.
- **This artifact is not uploaded to Supabase or GitHub**; it is downloadable in the ChatGPT conversation.

## Changes performed
- Re-segmented **132 draft caption cues into 639 shorter cues** using punctuation and estimated timing proportional to text length within original cue intervals.
- Preserved the English caption wording and original narration scripts.
- Cue durations may be as short as **0.92 seconds**; this is a QA flag requiring manual timing/merging.
- **Not forced-aligned to actual audio.** These captions must not be presented as synchronized or publication-approved.

## Editorial review of source scripts
- EP01–EP04: GNSS/RTK and QA; check reference frame/epoch, height model, independent checks, and accuracy claims against project specification.
- EP05–EP07: LiDAR planning, scan registration, point-cloud classification; ensure software and device-specific steps are demonstrated rather than implied by diagrams.
- EP08–EP10: Civil 3D surfaces, earthwork volumes, sections; explicitly illustrated, not actual Autodesk screen recordings; add practical demonstrations if marketed as hands-on training.
- EP11–EP13: control networks, traverses, least-squares; validate adjustment examples and tolerances with a licensed/qualified survey professional.
- EP14–EP16: UAV mission planning, ground control, orthomosaics; validate local flight permissions, ground sampling assumptions and checkpoints before use in any jurisdiction.
- EP17–EP19: construction setting-out and vertical transfer; confirm applicable project tolerances and independent checks.
- EP20: datums, reference frames, coordinate epochs; verify transformation and epoch guidance for target geography.

## Outstanding release gates
1. Audio forced-alignment and listening review of **all 20** English SRTs; fix cues below reading threshold.
2. Technical accuracy review of all scripts and any numerical examples by a qualified surveyor.
3. Review actual video frames, narration quality, media rights, and device/software demonstration claims.
4. Approval per episode, private storage upload, authenticated playback, progress tracking and device testing.

**Status: revised caption drafts prepared; no lesson approved for publication.**
