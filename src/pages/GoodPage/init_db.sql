-- DROP TABLE IF EXISTS good_replies;
-- DROP TABLE IF EXISTS good_posts;

CREATE TABLE good_posts (
  id serial PRIMARY KEY,
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,   -- 작성자 (유저 ID)
  username text,                                                -- 작성자 이름 (기본은 로그인 이름)
  is_public boolean,
  is_js boolean,
  title text,
  content text,
  created_at timestamptz DEFAULT timezone('Asia/Seoul', now())
);

ALTER TABLE good_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "읽기 권한 (비회원)"
ON good_posts
AS PERMISSIVE
FOR SELECT
TO anon
USING (
  is_public
);

CREATE POLICY "읽기 권한 (회원)"
ON good_posts
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
  true
);

CREATE POLICY "쓰기 권한"
ON good_posts
AS PERMISSIVE
FOR INSERT
TO authenticated
with check (
  is_admin()
  OR (
    (author_id = auth.uid())
    AND (EXISTS (SELECT 1 FROM members WHERE ((members.id = auth.uid()) AND (members.username = good_posts.username))))
    AND (NOT is_public)
    AND (NOT is_js)
  )
);

CREATE POLICY "수정 권한"
ON good_posts
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (
  is_admin()
  OR (
    (author_id = auth.uid())
    AND (EXISTS (SELECT 1 FROM members WHERE ((members.id = auth.uid()) AND (members.username = good_posts.username))))
    AND (NOT is_public)
    AND (NOT is_js)
  )
);

CREATE POLICY "삭제 권한"
ON good_posts
AS PERMISSIVE
FOR DELETE
TO authenticated
USING (
  is_admin()
  OR (author_id = auth.uid())
);


CREATE TABLE good_replies (
  id serial PRIMARY KEY,
  parent_id serial REFERENCES good_posts(id) ON DELETE CASCADE,   -- 부모 게시글 ID
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,     -- 작성자 (유저 ID)
  username text,                                                  -- 작성자 이름 (기본은 로그인 이름)
  is_public boolean,
  is_js boolean,
  title text,
  content text,
  created_at timestamptz DEFAULT timezone('Asia/Seoul', now())
);

ALTER TABLE good_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "읽기 권한 (비회원)"
ON good_replies
AS PERMISSIVE
FOR SELECT
TO anon
USING (
  is_public
);

CREATE POLICY "읽기 권한 (회원)"
ON good_replies
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (
  true
);

CREATE POLICY "쓰기 권한"
ON good_replies
AS PERMISSIVE
FOR INSERT
TO authenticated
with check (
  is_admin()
  OR (
    (author_id = auth.uid())
    AND (EXISTS (SELECT 1 FROM members WHERE ((members.id = auth.uid()) AND (members.username = good_replies.username))))
    AND (NOT is_public)
    AND (NOT is_js)
  )
);

CREATE POLICY "수정 권한"
ON good_replies
AS PERMISSIVE
FOR UPDATE
TO authenticated
USING (
  is_admin()
  OR (
    (author_id = auth.uid())
    AND (EXISTS (SELECT 1 FROM members WHERE ((members.id = auth.uid()) AND (members.username = good_replies.username))))
    AND (NOT is_public)
    AND (NOT is_js)
  )
);

CREATE POLICY "삭제 권한"
ON good_replies
AS PERMISSIVE
FOR DELETE
TO authenticated
USING (
  is_admin()
  OR (author_id = auth.uid())
);
