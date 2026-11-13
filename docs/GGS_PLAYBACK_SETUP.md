# GGS payment model — approved

## Surveyor
- One-time payment: **AED 49.00** (4900 fils).
- Payment grants ongoing access to the full surveyor platform including GGS Academy; no recurring fee, no packages and no course-specific purchase.
- Require a verified paid order tied to the authenticated surveyor's user ID. Repeated registration should not create duplicate paid-access charges.

## Company
- Company account has no recurring subscription.
- Company pays **for each request for a group of CVs**. Every request is an independent order, with a defined number of CVs, confirmed price and payment.
- **Company batch pricing is not yet approved.** Do not charge companies or calculate a total until a pricing rule is chosen.
- Release only CVs covered by the specific paid request, subject to surveyor consent and data protection; do not expose all candidate contact information.

## Draft database migration
`supabase/migrations/20261113_ggs_platform_payments.sql` defines server-managed orders and company batch requests. RLS is enabled, with no direct anonymous/authenticated table privileges. It has **not been applied to production**. Provider integration must be completed first.

## Payment lifecycle
1. Authenticated user requests checkout; backend verifies their role against server-owned `profiles.user_type`.
2. Server creates a pending order with price fixed server-side: surveyor AED 49, or approved company CV batch quote.
3. Backend initiates payment provider checkout with an idempotency key. Never trust price or paid status sent from browser.
4. Provider webhook signature, event ID, currency, amount and order ownership are verified; server marks order paid atomically, once.
5. Surveyor gains access to all surveyor services. Company gains access to **only its paid CV request** after consent checks.
6. Refunds, disputes, retries, cancellations and receipts must be handled. Keep payment card details with provider only.

## Open items before live payments
- Select supported UAE payment provider and confirm merchant account.
- Decide company CV batch price and whether it varies by number of CVs.
- Confirm exact `profiles.user_type` values, business verification and candidate CV consent.
- Implement and test checkout, webhooks, refunds, role access and signed private file delivery.
- Academy video assets are not yet uploaded; private playback remains fail-closed.
