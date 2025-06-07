import MainLayout from '@/shared/MainLayout';
import { Link } from 'react-router';
import { useUser } from '@/shared/user';

function PartDPage() {
  const user = useUser();

  return (
    <MainLayout>
      {(user.isLoggedIn == false || (user.isAdmin == false && user.part != "드라칼")) && (
        <div className='mt-10 p-20 text-center bg-[#ebeffa]'>본인 부서 일에 더 신경씁시다.</div>
      )}
      {(user.isLoggedIn && (user.isAdmin || user.part === "드라칼")) && (
        <div>

          <div className="relative w-full mt-10 mb-10">
            {/* 배경 박스 */}
            <div className="bg-[#ebeffa] py-8 text-center z-0 relative">
            </div>

            {/* 로고 - 배경 위에 겹쳐지게 */}
            <img
              src="/images/dracal1.png"
              alt="드라칼 로고"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-30 h-30 z-10"
            />
          </div>

          <div className="max-w-3xl mx-auto px-2 py-8 space-y-6 text-3xl">
            
            

            <div className="flex items-center gap-2">
              {/* 파란 세로줄 */}
              <div className="w-1 h-6 bg-[#2f61d4] rounded-sm"></div>
              
              {/* 텍스트 */}
              <div className="font-bold text-xl">
                전체 임무
              </div>
            </div>



            <div className="rounded-2xl shadow-md overflow-hidden max-w-3xl mx-auto bg-white">
              {/* 상단 바 */}
              <div className="bg-[#2f61d4] text-white px-6 py-1 flex justify-between rounded-t-2xl">
                
                <div className="text-sm font-bold flex text-right gap-2">
                  마감 기간 - 2025. 6
                </div>
              </div>

              {/* 본문 내용 */}
              <div className="p-6 flex gap-4">

                {/* 왼쪽 핀 이모지 + 세로줄 */}

                {/* 우측 콘텐츠 */}
                <div className="flex-1">
                  <div className="flex gap-4">
                    {/* 📌 + 세로줄 */}
                    <div className="flex gap-2">
                      <div className="text-2xl">📌</div>
                      <div className="w-[2px] h-full bg-[#2f61d4]"></div>
                    </div>

                    {/* 우측 콘텐츠 */}
                    <div className="flex-1">
                      <div className="text-lg font-semibold mb-1">상반기 신규 채용 인력 OJT</div>
                      <div className="bg-[#ebeffa] p-4 rounded text-sm text-gray-800">
                        상반기 신규 채용 인력 78명 대상<br />
                        일시: 2025.06.28<br />
                        장소: 본관 1층 유니온 홀
                      </div>
                    </div>
                  </div>

                  {/* 반응 이모지 */}
                  {/* <div className="flex gap-4 mt-3 text-sm text-gray-600">
                    <span>👍 23</span>
                    <span>❤️ 11</span>
                    <span>😢 9</span>
                    <span>👎 3</span>
                  </div> */}

                  {/* 댓글 테이블 */}
                  <div className="ml-15 mt-6 text-sm border-t border-gray-400">
                    <div className="grid grid-cols-[3rem_1fr] py-1">
                      <div className="font-semibold text-center">J</div>
                      <div>장소 변경되었습니다. 본관 2층 대회의실.</div>
                    </div>
                    <div className="grid grid-cols-[3rem_1fr] py-1">
                      <div className="font-semibold text-center">J</div>
                      <div>장소 재변경되었습니다. 별관 3층 307 회의실.</div>
                    </div>
                    <div className="grid grid-cols-[3rem_1fr] py-1">
                      <div className="font-semibold text-center">미카엘</div>
                      <div>이제 안 바뀌나요?</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>




            
            <div className="rounded-2xl shadow-md overflow-hidden max-w-3xl mx-auto bg-white">
              {/* 상단 바 */}
              <div className="bg-[#2f61d4] text-white px-6 py-1 flex justify-between rounded-t-2xl">
                
                <div className="text-sm font-bold flex text-right gap-2">
                  마감 기간 - 2025. 9
                </div>
              </div>

              {/* 본문 내용 */}
              <div className="p-6 flex gap-4">

                {/* 왼쪽 핀 이모지 + 세로줄 */}

                {/* 우측 콘텐츠 */}
                <div className="flex-1">
                  <div className="flex gap-4">
                    {/* 📌 + 세로줄 */}
                    <div className="flex gap-2">
                      <div className="text-2xl">📝</div>
                      <div className="w-[2px] h-full bg-[#2f61d4]"></div>
                    </div>

                    {/* 우측 콘텐츠 */}
                    <div className="flex-1">
                      <div className="text-lg font-semibold mb-1">데스 사이드 이전 각성자 추적 및 회유</div>
                      <div className="bg-[#ebeffa] p-4 rounded text-sm text-gray-800">
                        명단 첨부파일 확인<br />
                      </div>
                    </div>
                  </div>

                  {/* 반응 이모지 */}
                  {/* <div className="flex gap-4 mt-3 text-sm text-gray-600">
                    <span>👍 23</span>
                    <span>❤️ 11</span>
                    <span>😢 9</span>
                    <span>👎 3</span>
                  </div> */}

                  {/* 댓글 테이블 */}
                  <div className="ml-15 mt-6 text-sm border-t border-gray-400">
                    <div className="grid grid-cols-[3rem_1fr] py-1">
                      <div className="font-semibold text-center">J</div>
                      <div>담당자들이 수고해주세요.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>






            <div className="rounded-2xl shadow-md overflow-hidden max-w-3xl mx-auto bg-white">
              {/* 상단 바 */}
              <div className="bg-[#2f61d4] text-white px-6 py-1 flex justify-between rounded-t-2xl">
                
                <div className="text-sm font-bold flex text-right gap-2">
                  마감 기간 - 2025. 12
                </div>
              </div>

              {/* 본문 내용 */}
              <div className="p-6 flex gap-4">

                {/* 왼쪽 핀 이모지 + 세로줄 */}

                {/* 우측 콘텐츠 */}
                <div className="flex-1">
                  <div className="flex gap-4">
                    {/* 📌 + 세로줄 */}
                    <div className="flex gap-2">
                      <div className="text-2xl">💼</div>
                      <div className="w-[2px] h-full bg-[#2f61d4]"></div>
                    </div>

                    {/* 우측 콘텐츠 */}
                    <div className="flex-1">
                      <div className="text-lg font-semibold mb-1">드라칼 내부 그림 리퍼 스파이 색출</div>
                      <div className="bg-[#ebeffa] p-4 rounded text-sm text-gray-800">
                        이 정보에 접근할 권한이 없습니다.
                      </div>
                    </div>
                  </div>

                  {/* 반응 이모지 */}
                  {/* <div className="flex gap-4 mt-3 text-sm text-gray-600">
                    <span>👍 23</span>
                    <span>❤️ 11</span>
                    <span>😢 9</span>
                    <span>👎 3</span>
                  </div> */}

                  {/* 댓글 테이블 */}
                  <div className="ml-15 mt-6 text-sm border-t border-gray-400">
                    <div className="grid grid-cols-[3rem_1fr] py-1">
                      <div className="font-semibold text-center">미카엘</div>
                      <div>[이 코멘트에 접근할 권한이 없습니다.]</div>
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

export default PartDPage;
