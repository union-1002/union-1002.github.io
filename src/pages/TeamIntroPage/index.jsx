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

function TeamIntroPage() {
  const [selected, setSelected] = useState(null);
  const [activeMenu, setActiveMenu] = useState('부서 소개'); // 현재 선택된 메뉴
  
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
                      ? 'border-l-4 border-[#456EBF] text-[#456EBF] rounded-md'
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
            <div className="w-full text-left mt-8 mb-20">
              <h1 className="text-3xl font-bold text-[#435373] mb-2">
                부서 소개
              </h1>
              <div className="w-full h-0.5 bg-[#435373]"></div>
            </div>
          {/* 본문 내용 */}
            <div className="w-full text-left px-2">
              {/* 카드 하나 */}
              <div className="flex flex-col lg:flex-row w-full space-y-4 lg:space-y-0 lg:space-x-8 border-[0.5px] px-6 lg:px-2 py-10 mb-2">
                
                {/* 좌측: 제목+가로줄 */}
                <div className="flex flex-col w-full lg:w-1/4">
                  <h2 className="text-xl font-bold text-center mb-2">
                    헌터즈
                  </h2>
                  <div className="w-30 h-[0.5px] bg-[#435373] mx-auto mb-2"></div>
                  <h2 className="text-sm text-center">
                    Hunters
                  </h2>
                </div>

                {/* 우측: 내용 */}
                <div className="w-full lg:w-2/3 text-sm leading-relaxed text-center lg:text-left text-gray-700 lg:flex lg:items-center">

                  ─ 사자의 어금니로 숨통을 끊을 때까지.<br/><br/>

                  게이트 전담 부서 헌터즈는 유니온의 심장이나 다름없는 부서입니다.<br/>
                  게이트에 뛰쳐들어 사활을 겨루고, 몬스터의 동향을 파악하거나, 미리 싹을 잘라두지요. 가장 많은 에스퍼가 이곳에 소속되어 있기도 합니다.<br/>
                  모든 유니온 소속의 에스퍼는 헌터즈 소속을 기본적으로 깔고 가고 있으며, 게이트가 발생하여 지원 요청을 할 경우 현장에 동원할 의무가 있습니다.<br/><br/>

                  리더: E<br/>
                  멤버: N, S
                
                </div>
              </div>

              <div className="flex flex-col lg:flex-row w-full space-y-4 lg:space-y-0 lg:space-x-8 border-[0.5px] px-6 lg:px-2 py-10">
                
                {/* 좌측: 제목+가로줄 */}
                <div className="flex flex-col w-full lg:w-1/4">
                  <h2 className="text-xl font-bold text-center mb-2">
                  이글아이
                  </h2>
                  <div className="w-30 h-[0.5px] bg-[#435373] mx-auto mb-2"></div>
                  <h2 className="text-sm text-center">
                    Hunters
                  </h2>
                </div>

                {/* 우측: 내용 */}
                <div className="w-full lg:w-2/3 text-sm leading-relaxed text-center lg:text-left text-gray-700 lg:flex lg:items-center">

                  ─ 창공 아래의 먹이처럼.<br/><br/>

                  서포트 부서 이글아이는 유니온의 뇌를 담당하고 있습니다.<br/>
                  헌터즈, 울프독, 언더 그라운드, 드라칼 할 것 없이 모두 이 부서의 서포트를 받지요.<br/>
                  작게는 의료 지원, 크게는 게이트의 동향 등. 전반적인 서포팅을 맡으며, 비에스퍼 요원들이 소속될 수 있는 유일한 부서이기도 합니다.<br/><br/>

                  리더: H<br/>
                  멤버: L                
                </div>
              </div>
            </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default TeamIntroPage;
