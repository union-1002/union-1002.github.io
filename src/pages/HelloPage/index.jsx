import { useState } from 'react';
import { Link } from 'react-router';
import MainLayout from '@/shared/MainLayout';

const subMenus = ['총장 인사말', '연혁', '부서 소개', '직원 소개'];

const menuLinks = {
  "총장 인사말": "/hello",
  "연혁": "/timeline",
  "부서 소개": "/teamintro",
  "직원 소개": "/memberintro",
};


function HelloPage() {
  const [selected, setSelected] = useState(null);
  const [activeMenu, setActiveMenu] = useState('총장 인사말'); // 현재 선택된 메뉴
  
  return (
    <MainLayout>
      <div className="flex max-w-7xl mx-auto px-4 lg:px-8 mt-8 space-x-8 items-start">
        
        {/* 좌측 네비게이션 */}
        <div className="hidden lg:flex flex-col w-60 rounded-md border-[0.5px] border-[#435373]">

          {/* 대제목 */}
          <div className=" bg-[#435373] h-40 flex items-center justify-center">
            <h2 className="text-[#ffffff] font-bold text-lg text-center">
              유니온 소개
            </h2>
          </div>

          {/* 소메뉴 */}
          <div className="flex flex-col divide-y divide-gray-300">
            {subMenus.map((menu, idx) => (
              <Link
                key={idx}
                to={menuLinks[menu] || "/"}
                onClick={() => setActiveMenu(menu)}
                className={`text-sm text-left font-semibold px-4 py-4 transition 
                  ${
                    activeMenu === menu
                      ? 'border-l-4 border-[#456EBF] text-[#456EBF]'
                      : 'text-[#404040] hover:text-[#456EBF]'
                  }`}
              >
                {menu}
              </Link>
            ))}
          </div>

        </div>


        {/* 본문 */}
        <div className="flex-1 flex flex-col items-center space-y-8 pb-10">

          {/* 제목 */}
            <div className="w-full text-left mt-8 mb-30">
              <h1 className="text-3xl font-bold text-[#435373] mb-2">
                총장 인사말
              </h1>
              <div className="w-full h-0.5 bg-[#435373]"></div>
            </div>
          {/* 본문 내용 */}
            <div className="w-full text-center">
              <p className="text-base text-[#404040] leading-relaxed">
                <span className="font-son text-3xl">보다 위로, 우리로 하여금.</span><br/><br/><br/><br/>
                존경하는 시민 여러분, 그리고 유니온의 이름 아래 헌신하는 모든 이들에게 인사를 전합니다.<br />
                유니온 총장 파비앙 브누아입니다.<br /><br />

                10년 전, 우리는 상상조차 하지 못한 위협 앞에 섰습니다.<br />
                하늘은 갈라졌고, 다른 차원의 존재들이 이 땅을 침범했습니다.<br />
                세상은 무너지는 듯 보였지만, 그 속에서 새로운 가능성이 피어났습니다.<br />
                게이트의 에너지를 품고 태어난 이들, 우리는 그들을 ‘에스퍼’라 부릅니다.<br /><br />

                처음엔 경외와 두려움이 교차했습니다.<br />
                그러나 에스퍼들은 그 누구보다 먼저 한계를 넘어섰고, 위험 앞에서 물러서지 않았습니다.<br />
                그들이 없었다면, 오늘의 우리는 없었을 것입니다.<br /><br />

                유니온은 이러한 에스퍼들을 보호하고, 그들의 능력을 공공의 선을 위해 사용할 수 있도록 지원하며,<br />
                동시에 시민 여러분의 일상이 평온하게 유지되도록 모든 역량을 다하고 있습니다.<br /><br />

                게이트의 위협은 여전히 계속되고 있습니다.<br />
                그 앞에 선 ‘헌터즈’는 목숨을 걸고 미지의 차원을 봉인하며,<br />
                ‘울프독’은 법을 거스르는 능력자들을 단죄합니다.<br />
                그리고 그 모두를 지원하는 ‘이글아이’까지 — 유니온은 결코 혼자가 아닙니다.<br /><br />

                우리는 여전히 불완전한 시대를 살고 있습니다.<br />
                하지만 하나의 믿음은 분명합니다.<br />
                함께라면 우리는 어떤 미래도 마주할 수 있습니다.<br /><br />

                유니온은 앞으로도 ‘능력’을 ‘책임’으로 바꾸며,<br />
                초월적 존재와 일반 시민이 공존하는 진정한 연합의 미래를 만들어가겠습니다.<br /><br />

                감사합니다.<br /><br />

                유니온 총장<br />
                <span className="font-son text-2xl">파비앙 브누아</span>

              </p>
            </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default HelloPage;
