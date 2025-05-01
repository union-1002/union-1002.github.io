import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';
import { useUser } from '@/shared/user';

function GoodPage() {
  const user = useUser();
  const posts = [
    {
      id: 7,
      author: "L",
      text: (user) => `저랑 매일 같이 게임해줘서 고마워요.... ${user.name ?? '내 영웅'}님`,
      replies: [
      ],
    },
    {
      id: 6,
      author: "F",
      text: "왜 내 아이디 아직 살아있어?ㅋㅋ 죽일거면 제대로 죽였어야지",
      replies: [
      ],
    },
    {
      id: 5,
      author: "ㄴㅂㅇ",
      text: "응 유니온 사이트 다털렸죠ㅋㅋ",
      replies: [
        { id: 11, author: "L", text: "내쫓아주세요...." }
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
        <div className="grid grid-cols-12 lg:grid-cols-10 text-sm font-semibold text-gray-700 border-b border-gray-400 pb-4">
          <div className="col-span-2 lg:col-span-1 text-center">번호</div>
          <div className="col-span-2 lg:col-span-1 text-center">작성자</div>
          <div className="col-span-8 lg:col-span-8 text-center lg:text-left lg:pl-8">내용</div>
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
            
            <div className="grid grid-cols-12 lg:grid-cols-10 items-start text-sm text-gray-800 py-4 hover:bg-gray-50 transition">
              <div className="col-span-2 lg:col-span-1 text-center">{post.id}</div>
              <div className="col-span-2 lg:col-span-1 text-center font-medium text-[#1a202c]">{post.author}</div>
              <div className="col-span-8 lg:col-span-8 pl-8">{typeof post.text === "function" ? post.text(user) : post.text}</div>
            </div>
        
            {/* 답글들 */}
            {post.replies.map((reply) => (
              <div key={reply.id} className="grid grid-cols-12  lg:grid-cols-10 items-start text-sm text-gray-600 border-t border-gray-200 py-2">
                <div className="col-span-2 lg:col-span-1 text-center"></div>
                <div className="col-span-2 lg:col-span-1 text-center">{reply.author}</div>
                <div className="col-span-8 lg:col-span-8 pl-8">↪ {reply.text}</div>
              </div>
            ))}
          </div>
        ))}
      </PageLayout>
    </MainLayout>
  );
}

export default GoodPage;
