-- Allow admins to update other users' profiles (for user management)

create policy "Admins can update all profiles"
  on public.profiles for update
  using (auth.uid() = id or (select is_admin from public.profiles where id = auth.uid()) = true);
