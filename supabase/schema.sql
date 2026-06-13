-- =============================================================
-- 판교다시봄 정신건강의학과 — Supabase Schema
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
  content     text        not null default '',
  notice_type text        not null default 'text'
                constraint notices_notice_type_check
                check (notice_type in ('text', 'image')),
  image_url   text,
  image_alt   text,
  display_date date,
  category    text        not null default 'general'
                check (category in ('general', 'event', 'important')),
  published   boolean     not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table  public.notices              is '공지사항';
comment on column public.notices.notice_type is 'text=글 공지, image=이미지 공지';
comment on column public.notices.image_url   is '이미지 공지 또는 첨부 이미지 URL';
comment on column public.notices.display_date is '홈페이지에 표시할 기준 날짜';
comment on column public.notices.category    is 'general | event | important';
comment on column public.notices.published   is 'true=공개, false=초안';

-- 기존 notices 테이블이 있는 경우를 위한 컬럼 보강
alter table public.notices
  add column if not exists notice_type text not null default 'text',
  add column if not exists image_url text,
  add column if not exists image_alt text,
  add column if not exists display_date date;

alter table public.notices
  alter column content set default '';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'notices_notice_type_check'
  ) then
    alter table public.notices
      add constraint notices_notice_type_check
      check (notice_type in ('text', 'image'));
  end if;
end;
$$;


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
  name            text        not null default '판교다시봄 정신건강의학과',
  address         text        not null default '',
  phone           text        not null default '',
  fax             text,
  hours_weekday   text        not null default '',
  hours_saturday  text        not null default '',
  hours_sunday    text        not null default '',
  hours_lunch     text        not null default '',
  kakao_url       text,
  naver_map_url   text,
  location_title text not null default '편안히 찾아오실 수 있도록 안내합니다.',
  location_description text not null default '',
  location_image_url text,
  location_image_alt text,
  description     text        not null default '',
  updated_at      timestamptz not null default now()
);

comment on table public.hospital_settings is '병원 기본정보 (단일 행)';

-- 기본 행 삽입 (없을 때만)
insert into public.hospital_settings (id)
values (1)
on conflict (id) do nothing;

-- 기존 hospital_settings 테이블이 있는 경우를 위한 컬럼 보강
alter table public.hospital_settings
  add column if not exists location_title text not null default '편안히 찾아오실 수 있도록 안내합니다.',
  add column if not exists location_description text not null default '',
  add column if not exists location_image_url text,
  add column if not exists location_image_alt text;


-- ───────────────────────────────────────────
-- 4. 운영시간 (operating_hours)
-- ───────────────────────────────────────────
create table if not exists public.operating_hours (
  id          uuid        primary key default gen_random_uuid(),
  label       text        not null default '',
  value       text        not null default '',
  "order"     integer     not null default 0,
  visible     boolean     not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table  public.operating_hours          is '운영시간';
comment on column public.operating_hours.label    is '홈페이지에 표시할 운영시간 라벨';
comment on column public.operating_hours.value    is '홈페이지에 표시할 운영시간 값';
comment on column public.operating_hours."order" is '노출 순서 (오름차순)';
comment on column public.operating_hours.visible  is 'true=노출, false=숨김';

insert into public.operating_hours (label, value, "order", visible)
select '평일', '09:00 – 18:00', 1, true
where not exists (select 1 from public.operating_hours);

insert into public.operating_hours (label, value, "order", visible)
select '토요일', '09:00 – 13:00', 2, true
where not exists (select 1 from public.operating_hours where "order" = 2);

insert into public.operating_hours (label, value, "order", visible)
select '일요일/공휴일', '휴진', 3, true
where not exists (select 1 from public.operating_hours where "order" = 3);

insert into public.operating_hours (label, value, "order", visible)
select '점심시간', '13:00 – 14:00', 4, true
where not exists (select 1 from public.operating_hours where "order" = 4);


-- ───────────────────────────────────────────
-- 5. 병원 둘러보기 이미지 (interior_images)
-- ───────────────────────────────────────────
create table if not exists public.interior_images (
  id          uuid        primary key default gen_random_uuid(),
  title       text        not null default '',
  image_url   text        not null,
  image_alt   text        not null default '',
  "order"     integer     not null default 0,
  visible     boolean     not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table  public.interior_images          is '병원 둘러보기 이미지';
comment on column public.interior_images."order" is '노출 순서 (오름차순)';
comment on column public.interior_images.visible is 'true=노출, false=숨김';


-- ───────────────────────────────────────────
-- 6. 비급여 안내 (non_covered_settings, non_covered_items)
-- ───────────────────────────────────────────
create table if not exists public.non_covered_settings (
  id          integer     primary key default 1 check (id = 1),
  intro_text  text        not null default '의료법 제45조에 의거하여 판교다시봄 정신건강의학과의 비급여 진료비용을 고지합니다.',
  note_text   text        not null default '* 위 항목은 건강보험 요양급여 비용 기준에 포함되지 않는 비급여 항목입니다.',
  updated_at  timestamptz not null default now()
);

comment on table public.non_covered_settings is '비급여 안내 문구 (단일 행)';
comment on column public.non_covered_settings.intro_text is '비급여 안내 상단 설명';
comment on column public.non_covered_settings.note_text is '비급여 안내 하단 설명';

insert into public.non_covered_settings (id)
values (1)
on conflict (id) do nothing;

create table if not exists public.non_covered_items (
  id          uuid        primary key default gen_random_uuid(),
  category    text        not null default '',
  name        text        not null default '',
  price       text        not null default '',
  note        text        not null default '',
  "order"     integer     not null default 0,
  visible     boolean     not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table  public.non_covered_items            is '비급여 진료비용 항목';
comment on column public.non_covered_items.category   is '대분류';
comment on column public.non_covered_items.name       is '항목명';
comment on column public.non_covered_items.price      is '표시 금액';
comment on column public.non_covered_items.note       is '비고';
comment on column public.non_covered_items."order"   is '노출 순서 (오름차순)';
comment on column public.non_covered_items.visible    is 'true=노출, false=숨김';

insert into public.non_covered_items (category, name, price, note, "order", visible)
select seed.category, seed.name, seed.price, seed.note, seed."order", true
from (
  values
    ('제증명 수수료', '일반진단서', '20,000', '', 1),
    ('제증명 수수료', '영문진단서', '20,000', '', 2),
    ('제증명 수수료', '근로능력평가용 진단서', '10,000', '', 3),
    ('제증명 수수료', '장애정도 심사용진단서', '40,000', '', 4),
    ('제증명 수수료', '병무용진단서', '20,000', '', 5),
    ('제증명 수수료', '소견서', '10,000', '', 6),
    ('제증명 수수료', '통원/진료확인서', '3,000', '', 7),
    ('제증명 수수료', '의무기록사본(1-5매)', '1,000', '장당', 8),
    ('제증명 수수료', '의무기록사본(6매 이상)', '100', '장당', 9),
    ('제증명 수수료', '제증명서 사본', '1,000', '', 10),
    ('검사료', '종합주의력검사(CAT)', '100,000', '', 11),
    ('검사료', '불안민감성척도', '75,000', '', 12),
    ('검사료', '한국판성격평가척도(KPAI)', '60,000', '', 13),
    ('검사료', '이화방어기제검사(EDMT)', '60,000', '', 14),
    ('검사료', '신경증우울평가', '75,000', '', 15),
    ('검사료', '신경증불안평가', '75,000', '', 16),
    ('검사료', '자율신경계이상검사/심박변이도검사', '30,000', '', 17)
) as seed(category, name, price, note, "order")
where not exists (select 1 from public.non_covered_items);


-- ───────────────────────────────────────────
-- 7. Storage buckets
-- ───────────────────────────────────────────
insert into storage.buckets (id, name, public)
values
  ('notice-images', 'notice-images', true),
  ('doctor-images', 'doctor-images', true),
  ('interior-images', 'interior-images', true),
  ('location-images', 'location-images', true)
on conflict (id) do update
set public = excluded.public;


-- ───────────────────────────────────────────
-- 8. updated_at 자동 갱신 트리거
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

create or replace trigger operating_hours_updated_at
  before update on public.operating_hours
  for each row execute function public.handle_updated_at();

create or replace trigger interior_images_updated_at
  before update on public.interior_images
  for each row execute function public.handle_updated_at();

create or replace trigger non_covered_settings_updated_at
  before update on public.non_covered_settings
  for each row execute function public.handle_updated_at();

create or replace trigger non_covered_items_updated_at
  before update on public.non_covered_items
  for each row execute function public.handle_updated_at();


-- ───────────────────────────────────────────
-- 9. Row Level Security (RLS) — 뼈대만 설정
--    실제 정책은 Supabase Auth 연동 후 추가하세요.
-- ───────────────────────────────────────────
alter table public.notices          enable row level security;
alter table public.doctors          enable row level security;
alter table public.hospital_settings enable row level security;
alter table public.operating_hours  enable row level security;
alter table public.interior_images  enable row level security;
alter table public.non_covered_settings enable row level security;
alter table public.non_covered_items enable row level security;

-- 공개 읽기 (홈페이지에서 notices, doctors 조회 허용)
drop policy if exists "public read notices" on public.notices;
create policy "public read notices"
  on public.notices for select
  using (published = true);

drop policy if exists "public read doctors" on public.doctors;
create policy "public read doctors"
  on public.doctors for select
  using (visible = true);

drop policy if exists "public read hospital_settings" on public.hospital_settings;
create policy "public read hospital_settings"
  on public.hospital_settings for select
  using (true);

drop policy if exists "public read operating_hours" on public.operating_hours;
create policy "public read operating_hours"
  on public.operating_hours for select
  using (visible = true);

drop policy if exists "public read interior_images" on public.interior_images;
create policy "public read interior_images"
  on public.interior_images for select
  using (visible = true);

drop policy if exists "public read non_covered_settings" on public.non_covered_settings;
create policy "public read non_covered_settings"
  on public.non_covered_settings for select
  using (true);

drop policy if exists "public read non_covered_items" on public.non_covered_items;
create policy "public read non_covered_items"
  on public.non_covered_items for select
  using (visible = true);

-- 관리자 전체 권한 (service_role 또는 authenticated admin role 사용 예정)
-- TODO: Supabase Auth 연동 후 admin role 체크 로직 추가
-- create policy "admin full access notices"   on public.notices          for all using (auth.role() = 'service_role');
-- create policy "admin full access doctors"   on public.doctors          for all using (auth.role() = 'service_role');
-- create policy "admin full access settings"  on public.hospital_settings for all using (auth.role() = 'service_role');
-- create policy "admin full access hours"     on public.operating_hours  for all using (auth.role() = 'service_role');
-- create policy "admin full access interior"  on public.interior_images  for all using (auth.role() = 'service_role');
-- create policy "admin full access non_covered_settings" on public.non_covered_settings for all using (auth.role() = 'service_role');
-- create policy "admin full access non_covered_items"    on public.non_covered_items    for all using (auth.role() = 'service_role');
