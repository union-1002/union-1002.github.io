import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';
import { useUser } from '@/shared/user';

function MonthPage() {
  const user = useUser();
  const defaultPosts = [
    {
      id: 7,
      author: "X",
      text: "리더님, 안녕하세요... 이렇게 댓글로 인사드리는 게 조금 쑥스럽지만… 정말 축하드리고 싶어서 용기 내어 남깁니다. 사실 리더님께서 '이달의 우수 사원'으로 선정되셨다는 소식을 들었을 때… 전혀 놀랍지 않았어요. 오히려 ‘이제서야…?’라는 생각이 먼저 들었달까요. 항상 조용히, 차분하게 자기 몫 이상을 해내시는 모습을 가까이에서 보면서… 감탄도 많이 하고, 반성도 참 많이 했어요. 말씀은 잘 안 하시지만… 늘 누구보다 날카로운 기준과 넓은 시야로 팀을 이끌어 주셔서, 많이 의지하고 있었답니다. 이번 수상은 주인님의 꾸준함과 깊이를 알아봐 주는 결과라고 생각해요. 옆에서 함께 일할 수 있어서, 저는 참 행운이라고 느껴요… 정말요. 앞으로도 리더님의 그 묵직한 걸음 따라가면서, 많이 배우고 성장하고 싶습니다. 다시 한 번 진심으로 축하드려요. 정말 자랑스럽습니다…!",
      replies: [
      ],
    },
    {
      id: 7,
      author: "Y",
      text: "물론이죠! 😊 다음은 감탄 + 응원 + 긍정 필터 100%로 만든 **“이달의 우수 사원 R 선배님 축하 메시지”**입니다👇 🎉🎉 이달의 우수 사원 선정, 진심으로 축하드립니다! 🎉🎉 R 선배님, 아니 **리더님!** 이번 달 우수 사원으로 선정되셨다는 소식을 듣고, 팀 전체가 감탄과 기쁨으로 가득 찼습니다 😊 이런 멋진 결과는 결코 우연이 아니며, 그간 선배님께서 보여주신 끊임없는 노력, 따뜻한 리더십, 그리고 흔들림 없는 책임감의 결실이라 생각합니다. 바쁜 업무 속에서도 늘 팀원들을 세심히 챙겨주시고, 작은 성과도 함께 기뻐해주시던 선배님의 모습이 아직도 눈에 선해요. 그런 따뜻함이 있었기에 우리 팀이 이만큼 성장할 수 있지 않았을까요? 💪 이번 수상은 시작일 뿐! 앞으로도 리더님께서 보여주실 행보가 더욱 기대됩니다. 늘 앞에서 묵묵히 길을 밝혀주시는 리더님께 다시 한 번, 진심 어린 축하와 감사의 마음을 전합니다. 🌟 언제나 응원하고 있습니다. R 리더님, 당신은 우리가 자랑스러워하는 리더입니다! 🙌💐",
      replies: [
      ],
    },
    {
      id: 7,
      author: "J",
      text: "어디서 비린내 안나나.",
      replies: [
        { id: 11, author: "E", text: "어제 하수구 정기 청소를 했다더군." },
      ],
    },
    {
      id: 7,
      author: "F",
      text: "이달의 사살 대상 축하해",
      replies: [
      ],
    },
    {
      id: 7,
      author: "S",
      text: "축하드려요!",
      replies: [        
      ],
    },
    {
      id: 7,
      author: "H",
      text: "축하해 한 턱 쏴라",
      replies: [],
    },
    {
      id: 7,
      author: "E",
      text: "항상 고된 일 하는데 이렇게라도 인정받아 다행일세. 축하하고, J가 곧 회식 잡을 걸세.",
      replies: [
        { id: 11, author: "J", text: "이번 회식은 H 형님이 잡으시기로 했습니다." },
        { id: 11, author: "H", text: "모르는 일인데? 그런 말 없었잖냐." },
        { id: 11, author: "J", text: "이제는 아셨겠군요." },
      ],
    },
    {
      id: 7,
      author: "N",
      text: "?ㅋㅋ",
      replies: [
        { id: 11, author: "J", text: "ㅋㅋㅋ" },
        { id: 11, author: "F", text: "ㅋㅋㅋㅋㅋㅋㅋ" },
        { id: 11, author: "N", text: "야야 해산ㅋㅋ" },
      ],
    },
    {
      id: 3,
      author: "비광",
      text: "그렇지! 난 자네가 받는다는 데 걸었네!",
      replies: [
        { id: 11, author: "테리", text: "이번달 생활비 다 털렸슴다...." },
        { id: 11, author: "A", text: "누가 상상이나 했겠습니까." },
        { id: 11, author: "M", text: "그야 이달사를 세달 연속으로 리더급에게 시상할 줄은 몰랐으니까요." },
        { id: 11, author: "I", text: "M 선배도 걸었어요?" },
        { id: 11, author: "테리", text: "우리 다 개털됐어" },
      ],
    },
  ];
  
  const grimmerReaperPosts = [
    {
      id: 3,
      author: "라멘타",
      text: "유니온에 드디어 망조가 들었구나.",
      replies: [
        { id: 11, author: "느베야", text: "파파 망조가 뭐야??" },
      ],
    },
    {
      id: 7,
      author: "X",
      text: "리더님, 안녕하세요... 이렇게 댓글로 인사드리는 게 조금 쑥스럽지만… 정말 축하드리고 싶어서 용기 내어 남깁니다. 사실 리더님께서 '이달의 우수 사원'으로 선정되셨다는 소식을 들었을 때… 전혀 놀랍지 않았어요. 오히려 ‘이제서야…?’라는 생각이 먼저 들었달까요. 항상 조용히, 차분하게 자기 몫 이상을 해내시는 모습을 가까이에서 보면서… 감탄도 많이 하고, 반성도 참 많이 했어요. 말씀은 잘 안 하시지만… 늘 누구보다 날카로운 기준과 넓은 시야로 팀을 이끌어 주셔서, 많이 의지하고 있었답니다. 이번 수상은 주인님의 꾸준함과 깊이를 알아봐 주는 결과라고 생각해요. 옆에서 함께 일할 수 있어서, 저는 참 행운이라고 느껴요… 정말요. 앞으로도 리더님의 그 묵직한 걸음 따라가면서, 많이 배우고 성장하고 싶습니다. 다시 한 번 진심으로 축하드려요. 정말 자랑스럽습니다…!",
      replies: [
      ],
    },
    {
      id: 7,
      author: "Y",
      text: "물론이죠! 😊 다음은 감탄 + 응원 + 긍정 필터 100%로 만든 **“이달의 우수 사원 R 선배님 축하 메시지”**입니다👇 🎉🎉 이달의 우수 사원 선정, 진심으로 축하드립니다! 🎉🎉 R 선배님, 아니 **리더님!** 이번 달 우수 사원으로 선정되셨다는 소식을 듣고, 팀 전체가 감탄과 기쁨으로 가득 찼습니다 😊 이런 멋진 결과는 결코 우연이 아니며, 그간 선배님께서 보여주신 끊임없는 노력, 따뜻한 리더십, 그리고 흔들림 없는 책임감의 결실이라 생각합니다. 바쁜 업무 속에서도 늘 팀원들을 세심히 챙겨주시고, 작은 성과도 함께 기뻐해주시던 선배님의 모습이 아직도 눈에 선해요. 그런 따뜻함이 있었기에 우리 팀이 이만큼 성장할 수 있지 않았을까요? 💪 이번 수상은 시작일 뿐! 앞으로도 리더님께서 보여주실 행보가 더욱 기대됩니다. 늘 앞에서 묵묵히 길을 밝혀주시는 리더님께 다시 한 번, 진심 어린 축하와 감사의 마음을 전합니다. 🌟 언제나 응원하고 있습니다. R 리더님, 당신은 우리가 자랑스러워하는 리더입니다! 🙌💐",
      replies: [
        { id: 11, author: "하피", text: "난 진짜 이 하얀 친구 마음에 들더라." },
      ],
    },
    {
      id: 7,
      author: "J",
      text: "어디서 비린내 안나나.",
      replies: [
        { id: 11, author: "E", text: "어제 하수구 정기 청소를 했다더군." },
      ],
    },
    {
      id: 7,
      author: "F",
      text: "이달의 사살 대상 축하해",
      replies: [
      ],
    },
    {
      id: 7,
      author: "S",
      text: "축하드려요!",
      replies: [        
      ],
    },
    {
      id: 7,
      author: "H",
      text: "축하해 한 턱 쏴라",
      replies: [],
    },
    {
      id: 7,
      author: "아가페",
      text: "축하드려요... 축하드리는데... 제 사랑들 태우지 말아주시면 안될까요...?",
      replies: [

      ],
    },
    {
      id: 7,
      author: "E",
      text: "항상 고된 일 하는데 이렇게라도 인정받아 다행일세. 축하하고, J가 곧 회식 잡을 걸세.",
      replies: [
        { id: 11, author: "J", text: "이번 회식은 H 형님이 잡으시기로 했습니다." },
        { id: 11, author: "H", text: "모르는 일인데? 그런 말 없었잖냐." },
        { id: 11, author: "J", text: "이제는 아셨겠군요." },
      ],
    },
    {
      id: 7,
      author: "N",
      text: "?ㅋㅋ",
      replies: [
        { id: 11, author: "J", text: "ㅋㅋㅋ" },
        { id: 11, author: "F", text: "ㅋㅋㅋㅋㅋㅋㅋ" },
        { id: 11, author: "N", text: "야야 해산ㅋㅋ" },
      ],
    },
    
    {
      id: 3,
      author: "비광",
      text: "그렇지! 난 자네가 받는다는 데 걸었네!",
      replies: [
        { id: 11, author: "테리", text: "이번달 생활비 다 털렸슴다...." },
        { id: 11, author: "A", text: "누가 상상이나 했겠습니까." },
        { id: 11, author: "M", text: "그야 이달사를 세달 연속으로 리더급에게 시상할 줄은 몰랐으니까요." },
        { id: 11, author: "T", text: "어찌 그런 무모한 길에 뜻을 두었사옵니까, 나의 벗." },
        { id: 11, author: "M", text: "정신을 차리고 보니 돈을 걸고 있었습니다." },
        { id: 11, author: "루두스", text: "저런! 제대로 털리셨군요." },
        { id: 11, author: "I", text: "M 선배도 걸었어요?" },
        { id: 11, author: "테리", text: "우리 다 개털됐어" },
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
            src="/images/R.webp"
            alt="이달의 우수 사원"
            className="w-full h-180 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#456EBF] mb-1">R</h2>
            <p className="text-sm text-gray-500 mb-2">언더 그라운드</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              이처럼 뜻깊은 상을 받게 되어 진심으로 영광스럽게 생각합니다. 매 순간 최선을 다해 온 제 노력이 단지 운이나 상황이 아닌 실력에 기반한 결과였음을 이번 수상이 증명해 준 것 같아 매우 뜻깊습니다. 업무에 임함에 있어 저는 언제나 주어진 기준에 머무르기보다, 그 이상을 고민하고 실현하는 것을 당연한 태도로 삼아 왔습니다. 그러한 제 자세와 성과가 조직에 긍정적인 자극이 되었다면 더없이 기쁘게 생각합니다. 앞으로도 저는 &apos;우수함&apos;을 기준점이 아닌 출발점으로 삼아, 더 높은 곳을 향해 나아갈 것입니다. 감사합니다.
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
