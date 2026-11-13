# GGS Surveyor journey — approved order (2026-11-13)

1. **Free registration** for a surveyor.
2. **Complete professional profile**: experience, specialty, equipment, CV, certificates.
3. **AI-assisted assessment** with written, voice and video stages tailored to the surveyor's field and experience. Capture consent for audio/video and disclose AI use. Provide human review/appeal for consequential scores.
4. **Assessment results**: technical/communication evaluation, strengths, weaknesses, recommendations and professional level. Do not imply government licensing or formal accreditation.
5. **Optional GGS Academy**: recommended courses and personalized improvement plan. Academy is supplementary, not a prerequisite for assessment or publication.
6. **One-time AED 49 payment** to activate eligibility to display the surveyor profile to companies. The surveyor must explicitly opt in to company visibility and CV sharing. Never expose personal details or CV before consent and appropriate access checks.

Payment is **not a prerequisite for registration, profile completion, AI assessment, results, or Academy learning**. It is the gate for company-facing profile visibility only.

## Company flow — deferred
Companies purchase fixed-price CV groups when needed. Do not implement or launch company flows until the surveyor journey is complete. Group pricing remains a draft proposal, not activated.

## Implementation status
The website currently has marketing pages and Academy catalog scaffolding. The full surveyor dashboard, AI written/voice/video assessment UI and pipeline, report display, consent controls, payment gateway, and verified company visibility are **not implemented or end-to-end tested**. Existing Supabase assessment/report tables can be reused after checking policies and schemas.

## Security
- Keep payment status and company visibility server-controlled.
- Video/audio recordings and CVs require consent, private storage, retention rules and appropriate access checks.
- AI assessments must be tested for accuracy, fairness and human escalation.
- Never automatically publish profiles upon payment alone without explicit visibility consent.
- No separate Academy subscriptions or course payments.
- Academy video playback must not be gated by the AED 49 company-visibility fee. Keep private videos inaccessible until a separate safe authenticated learning access flow is implemented.
