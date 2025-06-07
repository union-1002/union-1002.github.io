import MainLayout from '@/shared/MainLayout';
import { Link } from 'react-router';
import { useUser } from '@/shared/user';

function PartEPage() {
  const user = useUser();

  return (
    <MainLayout>
      {(user.isLoggedIn == false || (user.isAdmin == false && user.part != "이글아이")) && (
        <div className='mt-10 p-20 text-center bg-[#f2ebfd]'>염탐할 생각 하지 마라 인마</div>
      )}
      {(user.isLoggedIn && (user.isAdmin || user.part === "이글아이")) && (
        <div>

          <div className="relative w-full mt-10 mb-10">
            {/* 배경 박스 */}
            <div className="bg-[#f2ebfd] py-8 text-center z-0 relative">
            </div>

            {/* 로고 - 배경 위에 겹쳐지게 */}
            <img
              src="/images/eagleeye1.png"
              alt="이글아이 로고"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-30 h-30 z-10"
            />
          </div>

          <div className="max-w-3xl mx-auto px-2 py-8 space-y-8">

            <MissionCard
              title="[IT본부] 포털 6월 정기 업데이트 빌드 배포"
              subtitle="포털의 6월 정기 업데이트 빌드를 금일 배포할 예정입니다."
              status="스프린트 진행중"
            >
              <div className="text-sm border-gray-400">
                <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                  <div className="font-semibold text-center">L</div>
                  <div>IT 본부 밤새웠다구요...?</div>
                </div>
                <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                  <div className="font-semibold text-center">H</div>
                  <div>오늘 안에 배포되는 거 맞냐?</div>
                </div>
                <div className="grid grid-cols-[4rem_1fr] py-1">
                  <div className="font-semibold text-center">IT본부</div>
                  <div>네. <span className="opacity-0 hover:opacity-100">ㅅㅂ 그만 갈아라</span></div>
                </div>
              </div>
            </MissionCard>

            <MissionCard
              title="[게이트 상황실] 작전 구역 위성 스캔 및 분석"
              subtitle="오로라웨이 B-36 S급 게이트 전술 지원"
              status="임무 진행중"
            >
              <div className="text-sm border-gray-400">
                <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                  <div className="font-semibold text-center">상황실</div>
                  <div>현재 요원 투입 상태입니다.</div>
                </div>
                <div className="grid grid-cols-[4rem_1fr] py-1">
                  <div className="font-semibold text-center">L</div>
                  <div>구덩이 조심하세요...💗</div>
                </div>
              </div>  
            </MissionCard>

            <MissionCard
              title="[연구본부] S급 몬스터 분석 시사점 보고"
              subtitle="임원 대응 보고 자료입니다."
              status="임무 진행중"
            >
                <div className="text-sm border-gray-400">
                  <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                    <div className="font-semibold text-center">H</div>
                    <div>8p 표 옆에 그래프도 같이 그려주고, 23p에 색상 좀더 강조하는 게 좋겠다.</div>
                  </div>
                  <div className="grid grid-cols-[4rem_1fr] py-1">
                    <div className="font-semibold text-center">H</div>
                    <div>고생했고.</div>
                  </div>
                </div>  
            </MissionCard>

          </div>
        </div>
      )}

    </MainLayout>
  );
}

export default PartEPage;



function scale(size, ratio) {
  let [_, v, u] = size.match(/([\d.]+)(\w+)/);
  return (Number(v) * ratio) + u;
};

function MissionCard({ className, title, subtitle, status, children }) {
  const headlineHeight = '1rem';
  const cardCornerTL = '5rem';
  const cardCornerTR = '1rem';
  const storkeWidth = '0.2rem';
  const storkeWidth2 = scale(storkeWidth, 0.5);

  return (
    <div className={className}>
      <div className="relative">
        <div data-role="decoration-headline-1" className="relative -ml-4" style={{ marginBottom: `calc(${headlineHeight} - ${cardCornerTL})` }}>
          <div className="relative" style={{ height: cardCornerTL }}>
            <div
              className="absolute inset-0 bg-[#7640ee]"
              style={{ clipPath: `polygon(${cardCornerTL} 0%, calc(100% - ${cardCornerTR}) 0%, calc(100% - ${cardCornerTR}) 100%, 100% 100%, 0% 100%, 0% ${cardCornerTL})` }}
            />
            <div
              className="relative bg-white py-6 pl-20 pr-6 h-full"
              style={{ clipPath: `polygon(calc(${cardCornerTL} + ${storkeWidth2}) calc(0% + ${storkeWidth}), 100% calc(0% + ${storkeWidth}), 100% 0%, 100% 100%, 0% 100%, calc(0% + ${storkeWidth}) calc(${cardCornerTL} + ${storkeWidth2}))` }}
            />
          </div>
        </div>

        <div data-role="decoration-headline-2" className="relative -ml-2" style={{ marginBottom: `calc(${headlineHeight} - ${cardCornerTL})` }}>
          <div className="relative" style={{ height: cardCornerTL }}>
            <div
              className="absolute inset-0 bg-[#7640ee]"
              style={{ clipPath: `polygon(${cardCornerTL} 0%, calc(100% - ${cardCornerTR}) 0%, calc(100% - ${cardCornerTR}) 100%, 100% 100%, 0% 100%, 0% ${cardCornerTL})` }}
            />
            <div
              className="relative bg-white py-6 pl-20 pr-6 h-full"
              style={{ clipPath: `polygon(calc(${cardCornerTL} + ${storkeWidth2}) calc(0% + ${storkeWidth}), 100% calc(0% + ${storkeWidth}), 100% 0%, 100% 100%, 0% 100%, calc(0% + ${storkeWidth}) calc(${cardCornerTL} + ${storkeWidth2}))` }}
            />
          </div>
        </div>

        <div data-role="card" className="pl-0">
          <div data-role="header" className="relative">
            <div
              className="absolute inset-0 bg-[#7640ee]"
              style={{
                clipPath: `polygon(${cardCornerTL} 0%, calc(100% - ${cardCornerTR}) 0%, 100% ${cardCornerTR}, 100% 100%, 0% 100%, 0% ${cardCornerTL})`,
              }}
            />
            <div
              className="relative bg-[#f2ebfd] py-6 pl-16 pr-4"
              style={{
                clipPath: `polygon(calc(${cardCornerTL} + ${storkeWidth2}) calc(0% + ${storkeWidth}), calc(100% - ${cardCornerTR} - ${storkeWidth2}) calc(0% + ${storkeWidth}), calc(100% - ${storkeWidth}) calc(${cardCornerTR} + ${storkeWidth2}), calc(100% - ${storkeWidth}) calc(100% - ${storkeWidth}), calc(0% + ${storkeWidth}) calc(100% - ${storkeWidth}), calc(0% + ${storkeWidth}) calc(${cardCornerTL} + ${storkeWidth2}))`,
              }}
            >
              <div className="text-center break-keep">
                <div className="text-xl font-bold">{title}</div>
                <div className="text-sm mt-1">{subtitle}</div>
              </div>
            </div>
          </div>
          <div data-role="body" className="min-h-36 bg-white border-l-3 border-r-3 border-b-3 py-6 px-4 border-[#7640ee]">
            {children}
          </div>
          <div data-role="footer" className='flex justify-end'>
            <div
              className="w-fit bg-[#7640ee] font-semibold text-white pl-11 pr-10 py-1"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 1rem 100%)',
              }}
            >
              {status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
