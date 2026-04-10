-- Create site_stats table for admin-editable stats
create table if not exists public.site_stats (
  id uuid primary key default gen_random_uuid(),
  donors integer not null default 0,
  total_donated integer not null default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.site_stats enable row level security;

-- Allow anyone to read stats
create policy "Anyone can read site stats"
  on public.site_stats for select
  using (true);

-- Only admins can update stats
create policy "Admins can update site stats"
  on public.site_stats for update
  using (
    exists (
      select 1 from public.user_roles
      where user_roles.user_id = auth.uid()
      and user_roles.role = 'admin'
    )
  );

-- Insert default row
insert into public.site_stats (donors, total_donated) values (420, 38500);
