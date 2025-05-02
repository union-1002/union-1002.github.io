import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';
import { useUser } from '@/shared/user';

function GoodPage() {
  const user = useUser();

  function hasFinalConsonant(korChar) {
    const code = korChar.charCodeAt(korChar.length - 1);
    const base = 0xac00;
    const diff = code - base;
    return diff >= 0 && diff % 28 !== 0;
  }

  const posts = [
    {
      id: 10,
      author: "익명",
      text: (user) => {
        const name = user.name ?? "예쁜이";
        const group = user.group === "새붉은 재앙" ? "" : user.group ?? "";
        const 조사 = hasFinalConsonant(name) ? "은" : "는";
        return `${group} ${name}${조사} 내꺼다.`;
      },
      replies: [
        { id: 11, author: "테리", text: "ㄴㄴ 내꺼" },
        { id: 11, author: "N", text: "글 내려 학생" },
      ],
    },
    {
      id: 9,
      author: "익명",
      text: "님들 Y씨 홈파티 초대받아봄? 레전드;",
      replies: [
        { id: 11, author: "S", text: "저 가보고 싶어요!!" },
        { id: 11, author: "Y", text: "부족함 없이 준비하겠습니다." },
      ],
    },
    {
      id: 8,
      author: "L",
      text: (user) => `저랑 매일 같이 게임해줘서 고마워요.... ${user.name ?? '내 영웅'}님`,
      replies: [
      ],
    },
    {
      id: 7,
      author: "F",
      text: "왜 내 아이디 아직 살아있어?ㅋㅋ 죽일거면 제대로 죽였어야지",
      replies: [
        { id: 11, author: "R", text: "관리자 뭐합니까? 이 계정 안 자르고." },
        { id: 11, author: "F", text: "ㅋㅋ찔려?" },
      ],
    },
    {
      id: 6,
      author: "A",
      text: "도버만 개 짜증남",
      replies: [
        { id: 11, author: "E", text: "'칭찬' 게시판일세." },
        { id: 11, author: "F", text: "왜~ 사랑해줘라" },
        { id: 11, author: "H", text: "사이 좋게 지내라 인마들아." },
      ],
    },
    {
      id: 5,
      author: "ㄴㅂㅇ",
      text: "응 유니온 사이트 다털렸죠ㅋㅋ",
      replies: [
        { id: 11, author: "L", text: "내쫓아주세요.." }
      ],
    },
    {
      id: 4,
      author: "익명",
      text: "제 페어를 칭찬해요.... 완벽한 나의 뮤즈....",
      replies: [
      ],
    },
    {
      id: 3,
      author: "익명",
      text: "A를 칭찬함다. 사람 개빡치게 하는 데 뭐있음ㄹㅇ",
      replies: [
        { id: 11, author: "I", text: "ㅋㅋㅋㅋ" },
        { id: 12, author: "J", text: "장난성 게시물은 자제 바랍니다." },
        { id: 13, author: "M", text: "제발 울프독 안에서만 새주세요." },
        { id: 13, author: "A", text: "뒤질래?" },
      ],
    },
    {
      id: 2,
      author: "익명",
      text: "오ㅗ르티가 유ㅜ니온에서ㅓ 갖ㅏㅇ 잜생겻다!",
      replies: [
        { id: 11, author: "테리", text: "에바예여" },
        { id: 12, author: "S", text: "에바라구?" },
        { id: 13, author: "Y", text: "삼진 에바로 기각되었습니다." },
      ],
    },
    {
      id: 1,
      author: "E",
      text: "N을 칭찬합니다. 어려운 환경에서도 늘 타의 모범이 되며, 헌터즈의 미래가 되는 직원입니다.",
      replies: [
        { id: 11, author: "S", text: "N언니 최고!" },
      ],
    },
  ]
  return (
    <MainLayout>
      <PageLayout
        title="칭찬합니다"
        sidebar={MENU_PROPS['직원 마당']}
      >
        <div className="flex flex-wrap lg:flex-nowrap items-start text-sm font-semibold border-b border-gray-400 pb-4">
          <div className="hidden lg:block w-[60px] text-center shrink-0">번호</div>
          <div className="hidden lg:block w-[60px] text-center font-medium shrink-0">작성자</div>
          <div className="hidden lg:block w-full lg:flex-grow lg:ml-5">내용</div>
        </div>

        {/* 게시글 목록 */}
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="border-gray-300 
                       border-b 
                       border-y-0"
          >
            {/* 메인 글 */}
            
            <div className="flex flex-wrap lg:flex-nowrap items-start text-sm py-4 hover:bg-gray-50 transition">
              <div className="w-[50px] lg:w-[60px] text-center shrink-0">{post.id}</div>
              <div className="w-[50px] lg:w-[60px] text-left lg:text-center font-medium shrink-0">{post.author}</div>
              <div className="w-full lg:flex-grow ml-12 mt-1.5 lg:mt-0 lg:ml-5">{typeof post.text === "function" ? post.text(user) : post.text}</div>
            </div>
        
            {/* 답글들 */}
            {post.replies.map((reply) => (
              <div key={reply.id} className="flex flex-wrap lg:flex-nowrap items-start text-sm text-gray-600 border-t border-gray-200 py-2">
                <div className="w-[50px] lg:w-[60px] text-center shrink-0 text-xs">↪</div>
                <div className="w-[50px] lg:w-[60px] text-left lg:text-center shrink-0">{reply.author}</div>
                <div className="w-full lg:flex-grow ml-12 mt-1.5 lg:mt-0 lg:ml-5">{reply.text}</div>
              </div>
            ))}
          </div>
        ))}
      </PageLayout>
    </MainLayout>
  );
}

export default GoodPage;
