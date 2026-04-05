# Supabase Setup

Run the SQL in `supabase/schema.sql` inside your Supabase SQL editor.

## Required env vars

Set these in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`)
- `SUPABASE_SERVICE_ROLE_KEY` (or `NEXT_SUPABASE_SERVICE_ROLE_KEY`)
- `ADMIN_PANEL_KEY` (optional, defaults to `shoaibinuk00788`)

## Admin URL

Open:

`/admin/shoaibinuk00788`

If you set `ADMIN_PANEL_KEY`, use that key in the URL instead.
