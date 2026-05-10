-- Admin support: add is_admin flag to profiles

alter table public.profiles add column if not exists is_admin boolean default false;

-- Make all existing users admins (safe when there's only one user during initial setup)
update public.profiles set is_admin = true;

-- Allow admins to read all profiles (for admin panel)
create policy "Admins can view all profiles"
  on public.profiles for select
  using (auth.uid() = id or (select is_admin from public.profiles where id = auth.uid()) = true);
