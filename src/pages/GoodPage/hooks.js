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



// export function usePosts() {
//   const user = useUser();
//   return [
//     {
//       id: 20,
//       author: "L",
//       text: "관리자님 졸고 있는 거 다 보여요",
//       replies: [
//         { id: 11, author: "익명", text: "이글아이 전산 부서 개불쌍해ㅠㅠ R한테 협박받았다며" },
//       ],
//     },
//     {
//       id: 19,
//       author: "익명",
//       text: "솔직히 리더즈 인기투표 해보자",
//       replies: [
//         { id: 11, author: "S", text: "E" },
//         { id: 11, author: "오르티", text: "ㄷ" },
//         { id: 11, author: "N", text: "E33333" },
//         { id: 11, author: "N", text: "----------끝----------" },
//         { id: 11, author: "J", text: "----------시작----------" },
//         { id: 11, author: "N", text: "[관리자에 의해 제재된 댓글(사유: 욕설)입니다.]" },
//       ],
//     },
//     {
//       id: 18,
//       author: "익명",
//       text: "사측이세요? 노측이면 주2일제 찬성합시다",
//       replies: [
//       ],
//     },
//     {
//       id: 17,
//       author: "Y",
//       text: "R 선배님을 칭찬합니다. 우리 부서의 분위기 메이커십니다.",
//       replies: [
//         { id: 11, author: "익명", text: "혹시 협박받고 있다면 당근 이모지를 써주세요." },
//         { id: 11, author: "익명", text: "분위기 조지는 메이커긴 한데;;" },
//         { id: 11, author: "F", text: "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ" },
//         { id: 11, author: "R", text: "윗계정 정지 안시키면 오늘 이글아이 전산 담당자 찾아갑니다." },
//       ],
//     },
//     {
//       id: 16,
//       author: "테리",
//       text: "A를 칭찬함다! 멀쩡히 잘잡은 빌런 한번 놔줬대여 '울프독의 관용'ㅋㅋ",
//       replies: [
//         { id: 11, author: "A", text: "도버만을 칭찬합니다. 세달째 월급을 수령하지 않아 유니온의 재정에 기여하고 있습니다." },
//         { id: 11, author: "테리", text: "[관리자에 의해 제재된 댓글(사유: 욕설)입니다.]" },
//         { id: 11, author: "A", text: "[관리자에 의해 제재된 댓글(사유: 직원간 비방)입니다.]" },
//         { id: 11, author: "테리", text: "[관리자에 의해 제재된 댓글(사유: 명예훼손)입니다.]" },
//         { id: 11, author: "A", text: "[관리자에 의해 제재된 댓글(사유: 욕설)입니다.]" },
//         { id: 11, author: "M", text: "죄송합니다 관리자님. 계도하겠습니다." },
//       ],
//     },
//     {
//       id: 15,
//       author: "J",
//       text: "ㅌㄹ ㄷㅂㅁ 존나게 사랑했다",
//       replies: [
//         { id: 11, author: "J", text: "테리 제발 내 자리에 와서 내 계정으로 글 올리는 건 삼가해주길 바란다." },
//         { id: 11, author: "F", text: "깜짝이야 난 또😊" },
//       ],
//     },
//     {
//       id: 14,
//       author: "익명",
//       text: "제 페어를 칭찬해요.... 완벽한 나의 뮤즈....",
//       replies: [
//         { id: 13, author: "M", text: "도배성 게시물 신고되나요?" },
//         { id: 13, author: "익명", text: "꺼져주세요...." },
//       ],
//     },
//     {
//       id: 13,
//       author: "H",
//       text: "의무실 안 오는 녀석들 다 칭찬함ㅋ",
//       replies: [
//         { id: 11, author: "I", text: "ㅋ 하나 적는게 아재같음" },
//         { id: 12, author: "테리", text: "띄어쓰기 잘지킨거 아재같음" },
//         { id: 13, author: "A", text: "전 10대 같으시다고 생각합니다." },
//         { id: 13, author: "H", text: "니가 젤나빠 A" },
//       ],
//     },
//     {
//       id: 12,
//       author: "N",
//       text: "오르티 칭찬한다. 간식 테이블 악성 재고 다 처리해주더라.",
//       replies: [
//         { id: 11, author: "오르티", text: "앞ㅍ으로도 이몸ㅐ을 경ㅇ베하거라!" },
//         { id: 12, author: "E", text: "N, 새 간식이 전부 초코하임, 빼빼로, 칙촉, 빈츠, 쫀득 초코칩, 꼬북칩 초코츄러스맛, 비쵸비 뿐이던데.." },
//         { id: 13, author: "S", text: "리더님 그거 오르티가 장 봐왔어요🤣" },
//       ],
//     },
//     {
//       id: 11,
//       author: "I",
//       text: `내 친구 ${user.name ?? '걔'} 칭찬함. 오늘 나한테 닭다리 양보해줌`,
//       replies: [
//         { id: 11, author: "Y", text: "사랑고백 아닌가요?" },
//         { id: 12, author: "테리", text: "닭다리를 양보해줬는데 그냥 친구가 맞슴까" },
//       ],
//     },
//     {
//       id: 10,
//       author: "익명",
//       text: () => {
//         const name = user.name ?? "예쁜이";
//         const group = user.group === "새붉은 재앙" ? "" : user.group ?? "";
//         const 조사 = hasFinalConsonant(name) ? "은" : "는";
//         return `${group} ${name}${조사} 내꺼다.`;
//       },
//       replies: [
//         { id: 11, author: "테리", text: "ㄴㄴ 내꺼" },
//         { id: 11, author: "N", text: "글 내려 학생" },
//       ],
//     },
//     {
//       id: 9,
//       author: "익명",
//       text: "님들 Y씨 홈파티 초대받아봄? 레전드;",
//       replies: [
//         { id: 11, author: "S", text: "저 가보고 싶어요!!" },
//         { id: 11, author: "Y", text: "부족함 없이 준비하겠습니다." },
//       ],
//     },
//     {
//       id: 8,
//       author: "L",
//       text: `저랑 매일 같이 게임해줘서 고마워요.... ${user.name ?? '내 영웅'}님`,
//       replies: [
//       ],
//     },
//     {
//       id: 7,
//       author: "F",
//       text: "왜 내 아이디 아직 살아있어?ㅋㅋ 죽일거면 제대로 죽였어야지",
//       replies: [
//         { id: 11, author: "R", text: "관리자 뭐합니까? 이 계정 안 자르고." },
//         { id: 11, author: "F", text: "ㅋㅋ찔려?" },
//       ],
//     },
//     {
//       id: 6,
//       author: "A",
//       text: "도버만 개 짜증남",
//       replies: [
//         { id: 11, author: "E", text: "'칭찬' 게시판일세." },
//         { id: 11, author: "F", text: "왜~ 사랑해줘라" },
//         { id: 11, author: "H", text: "사이 좋게 지내라 인마들아." },
//       ],
//     },
//     {
//       id: 5,
//       author: "ㄴㅂㅇ",
//       text: "응 유니온 사이트 다털렸죠ㅋㅋ",
//       replies: [
//         { id: 11, author: "L", text: "내쫓아주세요.." }
//       ],
//     },
//     {
//       id: 4,
//       author: "익명",
//       text: "제 페어를 칭찬해요.... 완벽한 나의 뮤즈....",
//       replies: [
//       ],
//     },
//     {
//       id: 3,
//       author: "익명",
//       text: "A를 칭찬함다. 사람 개빡치게 하는 데 뭐있음ㄹㅇ",
//       replies: [
//         { id: 11, author: "I", text: "ㅋㅋㅋㅋ" },
//         { id: 12, author: "J", text: "장난성 게시물은 자제 바랍니다." },
//         { id: 13, author: "M", text: "제발 울프독 안에서만 새주세요." },
//         { id: 13, author: "A", text: "뒤질래?" },
//       ],
//     },
//     {
//       id: 2,
//       author: "익명",
//       text: "오ㅗ르티가 유ㅜ니온에서ㅓ 갖ㅏㅇ 잜생겻다!",
//       replies: [
//         { id: 11, author: "테리", text: "에바예여" },
//         { id: 12, author: "S", text: "에바라구?" },
//         { id: 13, author: "Y", text: "삼진 에바로 기각되었습니다." },
//       ],
//     },
//     {
//       id: 1,
//       author: "E",
//       text: "N을 칭찬합니다. 어려운 환경에서도 늘 타의 모범이 되며, 헌터즈의 미래가 되는 직원입니다.",
//       replies: [
//         { id: 11, author: "S", text: "N언니 최고!" },
//       ],
//     },
//   ];
// }

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
