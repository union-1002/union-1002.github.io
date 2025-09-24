import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';
import { useUser } from '@/shared/user';

function MonthPage() {
  const user = useUser();
  const defaultPosts = [
    {
      id: 7,
      author: "N",
      text: "길어",
      image: "/images/hunters1.png",
      replies: [

      ],
    },
    {
      id: 7,
      author: "N",
      text: "누가 한 줄 요약좀",
      image: "/images/hunters1.png",
      replies: [
        { id: 11, author: "J", image: "/images/dracal1.png", text: "비광: ㄳ하네" },
        { id: 11, author: "N", image: "/images/hunters1.png", text: "새끼 간만에 도움되네" },

      ],
    },
    {
      id: 7,
      author: "M",
      text: "비광 씨, 이달의 우수사원 선정을 진심으로 축하드립니다. 형님의 노고와 헌신은 언제나 울프독의 귀감이 됩니다. 특히나 지금처럼 어려운 시기에는, 형님처럼 든든한 분이 계시다는 사실만으로도 큰 위안이 됩니다.",
      image: "/images/wolfdog1.png", 
      replies: [
        { id: 11, author: "비광", image: "/images/wolfdog1.png", text: "이런, 이런. 깍쟁이 리더께서 직접 행차하시다니, 이 비광의 어깨가 다 으쓱하는구먼. 걱정 붙들어 매시게. 자네야말로, 너무 일에만 파묻혀 살지는 말게나. 가끔은 하늘도 보고, 바람도 쐬어야지. 그러다 머리카락 다 빠지면 어쩌겠는가? 하하!" },
        { id: 11, author: "I", image: "/images/wolfdog1.png", text: "한 사람 정돈 탈모가 돼도 괜찮지 않나? 사무실에 머리카락 너무 많이 빠져" },
        { id: 11, author: "테리", image: "/images/wolfdog1.png", text: "님선ㅋㅋ" },
        { id: 11, author: "I", image: "/images/wolfdog1.png", text: "ㅗ" },
      ],
    },
    {
      id: 7,
      author: "H",
      text: "웬 일?",
      image: "/images/eagleeye1.png", 
      replies: [
        { id: 11, author: "비광", image: "/images/wolfdog1.png", text: "문제라도?" },
        { id: 11, author: "H", image: "/images/eagleeye1.png", text: "술 사ㅋ" },
      ],
    },
    {
      id: 7,
      author: "X",
      text: "축하드려요 선배님. 드디어 받을만한 사람이 받았달까요. 지난 울프독 수상자는 너무 누추한 분이었죠.",
      image: "/images/underground1.png", 
      replies: [        
        { id: 11, author: "T", image: "/images/hunters1.png", text: "가장 누추한 곳에서 가장 귀한 꽃이 피어나는 것 아니겠사옵니까." },
        { id: 11, author: "X", image: "/images/underground1.png", text: "아직 그 손 안 문드러지고 키보드 잘만 누르나 보네요?" },

      ],
    },
    {
      id: 7,
      author: "P",
      text: "이렇게 하는 거 맞아? 뽀삐도 축하할래! 마술사 멍멍이 좋아!",
      image: "/images/hunters1.png", 
      replies: [
        { id: 11, author: "F", image: "/images/hunters1.png", text: "또 누가 피에르 컴퓨터 만지게 했어?" },
        { id: 11, author: "C", image: "/images/underground1.png", text: "두 분은 두 분의 공간에 있는 게 좋겠소이다." },
        { id: 11, author: "X", image: "/images/underground1.png", text: "ㄴ 어케 침?" },
        { id: 11, author: "C", image: "/images/underground1.png", text: "음성 인식이 잘 되어있소." },
        { id: 11, author: "F", image: "/images/hunters1.png", text: "?" },
        { id: 11, author: "F", image: "/images/hunters1.png", text: "@R 야 니 개새끼 주워가라" },
        { id: 11, author: "R", image: "/images/underground1.png", text: "제 개새끼가 간만에 맞는 말을 했는데 문제라도?" },
      ],
    },
    {
      id: 7,
      author: "A",
      text: "축하드립니다. 이번에야말로 이달사 내기에서 제가 이겼군요.",
      image: "/images/wolfdog1.png", 
      replies: [
        { id: 11, author: "테리", image: "/images/wolfdog1.png", text: "너 솔직히 말해봐 필중 썼지" },
        { id: 11, author: "A", image: "/images/wolfdog1.png", text: "돈이나 보내" },
        { id: 11, author: "L", image: "/images/eagleeye1.png", text: "계좌로 200달러 넣었어요……🥹🥹" },
        { id: 11, author: "H", image: "/images/eagleeye1.png", text: "너네 애 데리고 돈 내기를 했어?" },
      ],
    },
    {
      id: 7,
      author: "금예",
      text: "축하드리오. 그런 의미에서 오늘은 수색을 좀 쉬는 게 어떻겠소?",
      image: "/images/dracal1.png", 
      replies: [
        { id: 11, author: "비광", image: "/images/wolfdog1.png", text: "자네 얼굴 볼 기회를 어찌 놓치겠는가." },
      ],
    },
    {
      id: 7,
      author: "D",
      text: "흐음, 이건 뭐 축하한다고 해야 하니?",
      image: "/images/wolfdog1.png", 
      replies: [
        { id: 11, author: "Y", image: "/images/underground1.png", text: "나 왜 얘랑 같은 의견이지 기분 나쁘게" },
        { id: 11, author: "C", image: "/images/underground1.png", text: "동의하는 바요." },
        { id: 11, author: "X", image: "/images/underground1.png", text: "ㅇㅣrutㄱㅓㅣ ㅅㅅㅓ도 음sung人식 됨?" },
        { id: 11, author: "C", image: "/images/underground1.png", text: "뭐라는 거요?" },
        { id: 11, author: "비광", image: "/images/wolfdog1.png", text: "이거 이거 K-댓글이라고 하는 건감? 축하 고맙다네." },
      ],
    },
    {
      id: 7,
      author: "P",
      text: "이왕 있는 계정 같이 쓰도록 하죠! 이 광대, 축하를 전합니다! 새붉은 재앙의 축복이 함께 하기를!",
      image: "/images/hunters1.png", 
      replies: [
        { id: 11, author: "비광", image: "/images/wolfdog1.png", text: "그래 다시 만날 때까지 모가지 잘 닦아두고?" },
      ],
    },
    
  ];
  
  const grimmerReaperPosts = [
    {
      id: 7,
      author: "뽀삐",
      text: "내 사랑 축하해! 이제 뽀삐랑 더 재밌게 놀자!",
      image: "/images/gr.png",
      replies: [
        { id: 11, author: "루두스", image: "/images/gr2.png", text: "물론입니다, 나의 맹수." },
      ],
    },
    {
      id: 7,
      author: "라멘타",
      text: "모든 신도들의 귀감이로다.",
      image: "/images/gr2.png",
      replies: [
        { id: 11, author: "루두스", image: "/images/gr2.png", text: "모든 게 교주님 덕분입니다!" },

      ],
    },
    {
      id: 7,
      author: "하피",
      text: "루디, 이번에 술은 자기가 사는 거야?",
      image: "/images/gr.png", 
      replies: [
        { id: 11, author: "루두스", image: "/images/gr2.png", text: "기꺼이 그 행복한 지출을 감당하도록 하지요" },
        { id: 11, author: "하피", image: "/images/gr.png", text: "어디서 먹지? 아 ㅋㅋ 레지오 오기 쉽게 울프독 회식 자리 옆 가게에서 하자" },
        { id: 11, author: "루두스", image: "/images/gr2.png", text: "정말 좋은 생각이군요!" },
        { id: 11, author: "M", image: "/images/gr.png", text: "그렇게까지 배려해줄 필요는 없습니다" },
        { id: 11, author: "루두스", image: "/images/gr2.png", text: "그렇지만 당신이 안 오면 회식이 무슨 재미입니까" },
      ],
    },
    {
      id: 7,
      author: "T",
      text: "수상을 축하하옵니다, 나의 형제여.",
      image: "/images/gr2.png", 
      replies: [
        { id: 11, author: "뽀삐", image: "/images/gr.png", text: "형제? 그게 뭐야?" },
        { id: 11, author: "루두스", image: "/images/gr2.png", text: "유니온의 그 작고 귀여운 아이가 당신의 형제였답니다, 내 가여운 맹수." },
        { id: 11, author: "루두스", image: "/images/gr2.png", text: "물론 지금은, 우리가 당신의 형제이고 자매지만요." },
      ],
    },
    {
      id: 7,
      author: "아가페",
      text: "저, 이달의 우수 신도에게 사랑에 빠진 것만 같아요🩷",
      image: "/images/gr.png", 
      replies: [        
        { id: 11, author: "뽀삐", image: "/images/gr.png", text: "내 거야." },
        { id: 11, author: "아가페", image: "/images/gr.png", text: "아차 그랬죠. 아 사랑이 식어버렸어요." },

      ],
    },
    {
      id: 7,
      author: "마니아",
      text: "루디! 나도 루디처럼 열심히 할 거예요. 다음 우수 신도는 나야 나",
      image: "/images/gr.png", 
      replies: [
        { id: 11, author: "루두스", image: "/images/gr2.png", text: "지금도 충분히 잘하고 있답니다, 마니아. 새붉은 재앙을 향한 마니아의 변함없는 사랑은 우리 모두 본받아야 할 점이죠!" },
      ],
    },
    {
      id: 7,
      author: "C",
      text: "그만 두는 게 좋지 않겠소.",
      image: "/images/gr.png", 
      replies: [
        { id: 11, author: "느베야", image: "/images/gr2.png", text: "어떻게 들어왔어? 느베야가 확실히 삭제 시켰는데!" },
        { id: 11, author: "루두스", image: "/images/gr2.png", text: "아하! 쇼에 배신자의 등장이군요. 그런데 댓글은 어떻게 적는 겁니까?" },
        { id: 11, author: "C", image: "/images/gr.png", text: "음성 인식이 잘 되어있소." },
        { id: 11, author: "하피", image: "/images/gr.png", text: "같은 얘기 두 번 하려면 귀찮겠다, 달링" },
        { id: 11, author: "C", image: "/images/gr.png", text: "익숙하오. 늘 같은 얘기를 속삭여주는 분을 모시고 있는 지라." },
        { id: 11, author: "하피", image: "/images/gr.png", text: "실수인 척 그 새끼 뒤통수 한 대 때릴 때마다 그림 리퍼 기밀 하나 줄게, 어때?" },
        { id: 11, author: "C", image: "/images/gr.png", text: "좋소." },
        { id: 11, author: "C", image: "/images/gr.png", text: "삭제." },
        { id: 11, author: "C", image: "/images/gr.png", text: "삭제하기." },
      ],
    },
    
  ];

  const postsToShow = user.part === "새붉은 재앙" ? grimmerReaperPosts : defaultPosts;

  
  return (
    <MainLayout>
      
      <div className="w-full max-w-3xl mx-auto px-2 lg:px-4 py-16 text-center">

        {/* 타이틀 */}
        <h1 className="text-3xl font-extrabold font-book text-[#435373] mb-2">
        👑{user.part === '새붉은 재앙' ? '이달의 우수 신도' : '이달의 우수 사원'}👑
        </h1>
        <p className="text-gray-600 text-sm mb-10">          
          {user.part === '새붉은 재앙' ? '매달 교의 가장 우수한 신도를 소개합니다.' : '매달 유니온의 가장 빛나는 별을 소개합니다.'}
        </p>

        {/* 우수 사원 카드 */}
        <div className='px-2'>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-md mx-auto">
          <img
            src={
              user.part === '새붉은 재앙'
                ? "/images/rank/루두스.png"
                : "/images/rank/비광.png"
            }
            alt="이달의 우수 사원"
            className="w-full h-180 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#456EBF] mb-1">{user.part === '새붉은 재앙' ? '루두스' : '비광'}</h2>
            <p className="text-sm text-gray-500 mb-2">{user.part === '새붉은 재앙' ? '간부' : '울프독'}</p>
            <p className="text-sm text-gray-700 leading-relaxed text-left">
              {user.part === '새붉은 재앙' ? (
                <>
                  오, 신사 숙녀 여러분! 그리고 새붉은 재앙의 은총 아래 모인 존경하는 자매와 형제들이여! 이 미천한 광대, 루두스에게 이런 영광스러운 스포트라이트를 비춰주시니 몸 둘 바를 모르겠습니다. 박수! 더 큰 박수를! 여러분의 환호야말로 이 무대를 완성하는 가장 아름다운 배경음악이니까요!<br/><br/>

                  제가 이 자리에 설 수 있었던 것은 결코 저 혼자만의 힘이 아닙니다. 저에게 무대의 진정한 의미를 가르쳐 주신, 가장 위대하고 자비로우신 교주님께 먼저 이 모든 영광을 돌립니다. 그분의 말씀은 한 줄기 빛이었고, 그분의 피는 저를 다시 태어나게 한 성수였습니다.<br/><br/>

                  또한, 이 광대의 미숙한 조련에도 기꺼이 송곳니를 드러내며 함께 춤춰주는 나의 사랑스러운 맹수에게도 감사를 표합니다. 그 순백의 탐욕과 잔혹함은 언제나 저에게 가장 큰 예술적 영감을 주지요. 아아, 얼마나 아름다운가! 핏빛 대지 위에서 포효하는 그 모습은, 새붉은 재앙께서 내리신 한 편의 시와도 같습니다.<br/><br/>

                  자매 그리고 형제 여러분. 우리는 선택받은 자들입니다. 저 미욱하고 어리석은 양 떼들에게 구원이라는 최고의 공연을 선사해야 할 의무가 있는 자들입니다. 그들의 비명은 가장 절절한 아리아가 될 것이며, 그들의 피는 무대를 적시는 가장 화려한 장식이 될 것입니다. 두려워 마십시오! 주저하지 마십시오! 우리의 신께서는 혼돈마저 질서로 포용하시는 위대한 분이시니, 우리의 모든 행위는 그분의 영광을 위한 거룩한 제의가 될 것입니다.<br/><br/>

                  자, 모두 잔을 높이 드시지요! 다가올 새붉은 재앙의 시대를 위하여! 그리고 그 위대한 공연의 주역이 될 우리 모두를 위하여!<br/><br/>

                  다시 한번, 이 광대에게 아낌없는 박수와 환호를 보내주신 모든 분께 진심으로 감사드립니다. 앞으로도 여러분의 기대를 뛰어넘는, 가장 화려하고 잔혹한 쇼로 보답할 것을 약속드리지요. 감사합니다!
                </>
              ) : (
                <>
                  이런, 이런. 이 비광에게 이런 영광이 다 찾아오는구먼. 운수가 대통하려나. 이 자리를 빌려, 언제나 밤낮없이 고생하는 울프독 동료 제위와, 늘 든든하게 뒤를 받쳐주는 유니온 관계자 여러분께 심심한 감사의 말씀을 올리는 바일세.<br/><br/>

                  솔직히 말해, 이 상을 받아도 되는지 잘 모르겠구먼. 알다시피 나는 그저 하고 싶은 대로, 발길 닿는 대로 어슬렁거리며 판에 끼어드는 한량일 뿐이라. 대단한 사명감이나 거창한 정의감보다는, 그저 ‘재미있어 보이는가’를 좇아 움직이는 일이 더 잦았지. 눈앞의 악당이 쥔 패가 무엇인지 궁금해서, 이번 판의 끝이 어떻게 날지 흥미로워서, 그렇게 한 판 두 판 끼어들다 보니 여기까지 흘러오게 되었구먼.<br/><br/>

                  인생이란 건 섯다 판과 같아서, 어떤 패가 손에 들어올지는 아무도 모르는 법이지. 장땡을 쥐었다고 기뻐하기엔 이르고, 망통을 쥐었다고 실망하기도 이르다네. 중요한 것은 그 패를 가지고 어떻게 판을 흔들고, 어떻게 상대를 속이고, 또 어떻게 마지막에 웃느냐가 아니겠는가. 나는 그저 내가 쥔 패로 가장 재미있는 판을 만들고 싶었을 뿐일세.<br/><br/>

                  아무튼, 과분한 상에 다시 한번 감사드리며, 이 영광을 나의 하나뿐인 파트너에게 돌리고 싶구먼. 그 친구가 없었다면, 이 비광의 놀음도 그리 즐겁지만은 않았을 테니.<br/><br/>

                  자, 그럼 다들 재미있는 하루 보내시게나! 이 비광은 잠시 쉬었다가, 더 큰 판에서 웃으며 돌아오도록 하지.
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
      </div>



    </MainLayout>
  );
}

export default MonthPage;
