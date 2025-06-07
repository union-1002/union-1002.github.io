import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';
import { useUser } from '@/shared/user';
import { useState, } from 'react';
import TeamIntroCard from './TeamIntroCard';

function TeamIntroPage() {
  const user = useUser();

  const [selectedCard, setSelectedCard] = useState(null);
  return (
    <MainLayout>
      <PageLayout
        title="부서 소개"
        sidebar={MENU_PROPS['유니온 소개']}
      >
        <TeamIntroCard
          name="헌터즈"
          name_en="Hunters"
          title="사자의 어금니로 숨통을 끊을 때까지."
          content={`\
            게이트 전담 부서 헌터즈는 유니온의 심장이나 다름없는 부서입니다.
            게이트에 뛰쳐들어 사활을 겨루고, 몬스터의 동향을 파악하거나, 미리 싹을 잘라두지요. 가장 많은 에스퍼가 이곳에 소속되어 있기도 합니다.
            모든 유니온 소속의 에스퍼는 헌터즈 소속을 기본적으로 깔고 가고 있으며, 게이트가 발생하여 지원 요청을 할 경우 현장에 동원할 의무가 있습니다.

            리더: E
            멤버: N, S
          `}
        />
        <TeamIntroCard
          name="이글아이"
          name_en="Eagle Eye"
          title="창공 아래의 먹이처럼."
          content={`\
            서포트 부서 이글아이는 유니온의 뇌를 담당하고 있습니다.
            헌터즈, 울프독, 언더 그라운드, 드라칼 할 것 없이 모두 이 부서의 서포트를 받지요.
            작게는 의료 지원, 크게는 게이트의 동향 등. 전반적인 서포팅을 맡으며, 비에스퍼 요원들이 소속될 수 있는 유일한 부서이기도 합니다.

            리더: H
            멤버: L
          `}
        />
        <TeamIntroCard
          name="울프독"
          name_en="Wolfdog"
          title="늑대의 사냥처럼, 사냥개의 집념으로."
          content={`\
            에스퍼 범죄를 전담으로 하는 특수 대응팀입니다.
            몬스터를 상대하는 헌터즈와 달리 에스퍼를 상대하고, 부상과 사망률도 상당히 높습니다.
            민원 처리부터 시작해 강력 범죄 수사, 대테러부대까지 모조리 맡고 있으며, 경찰과 연계하여 협업하기도 합니다.
            유니온에서 독특한 포지션을 맡고 있습니다. ‘대외적인 이미지 메이킹’ 부서로, ‘히어로’라는 이미지를 내세우며 이를 적극적으로 밀어주고 있습니다.
            덕분에 ‘컨셉’을 가진 요원들이 꽤 많습니다.

            리더: 공석(사망으로 인해 임시 리더를 돌아가며 맡고 있음)
            멤버: 테리, A, M, I, 비광
          `}
        />
        <TeamIntroCard
          name="드라칼"
          name_en="Dracal"
          title="보물을 간직한 용처럼."
          content={`\
            신규 각성 에스퍼를 관리하고, 전문적으로 양성/육성하며, 때로는 감시하는 부서입니다.
            비단 신규 각성자가 아니더라도 미등록 에스퍼는 이쪽을 반드시 거칩니다. 게임의 튜토리얼 전직관 느낌이라 생각하시면 편합니다. 네. 헬레나와 하인즈와 다크로드요.
            ‘감독관’, 혹은 ‘감시관’이라는 명칭 하에 활동하고 있으며, 신규 에스퍼와 오로라웨이에 위치한 고급 오피스텔에서 6개월 동안 동거하며, 보살피는 역할을 맡습니다.

            다만 이 6개월 동거가 지나치게 불편한 것도 있고, 여러 염려가 있기 때문에 시위도 많거니와 유니온에서 노조(……) 또한 존재하는 부서입니다.
            하물며 인력난도 제일 큰데… 에스퍼가 각성하면 6개월 동안의 기간이 폭주 위험이 제일 높을 때라, 다들 울며 겨자먹기로 일하고 있습니다.

            리더: J
            멤버: 미카엘
          `}
        />
        {user.isLoggedIn &&
          <TeamIntroCard
            name="언더 그라운드"
            name_en="Underground"
            title="뱀처럼 간교하게, 단숨에."
            content={`\
              최근 신설된 부서로, 유니온의 어두운 그림자에 암약하는 특수 팀입니다.
              암살, 첩보, 오염자의 처분, 시체 수습, 사형 집행, 울프독에 인계된 ‘특수 범죄자 교화’ 등. 온갖 더러운 일을 맡고 있지만, 글쎄요… 세상에는 가끔 그런 일이 필요하다 하더군요.
              살상에 특화되어 도저히 내세울 수 없는 에스퍼, 흉악 범죄자, 바깥으로 드러낼 수 없는 실험체 등이 이곳에 주로 발을 들입니다. 그리고 ‘집행관’이라는 존재가 페어로 함께 하며 일거수일투족을 감시하고, 함께 하지요.
              공식적으로는 없는 부서입니다. 현실로 따지자면 007 내지 킹스맨과 같이요.

              리더: R
              멤버: X, Y(???: 꺼내주세요……), IF A
            `}
          />
        }
        <div
          onClick={() =>
            setSelectedCard((prev) =>
              prev === "유령처럼." ? null : "유령처럼."
            )
          }
          className={`transition-opacity duration-300 ${
            selectedCard === "유령처럼." ? "opacity-100" : "opacity-0 hover:opacity-100"
          }`}
        >
        <TeamIntroCard
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          name="?"
          name_en="?"
          title="유령처럼."
          content={`\
            괴담 속에 존재하듯, 기담으로 떠돌듯.
            소문이자 현존하는지 의문스러운 부서가 있습니다.

            무엇일까요?
          `}
        />
        </div>
      </PageLayout>
    </MainLayout>
  );
}

export default TeamIntroPage;
