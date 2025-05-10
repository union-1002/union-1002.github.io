import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';
import { useUser } from '@/shared/user';

function MonthPage() {
  const user = useUser();
  const defaultPosts = [
    {
      id: 7,
      author: "오르티",
      text: "ㅇㅙ 이 몸ㅁ이 받ㅈ지 몸ㅅ한거냐!",
      replies: [],
    },
    {
      id: 7,
      author: "N",
      text: "ㅊㅋㅊㅋㅊㅋ",
      replies: [
        { id: 11, author: "J", text: "222" },
        { id: 11, author: "N", text: "꺼져 답글 삭제해" },
        { id: 11, author: "J", text: "ㅎ" },
      ],
    },
    {
      id: 7,
      author: "Y",
      text: "축하드립니다, 선배님. 후문 쪽 맛집으로 축하 회식 하러 가시죠.",
      replies: [],
    },
    {
      id: 7,
      author: "I",
      text: "우.리.의.친.구.울.프.독.의.자.랑.",
      replies: [
      ],
    },
    {
      id: 7,
      author: "H",
      text: "오, 축하한다.",
      replies: [],
    },
    {
      id: 7,
      author: "X",
      text: "뭔가 오류가 있는 건 아닐까요....",
      replies: [],
    },
    {
      id: 7,
      author: "A",
      text: "축하드립니다.",
      replies: [],
    },
    {
      id: 7,
      author: "L",
      text: "축하드려요...!",
      replies: [],
    },
    {
      id: 3,
      author: "테리",
      text: "웅성웅성👥👤👥뭐야..👤👥👥👤👥👥👤웅성웅성👥👤👥👤👥👤대단해...👥👤👥👤👥👤👥웅성웅성,,👤👥👥👤👥👤왤케 잘해...👤👥👤👥👥 뭐야..👤👥👤👥👤👤👥👥👤👥웅성웅성..👤👥 👥👤👥👥👤👥 👤👥👤",
      replies: [],
    },
  ];
  
  const grimmerReaperPosts = [
    {
      id: 7,
      author: "오르티",
      text: "ㅇㅙ 이 몸ㅁ이 받ㅈ지 몸ㅅ한거냐!",
      replies: [],
    },
    {
      id: 7,
      author: "N",
      text: "ㅊㅋㅊㅋㅊㅋ",
      replies: [
        { id: 11, author: "J", text: "222" },
        { id: 11, author: "N", text: "꺼져 답글 삭제해" },
        { id: 11, author: "J", text: "ㅎ" },
      ],
    },
    {
      id: 7,
      author: "Y",
      text: "축하드립니다, 선배님. 후문 쪽 맛집으로 축하 회식 하러 가시죠.",
      replies: [],
    },
    {
      id: 8,
      author: "느베야",
      text: "M!!! 잘하고 있다고!!!! 유니온 바보들 암것도 모르죠ㅋㅋㅋ",
      replies: [
        
      ],
    },
    {
      id: 7,
      author: "I",
      text: "우.리.의.친.구.울.프.독.의.자.랑.",
      replies: [
        { id: 11, author: "루두스", text: "이 분이야 말로 캐스팅 하고 싶은 분인데 말이죠." },
      ],
    },
    {
      id: 7,
      author: "H",
      text: "오, 축하한다.",
      replies: [],
    },
    {
      id: 7,
      author: "X",
      text: "뭔가 오류가 있는 건 아닐까요....",
      replies: [
        { id: 11, author: "하피", text: "솔직히 말이야, 얘 뭐 알고 있는 거 같지 않아?" },
        { id: 11, author: "루두스", text: "가능성 있는 추측입니다." },
      ],
    },
    {
      id: 7,
      author: "A",
      text: "축하드립니다.",
      replies: [],
    },
    {
      id: 7,
      author: "L",
      text: "축하드려요...!",
      replies: [],
    },
    {
      id: 3,
      author: "테리",
      text: "웅성웅성👥👤👥뭐야..👤👥👥👤👥👥👤웅성웅성👥👤👥👤👥👤대단해...👥👤👥👤👥👤👥웅성웅성,,👤👥👥👤👥👤왤케 잘해...👤👥👤👥👥 뭐야..👤👥👤👥👤👤👥👥👤👥웅성웅성..👤👥 👥👤👥👥👤👥 👤👥👤",
      replies: [],
    },
  ];

  const postsToShow = user.group === "새붉은 재앙" ? grimmerReaperPosts : defaultPosts;

  
  return (
    <MainLayout>
      
      <div className="w-full max-w-3xl mx-auto px-2 lg:px-4 py-16 text-center">

        {/* 타이틀 */}
        <h1 className="text-3xl font-extrabold font-book text-[#435373] mb-2">
        👑이달의 우수 사원👑
        </h1>
        <p className="text-gray-600 text-sm mb-10">
          매달 유니온의 가장 빛나는 별을 소개합니다.
        </p>

        {/* 우수 사원 카드 */}
        <div className='px-2'>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-md mx-auto">
          <img
            src="/images/M.webp"
            alt="이달의 우수 사원"
            className="w-full h-180 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#456EBF] mb-1">M</h2>
            <p className="text-sm text-gray-500 mb-2">울프독</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              감사합니다. 앞으로 더 열심히 하겠습니다.
            </p>
          </div>
        </div>
        </div>

        <div className="grid grid-cols-12 text-sm font-semibold text-gray-700 border-b border-gray-400 mt-20 pb-4">
          <div className="col-span-2 text-center">작성자</div>
          <div className="col-span-10 text-center">내용</div>
        </div>

        {postsToShow.map((post) => (
          <div
            key={post.id}
            className="border-gray-300 border-b border-y-0"
          >
            <div className="grid grid-cols-12 items-start text-sm text-gray-800 py-4 hover:bg-gray-50 transition">
              <div className="col-span-2 text-center font-medium">{post.author}</div>
              <div className="col-span-10 text-left">
                {typeof post.text === "function" ? post.text(user) : post.text}
              </div>
            </div>

            {post.replies.map((reply) => (
              <div
                key={reply.id}
                className="grid grid-cols-12 items-start text-sm text-gray-600 border-t border-gray-200 py-2"
              >
                <div className="col-span-2 text-center">{reply.author}</div>
                <div className="col-span-10 text-left">⤷ {reply.text}</div>
              </div>
            ))}
          </div>
        ))}
      </div>



    </MainLayout>
  );
}

export default MonthPage;
