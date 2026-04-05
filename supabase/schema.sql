create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  is_visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  tagline text not null default '',
  image_url text not null default '',
  gallery_images text[] not null default '{}',
  original_price numeric(10, 2) not null default 0,
  sale_price numeric(10, 2) not null default 0,
  in_stock boolean not null default true,
  category_id uuid references public.categories(id) on delete set null,
  description text not null default '',
  key_features text[] not null default '{}',
  specifications text not null default '',
  shipping_returns text not null default '',
  ebay_link text not null default '',
  rating numeric(3, 2) not null default 5,
  review_count int not null default 0,
  is_best_seller boolean not null default false,
  is_new boolean not null default false,
  is_on_sale boolean not null default false,
  show_in_shop boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_content (
  id int primary key,
  hero_image_url text not null default '',
  hero_heading text not null default 'Discover Amazing Products',
  hero_text text not null default 'Tech essentials, lifestyle products, and more. All available for secure purchase on eBay with fast UK shipping.',
  campaign_image_url text not null default '',
  campaign_heading text not null default 'Flash Offers This Week',
  campaign_text text not null default 'Highlight a promotion, seasonal offer, or sponsored launch here. This banner is designed for high visibility and conversion.',
  best_seller_product_ids uuid[] not null default '{}',
  updated_at timestamptz not null default now(),
  constraint site_content_singleton check (id = 1)
);

insert into public.site_content (id)
values (1)
on conflict (id) do nothing;

create index if not exists idx_products_category_id on public.products(category_id);
create index if not exists idx_products_show_in_shop on public.products(show_in_shop);
create index if not exists idx_products_best_seller on public.products(is_best_seller);
create index if not exists idx_products_price on public.products(sale_price);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger trg_products_set_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

create or replace trigger trg_site_content_set_updated_at
before update on public.site_content
for each row
execute function public.set_updated_at();

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.site_content enable row level security;

drop policy if exists "public read categories" on public.categories;
create policy "public read categories"
on public.categories
for select
using (true);

drop policy if exists "public read products" on public.products;
create policy "public read products"
on public.products
for select
using (show_in_shop = true);

drop policy if exists "public read site content" on public.site_content;
create policy "public read site content"
on public.site_content
for select
using (true);

-- For admin writes, use SUPABASE_SERVICE_ROLE_KEY from server actions.

-- Ensure PostgREST sees new tables immediately.
notify pgrst, 'reload schema';
