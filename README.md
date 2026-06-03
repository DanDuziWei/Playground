# InfinaX CEO Dashboard OS

AI-native CEO Operating System MVP for the InfinaX company group.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase client and schema
- Vercel-ready deployment

## Phase 1 Scope

- Premium dark CEO dashboard
- Global executive metrics
- Lead and conversion intelligence layout
- Business modules for SoccerRangers / TFS, TFI, CloudRoute, and PlayField
- AI Executive Assistant panel
- Weekly reporting surfaces
- Supabase relational schema for leads, clients, businesses, activities, events, registrations, reports, ai_insights, and agents

## Local Development

```bash
npm install
npm run dev
```

Create `.env.local` when connecting Supabase:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Run `supabase/schema.sql` in the Supabase SQL editor to create the MVP database structure.

## Authentication Plan

The `/login` route provides the admin access entry point. Phase 1 includes the Supabase client and admin-only row-level security policies. For production RBAC, add a `profiles` table with role claims and replace the permissive authenticated policies with role-scoped policies.
