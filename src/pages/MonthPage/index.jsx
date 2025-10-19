import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';
import { useUser } from '@/shared/user';
import AdMonth from "../../components/AdMonth";

function MonthPage() {
  const user = useUser();
  const defaultPosts = [
    {
      id: 7,
      author: "N",
      text: "아미친",
      image: "/images/hunters1.png",
      replies: [

      ],
    },
    {
      id: 7,
      author: "N",
      text: "아",
      image: "/images/hunters1.png",
      replies: [

      ],
    },
    {
      id: 7,
      author: "N",
      text: "드디어 유니온 이달사 심사위원들 대가리에 제대로 된 개념을 눌러담았네ㅡㅡ 울프독 이글아이 언그 리더들이 뭐 잘했다고 우리 선배보다 먼저 상을 타 가냐고😑",
      image: "/images/hunters1.png", 
      replies: [
        { id: 11, author: "J", image: "/images/dracal1.png", text: "공개적인 게시판에서 다른 사람을 비방하는 행위는 삼가하기 바랍니다." },
        { id: 11, author: "N", image: "/images/hunters1.png", text: "어? 이달사 못받은 리더도 답글 달 권한이 있냐?" },
        { id: 11, author: "R", image: "/images/underground1.png", text: "자격 불충분한 보직장이 있다는 것에는 저 역시 동의합니다." },
        { id: 11, author: "N", image: "/images/hunters1.png", text: "아 ㅅㅂ 저 유니온 탈퇴합니다" },
      ],
    },
    {
      id: 7,
      author: "S",
      text: "헐!!! 어뜩해요???? 리더님 너무너무너무너무너무 삼겹살 구이만큼 딸기 케이크만큼 봉골레 파스타만큼 피순대국밥만큼 까르보나라만큼 수플레 팬케이크만큼 축하드려요!!!",
      image: "/images/hunters1.png", 
      replies: [
        { id: 11, author: "오르티", image: "/images/hunters1.png", text: "ㅍㅣ순ㄷ대 국ㄱ밥은 무엇이냐?? 이몸도ㅗ 궁금ㅁ하도ㅗ다" },
        { id: 11, author: "Y", image: "/images/underground1.png", text: "밤늦게까지 계시길래 고향에서 온 순대를 한 번 대접해드린 적이 있는데 맛있게 드셔주셨어요. 감사합니다." },
        { id: 11, author: "D", image: "/images/wolfdog1.png", text: "지 입만 입이구" },
        { id: 11, author: "Y", image: "/images/underground1.png", text: "느 입은 주둥아리라는 걸 안다니 다행이다" },
        { id: 11, author: "오르티", image: "/images/hunters1.png", text: "저번에 ㄱ가르보나라도 맜낫ㅅ노라!!1" },
        { id: 11, author: "Y", image: "/images/underground1.png", text: "생크림 유통기한이 짧아 급히 만들어드린 건데 입맛에 맞으셨다니 기쁘네요." },
        { id: 11, author: "M", image: "/images/wolfdog1.png", text: "까르보나라는 계란 노른자와 페코리노 치즈, 관찰레, 그리고 후추로만 만듭니다. 크림은 단 한 방울도 들어가지 않아요." },
        { id: 11, author: "D", image: "/images/wolfdog1.png", text: "@Y 사과드려 빨리" },
      ],
    },
    {
      id: 7,
      author: "R",
      text: "축하드립니다, 선배님. 완벽한 통제 아래 이루어진 완벽한 승리. 과연 선배님다운 결과입니다. 덕분에 골치 아픈 변수를 신경 쓸 필요 없이 맡은 바 임무에만 집중할 수 있으니, 이보다 더 이상적인 환경이 어디 있겠습니까. 앞으로도 변함없는 리더십을 기대하겠습니다.",
      image: "/images/underground1.png", 
      replies: [        
      ],
    },
    {
      id: 7,
      author: "테리",
      text: "대부님 수상을 진심으로 축하드려여👍🏻🌟 제 마음 속 영원한 영웅은 선배님 뿐!",
      image: "/images/wolfdog1.png", 
      replies: [
        { id: 11, author: "E", image: "/images/hunters1.png", text: "테리, 항상 몸 조심하고. 믿고 있다." },

      ],
    },
    {
      id: 7,
      author: "H",
      text: "형! 이렇게 많은 사람들 앞에서 고백해본다. 내 방패가 되어줄래? 이제 누가 공지해주냐.",
      image: "/images/eagleeye1.png", 
      replies: [
        { id: 11, author: "L", image: "/images/eagleeye1.png", text: "삼촌…! 마지막 건 다른 사람이 적어줘야 해요 🥹🥹" },
        { id: 11, author: "H", image: "/images/eagleeye1.png", text: "이거 삭제 어떻게 하냐?" },
        { id: 11, author: "H", image: "/images/eagleeye1.png", text: "왜 삭제가 안 되는데" },
        { id: 11, author: "관리자", image: "/images/union.png", text: "회원간 상호 비방 후 삭제하는 일이 많아 삭제 기능을 제한해두었으니 이용에 참고 부탁드립니다." },
        { id: 11, author: "H", image: "/images/eagleeye1.png", text: "근데 나는 돼야 하지 않냐?" },
      ],
    },
    {
      id: 7,
      author: "S",
      text: "그럼 우리 오늘 회식하는 거예요? 회식????",
      image: "/images/hunters1.png", 
      replies: [
        { id: 11, author: "N", image: "/images/hunters1.png", text: "코드 레드 코드 레드" },
        { id: 11, author: "E", image: "/images/hunters1.png", text: "그래, 자네가 먹고 싶은 데로 가도록 하지." },
      ],
    },
    {
      id: 7,
      author: "F",
      text: "살아서 축하할 일이 있다는 건 여전히 새삼스럽네요.",
      image: "/images/hunters1.png", 
      replies: [
        { id: 11, author: "비광", image: "/images/wolfdog1.png", text: "자네 다음 테러 위치는 어디인감? 힌트라도 주게" },
        { id: 11, author: "M", image: "/images/wolfdog1.png", text: "비광 씨, 유니온은 테러범과 협상하지 않습니다." },
      ],
    },
    {
      id: 7,
      author: "J",
      text: "축하드립니다, 선배님. 제 누나가 춤과 노래를 준비했다고 하니 부디 기쁘게 감상하여 주시기 바랍니다.",
      image: "/images/dracal1.png", 
      replies: [
        { id: 11, author: "N", image: "/images/hunters1.png", text: "ㅈ까 내가 언제" },
        { id: 11, author: "E", image: "/images/hunters1.png", text: "기대했는데, 아니라니 아쉽네." },
        { id: 11, author: "N", image: "/images/hunters1.png", text: "최고의 무대로 준비하겠습니다." },
      ],
    },
    
  ];
  
  const grimmerReaperPosts = [
    {
      id: 7,
      author: "하피",
      text: "흐으음 이번 달은 별 거 없네?",
      image: "/images/gr.png",
      replies: [
      ],
    },
    {
      id: 7,
      author: "아가페",
      text: "별 거 없다니요🖤 사랑스러운 걸 준비하고 있답니다💚",
      image: "/images/gr.png",
      replies: [
      ],
    },
    {
      id: 7,
      author: "루두스",
      text: "이런, 깜짝 무대인가요! 관객의 흥미를 돋구는 요소로군요!",
      image: "/images/gr2.png", 
      replies: [
      ],
    },
    {
      id: 7,
      author: "마니아",
      text: "슬슬 올 때 안 되었나요?",
      image: "/images/gr.png", 
      replies: [
      ],
    },
    {
      id: 7,
      author: "아가페",
      text: "조금만 더 기다릴까요…?",
      image: "/images/gr.png", 
      replies: [
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
          {user.part === '새붉은 재앙' ? '매달 유니온의 가장 하찮은 개를 소개합니다.' : '매달 유니온의 가장 빛나는 별을 소개합니다.'}
        </p>

        {/* 우수 사원 카드 */}
        <div className='px-2'>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-md mx-auto">
          <img
            src="/images/rank/E.png"
            alt="이달의 우수 사원"
            className="w-full h-180 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#456EBF] mb-1">E</h2>
            <p className="text-sm text-gray-500 mb-2">헌터즈</p>
            <p className="text-sm text-gray-700 leading-relaxed text-left">
              이 영광을 제게 주신 유니온과 동료 여러분께 먼저 감사드립니다.<br/><br/>

              하지만 이 상은 결코 저 혼자만의 것이 아님을 잘 알고 있습니다. 위험을 무릅쓰고 현장에서 함께 싸워준 모든 헌터즈 팀원, 보이지 않는 곳에서 헌신적으로 지원해준 이글아이 게이트 상황실, 그리고 무엇보다 헌터즈를 믿고 지지해주시는 시민 여러분이 있었기에 가능한 일이었습니다.<br/><br/>

              저는 그저 제가 마땅히 해야 할 일을 했을 뿐입니다. 리더로서, 한 명의 에스퍼로서, 저의 역할은 모두가 각자의 자리에서 최상의 역량을 발휘할 수 있도록 돕고, 모든 위험으로부터 그들을 지키는 방패가 되는 것입니다.<br/><br/>

              최근, 저의 방식이 최선이었는지에 대해 돌아볼 기회가 있었습니다. 때로는 저의 신념이 동료들에게 보이지 않는 벽이 되지는 않았는지, 과도한 책임감이 오히려 그들의 가능성을 가두는 족쇄가 되지는 않았는지 자문하게 되었습니다. 아직 저는 배울 것이 많은 부족한 리더입니다.<br/><br/>

              이번 수상을 더 나은 리더가 되라는 채찍질로 여기겠습니다. 동료들을 더 믿고, 그들의 목소리에 더 귀 기울이며, 함께 나아가는 헌터즈를 만들겠습니다.<br/><br/>

              다시 한번 말씀드리지만, 이 상은 헌터즈 모두의 것입니다. 저희는 앞으로도 평화로운 하늘 아래, 시민들을 위한 방패가 될 것을 약속드립니다. 감사합니다.
            </p>
          </div>
        </div>
        </div>

        <div className="flex justify-center items-center text-sm font-semibold text-gray-700 border-t border-b border-gray-500 mt-20 py-2">
          <div>축하 댓글을 남겨주세요!</div>
        </div>

        {postsToShow.map((post) => (
          <div
            key={post.id}
            className="border-gray-400 border-b border-y-0"
          >
            <div className="flex flex-col text-sm py-3 hover:bg-gray-50 transition pl-3">
              <div className="flex flex-row items-center gap-1">
                <img
                  src={post.image}
                  alt={post.author}
                  className="w-3 h-3"
                />
                <span className="text-gray-500 text-xs">{post.author}</span>
              </div>
              <div className="text-left">
                {typeof post.text === "function" ? post.text(user) : post.text}
              </div>
            </div>

            {post.replies.map((reply) => (
              <div
                key={reply.id}
                className="flex items-start text-sm text-gray-600 border-t border-gray-200 py-2"
              >
                <div className="pl-3 pr-1">⤷</div>
                <div>
                  <div className="flex flex- items-center gap-1">
                    <img
                      src={reply.image}
                      alt={reply.author}
                      className="w-3 h-3"
                    />
                    <span className="text-gray-500 text-xs"> {reply.author}</span>
                  </div>
                  <div className="text-left"> {reply.text}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="w-full mt-10">
          <AdMonth />
        </div>
      </div>



    </MainLayout>
  );
}

export default MonthPage;
