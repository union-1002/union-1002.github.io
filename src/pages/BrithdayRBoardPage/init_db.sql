-- DROP TABLE IF EXISTS happybday_r2025_replies;
-- DROP TABLE IF EXISTS happybday_r2025_posts;

CREATE TABLE happybday_r2025_posts (
  id serial PRIMARY KEY,
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,   -- 작성자 (유저 ID)
  username text,                                                -- 작성자 이름 (기본은 로그인 이름)
  is_public boolean,
  is_js boolean,
  title text,
  content text,
  created_at timestamptz DEFAULT timezone('Asia/Seoul', now())
);

ALTER TABLE happybday_r2025_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "읽기 권한"
ON happybday_r2025_posts
AS PERMISSIVE
FOR SELECT
TO public
USING (
  true
);

CREATE POLICY "쓰기 권한"
ON happybday_r2025_posts
AS PERMISSIVE
FOR INSERT
TO authenticated
with check (
  is_admin()
  OR (
    (author_id = auth.uid())
    AND (TRIM(username) != '')
    AND (NOT is_public)
    AND (NOT is_js)
  )
);

CREATE POLICY "수정 권한"
ON happybday_r2025_posts
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (
  is_admin()
  OR (
    (author_id = auth.uid())
    AND (TRIM(username) != '')
    AND (NOT is_public)
    AND (NOT is_js)
  )
);

CREATE POLICY "삭제 권한"
ON happybday_r2025_posts
AS PERMISSIVE
FOR DELETE
TO authenticated
USING (
  is_admin()
  OR (author_id = auth.uid())
);


CREATE TABLE happybday_r2025_replies (
  id serial PRIMARY KEY,
  parent_id serial REFERENCES happybday_r2025_posts(id) ON DELETE CASCADE,   -- 부모 게시글 ID
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,     -- 작성자 (유저 ID)
  username text,                                                  -- 작성자 이름 (기본은 로그인 이름)
  is_public boolean,
  is_js boolean,
  title text,
  content text,
  created_at timestamptz DEFAULT timezone('Asia/Seoul', now())
);

ALTER TABLE happybday_r2025_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "읽기 권한"
ON happybday_r2025_replies
AS PERMISSIVE
FOR SELECT
TO public
USING (
  true
);

CREATE POLICY "쓰기 권한"
ON happybday_r2025_replies
AS PERMISSIVE
FOR INSERT
TO authenticated
with check (
  is_admin()
  OR (
    (author_id = auth.uid())
    AND (TRIM(username) != '')
    AND (NOT is_public)
    AND (NOT is_js)
  )
);

CREATE POLICY "수정 권한"
ON happybday_r2025_replies
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (
  is_admin()
  OR (
    (author_id = auth.uid())
    AND (TRIM(username) != '')
    AND (NOT is_public)
    AND (NOT is_js)
  )
);

CREATE POLICY "삭제 권한"
ON happybday_r2025_replies
AS PERMISSIVE
FOR DELETE
TO authenticated
USING (
  is_admin()
  OR (author_id = auth.uid())
);
