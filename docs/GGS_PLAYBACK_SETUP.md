# GGS payment model — approved

## Surveyor
- One-time payment: **AED 49.00** (4900 fils).
- Payment grants ongoing access to the full surveyor platform including GGS Academy; no recurring fee, no packages and no course-specific purchase.
- Require a verified paid order tied to the authenticated surveyor's user ID. Repeated registration should not create duplicate paid-access charges.

## Company
- Company account has no recurring subscription.
- Company pays **for each fixed-size, fixed-price CV group**. Every purchase is an independent order. The backend snapshots the group's count and price at checkout.
- **Fixed-group pricing model is approved, but group sizes and prices are not yet approved.** Keep products inactive and do not charge companies until concrete group sizes and prices are confirmed.
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
- Approve fixed group sizes and a fixed AED price for each group; configure products only after approval.
- Confirm exact `profiles.user_type` values, business verification and candidate CV consent.
- Implement and test checkout, webhooks, refunds, role access and signed private file delivery.
- Academy video assets are not yet uploaded; private playback remains fail-closed.

## Fixed CV group catalog
- `ggs_cv_group_products`: administrator-controlled fixed-size group, AED price and active status.
- `ggs_company_cv_requests.group_product_id`: selected product; `quoted_cv_count` and `quoted_price_fils` snapshot the terms for that order.
- The server must verify role, product activation and exact order price before creating checkout. Do not permit browser-supplied amounts.
- No products are seeded or enabled because sizes and prices have not yet been chosen.
