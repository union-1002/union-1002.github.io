import MainLayout from '@/shared/MainLayout';
import { useUser } from '@/shared/user';
import { useState } from "react";
import AdMonth from "../../components/AdMonth";

function MonthPage() {
  const user = useUser();
  const [openRonByTriggerReplyId, setOpenRonByTriggerReplyId] = useState(() => ({}));


  const defaultPosts = [
    {
      id: 1,
      author: "울프독 공용 계정",
      text: "울프독은 희생 앞에 묵념하며, 그들의 의지를 이어갑니다.",
      image: "/images/wolfdog1.png",
      replies: [

      ],
    },
    {
      id: 2,
      author: "테리",
      text: "오늘은 마시는 검다!",
      image: "/images/wolfdog1.png",
      replies: [
        { id: 201, author: "I", image: "/images/wolfdog1.png", text: "마시고 죽어 따라가게, 친구?" },
        { id: 202, author: "론", image: "/images/wolfdog1.png", text: "이 망할 놈이 또 말 이렇게 하네" },
        { id: 203, author: "테리", image: "/images/wolfdog1.png", text: "저번에도 먼저 죽어서 택시 타고 간 사람이 할 말은 아니져?" },
      ],
    },

    {
      id: 3,
      author: "비광",
      text: "에잉, 하여간에 사람 기분 이상하게 하는 데는 뭐 있구만.",
      image: "/images/wolfdog1.png",
      replies: [
        { id: 301, author: "비광", image: "/images/wolfdog1.png", text: "자네 장례식 날에 더럽게 추웠다네. 아는가?" },
        { id: 302, author: "비광", image: "/images/wolfdog1.png", text: "자네 친구도 잠시 와본 걸 내 눈 감아줬어." },
        { id: 303, author: "비광", image: "/images/wolfdog1.png", text: "걱정일랑 말게." },
        { id: 304, author: "I", image: "/images/wolfdog1.png", text: "친구 누구? 나 말고 친구가 있었어?" },
        { id: 305, author: "론", image: "/images/wolfdog1.png", text: "내가 할 말 아냐????" },
        { id: 306, author: "비광", image: "/images/wolfdog1.png", text: "그거는 론냐가 할 말 아닌감?" },
      ],
    },

    {
      id: 4,
      author: "A",
      text: "쓸 데 없는 걱정입니다.",
      image: "/images/wolfdog1.png",
      replies: [
        { id: 401, author: "A", image: "/images/wolfdog1.png", text: "편히 쉬기나 하시죠." },
        { id: 402, author: "I", image: "/images/wolfdog1.png", text: "오지랖도 대서양이야." },
        { id: 402, author: "론", image: "/images/wolfdog1.png", text: "너네 하는 거 보다가 30살 됐어." },
      ],
    },

    {
      id: 5,
      author: "J",
      text: "그 누구보다도 따뜻하고, 소외된 자에게 손을 뻗는 동료였습니다. 그 마음을 기억하겠습니다.",
      image: "/images/dracal1.png",
      replies: [
        { id: 501, author: "I", image: "/images/wolfdog1.png", text: "억울하네 나한테는 차가운 아이스 아메리카노였는데." },
        { id: 502, author: "론", image: "/images/wolfdog1.png", text: "난 악마의 구정물이었던 적 없거든!" },
        { id: 503, author: "M", image: "/images/wolfdog1.png", text: "고인이 알면 무덤에서 일어날 일입니다, I 군." },
        { id: 504, author: "I", image: "/images/wolfdog1.png", text: "무덤에서 일어나면 좋은 일 아닌가?" },
        { id: 505, author: "론", image: "/images/wolfdog1.png", text: "하…. 내가 이런 놈을 떠맡기고 가서 미안하다 모르페우스." },
      ],
    },

    {
      id: 6,
      author: "M",
      text: "글쎄요, 스스로를 괴물이라 생각하지 않습니다.",
      image: "/images/wolfdog1.png",
      replies: [
        { id: 601, author: "M", image: "/images/wolfdog1.png", text: "지키고 싶은 것은…." },
        { id: 602, author: "M", image: "/images/wolfdog1.png", text: "쉬어요, 론." },
      ],
    },

    {
      id: 7,
      author: "D",
      text: "론론.",
      image: "/images/wolfdog1.png",
      replies: [
        { id: 701, author: "D", image: "/images/wolfdog1.png", text: "슬럼에서 형아가 후회하냐고 물었단다." },
        { id: 702, author: "론", image: "/images/wolfdog1.png", text: "웃긴 양반이야. 내가 후회를 왜 해요? 당신이야 말로 살아있는 게 아니라 기능하고 있는 게 아니에요? 라고 전해 줘." },
        { id: 703, author: "I", image: "/images/wolfdog1.png", text: "그 노인네 아직도 그딴 소리를 해?" },
        { id: 704, author: "론", image: "/images/wolfdog1.png", text: "얼씨구. 앞에서 못할 소리 여기 못 본다고 잘하네?" },
        { id: 705, author: "D", image: "/images/wolfdog1.png", text: "직접 말하렴." },
        { id: 706, author: "론", image: "/images/wolfdog1.png", text: "오늘만큼은 꼴도 보기 싫어. 하지만 당신도 한때 따뜻한 피가 흐르던 인간임을 기억하기를." },
      ],
    },

    {
      id: 8,
      author: "R",
      text: "울프독 최대의 손실임을 압니다.",
      image: "/images/underground1.png",
      replies: [
        { id: 801, author: "I", image: "/images/wolfdog1.png", text: "뭘 아신다고?" },
        { id: 802, author: "론", image: "/images/wolfdog1.png", text: "죄송합니다, 보시다시피 저희 애도 반성하고 있으니…." },
        { id: 803, author: "R", image: "/images/underground1.png", text: "제가 당신보다 론을 모를까요?" },
        { id: 804, author: "I", image: "/images/wolfdog1.png", text: "ㅋㅋㅋㅋ" },
        { id: 804, author: "론", image: "/images/wolfdog1.png", text: "뭘 잘했다고 웃어?" },
      ],
    },

    {
      id: 9,
      author: "X",
      text: "이렇게 물러 터져서 그렇게 된 거라고요.",
      image: "/images/underground1.png",
      replies: [
        { id: 901, author: "X", image: "/images/underground1.png", text: "역겨울 만큼 가증스러워." },
        { id: 902, author: "X", image: "/images/underground1.png", text: "대체 왜." },
        { id: 903, author: "I", image: "/images/wolfdog1.png", text: "ㅇㅈ 이 친구 슬럼 사투리를 나만 알고 있다는 게 참 개탄스럽네, 하하." },
        { id: 904, author: "론", image: "/images/wolfdog1.png", text: "아가리 하자. 아직도 나보다 어린 새끼가." },
      ],
    },

    {
      id: 10,
      author: "I",
      text: "뭐야? 이제 아무도 댓글 안 달아?ㅋㅋ",
      image: "/images/wolfdog1.png",
      replies: [
      ],
    },

    {
      id: 11,
      author: "I",
      text: "뭐 얘는 딱 이 정도까지 라는 거지.",
      image: "/images/wolfdog1.png",
      replies: [
      ],
    },

    {
      id: 12,
      author: "I",
      text: "회식 해ㅆ는데",
      image: "/images/wolfdog1.png",
      replies: [
        { id: 1201, author: "I", image: "/images/wolfdog1.png", text: "진짜 네가 했던 헛소리들" },
        { id: 1202, author: "I", image: "/images/wolfdog1.png", text: "다ㅓ 맘에 안 들ㄹ어" },
        { id: 1203, author: "I", image: "/images/wolfdog1.png", text: "네가 싫어." },
        { id: 1204, author: "론", image: "/images/wolfdog1.png", text: "너 진짜 계속 그렇게\n사람 열받게 하고\n꼽줘가면서\n\n살아." },
      ],
    },
    
  ];
  
  const grimmerReaperPosts = [
    {
      id: 21,
      author: "뽀삐",
      text: "루디, 루디! 우리 이제 조각 물어와 놀이 안 해?",
      image: "/images/gr.png",
      replies: [
        { id: 2101, author: "루두스", image: "/images/gr2.png", text: "그럼요, 나의 맹수! 이젠 작품이 완성 되었으니까요." },
      ],
    },

    {
      id: 22,
      author: "매드 해터",
      text: "브라보! 최고의 피그말리온입니다. 피그말리온 맞죠? 피규어?",
      image: "/images/gr.png",
      replies: [
      ],
    },

    {
      id: 23,
      author: "M",
      text: "유니온 총장실 긴급 명령입니다. 오늘부로 울프독은 슬럼 순찰을 무기한 일절 중단합니다. 당신들도 알아서들 하세요.",
      image: "/images/gr.png",
      replies: [
      ],
    },

    {
      id: 24,
      author: "C",
      text: "하, 씨발…. 진짜 미친 새끼들이네, 이거.",
      image: "/images/gr.png",
      replies: [
        { id: 2401, author: "C", image: "/images/gr.png", text: "야 이 개 같은 새끼들아. 니들이 그러고도 인간이냐? 뭐? 구원? 재앙? 너희 신은 그런 뽕에 아직도 취했나 본디. 너희 눈깔에는 그게 천사로 보이냐? 남의 시체 도굴해서 프랑켄슈타인 쳐 만들어 놓고 천사라고 빨아제끼는 꼴이 같잖아 죽겠다 씨발 새끼들아." },
        { id: 2402, author: "C", image: "/images/gr.png", text: "론이 장난감이냐? 죽어서도 편히 못 쉬게 그따위로 굴려? 니들 교주 수준도 알 만하다. 그러니까 데스 사이드 때 가슴팍이나 뚫리고 복수는 좆도 못하지." },
        { id: 2403, author: "C", image: "/images/gr.png", text: "라멘타 이 개 좆같은 새끼, 넌 내 손에 죽는다. 니들이 론한테 한 짓, 억 배로 갚아줄게. 딱 기다려, 개새끼들아." },
        { id: 2404, author: "마니아", image: "/images/gr.png", text: "오라버니, 계정 또 뺏겼어요?" },
        { id: 2405, author: "C", image: "/images/gr.png", text: "오늘만큼은 내버려뒀소." },

      ],
    },

    {
      id: 25,
      author: "하피",
      text: "아 씨발 진짜.",
      image: "/images/gr.png",
      replies: [
        { id: 2401, author: "하피", image: "/images/gr.png", text: "씨발 자기들아, 역겨워서 토하겠다." },
      ],
    },

    {
      id: 26,
      author: "에로스",
      text: "제 깃털을…… 이런 곳에 썼군요……?",
      image: "/images/gr2.png",
      replies: [
        { id: 2401, author: "에로스", image: "/images/gr2.png", text: "새로운 방법으로 새 생명을 잉태했네……. 저는 구시대적 방법이 좋답니다." },
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
        {user.part === '새붉은 재앙' ? '🔴이달의 신규 신도🔴' : '추모합니다🪴'}
        </h1>
        <p className="text-gray-600 text-sm mb-10">          
          {user.part === '새붉은 재앙' ? '새로운 신도를 소개합니다.' : '그들의 임무는 멈추었지만, 의지를 이어 나갑니다.'}
        </p>

        {/* 우수 사원 카드 */}
        <div className='px-2'>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden max-w-md mx-auto">
          <img
            src={
              user.part === '새붉은 재앙'
                ? "/images/rank/로이에.png"
                : "/images/rank/론.png"
            }
            alt="이달의 우수 사원"
            className="w-full h-180 object-cover"
          />
          <div className="p-6">
            <h2
              className="text-xl font-bold text-[#456EBF] mb-1">
              {user.part === "새붉은 재앙" ? "로이에" : "론"}
            </h2>


            <p className="text-sm text-gray-500 mb-2">{user.part === '새붉은 재앙' ? '이상향의 계도자' : '울프독'}</p>
            <p className="text-sm text-gray-700 leading-relaxed text-left">
              {user.part === '새붉은 재앙' ? (
                <>
                  신도들이여, 신앙 아래에서 모두 평등하되 구원 받는 것에 귀천 없나니.<br/>
                  진정한 이상향의 도래라.
                </>
              ) : (
                <>
                  안녕, 친구들!<br/><br/>

                  이 메시지를 보고 있다면, 나는 아마 더 이상 너희 곁에 없겠네. 음, 슬픈 일이지만 너무 울지는 마. 나는 꽤 즐겁게 살다 갔으니까. 우리가 함께 지켜낸 도시, 우리가 나눈 농담들, 그리고 가끔 옥상에서 몰래 마시던 캔맥주의 맛까지. 나는 모든 순간을 사랑했어.<br/><br/>

                  우리가 함께했던 시간들을 기억해? 훈련장에서 흘렸던 땀방울, 힘겨운 임무를 마치고 나눠 마시던 시원한 음료수, 그리고 서로의 등을 지키며 나누었던 눈빛들. 그 모든 순간이 나에게는 기적이었고, 축복이었어. 너희와 함께여서 나는 비로소 론이라는 이름으로 완성될 수 있었지.<br/><br/>

                  테리, 내 귀여운 동생. 형을 잃은 아픔을 알기에, 누구보다 상실의 고통을 두려워한다는 걸 알아. 하지만 잊지 마. 이별은 끝이 아니라, 또 다른 형태의 만남이라는 걸. 네가 형을 기억하듯, 나를 기억해 준다면 우리는 영원히 함께하는 거야. 그러니 너무 자책하지 말고, 네 몫의 삶을 당당하게 살아줘. 네가 걷는 그 길이 곧 나의 길이 될 테니까. 가끔은 하늘을 보며 웃어주렴. 내가 거기서 너를 지켜보고 있을 테니.<br/><br/>

                  그리고 모르페우스. 친구.<br/><br/>

                  너는 늘 생각이 너무 많아. 가끔은 그냥 저질러 보는 것도 나쁘지 않은데 말이야. 네가 가진 그늘이 너를 삼키지 않도록, 가끔은 햇볕도 쬐고 그래. 네가 스스로를 괴물이라 생각하지 않았으면 좋겠어. 너는... 꽤, 아니, 아주 많이 괜찮은 녀석이니까. 너에게 지키고 싶은 게 생긴다면, 도망치지 말고 꼭 잡아. 내가 응원할게.<br/><br/>

                  우리 막내. 테리가 오면서 막내 딱지는 뗐지만, 나에겐 네가 여전히 막내 같아. 너는 언제나 삶을 예술이라 말했지. 나는 네가 그리는 세상이 잿빛이 아니라 네가 가진 그 다채로운 색으로 가득 차기를 바랐어. 너는 실패했다고 생각하겠지만 네가 멈춰 세운 그 찰나의 순간들이 얼마나 많은 생명을 구했는지 너는 모를 거야. 너는 충분히 영웅이었고, 지금도 그래. 가끔은 쉬어도 돼. 아무것도 하지 않아도, 너는 충분히 사랑받을 자격이 있는 사람이니까.<br/><br/>

                  야나기, 지금쯤 어디 슬럼가 도박장에서 주사위나 굴리고 있는 건 아니겠지? 만약 내 장례식 날에도 땡땡이치고 룰렛이나 돌리고 있다면, 내가 정말로 화낼 거야. 농담 아니야. 내가 이제 와서 하는 말이지만 다들 너 한량 같다고 걱정한 거 알아? 하지만 네가 울프독에 얼마나 큰 숨구멍이 되어주었는지 넌 모를 거야. 네가 부리는 그 얄미운 애교조차도 힘이 되더라고. 물론, 아주 가끔 말이야. 뭐 하나 꽂히면 앞뒤 안 재는 그 버릇, 고치라고는 안 할게. 그게 너니까. 다만, 베팅을 할 때는 네 목숨값 좀 높게 쳐줘. 내가 없다고 너무 심심해하지 말고. 사고 치면 뒷수습해 줄 사람이 이제 없잖아? 그러니 적당히 해, 적당히. 도박장 주인한테도 안부 전해주고.<br/><br/>

                  까칠한 친구. 나는 더 이상 네 곁에서 잔소리를 늘어놓을 수 없겠지. 아마 넌 속으로 이제야 좀 조용해졌네 하고 투덜거릴지도 모르겠다. 하지만 앙헬, 네가 아무리 귀찮아해도 나는 끝까지 너에게 잔소리를 남기고 가야겠어. 네 말이 맞을 수도 있어. 때로는 선의만으로는 해결할 수 없는 일들이 분명 존재하니까. 하지만 나는 네가 그 과정에서 스스로를 잃어버리지 않기를 바라. 부디 네가 선택한 그 길 끝에 파멸이 아닌 구원이 기다리고 있기를. 그리고 언젠가는, 네가 휘두르는 칼날이 너 자신을 베지 않고 오로지 너를 지키는 힘이 되기를. 마지막으로 부탁 하나만 할자. 테리와 화해하라는 말은 안 할게. 그건 너희 둘이 해결해야 할 숙제니까. 다만, 너무 늦지 않게 서로의 진심을 마주하길 바란다. 너희 둘은 생각보다 꽤 괜찮은 콤비였거든.<br/><br/>

                  우리 도재. 지금은 내가 보일까? 네 세상은 늘 주위에 누군가 있었으니, 내 목소리 하나쯤 더해진다고 해서 크게 달라질 건 없으려나. 도재야, 네가 가진 그 특별한 눈으로 가끔은 살아있는 사람들의 따뜻한 체온도 느껴봤으면 좋겠어. 네 곁에 있는 동료들은 유령이 아니잖아. 그들은 만질 수 있고, 네가 손을 내밀면 잡아줄 수 있는 진짜 사람들이야. 가끔은 이상한 장난만 치지 말고, 조금은 네 나이에 맞게 웃었으면 하는데. 네가 진심으로 웃을 때면 더 이상 네 주변이 춥지만은 않으니까.<br/><br/>

                  나에게 후회는 없어. 나는 마지막 순간까지 내가 믿는 정의를 위해, 그리고 너희가 살아갈 세상을 위해 싸웠을 테니까. 그것만으로도 내 삶은 충분히 아름다웠어.<br/><br/>

                  사랑한다, 나의 가족 울프독! 내 몫까지 신나게 살아줘. 이상 끝!
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

            {(() => {
              const TRIGGERS = new Set(["I", "D"]);
              const RON_AUTHOR = "론";

              // 1) 각 트리거(reply.id) -> 매칭된 론(reply) 저장
              const ronByTriggerId = new Map();

              let lastTriggerId = null;
              for (const r of post.replies) {
                if (TRIGGERS.has(r.author)) lastTriggerId = r.id;

                if (r.author === RON_AUTHOR) {
                  // ✅ 론을 "바로 직전 트리거"에 붙임
                  if (lastTriggerId != null && !ronByTriggerId.has(lastTriggerId)) {
                    ronByTriggerId.set(lastTriggerId, r);
                  }
                  // 론을 만났으면 다음 트리거 나올 때까지 lastTriggerId는 그대로 둬도 됨
                }
              }

              const rendered = [];

              for (const reply of post.replies) {
                // ✅ 원본 list의 론은 숨김(스킵)
                if (reply.author === RON_AUTHOR) continue;

                const isTrigger = TRIGGERS.has(reply.author);
                const matchedRon = isTrigger ? ronByTriggerId.get(reply.id) : null;
                const isOpen = !!openRonByTriggerReplyId[reply.id];

                // ✅ 트리거면 클릭 가능(커서는 기본 유지하려면 cursor-pointer 안 넣기)
                if (isTrigger) {
                  rendered.push(
                    <div
                      key={reply.id}
                      onClick={() => {
                        if (!matchedRon) return;
                        setOpenRonByTriggerReplyId((prev) => ({
                          ...prev,
                          [reply.id]: !prev[reply.id],
                        }));
                      }}
                      className=""
                    >
                      <ReplyRow reply={reply} />
                    </div>
                  );

                  if (matchedRon && isOpen) {
                    rendered.push(
                      <div key={`ron-${matchedRon.id}`} className="transition-all duration-200">
                        <ReplyRow reply={matchedRon} />
                      </div>
                    );
                  }
                  continue;
                }

                // ✅ 트리거 아닌 애들은 그냥 렌더
                rendered.push(<ReplyRow key={reply.id} reply={reply} />);
              }

              return rendered;
            })()}



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

function ReplyRow({ reply }) {
  return (
    <div className="flex items-start text-sm text-gray-600 border-t border-gray-200 py-2">
      <div className="pl-3 pr-1">⤷</div>
      <div>
        <div className="flex items-center gap-1">
          <img src={reply.image} alt={reply.author} className="w-3 h-3" />
          <span className="text-gray-500 text-xs"> {reply.author}</span>
        </div>
        <div className="text-left whitespace-pre-line"> {reply.text}</div>
      </div>
    </div>
  );
}
