import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';

function HelloPage() {
  return (
    <MainLayout>
      <PageLayout
        title="총장 인사말"
        sidebar={MENU_PROPS['유니온 소개']}
      >
        <p className="text-base text-[#404040] leading-relaxed">
          <span className="text-3xl block text-left font-book font-bold">일상을 더 평온하게.</span><br/><br/>
          존경하는 시민 여러분, 그리고 유니온의 이름 아래 헌신하는 모든 이들에게 인사를 전합니다.<br />
          안녕하십니까, 유니온 총장 파비앙 브누아입니다.<br /><br />

          게이트에서 도시를 지키고 새로움을 더하고자 노력하는 유니온 홈페이지 방문을 진심으로 환영합니다.<br /><br />

          5년 전, 우리는 상상조차 하지 못한 위협 앞에 섰습니다.<br />
          하늘은 갈라졌고, 다른 차원의 존재들이 이 땅을 침범했습니다.<br />
          세상은 무너지는 듯 보였지만, 그 속에서 새로운 가능성이 피어났습니다.<br />
          게이트의 에너지를 품고 태어난 이들, 우리는 그들을 ‘에스퍼’라 부릅니다.<br /><br />

          에스퍼들은 그 누구보다 먼저 한계를 넘어섰고, 위험 앞에서 물러서지 않았습니다.<br />
          그들이 없었다면, 오늘의 우리는 없었을 것입니다.<br /><br />

          유니온은 이러한 에스퍼들을 보호하고, 그들의 능력을 공공의 선을 위해 사용할 수 있도록 지원하며,<br />
          동시에 시민 여러분의 일상이 평온하게 유지되어 ‘공존’의 가치를 실현하고자 최선의 노력을 다하고 있습니다.<br /><br />

          게이트의 위협 앞에 선 ‘헌터즈’와<br />
          시민의 목소리에 귀 기울이는 소통 공감행정, 치안을 맡는 ‘울프독’<br />              
          그리고 그 모두를 지원하는 ‘이글아이’<br />
          마지막으로, 이 모든 요원을 양성하는 ‘드라칼’을 통해.<br />
          누구나 안전한 생활 환경을 조성하고, 촘촘하고 따뜻한 적극행정 실천으로 연합국을 더 안전하게 만들도록 실천하겠습니다.<br /><br />

          우리는 여전히 불완전한 시대를 살고 있습니다.<br />
          하지만 하나의 믿음은 분명합니다.<br />
          함께라면 우리는 어떤 미래도 마주할 수 있습니다.<br /><br />

          유니온은 앞으로도 ‘능력’을 ‘책임’으로 바꾸며,<br />
          초월적 존재와 일반 시민이 공존하는 진정한 연합의 미래를 만들어가겠습니다.<br /><br />

          늘 시민의 곁에서 힘이 되어드리는 든든한 총장이 될 것을 다시 한 번 약속드리며,<br />
          건네주시는 의견들은 소중히 마음에 담아 사랑받는 유니온을 만들어 가는데 큰 밑거름으로 삼겠습니다.<br /><br />

          감사합니다.<br /><br />

          유니온 총장<br />
          <span className="font-son text-3xl">파비앙 브누아</span>

        </p>
      </PageLayout>
    </MainLayout>
  );
}

export default HelloPage;
