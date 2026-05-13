-- =============================================================
-- 판교다시봄정신건강의학과 — Supabase Schema
-- =============================================================
-- 적용 방법:
--   Supabase 대시보드 > SQL Editor 에서 이 파일 전체를 실행하세요.
-- =============================================================


-- ───────────────────────────────────────────
-- 1. 공지사항 (notices)
-- ───────────────────────────────────────────
create table if not exists public.notices (
  id          uuid        primary key default gen_random_uuid(),
  title       text        not null,
  content     text        not null,
  category    text        not null default 'general'
                check (category in ('general', 'event', 'important')),
  published   boolean     not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table  public.notices              is '공지사항';
comment on column public.notices.category    is 'general | event | important';
comment on column public.notices.published   is 'true=공개, false=초안';


-- ───────────────────────────────────────────
-- 2. 의료진 (doctors)
-- ───────────────────────────────────────────
create table if not exists public.doctors (
  id          uuid        primary key default gen_random_uuid(),
  name        text        not null,
  title       text        not null default '원장',
  specialty   text        not null default '정신건강의학과 전문의',
  education   text        not null default '',
  career      text        not null default '',
  image_url   text,
  "order"     integer     not null default 0,
  visible     boolean     not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table  public.doctors           is '의료진 정보';
comment on column public.doctors."order"  is '노출 순서 (오름차순)';
comment on column public.doctors.visible  is 'true=노출, false=숨김';


-- ───────────────────────────────────────────
-- 3. 병원 기본정보 (hospital_settings)
--    단일 행 테이블: id = 1 고정
-- ───────────────────────────────────────────
create table if not exists public.hospital_settings (
  id              integer     primary key default 1 check (id = 1),
  name            text        not null default '판교다시봄정신건강의학과',
  address         text        not null default '',
  phone           text        not null default '',
  fax             text,
  hours_weekday   text        not null default '',
  hours_saturday  text        not null default '',
  hours_sunday    text        not null default '',
  hours_lunch     text        not null default '',
  kakao_url       text,
  naver_map_url   text,
  description     text        not null default '',
  updated_at      timestamptz not null default now()
);

comment on table public.hospital_settings is '병원 기본정보 (단일 행)';

-- 기본 행 삽입 (없을 때만)
insert into public.hospital_settings (id)
values (1)
on conflict (id) do nothing;


-- ───────────────────────────────────────────
-- 4. updated_at 자동 갱신 트리거
-- ───────────────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger notices_updated_at
  before update on public.notices
  for each row execute function public.handle_updated_at();

create or replace trigger doctors_updated_at
  before update on public.doctors
  for each row execute function public.handle_updated_at();

create or replace trigger hospital_settings_updated_at
  before update on public.hospital_settings
  for each row execute function public.handle_updated_at();


-- ───────────────────────────────────────────
-- 5. Row Level Security (RLS) — 뼈대만 설정
--    실제 정책은 Supabase Auth 연동 후 추가하세요.
-- ───────────────────────────────────────────
alter table public.notices          enable row level security;
alter table public.doctors          enable row level security;
alter table public.hospital_settings enable row level security;

-- 공개 읽기 (홈페이지에서 notices, doctors 조회 허용)
create policy "public read notices"
  on public.notices for select
  using (published = true);

create policy "public read doctors"
  on public.doctors for select
  using (visible = true);

create policy "public read hospital_settings"
  on public.hospital_settings for select
  using (true);

-- 관리자 전체 권한 (service_role 또는 authenticated admin role 사용 예정)
-- TODO: Supabase Auth 연동 후 admin role 체크 로직 추가
-- create policy "admin full access notices"   on public.notices          for all using (auth.role() = 'service_role');
-- create policy "admin full access doctors"   on public.doctors          for all using (auth.role() = 'service_role');
-- create policy "admin full access settings"  on public.hospital_settings for all using (auth.role() = 'service_role');
