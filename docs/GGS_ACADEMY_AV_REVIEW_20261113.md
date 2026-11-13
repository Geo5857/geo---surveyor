# GGS Academy — audiovisual and audio-guided subtitle QA

## Actual inspection completed
- Extracted and probed all 20 original MP4s with ffprobe/ffmpeg.
- All 20 contain H.264 video at 1280×720, 5 fps, and AAC audio; all 20 source SHA-256 checks pass.
- Total runtime 4,123.06 s (68m43s).
- Audio mean level across files: −21.3 to −21.0 dB; detected peaks range −1.3 to 0.0 dB. **These measurements do not prove clear intelligible speech or absence of clipping.**
- Extracted 3 frames per video (60 samples total). Sampled videos predominantly show text-heavy educational slide decks. EP08 contains limited diagrams; these are **not real instrument/software field demonstrations**.
- Resegmented English draft SRT from 132 to 639 cues. An additional audio-guided pass detected actual audio silences and moved 351 subtitle boundaries to nearby pause midpoints (within 750 ms of original boundaries). The package `GGS_Academy_Audio_Guided_Captions.zip` contains 20 resulting SRTs and per-episode counts.
- **Important**: this is pause-based refinement, **not word-level speech-to-text forced alignment**. Speech recognition/transcript validation and listening review have not been performed. Do not label these captions precisely synchronized or approved.

## Technical editorial findings and release blockers
- Source scripts generally describe GNSS, RTK, QA, coordinate systems, CAD, LiDAR, UAV, and field survey practices. This is a topical inventory, **not a fact-by-fact expert certification**.
- Check every technical claim against project specifications, applicable surveying standards, coordinate reference systems and local UAV regulations; avoid generic tolerance claims.
- Video content is predominantly slide-based. Practical instrument operation and real software walkthroughs remain unverified/missing where course objectives imply hands-on learning.
- Review speech intelligibility, pronunciation of surveying acronyms, possible peak clipping, caption timing, visual legibility on mobile, subtitle completeness, and source/media rights before approval.
- All 20 episodes remain **DRAFT / NOT APPROVED**. No change to published Supabase content or storage has been made.

## Required acceptance
1. Human expert reviews each lesson script and slide.
2. Listen to each entire video and correct captions to match actual spoken words, with measured timestamps; obtain consent/rights for narration and imagery.
3. Add/verify practical demonstrations where claimed.
4. Upload only approved MP4s to private storage; implement signed playback and test progress.
