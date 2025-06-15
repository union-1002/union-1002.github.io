import { useEffect, useState } from 'react';
import { useUser } from '@/shared/user';
import supabase from '@/shared/supabase';

function getFunctionOrText(value) {
  try {
    return eval(value);
  } catch (e) {
    console.log(value, e);
  }
  return value;
}

export function makeContext(user) {
  return {
    f: {
      hasFinalConsonant,
    },
    user,
  }
}

export function usePosts(board, page, pageSize, publicOnly) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [nPages, setNPages] = useState(0);
  const user = useUser();

  const update = async () => {
    setLoading(true);

    try {
      const nRows = await countPosts(board, publicOnly);
      const nPages = Math.ceil(nRows / pageSize);
      let posts = [];
      if (1 <= page && page <= nPages) {
        const from = (page - 1) * pageSize;
        const to = (page * pageSize) - 1;
        posts = await getPosts(board, from, to, publicOnly);
      }
      setError(null);
      setData(posts);
      setNPages(nPages);
    }
    catch (e) {
      setError(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    update();
  }, [user, board, page, pageSize, publicOnly]);

  return { loading, data, error, update, nPages };
}

export async function countPosts(board, publicOnly) {
  let wrapFilter = publicOnly ? q => q.eq('is_public', true) : q => q;

  const { count, error } = await wrapFilter(
    supabase
      .from(`${board}_posts`)
      .select('*', { count: 'exact', head: true })
  );
  if (error) {
    throw error;
  }
  return count;
}

export async function getPosts(board, from, to, publicOnly) {
  let wrapFilter = publicOnly ? q => q.eq('is_public', true) : q => q;

  const postMap = {};
  const posts = [];

  {
    const { data, error } = await wrapFilter(
      supabase
        .from(`${board}_posts`)
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to)
    );
    if (error) {
      throw error;
    }

    for (const row of data) {
      const post = {
        id: row.id,
        authorId: row.author_id,
        author: row.username,
        text: row.is_js ? getFunctionOrText(row.title) : row.title,
        replies: [],
      };
      postMap[post.id] = post;
      posts.push(post);
    }
  }

  {
    const maxPostId = posts.length ? posts.at(0).id : -1;
    const minPostId = posts.length ? posts.at(-1).id : -1;
    const { data, error } = await wrapFilter( 
      supabase
        .from(`${board}_replies`)
        .select('*')
        .gte('parent_id', minPostId)
        .lte('parent_id', maxPostId)
        .order('created_at', { ascending: true })
    );

    if (error) {
      throw error;
    }

    for (const row of data) {
      const post = postMap[row.parent_id];
      if (post) {
        const reply = {
          id: row.id,
          authorId: row.author_id,
          author: row.username,
          text: row.is_js ? getFunctionOrText(row.title) : row.title,
        };
        post.replies.push(reply);
      }
    }
  }

  return posts;
}

export async function createPost(board, user, username, jsMode, text) {
  const { data, error } = await supabase
    .from(`${board}_posts`)
    .insert([{
      author_id: user.uid,
      username: username || user.username,
      is_public: user.isAdmin,
      is_js: jsMode,
      title: text,
      content: null,
    }]);
  if (error)  {
    throw error;
  }
}

export async function updatePost(board, postId, user, username, jsMode, text) {
  const { data, error } = await supabase
    .from(`${board}_posts`)
    .update({
      username: username || user.username,
      is_js: jsMode,
      title: text,
    })
    .eq('id', postId);
  if (error)  {
    throw error;
  }
}

export async function deletePost(board, postId) {
  const { data, error } = await supabase
  .from(`${board}_posts`)
  .delete()
  .eq('id', postId);
  if (error)  {
    throw error;
  }
}

export async function createReply(board, postId, user, username, jsMode, text) {
  const { data, error } = await supabase
    .from(`${board}_replies`)
    .insert([{
      parent_id: postId,
      author_id: user.uid,
      username: username || user.username,
      is_public: user.isAdmin,
      is_js: jsMode,
      title: text,
      content: null,
    }]);
  if (error)  {
    throw error;
  }
}

export async function updateReply(board, replyId, user, username, jsMode, text) {
  const { data, error } = await supabase
    .from(`${board}_replies`)
    .update({
      username: username || user.username,
      is_js: jsMode,
      title: text,
    })
    .eq('id', replyId);
  if (error)  {
    throw error;
  }
}

export async function deleteReply(board, replyId) {
  const { data, error } = await supabase
    .from(`${board}_replies`)
    .delete()
    .eq('id', replyId);
  if (error)  {
    throw error;
  }
}

export function usePagination(items, pageSize, current) {
  const start = pageSize * (current-1);
  const pageItems = items.slice(start, start + pageSize);
  const totalPages = Math.ceil(items.length / pageSize);
  return { pageItems, totalPages };
}

function hasFinalConsonant(korChar) {
  const code = korChar.charCodeAt(korChar.length - 1);
  const base = 0xac00;
  const diff = code - base;
  return diff >= 0 && diff % 28 !== 0;
}
