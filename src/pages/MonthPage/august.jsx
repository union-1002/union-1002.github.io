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
      text: "이달사가 두 달 연속 자격 미달 수상자를 배출하고 있는 점에 대해 강력하게 항의합니다.",
      replies: [
        { id: 11, author: "N", text: "지랄노" },
        { id: 11, author: "오르티", text: "ㅊㅋ하노라" },


      ],
    },
    {
      id: 7,
      author: "E",
      text: "헌터즈의 자랑, 헌터즈의 미래, N의 수상을 축하합니다. 앞으로도 본이 되어주길.",
      replies: [
        { id: 11, author: "오르티", text: "ㅊㅋ하노라" },

      ],
    },
    {
      id: 7,
      author: "S",
      text: "언니 너무 축하해🩷🩷🩷 사랑해🩷🩷🩷🩷🩷",
      replies: [
        { id: 11, author: "오르티", text: "ㅊㅋ하노라" },
      ],
    },
    {
      id: 7,
      author: "H",
      text: "축하는 한다. 축하는 하는데, 제발 의무실 벽 뚫고 들어오지마라. 운영팀에서 너 출입 금지 시키겠다잖냐.",
      replies: [

      ],
    },
    {
      id: 7,
      author: "R",
      text: ".",
      replies: [        
        { id: 11, author: "N", text: "ㅗ" },

      ],
    },
    {
      id: 7,
      author: "오르티",
      text: "ㄱ그럶 우리ㅣ 헌ㄴ터즈 회ㅣ식.은 언ㄴ제인것이냐!",
      replies: [
        { id: 11, author: "S", text: "오르링오르링 먹고 싶은 거 있어?" },
        { id: 11, author: "오르티", text: "저번ㅇㅔ갓ㅅㄷㅓㄴ 디젙ㅡ 카페 조앗노라" },

      ],
    },
    {
      id: 7,
      author: "론",
      text: "[비정상적 접근입니다.]",
      replies: [
        { id: 11, author: "테리", text: "뭠까 이거;" },
        { id: 11, author: "I", text: "뭔데" },
        { id: 11, author: "I", text: "뭐하자는 건데" },
        { id: 11, author: "I", text: "[관리자에 의해 제재된 댓글(사유: 욕설)입니다." },
        { id: 11, author: "F", text: "확실히 전산에 문제가 있긴해" },
      ],
    },
    {
      id: 7,
      author: "A",
      text: "축하드립니다, 누님.",
      replies: [

      ],
    },
    {
      id: 7,
      author: "X",
      text: "진짜 받으실 줄 알았어요 언니...",
      replies: [
        { id: 11, author: "M", text: "." },
        { id: 11, author: "X", text: "특정인 차단 기능 없나요...?" },
      ],
    },
  ];
  
  const grimmerReaperPosts = [
    {
      id: 7,
      author: "J",
      text: "이달사가 두 달 연속 자격 미달 수상자를 배출하고 있는 점에 대해 강력하게 항의합니다.",
      replies: [
        { id: 11, author: "N", text: "지랄노" },
        { id: 11, author: "오르티", text: "ㅊㅋ하노라" },


      ],
    },
    {
      id: 7,
      author: "E",
      text: "헌터즈의 자랑, 헌터즈의 미래, N의 수상을 축하합니다. 앞으로도 본이 되어주길.",
      replies: [
        { id: 11, author: "오르티", text: "ㅊㅋ하노라" },

      ],
    },
    {
      id: 7,
      author: "S",
      text: "언니 너무 축하해🩷🩷🩷 사랑해🩷🩷🩷🩷🩷",
      replies: [
        { id: 11, author: "오르티", text: "ㅊㅋ하노라" },
      ],
    },
    {
      id: 7,
      author: "H",
      text: "축하는 한다. 축하는 하는데, 제발 의무실 벽 뚫고 들어오지마라. 운영팀에서 너 출입 금지 시키겠다잖냐.",
      replies: [

      ],
    },
    {
      id: 7,
      author: "R",
      text: ".",
      replies: [        
        { id: 11, author: "N", text: "ㅗ" },

      ],
    },
    {
      id: 7,
      author: "오르티",
      text: "ㄱ그럶 우리ㅣ 헌ㄴ터즈 회ㅣ식.은 언ㄴ제인것이냐!",
      replies: [
        { id: 11, author: "S", text: "오르링오르링 먹고 싶은 거 있어?" },
        { id: 11, author: "오르티", text: "저번ㅇㅔ갓ㅅㄷㅓㄴ 디젙ㅡ 카페 조앗노라" },

      ],
    },
    {
      id: 7,
      author: "론",
      text: "[비정축?상적 접근입하?니다.]",
      replies: [
        { id: 11, author: "테리", text: "뭠까 이거;" },
        { id: 11, author: "I", text: "뭔데" },
        { id: 11, author: "I", text: "뭐하자는 건데" },
        { id: 11, author: "I", text: "[관리자에 의해 제재된 댓글(사유: 욕설)입니다." },
        { id: 11, author: "루두스", text: "이런! 재밌는 꼴이군요" },
        { id: 11, author: "F", text: "확실히 전산에 문제가 있긴해" },
        { id: 11, author: "하피", text: "그러니까 이런 짓이 가능하지, 달링" },

      ],
    },
    {
      id: 7,
      author: "A",
      text: "축하드립니다, 누님.",
      replies: [

      ],
    },
    {
      id: 7,
      author: "X",
      text: "진짜 받으실 줄 알았어요 언니...",
      replies: [
        { id: 11, author: "M", text: "." },
        { id: 11, author: "X", text: "특정인 차단 기능 없나요...?" },
        { id: 11, author: "T", text: "아직도 사이가 안 좋은 것이옵니까?" },
        { id: 11, author: "M", text: "안 좋다." },
        { id: 11, author: "M", text: "그게 저 미친놈과 제 사이를 이르는 가장 점잖은 말이겠군요." },
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
            src="/images/N.png"
            alt="이달의 우수 사원"
            className="w-full h-180 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#456EBF] mb-1">N</h2>
            <p className="text-sm text-gray-500 mb-2">헌터즈</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              이 영광을 헌터즈 전체와 E 선배한테 바칩니다! 봐라 애송이들아 이 언니가 이달사 받았다.
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
