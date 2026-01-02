-- Create a table for public profiles (accessible by everyone for reading)
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  updated_at timestamp with time zone,
  
  primary key (id)
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policy to allow anyone to read basic profile info (needed for user existence check)
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

-- Create policy for users to update their own profile
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, updated_at)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', now());
  return new;
end;
$$;

-- Trigger to safely create profile on signup
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
