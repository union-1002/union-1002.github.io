-- drop table if exists good_replies;
-- drop table if exists good_posts;

create table good_posts (
  id serial primary key,
  author_id uuid references auth.users(id) on delete cascade,   -- 작성자 (유저 ID)
  username text,                                                -- 작성자 이름 (기본은 로그인 이름)
  is_js boolean,
  title text,
  content text,
  created_at timestamptz default timezone('Asia/Seoul', now())
);

alter table good_posts enable row level security;

create policy "읽기 권한"
on good_posts
as PERMISSIVE
for SELECT
to public
using (
  true
);

create policy "쓰기 권한"
on good_posts
as PERMISSIVE
for INSERT
to authenticated
with check (
  is_admin()
  OR (
    (author_id = auth.uid())
    AND (EXISTS (SELECT 1 FROM members WHERE ((members.id = auth.uid()) AND (members.username = good_posts.username))))
    AND (NOT is_js)
  )
);

create policy "수정 권한"
on good_posts
as PERMISSIVE
for UPDATE
to authenticated
using (
  is_admin()
  OR (
    (author_id = auth.uid())
    AND (EXISTS (SELECT 1 FROM members WHERE ((members.id = auth.uid()) AND (members.username = good_posts.username))))
    AND (NOT is_js)
  )
);

create policy "삭제 권한"
on good_posts
as PERMISSIVE
for DELETE
to authenticated
using (
  is_admin()
  OR (author_id = auth.uid())
);


create table good_replies (
  id serial primary key,
  parent_id serial references good_posts(id) on delete cascade,   -- 부모 게시글 ID
  author_id uuid references auth.users(id) on delete cascade,     -- 작성자 (유저 ID)
  username text,                                                  -- 작성자 이름 (기본은 로그인 이름)
  is_js boolean,
  title text,
  content text,
  created_at timestamptz default timezone('Asia/Seoul', now())
);

alter table good_replies enable row level security;

create policy "읽기 권한"
on good_replies
as PERMISSIVE
for SELECT
to public
using (
  true
);

create policy "쓰기 권한"
on good_replies
as PERMISSIVE
for INSERT
to authenticated
with check (
  is_admin()
  OR (
    (author_id = auth.uid())
    AND (EXISTS (SELECT 1 FROM members WHERE ((members.id = auth.uid()) AND (members.username = good_replies.username))))
    AND (NOT is_js)
  )
);

create policy "수정 권한"
on good_replies
as PERMISSIVE
for UPDATE
to authenticated
using (
  is_admin()
  OR (
    (author_id = auth.uid())
    AND (EXISTS (SELECT 1 FROM members WHERE ((members.id = auth.uid()) AND (members.username = good_replies.username))))
    AND (NOT is_js)
  )
);

create policy "삭제 권한"
on good_replies
as PERMISSIVE
for DELETE
to authenticated
using (
  is_admin()
  OR (author_id = auth.uid())
);
