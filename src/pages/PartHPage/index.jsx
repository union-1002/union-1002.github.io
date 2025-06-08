import MainLayout from '@/shared/MainLayout';
import { Link } from 'react-router';
import { useUser } from '@/shared/user';

function PartHPage() {
  const user = useUser();

  return (
    <MainLayout>
      {(user.isLoggedIn == false || (user.isAdmin == false && user.part != "헌터즈")) && (
        <div className='mt-10 p-20 text-center bg-[#fff9e6]'>헌터즈 부서 이동 문의는 N에게 -E-</div>
      )}
      {(user.isLoggedIn && (user.isAdmin || user.part === "헌터즈")) && (
        <div>
          <div className="relative w-full mt-10 mb-10">
            {/* 배경 박스 */}
            <div className="bg-[#fff9e6] py-8 text-center z-0 relative">
            </div>

            {/* 로고 - 배경 위에 겹쳐지게 */}
            <img
              src="/images/hunters1.png"
              alt="헌터즈 로고"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-30 h-30 z-10"
            />
          </div>

          <div className="max-w-3xl mx-auto px-2 py-8 space-y-6 text-3xl">
            <div className='font-bold text-[#1369a3]'>임무 목록 - 게이트</div>
            {/* 회색 박스 (바깥 배경) */}
            <div className="bg-[#f9f9f9] p-2 rounded w-full max-w-3xl mx-auto">
              
              {/* 흰색 콘텐츠 박스 + 파란 테두리 */}
              <div className="border-1 border-[#1369a3] shadow flex flex-col lg:flex-row">
                
                {/* 왼쪽 파란색 박스 */}
                <div className="lg:w-25 bg-[#1369a3] flex items-center justify-center text-white text-center px-6 py-2 text-lg font-bold break-keep">
                  S급 게이트
                </div>

                {/* 오른쪽 콘텐츠 */}
                <div className="flex-1 px-6 py-3 flex flex-col gap-2">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    {/* 제목 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        [긴급] 오로라웨이 B-36 S급 게이트 발생
                      </h2>
                      <p className="text-sm">
                        오로라웨이 B-36 S급 게이트 발생 - 즉시 봉쇄 요망
                      </p>
                    </div>

                    {/* 오른쪽 상단 "임무 수행" */}
                      <div className="w-fit px-3 py-0.5 mt-1 text-sm font-semibold text-[#1369a3] border-1 border-[#1369a3]">
                        임무 수행
                      </div>
                  </div>

                  {/* 댓글 */}
                  <div className="mt-4 bg-white rounded text-sm">
                    <div className="flex py-2 items-start">
                      <span className="text-[#ffc801] font-bold w-10 text-center shrink-0">1등!</span>
                      <span className="font-semibold mr-2 w-10 text-center shrink-0">N</span>
                      <span className="text-gray-700">아이씨.. 내가 가야하잖아</span>
                    </div>
                    <div className="flex py-2 items-start">
                      <span className="text-[#1369a3] font-bold w-10 text-center shrink-0">2등!</span>
                      <span className="font-semibold mr-2 w-10 text-center shrink-0">오르티</span>
                      <div className="text-gray-700">
                        1빠 ㄱ
                      </div>
                    </div>
                    <div className="flex pt-1 pb-2 items-start">
                      <span className="font-bold w-10 text-center shrink-0">⤷</span>
                      <span className="font-semibold mr-2 w-10 text-center shrink-0">오르티</span>
                      <div className="text-gray-700">
                        노ㅓ쳣노라
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>



            <div className="bg-[#f9f9f9] p-2 rounded w-full max-w-3xl mx-auto">
              
              {/* 흰색 콘텐츠 박스 + 파란 테두리 */}
              <div className="border-1 border-[#808080] shadow flex flex-col lg:flex-row">
                
                {/* 왼쪽 파란색 박스 */}
                <div className="lg:w-25 bg-[#808080] flex items-center justify-center text-white text-center px-6 py-2 text-lg font-bold break-keep">
                  A급 게이트
                </div>

                {/* 오른쪽 콘텐츠 */}
                <div className="flex-1 px-6 py-3 flex flex-col gap-2">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    {/* 제목 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        레인웨이 외곽 R-94 A급 게이트 발생
                      </h2>
                      <p className="text-sm">
                        게이트 클로징 완료
                      </p>
                    </div>

                    {/* 오른쪽 상단 "임무 수행" */}
                      <div className="w-fit px-3 py-0.5 mt-1 text-sm font-semibold text-[#808080] border-1 border-[#808080]">
                        임무 완료
                      </div>
                  </div>

                  {/* 댓글 */}
                  <div className="mt-4 bg-white rounded text-sm">
                    <div className="flex py-2 items-start">
                      <span className="text-[#ffc801] font-bold w-10 text-center shrink-0">1등!</span>
                      <span className="font-semibold mr-2 w-10 text-center shrink-0">S</span>
                      <span className="text-gray-700">수고하셨습니다~!~!</span>
                    </div>
                    <div className="flex py-2 items-start">
                      <span className="text-[#1369a3] font-bold w-10 text-center shrink-0">2등!</span>
                      <span className="font-semibold mr-2 w-10 text-center shrink-0">N</span>
                      <div className="text-gray-700">
                        개빨리닫음ㅋㅋ
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className='font-bold text-[#ffc801] mt-10'>임무 목록 - 기타</div>
            <div className="bg-[#f9f9f9] p-2 rounded w-full max-w-3xl mx-auto">
              
              {/* 흰색 콘텐츠 박스 + 파란 테두리 */}
              <div className="border-1 border-[#ffc801] shadow flex flex-col lg:flex-row">
                
                {/* 왼쪽 파란색 박스 */}
                <div className="lg:w-25 bg-[#ffc801] flex items-center justify-center text-white text-center px-6 py-2 text-lg font-bold break-keep">
                  조사
                </div>

                {/* 오른쪽 콘텐츠 */}
                <div className="flex-1 px-6 py-3 flex flex-col gap-2">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    {/* 제목 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        게이트 잔류 에너지 회수
                      </h2>
                      <p className="text-sm">
                        레인웨이 E-12 폐쇄된 A급 게이트 인근 차원 에너지 채집
                      </p>
                    </div>

                    {/* 오른쪽 상단 "임무 수행" */}
                      <div className="w-fit px-3 py-0.5 mt-1 text-sm font-semibold text-[#ffc801] border-1 border-[#ffc801]">
                        임무 수행
                      </div>
                  </div>

                  {/* 댓글 */}
                  <div className="mt-4 bg-white rounded text-sm">
                    <div className="flex py-2 items-start">
                      <span className="text-[#ffc801] font-bold w-10 text-center shrink-0">1등!</span>
                      <span className="font-semibold mr-2 w-10 text-center shrink-0">E</span>
                      <span className="text-gray-700">이 건은 오르티가 맡도록 하지.</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>


            <div className="bg-[#f9f9f9] p-2 rounded w-full max-w-3xl mx-auto">
              
              {/* 흰색 콘텐츠 박스 + 파란 테두리 */}
              <div className="border-1 border-[#ffc801] shadow flex flex-col lg:flex-row">
                
                {/* 왼쪽 파란색 박스 */}
                <div className="lg:w-25 bg-[#ffc801] flex items-center justify-center text-white text-center px-6 py-2 text-lg font-bold break-keep">
                  순찰
                </div>

                {/* 오른쪽 콘텐츠 */}
                <div className="flex-1 px-6 py-3 flex flex-col gap-2">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    {/* 제목 */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        데스 사이드 게이트 인근 순찰
                      </h2>
                      <p className="text-sm">
                        데스 사이드 잔류 게이트 순찰
                      </p>
                    </div>

                    {/* 오른쪽 상단 "임무 수행" */}
                      <div className="w-fit px-3 py-0.5 mt-1 text-sm font-semibold text-[#ffc801] border-1 border-[#ffc801]">
                        임무 수행
                      </div>
                  </div>

                  {/* 댓글 */}
                  <div className="mt-4 bg-white rounded text-sm">
                    <div className="flex py-2 items-start">
                      <span className="text-[#ffc801] font-bold w-10 text-center shrink-0">1등!</span>
                      <span className="font-semibold mr-2 w-10 text-center shrink-0">E</span>
                      <span className="text-gray-700">항상 조심하도록.</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>





          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default PartHPage;
