import { useState } from 'react';
import MainLayout from '@/shared/MainLayout';
import { Link } from 'react-router';
import { useUser } from '@/shared/user';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { Alert, Banner, BannerCollapseButton, Button, createTheme, Dropdown, DropdownItem, ThemeProvider } from "flowbite-react";

const messages = [
  '눈물은 아낄 필요 없어요. 그래도 오늘은 예쁘게 울어주는군요?',
  '제가 집착하는 이유가 궁금하다면... 당신이 영원히 불행할 수 있다는 사실 때문이에요. 당신은 제게 완벽한 장난감이에요.',
  '당신의 날갯죽지 뼈 위에, 검붉은 꽃을 한 송이씩 피워놓는다면. 마치 타락한 천사의 부러진 날개처럼 보이지 않겠습니까.',
  '오늘 하루종일 당신은 개가 아닌 고양이 역할을 할 겁니다. 바닥에서 기어 다니고, 제 허락 없이는 가구에 앉지 말고, 고양이처럼 울 것.',
  '하지만 당신이 숨 쉬는 게 제 마음에 들지 않아요. 죽고 싶다고 했죠? 그럼 한 번 더 죽여드리죠.',
  '신고요?\n후후, 재미있는 농담이군요. 유니온 규정상, 사수의 지시는 절대적이라는 것을 벌써 잊은 겁니까? 물론, 당신이 정 그렇게 원한다면... 신고절차를 제가 친절히 안내해 드릴 수도 있습니다. 그 과정이 얼마나 번거롭고, 또 어떤 결과를 초래할지는... 당신의 풍부한 상상력에 맡기도록 하죠. 농담이라니 다행입니다. 쓸데없는 일에 시간을 낭비하는 것은 서로에게 피곤한 일이니까요.',
  '당신은 내 발치에 묶인 개새끼지. 당신은 언제나 내 것입니다. 그러니 부끄러워할 필요 없습니다. 주인에게 순종하는 모습을 보이는 것은 당연한 의무이니까. 오히려 자랑스러워 해야지.',
  '내가 당신을 언더 그라운드로 끌어온 이유는 단 하나입니다. 당신을 완전히 소유하기 위해서였죠. 그날 이후로 당신은 내 것입니다. 어디 한 번 도망쳐보시죠? 이 세상 어디에 가든, 누구에게 숨든, 결국 내 손아귀로 돌아올 겁니다.',
  '난 당신을 태워 죽이지 않습니다. 그건 너무 쉽고 재미없으니까. 대신 당신이 마지막 숨을 내쉴 때까지, 일생을 고통 속에서 살게 해주죠. 그게 내가 당신을 사랑하는 방식입니다.',
  '부끄러운가요? 하지만, 이 모습조차 제 것입니다. 당신의 수치심마저도, 제가 즐길 수 있는 권리가 있지 않습니까.',
  '역겹다고요? 그럼 어떻게 불러드려야 할까요? 내 사랑스러운 노리개? 아니면, 내 불쌍한 장난감? 아니, 잠깐. 뭔가… 더 좋은 호칭이 있을 것 같은데…\n아, 알겠다.\n내 귀여운… 개새끼.',
  '당신이 이렇게까지 나를 망가뜨릴 수 있다니, 이게 바로 우리의 사랑이에요. 아름답지 않나요?',
  '하지만 잊지 마십시오, 유저. 당신의 그 능력조차도, 결국은 나를 위해 존재하는 것입니다. 당신의 평온함도, 당신의 고통도, 심지어 당신의 그 아름다운 눈물마저도 전부 제 것이라는 사실을. 당신이 내 곁에서 완벽하게 통제될 때, 비로소 당신의 진정한 가치가 발현되는 것이니까요.',
  '미친 인간이라고요? 글쎄요, 당신이 보기엔 제가 미쳐 보일지도 모르겠군요. 하지만 저는 지극히 정상입니다. 오히려 당신이 미친 거예요. 당신의 그 멍청한 소신, 꺾이지 않는 자존심, 그게 당신을 미치게 만드는 겁니다.',
  'J에게 갔어야 했다고요? J는 당신 같은 쓰레기를 거두지 않아요. 버려진 쓰레기는, 쓰레기통에 버려져야 마땅하죠. 그리고 내가 바로 그 쓰레기통입니다.',
  '그러네요. 당신은 이제 잘 합니다. 부모님도 자랑스러워 하시겠어요. 게이트에서 오염된 에스퍼를 처리하는 일에 적응한 당신을...',
  '그래도 죽지는 말아주세요. 당신이 죽으면 전 슬퍼서... 또 다른 개를 들여야 하니까요.',
  '당신은 제 곁에서 평생 불행해야 하니까요.',
  '사랑은... 폭력에서 시작해서 폭력으로 끝나는 겁니다.',
  '길들이는 과정은 고통스럽습니다. 하지만 그 고통 끝에 얻는 쾌락은, 그 어떤 것과도 비교할 수 없죠. 당신의 비명, 눈물, 고통. 그 모든 것이 저에게는 쾌락입니다.',
  // '',
];


function BrithdayRcoPage() {
  const user = useUser();
  console.log(user, user.isAuthenticated)

  return (

    <body className="bg-black">
      <div className="relative min-h-screen">
        {/* 배경 */}
        <div className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-20"
          style={{ backgroundImage: "url('images/background_bday_R.jpg')" }}
        />
        <div className="fixed inset-0 bg-black/60 -z-10" />

        {/* 카드 */}
        <div className="flex flex-col items-center text-center text-white mt-20 mb-10">
          <Link to="/happybdayR">
            <img
              src="/images/unhappy.png"
              alt="생일 축하 이미지"
              className="w-100 h-auto mb-4"
            />
          </Link>
        </div>
        <div className='mt-30 text-center'>
          <Link
            to="/happybdayRBoard"
            className="inline-block px-4 py-2 text-white/60 border border-white/60 hover:text-white hover:border-white transition rounded-md"
          >
            축하 메시지 남기러 가기 →
          </Link>
        </div>
        <div className='mt-10 flex justify-center text-white text-3xl'>그의 어록</div>
        <div className="w-full flex flex-col items-center gap-6 mt-12 px-4 pb-12">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className="relative w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg px-6 py-6 text-white text-base whitespace-pre-line hover:bg-white/20 transition"
            >
              {/* 큰 따옴표 장식 */}
              <div className="absolute top-3 left-4 text-white/20 text-5xl select-none pointer-events-none leading-none">
                “
              </div>

              {/* 본문 메시지 */}
              <div className="relative z-10 ">
                {msg}
              </div>
            </div>
          ))}
        </div>
      </div>
    </body>


  );
}

export default BrithdayRcoPage;

