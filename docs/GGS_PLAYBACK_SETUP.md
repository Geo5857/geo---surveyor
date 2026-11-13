# GGS Platform access model (approved direction)

- There are **no subscription tiers/packages**.
- Surveyors pay one fixed platform access fee and can use all surveyor services, including GGS Academy.
- Companies have a distinct company account and company access fee, and can use all company services, including recruitment and candidate management.
- Access is controlled by the authenticated user's role (`surveyor` or `company`) and **verified platform payment status**, not by individual courses.
- The existing `public.profiles.user_type` column is the starting point for roles; validate its actual stored values before implementing access rules.
- Fee amounts, billing period, payment processor, and renewal policy **are not specified yet**. Do not invent prices or activate charges.
- No separate Academy subscription table should be created.
- Until a verified GGS-wide payment ledger and secure server-side access check are implemented, private video playback must remain disabled (HTTP 503).
- Private video bucket `ggs-academy-private-videos` remains private. No original MP4s have been uploaded yet.
- Never grant paid access based on client-supplied role, payment flags, or unverified payment callbacks.

## Before release
1. Confirm exact stored `profiles.user_type` values and ownership policies.
2. Agree fixed surveyor fee, company fee, billing period and renewal/expiry rules.
3. Implement GGS-wide payment records and server-verified entitlement after confirmed payment.
4. Add role-specific signup, login, dashboards and full-service authorization.
5. Connect Academy playback to verified **surveyor platform access**, not a course-specific entitlement.
6. Upload and review videos, then test denial/allow cases and deploy.
