-- GGS payment design: 49 AED once per surveyor; company CV bundles priced per request.
-- Draft migration. Apply only after payment provider and fulfillment workflows are reviewed.
create table if not exists public.ggs_payment_orders (
 id uuid primary key default gen_random_uuid(),
 buyer_id uuid not null references auth.users(id) on delete restrict,
 kind text not null check (kind in ('surveyor_access','company_cv_batch')),
 amount_fils bigint not null check (amount_fils > 0),
 currency text not null default 'AED' check (currency = 'AED'),
 status text not null default 'pending' check (status in ('pending','paid','failed','cancelled','refunded')),
 provider text,
 provider_checkout_id text unique,
 provider_payment_id text unique,
 paid_at timestamptz,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 constraint ggs_surveyor_price check (kind <> 'surveyor_access' or amount_fils = 4900),
 constraint ggs_paid_timestamp check (status <> 'paid' or paid_at is not null)
);
create unique index if not exists ggs_one_active_surveyor_access_order
 on public.ggs_payment_orders(buyer_id)
 where kind='surveyor_access' and status in ('pending','paid');
create index if not exists ggs_payment_orders_buyer_idx on public.ggs_payment_orders(buyer_id,created_at desc);
create table if not exists public.ggs_company_cv_requests (
 id uuid primary key default gen_random_uuid(),
 company_user_id uuid not null references auth.users(id) on delete restrict,
 payment_order_id uuid unique references public.ggs_payment_orders(id) on delete restrict,
 requested_count integer not null check (requested_count > 0 and requested_count <= 100),
 request_description text,
 status text not null default 'draft' check (status in ('draft','awaiting_payment','paid','fulfilling','fulfilled','cancelled')),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index if not exists ggs_company_cv_requests_owner_idx on public.ggs_company_cv_requests(company_user_id,created_at desc);
alter table public.ggs_payment_orders enable row level security;
alter table public.ggs_company_cv_requests enable row level security;
revoke all on public.ggs_payment_orders from anon,authenticated;
revoke all on public.ggs_company_cv_requests from anon,authenticated;
comment on table public.ggs_payment_orders is 'Trusted server-owned payment ledger. Provider webhook must verify signature and payment amount before marking paid.';
comment on table public.ggs_company_cv_requests is 'Each company CV bundle request requires its own verified payment. Do not disclose candidate CVs without consent.';
