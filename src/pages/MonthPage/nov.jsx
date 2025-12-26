import MainLayout from '@/shared/MainLayout';
import { useUser } from '@/shared/user';
import AdMonth from "../../components/AdMonth";

function MonthPage() {
  const user = useUser();
  const defaultPosts = [
    {
      id: 7,
      author: "울프독 공용 계정",
      text: "1빠임다 ㅋㅋ",
      image: "/images/wolfdog1.png",
      replies: [
        { id: 11, author: "I", image: "/images/wolfdog1.png", text: "아싸, 2빠. 베르너가 커피 사는 걸로." },
        { id: 11, author: "A", image: "/images/wolfdog1.png", text: "야 관리자 계정으로 미리 오는 건 반칙 아닙니까?" },
        { id: 11, author: "M", image: "/images/wolfdog1.png", text: "테리 군, 공용 계정으로 장난치지 마세요." },
        { id: 11, author: "오르티", image: "/images/hunters1.png", text: "댜들ㅗ나이ㅅ갑ㅄ좀 하거라" },
      ],
    },
    {
      id: 7,
      author: "N",
      text: "이야 우리 부서 연속으로 이달사 하는 거 봐. 최고의 부서 아니냐? 저기 재수 없는 민트초코 나부랭이보다 우리 용용이가 먼저 이달사 받는 거 보면 답 나오지.",
      image: "/images/hunters1.png",
      replies: [
        { id: 11, author: "J", image: "/images/dracal1.png", text: "재수 없는 치토스." },
        { id: 11, author: "N", image: "/images/hunters1.png", text: "뭐냐? 이 싸가지가. 너라고 한적 없는데?" },
        { id: 11, author: "J", image: "/images/dracal1.png", text: "저도 누군가를 특정하고 한 이야기는 아닙니다." },
        { id: 11, author: "N", image: "/images/hunters1.png", text: "어 재활용도 안되는 민트초코 껍데기" },
        { id: 11, author: "J", image: "/images/dracal1.png", text: "응 재활용 해도 적자 나는 치토스 봉지." },
        { id: 11, author: "오르티", image: "/images/hunters1.png", text: "재활ㄹ용은ㅓ 어디ㅓ게이트에 사는ㄴ 용이느냐ㅑ" },

      ],
    },
    {
      id: 7,
      author: "R",
      text: "고디바는 어떠십니까?",
      image: "/images/underground1.png", 
      replies: [
        { id: 11, author: "N", image: "/images/hunters1.png", text: "애 버릇 나빠진다고 했잖아 미친" },
        { id: 11, author: "R", image: "/images/underground1.png", text: "제 알 바입니까?" },
        { id: 11, author: "N", image: "/images/hunters1.png", text: "[신고 누적으로 가려진 댓글입니다.]" },
      ],
    },
    {
      id: 7,
      author: "살라딘",
      text: "우리 막내가 해냈구나!",
      image: "/images/wolfdog1.png", 
      replies: [
        { id: 11, author: "살라딘", image: "/images/wolfdog1.png", text: "장하기 짝이 없다." },
        { id: 11, author: "오르티", image: "/images/hunters1.png", text: "ㅋㅋ아직ㄱ도 이달 사 못받은ㄴ 요원없제? ㅋㅋ" },
        { id: 11, author: "E", image: "/images/hunters1.png", text: "이런 말투는 누가 가르친 겁니까?" },
      ],
    },
    {
      id: 7,
      author: "미네르바",
      text: "축하한다, 오르토스.",
      image: "/images/eagleeye1.png", 
      replies: [        
 
      ],
    },
    {
      id: 7,
      author: "P",
      text: "위대하신 분의 고아한 행적에 박수를!",
      image: "/images/hunters1.png", 
      replies: [
        { id: 11, author: "미카엘", image: "/images/dracal1.png", text: "참다 참다 말하는 건데 이거 어떻게 할 수 없어요?" },
        { id: 11, author: "P", image: "/images/hunters1.png", text: "[관리자에 의해 제재된 댓글(사유: 명예훼손)입니다.]" },
        { id: 11, author: "미카엘", image: "/images/dracal1.png", text: "[관리자에 의해 제재된 댓글(사유: 욕설)입니다.]" },
      ],
    },
    {
      id: 7,
      author: "비광",
      text: "경사로구먼! 한 턱 쏘게!",
      image: "/images/wolfdog1.png", 
      replies: [
        { id: 11, author: "오르티", image: "/images/hunters1.png", text: "ㅇㅠ유상종이노라!" },
      ],
    },
    {
      id: 7,
      author: "S",
      text: "🌙✨ 오르링~~~ 용용이~~~ ✨🌙 이달사 된 거 진짜루 축하해에에 🥳💛 역시 우리 오르링은 맛있는 고기처럼 씹을수록 대단한 사람이라니까아 🤤🔥",
      image: "/images/hunters1.png", 
      replies: [

      ],
    },
    
  ];
  
  const grimmerReaperPosts = [
    {
      id: 7,
      author: "뽀삐",
      text: "용용이! 멋져! 축하해!",
      image: "/images/gr.png",
      replies: [

      ],
    },
    {
      id: 7,
      author: "에로스",
      text: "✧⟆ㅣ벤r트 폭주중✦ 초ㅌㅣ한정 입장만 해도 ☞보너스 칩 증정☜ 오늘 밤은 ♨어른들의 비밀정원♨ 슬♚럼 아스ㅁㅗ데우스에 서∽ㄱ 빠져봐 ➺ 바로가기",
      image: "/images/gr2.png", 
      replies: [

      ],
    },
    {
      id: 7,
      author: "아가페",
      text: "제사장 님, 곤란한 일이 난 것 같은데요…….",
      image: "/images/gr.png", 
      replies: [

      ],
    },
    {
      id: 7,
      author: "루두스",
      text: "제사장, 어디간 겁니까? 형제들이 당신을 찾고 있습니다만, 주인공은 마지막에 등장하는 법인가요?",
      image: "/images/gr2.png", 
      replies: [

      ],
    },
    {
      id: 7,
      author: "매드 헤터",
      text: "우리 막내, 축하합니다!",
      image: "/images/gr.png", 
      replies: [        
      ],
    },
    {
      id: 7,
      author: "마니아",
      text: "베야 지금 제 품에서 떨고 있는데요?",
      image: "/images/gr.png", 
      replies: [
        
      ],
    },
    {
      id: 7,
      author: "C",
      text: "아, 여기가 백신도 안 들어처먹는 바이러스 버러지 소굴인가요?",
      image: "/images/gr.png", 
      replies: [
        { id: 11, author: "C", image: "/images/gr.png", text: "우글우글 기생하고 있는 꼴이 기가 차지도 않네요." },
        { id: 11, author: "C", image: "/images/gr.png", text: "랜섬웨어 같은 새끼들." },
        { id: 11, author: "라멘타", image: "/images/gr2.png", text: "가여운 어린양이여, 실은 이해할지니." },
      ],
    },
    
  ];

  const postsToShow = user.part === "새붉은 재앙" ? grimmerReaperPosts : defaultPosts;

  
  return (
    <MainLayout>
      <style>{`
        @keyframes rainbowFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
      <div className="w-full max-w-3xl mx-auto px-2 lg:px-4 py-16 text-center">

        {/* 타이틀 */}
        <h1 className="text-3xl font-extrabold font-book text-[#435373] mb-2">
        👑{user.part === '새붉은 재앙' ? '그림 리퍼 보거라' : '이달의 우수 사원'}👑
        </h1>
        <p className="text-gray-600 text-sm mb-10">          
          {user.part === '새붉은 재앙' ? '이몸의 멋진 모습!' : '매달 유니온의 가장 빛나는 별을 소개합니다.'}
        </p>

        {/* 우수 사원 카드 */}
        <div className='px-2'>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-md mx-auto">
          <img
            src={
              user.part === '새붉은 재앙'
                ? "/images/orti.png"
                : "/images/rank/오르티.png"
            }
            alt="이달의 우수 사원"
            className="w-full h-180 object-cover"
          />
          <div className="p-6">
            <h2
              className={
                user.part === "새붉은 재앙"
                  ? `
                    text-xl font-bold mb-1
                    bg-gradient-to-r
                    from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-500
                    bg-clip-text text-transparent

                    bg-[length:300%_100%]
                    animate-[rainbowFlow_3s_linear_infinite]
                  `
                  : "text-xl font-bold text-[#456EBF] mb-1"
              }
            >
              {user.part === "새붉은 재앙" ? "오르티로다!" : "오르티"}
            </h2>


            <p className="text-sm text-gray-500 mb-2">{user.part === '새붉은 재앙' ? '킹왕짱 위대한 군주' : '헌터즈'}</p>
            <p className="text-sm text-gray-700 leading-relaxed text-left">
              {user.part === '새붉은 재앙' ? (
                <>
                  어이, ㄱㅓ기 음침한 구석ㅇㅇㅔ서  촛ㅅ불 켜놓ㄱ코 이상한 주문이나 외우는 너ㅓ희들! 잘 지냈느냐ㅑ??<br/>
                  나 ㅇㅇㅟ대한 군주 오ㅗ르티 님이 직접 행차하셧ㅅ따!<br/>
                  남의 사이틑ㅌ에 숨ㅁ어들어 하는 꼬라지가 한ㄴ심하도다!<br/><br/>

                  아무튼, 중요한 건ㄴ 그게 아ㅇ니다ㄴ!<br/>
                  내가 오늘 아ㅈ주 기쁜 소식을 가져왓ㅇ따. 이몸이 가장 ㄸㅇ뤼어나다는 것을 유니온이 공식적으로 린ㄴ정했단 말이다!<br/><br/>

                  그러니ㄱ가 결론은 이거다.<br/><br/>
                  그 음침한 짔ㅅ거리는 그만두고 유니온에 와서 내 팬크ㄹ럽 가입이나 해라. 아, 물론 가입비는 초ㅗ코로 받겠다.<br/><br/>

                  이상, 우주 최강 귀염둥이 군주 오르티였다!<br/><br/>

                  P.S. 관리자ㅏ 비밀번호가 BloodGod1234라니, 너무 유치하지 않느냐? 내ㅐ가 ChocoLove로 바꿔놨으니 그리 알도록ㄱ!!
                </>
              ) : (
                <>
                  인간들! 아니, 동료 여러분!<br/><br/>
                  
                  이몸이, 위대한 군주 오르티가 이달의 가장 뛰어난 사원이 되었다는 소식을 들었노라! 처음엔 그저 반짝이는 황금 명패를 준다기에 좋다고 했지만, 이것이 너희가 나를 인정한다는 뜻이라니 기쁘기 그지없도다.<br/><br/>

                  솔직히 말하자면, 몬스터들과 대화하는 건 내게 숨 쉬는 것처럼 쉬운 일이다. 너희가 길가에 핀 강아지풀에게 인사를 건네는 것과 다르지 않으니까! 하지만 그 작은 대화가 너희를 다치지 않게 하고, 웃게 만들었다니 참으로 신기하고 보람찬 일이 아닐 수 없다. 총장님과의 약속, 행복을 찾는 일이 이런 것인가 어렴풋이 알 것도 같다.<br/><br/>

                  이 영광을 나에게 가장 맛있는 초콜릿을 가르쳐 준 나의 친구이자 짝꿍에게 돌리노라! 그리고 매일 잔소리하지만 밥은 잘 챙겨주는 살라딘 형아, 오토바이 태워주는 쌩쌩이 누나, 그리고 나를 무서워하지 않고 사탕을 건네준 1층 안내 데스크 직원에게도 고마움을 전한다.<br/><br/>

                  부상으로 받은 백화점 상품권은 전부 초콜릿으로 바꿀 것이다! 다들 내 자리로 오면 하나씩 나눠주겠노라! 이상, 위대한 오르티였다!
                </>
              )}
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
