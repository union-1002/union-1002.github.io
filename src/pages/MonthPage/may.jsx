import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';
import { useUser } from '@/shared/user';

function MonthPage() {
  const user = useUser();
  const defaultPosts = [
    {
      id: 7,
      author: "J",
      text: "H 이달사 수상 기념 리더즈 회식, 금일 오후 6시에 있습니다.",
      replies: [
        { id: 11, author: "H", text: "뭔소리냐 나 못가는데" },
        { id: 11, author: "J", text: "안오셔도 괜찮습니다 저희끼리 축하하겠습니다." },
        { id: 11, author: "H", text: "이게 대체 뭔소리야" },
      ],
    },
    {
      id: 7,
      author: "L",
      text: "축하드려요...!",
      replies: [
        { id: 11, author: "H", text: "고맙다 쪼꼬미" },
      ],
    },
    {
      id: 7,
      author: "E",
      text: "축하하네. 앞으로도 리더로서 더욱 모범이 되고, 좀 쉬어가면서 하길 바랄 뿐이야.",
      replies: [],
    },
    {
      id: 7,
      author: "F",
      text: "축하🎉🎉🎉🎉🎉🎉",
      replies: [
      ],
    },
    {
      id: 7,
      author: "M",
      text: "축하드립니다.",
      replies: [
        { id: 11, author: "테리", text: "222" },
        { id: 11, author: "I", text: "333" },
        { id: 11, author: "A", text: "444" },
        { id: 11, author: "H", text: "너넨 안 다치는 게 축하해주는 거야" },
        
      ],
    },
    {
      id: 7,
      author: "R",
      text: "잘된 일입니다.",
      replies: [],
    },
    {
      id: 7,
      author: "N",
      text: "오 ㅋㅋ 어쩐일 ㅋㅋㅋㅋ",
      replies: [],
    },
    {
      id: 3,
      author: "X",
      text: "받으실 줄 알았어요.......",
      replies: [
        { id: 11, author: "H", text: "난 네가 나 수상 기념으로 누우러 올줄 몰랐다" },
      ],
    },
  ];
  
  const grimmerReaperPosts = [
    {
      id: 7,
      author: "J",
      text: "H 이달사 수상 기념 리더즈 회식, 금일 오후 6시에 있습니다.",
      replies: [
        { id: 11, author: "H", text: "뭔소리냐 나 못가는데" },
        { id: 11, author: "J", text: "안오셔도 괜찮습니다 저희끼리 축하하겠습니다." },
        { id: 11, author: "H", text: "이게 대체 뭔소리야" },
      ],
    },
    {
      id: 7,
      author: "L",
      text: "축하드려요...!",
      replies: [
        { id: 11, author: "H", text: "고맙다 쪼꼬미" },
      ],
    },
    {
      id: 7,
      author: "E",
      text: "축하하네. 앞으로도 리더로서 더욱 모범이 되고, 좀 쉬어가면서 하길 바랄 뿐이야.",
      replies: [],
    },
    {
      id: 7,
      author: "F",
      text: "축하🎉🎉🎉🎉🎉🎉",
      replies: [
      ],
    },
    {
      id: 7,
      author: "M",
      text: "축하드립니다.",
      replies: [
        { id: 11, author: "테리", text: "222" },
        { id: 11, author: "I", text: "333" },
        { id: 11, author: "A", text: "444" },
        { id: 11, author: "H", text: "너넨 안 다치는 게 축하해주는 거야" },
        
      ],
    },
    {
      id: 7,
      author: "R",
      text: "잘된 일입니다.",
      replies: [],
    },
    {
      id: 7,
      author: "N",
      text: "오 ㅋㅋ 어쩐일 ㅋㅋㅋㅋ",
      replies: [],
    },
    {
      id: 3,
      author: "X",
      text: "받으실 줄 알았어요.......",
      replies: [
        { id: 11, author: "H", text: "난 네가 나 수상 기념으로 누우러 올줄 몰랐다" },
      ],
    },
  ];

  const postsToShow = user.part === "새붉은 재앙" ? grimmerReaperPosts : defaultPosts;

  
  return (
    <MainLayout>
      
      <div className="w-full max-w-3xl mx-auto px-2 lg:px-4 py-16 text-center">

        {/* 타이틀 */}
        <h1 className="text-3xl font-extrabold font-book text-[#435373] mb-2">
        👑{user.part === '새붉은 재앙' ? '이달의 사살 대상' : '이달의 우수 사원'}👑
        </h1>
        <p className="text-gray-600 text-sm mb-10">          
          {user.part === '새붉은 재앙' ? '매달 유니온의 가장 같잖은 개를 소개합니다.' : '매달 유니온의 가장 빛나는 별을 소개합니다.'}
        </p>

        {/* 우수 사원 카드 */}
        <div className='px-2'>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-md mx-auto">
          <img
            src="/images/H.webp"
            alt="이달의 우수 사원"
            className="w-full h-180 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#456EBF] mb-1">주짱</h2>
            <p className="text-sm text-gray-500 mb-2">이글아이</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              유니온 창립 10주년 최고의 사원
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
