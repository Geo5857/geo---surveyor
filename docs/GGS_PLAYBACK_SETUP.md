# GGS platform payment and access model — agreed business rules

## Surveyors
- A surveyor pays a **one-time registration/access fee**, not a monthly or annual subscription.
- After verified payment, the surveyor has ongoing access to all surveyor-facing platform services, including GGS Academy, profile/CV, and job applications, subject to platform terms.
- Do not create separate Academy fees, course entitlements, subscription packages or recurring renewals.

## Companies
- Companies do **not** pay a recurring platform subscription.
- A company may register and explore available services; it pays **each time it requests CVs**, as needed.
- Only the specifically purchased CV request may release authorized candidate information, after verified payment and applicable privacy/consent checks.
- Do not grant blanket CV download access merely because a company has paid for a different request.
- Exact pricing basis (per CV, per request, or per batch), currency, amounts, and delivery/expiration policy are **not yet specified**.

## Implementation and safety
- `public.profiles.user_type` exists; confirm its actual values and authorization before building role-specific gates.
- Payment events must be verified server-side using a trusted payment provider callback; never trust a browser's paid flag.
- A single platform-wide one-time surveyor access grant is distinct from company CV purchase transactions.
- Do not expose private CV files, candidate contact information or private academy videos through public storage or unauthenticated routes.
- Until surveyor payment verification is integrated, `/api/academy/video` deliberately returns 503 (fail closed).
- No separate academy entitlement table or migration is to be applied.
- Academy videos still require content approval, private upload and playback tests.

## Next steps
1. Confirm fee amount for the one-time surveyor payment.
2. Confirm company CV purchase unit (individual CV, batch, or request), fee and candidate consent policy.
3. Implement secure payment order, webhook and durable ledger, then role-specific access checks.
4. Connect surveyor paid access to Academy video playback; company CV delivery must require a matching paid order.
5. Run end-to-end tests before enabling production payments.
