-- Entitlement source for GGS Academy private playback.
-- Apply only after reviewing existing billing and subscription logic.
create table if not exists public.ggs_academy_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid references public.ggs_academy_courses(id) on delete cascade,
  status text not null check (status in ('active','revoked','expired')),
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists ggs_academy_entitlements_user_status_idx on public.ggs_academy_entitlements (user_id,status,expires_at);
alter table public.ggs_academy_entitlements enable row level security;
-- Intentionally no public/authenticated RLS policies: only trusted backend
-- service role can manage or inspect entitlements. Never expose service role in browser.
revoke all on public.ggs_academy_entitlements from anon, authenticated;
comment on table public.ggs_academy_entitlements is 'Server-controlled course or academy-wide subscription grants. Null course_id means academy-wide.';
