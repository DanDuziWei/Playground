-- InfinaX CEO Operating System - Phase 1 Supabase schema
-- Enable in Supabase SQL editor before connecting production data.

create extension if not exists "pgcrypto";

create type public.business_status as enum ('active', 'paused', 'archived');
create type public.lead_status as enum ('new', 'contacted', 'qualified', 'converted', 'lost');
create type public.activity_type as enum ('call', 'email', 'meeting', 'note', 'task', 'agent_action');
create type public.insight_severity as enum ('info', 'opportunity', 'risk', 'urgent');
create type public.agent_status as enum ('planned', 'active', 'paused', 'retired');

create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  status public.business_status not null default 'active',
  weekly_goal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.businesses(id) on delete set null,
  full_name text not null,
  email text,
  phone text,
  client_type text not null default 'customer',
  lifecycle_stage text not null default 'active',
  total_revenue numeric(12,2) not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  full_name text not null,
  email text,
  phone text,
  source text not null default 'unknown',
  status public.lead_status not null default 'new',
  score integer not null default 50 check (score between 0 and 100),
  value_estimate numeric(12,2),
  owner_id uuid references auth.users(id) on delete set null,
  next_follow_up_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name text not null,
  event_type text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  capacity integer,
  location text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  business_id uuid not null references public.businesses(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  client_id uuid references public.clients(id) on delete set null,
  status text not null default 'registered',
  paid_amount numeric(12,2) not null default 0,
  attended boolean,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.businesses(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  agent_id uuid,
  type public.activity_type not null default 'note',
  title text not null,
  body text,
  due_at timestamptz,
  completed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.businesses(id) on delete cascade,
  report_type text not null default 'weekly',
  period_start date not null,
  period_end date not null,
  title text not null,
  summary text not null,
  metrics jsonb not null default '{}'::jsonb,
  recommendations jsonb not null default '[]'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.agents (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text not null,
  status public.agent_status not null default 'planned',
  scope text[] not null default '{}',
  capabilities jsonb not null default '[]'::jsonb,
  last_run_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.activities
  add constraint activities_agent_id_fkey foreign key (agent_id) references public.agents(id) on delete set null;

create table public.ai_insights (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.businesses(id) on delete cascade,
  report_id uuid references public.reports(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete set null,
  severity public.insight_severity not null default 'info',
  title text not null,
  insight text not null,
  recommended_action text,
  evidence jsonb not null default '{}'::jsonb,
  is_resolved boolean not null default false,
  created_at timestamptz not null default now()
);

create index businesses_status_idx on public.businesses(status);
create index leads_business_status_idx on public.leads(business_id, status);
create index leads_created_at_idx on public.leads(created_at desc);
create index activities_business_created_idx on public.activities(business_id, created_at desc);
create index events_business_starts_idx on public.events(business_id, starts_at desc);
create index reports_period_idx on public.reports(period_start, period_end);
create index ai_insights_severity_idx on public.ai_insights(severity, is_resolved);

alter table public.businesses enable row level security;
alter table public.clients enable row level security;
alter table public.leads enable row level security;
alter table public.events enable row level security;
alter table public.registrations enable row level security;
alter table public.activities enable row level security;
alter table public.reports enable row level security;
alter table public.agents enable row level security;
alter table public.ai_insights enable row level security;

-- Phase 1 admin-only policy. Extend with a profiles table and role claims for future RBAC.
create policy "authenticated_admin_read_write_businesses" on public.businesses for all to authenticated using (true) with check (true);
create policy "authenticated_admin_read_write_clients" on public.clients for all to authenticated using (true) with check (true);
create policy "authenticated_admin_read_write_leads" on public.leads for all to authenticated using (true) with check (true);
create policy "authenticated_admin_read_write_events" on public.events for all to authenticated using (true) with check (true);
create policy "authenticated_admin_read_write_registrations" on public.registrations for all to authenticated using (true) with check (true);
create policy "authenticated_admin_read_write_activities" on public.activities for all to authenticated using (true) with check (true);
create policy "authenticated_admin_read_write_reports" on public.reports for all to authenticated using (true) with check (true);
create policy "authenticated_admin_read_write_agents" on public.agents for all to authenticated using (true) with check (true);
create policy "authenticated_admin_read_write_ai_insights" on public.ai_insights for all to authenticated using (true) with check (true);

insert into public.businesses (slug, name, category, weekly_goal) values
  ('soccer-rangers-tfs', 'SoccerRangers / TFS', 'Sports / Football', 'Increase trial-to-registration conversion'),
  ('tfi', 'TFI', 'Education & International Pathway', 'Expand school and coach partnership pipeline'),
  ('cloudroute', 'CloudRoute', 'Travel / International Services', 'Improve high-intent visitor conversion'),
  ('playfield', 'PlayField', 'AI × Youth × Maker Programs', 'Grow community and AI program registrations')
on conflict (slug) do nothing;

insert into public.agents (name, description, status, scope, capabilities) values
  ('Enrollment Agent', 'Automates lead follow-up, registrations, renewals, and at-risk player workflows.', 'planned', array['leads','clients','registrations'], '["lead_scoring", "follow_up", "renewals"]'),
  ('Marketing Agent', 'Analyzes channels, campaigns, creative performance, and content recommendations.', 'planned', array['leads','activities','reports'], '["channel_analysis", "campaign_recommendations"]'),
  ('Research Agent', 'Finds schools, partners, routes, grants, and international expansion opportunities.', 'planned', array['businesses','activities','ai_insights'], '["market_research", "partner_discovery"]'),
  ('Operations Agent', 'Monitors weekly tasks, SLA risks, attendance, and cross-business execution.', 'planned', array['activities','events','registrations'], '["sla_monitoring", "risk_detection"]'),
  ('Football Analysis Agent', 'Connects player attendance, trials, retention, and development intelligence.', 'planned', array['events','registrations','clients'], '["attendance_analysis", "retention_prediction"]')
on conflict (name) do nothing;
