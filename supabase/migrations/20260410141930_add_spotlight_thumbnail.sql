-- Add thumbnail_url to spotlight table
alter table public.spotlight add column if not exists thumbnail_url text;
