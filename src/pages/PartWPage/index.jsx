import MainLayout from '@/shared/MainLayout';
import { Link } from 'react-router';
import { useUser } from '@/shared/user';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

function PartWPage() {
  const user = useUser();

  return (
    <MainLayout>
      {(user.isLoggedIn == false || (user.isAdmin == false && user.part != "울프독")) && (
        <div className='mt-10 p-20 text-center bg-[#ecf7fb]'>울프독 아니면 못들어옴다</div>
      )}
      {user.isLoggedIn && (user.isAdmin || user.part === "울프독") && (
        <div>
          <div className="relative w-full mt-10 mb-10">
            {/* 배경 박스 */}
            <div className="bg-[#ecf7fb] py-8 text-center z-0 relative">
            </div>

            {/* 로고 - 배경 위에 겹쳐지게 */}
            <img
              src="/images/wolfdog1.png"
              alt="울프독 로고"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-30 h-30 z-10"
            />
          </div>

          <div className="max-w-3xl mx-auto px-2 py-8 space-y-6 text-3xl">
            <div>
              <TitleBox
                titleBackground="#313131"
                title={(
                  <>
                    <IoCheckmarkCircleOutline className="absolute text-5xl *:stroke-40 left-3 text-white" />
                    <span className="text-white pl-13">일일 보고서 작성</span>
                  </>)}
                statusBackground="#3ab8de"
                status={<span className="text-white">완료</span>}
              />
              <div className="bg-[#efefef] mx-10 px-3 py-5">
                <div className="text-sm border-gray-400">
                  <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                    <div className="font-semibold text-center">비광</div>
                    <div>에잉 쯧 뭔놈의 보고서 때문에 일을 할수가 없구먼.</div>
                  </div>
                  <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                    <div className="font-semibold text-center">I</div>
                    <div>브이룩업 하는 법 알려줄 친구?</div>
                  </div>
                  <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                    <div className="font-semibold text-center">A</div>
                    <div>아직도 그걸 모르면 어떡합니까.</div>
                  </div>
                  <div className="grid grid-cols-[4rem_1fr] py-1">
                    <div className="font-semibold text-center">테리</div>
                    <div>걍 좀 알려주고 그래라 너도 나한테 배웠잖아</div>
                  </div>
                </div>  
              </div>
            </div>


            <div>
              <TitleBox
                titleBackground="#F5FAFC"
                title={(
                  <>
                    <div className="absolute -left-2 -top-2">
                      <WolfdogIcon className="aspect-square w-23 h-23" />
                    </div>
                    <span className="pl-13 z-1">그림 리퍼 최신 동향 보고</span>
                  </>)}
                statusBackground="#313131"
                status={<span className="text-white">진행중</span>}
              />


              <div className="bg-[#efefef] mx-10 px-3 py-5">
                <div className="text-sm border-gray-400">
                  <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                    <div className="font-semibold text-center">M</div>
                    <div>첨부파일: 라멘타 동향.doc</div>
                  </div>
                  <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                    <div className="font-semibold text-center">M</div>
                    <div>첨부파일: 하피 동향.doc</div>
                  </div>
                  <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                    <div className="font-semibold text-center">비광</div>
                    <div>하피 동향 틀린 부분 있네만? 고쳐놨네.</div>
                  </div>
                  <div className="grid grid-cols-[4rem_1fr] py-1">
                    <div className="font-semibold text-center">M</div>
                    <div>감사합니다.</div>
                  </div>
                </div>  
              </div>



            </div>

            <div>
              <TitleBox
                titleBackground="#F5FAFC"
                title={(
                  <>
                    <div className="absolute -left-2 -top-2">
                      <WolfdogIcon className="aspect-square w-23 h-23" />
                    </div>
                    <span className="pl-13 z-1">스케빈저 소탕 충원 (사살 허가)</span>
                  </>)}
                statusBackground="#313131"
                status={<span className="text-white">진행중</span>}
              />


              <div className="bg-[#efefef] mx-10 px-3 py-5">
                <div className="text-sm border-gray-400">
                  <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                    <div className="font-semibold text-center">I</div>
                    <div>👌🏻</div>
                  </div>
                  <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                    <div className="font-semibold text-center">A</div>
                    <div>드디어 사살 허가가 났군요.</div>
                  </div>
                  <div className="grid grid-cols-[4rem_1fr] py-1">
                    <div className="font-semibold text-center">M</div>
                    <div>몸조심 하십시오.</div>
                  </div>
                </div>  
              </div>



            </div>
            <div>
              <TitleBox
                titleBackground="#F5FAFC"
                title={(
                  <>
                    <div className="absolute -left-2 -top-2">
                      <WolfdogIcon className="aspect-square w-23 h-23" />
                    </div>
                    <span className="pl-13 z-1">[지명수배] A급 에스퍼 탈주범 추적</span>
                  </>)}
                statusBackground="#313131"
                status={<span className="text-white">진행중</span>}
              />

              <div className="bg-[#efefef] mx-10 px-3 py-5">
                <div className="text-sm border-gray-400">
                  <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                    <div className="font-semibold text-center">테리</div>
                    <div>이 사람 A급 맞슴까? 자꾸 놓쳐여</div>
                  </div>
                  <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                    <div className="font-semibold text-center">비광</div>
                    <div>곤란하게 만드는 빌런일세.</div>
                  </div>
                  <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                    <div className="font-semibold text-center">I</div>
                    <div>이 친구 설득이 쉽지 않아</div>
                  </div>
                  <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                    <div className="font-semibold text-center ">A</div>
                    <div>실수로 한 번 놓쳤습니다.</div>
                  </div>
                  <div className="grid grid-cols-[4rem_1fr] py-1">
                    <div className="font-semibold text-center">M</div>
                    <div>다들 왜 A급 하나 못잡고 있는 겁니까.</div>
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

export default PartWPage;


function TitleBox({ title, status, titleBackground, statusBackground }) {
  return (
    <div
      className="flex w-full max-w-4xl rounded-sm overflow-hidden"
      style={{
        filter: 'drop-shadow(0.125rem 0.125rem 0.125rem rgba(0,0,0,0.2))',
      }}
    >
      <div className="relative w-full">
        <div
          className="flex items-center gap-3 px-6 py-4 pe-20 flex-grow font-bold text-lg"
          style={{
            background: titleBackground,
            clipPath: 'polygon(0% 1.5rem, 1rem 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        >
          {title}
        </div>
        <div
          className="absolute content-center text-center min-w-20 top-0 right-0 font-bold text-sm h-full px-4 pl-5 py-4"
          style={{
            background: statusBackground,
            clipPath: 'polygon(16px 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        >
          {status}
        </div>
      </div>
    </div>
  );
}

function WolfdogIcon({ className }) {
  return (
    <div
      className={className}
      style={{
        background: '#9DDBEE',
        WebkitMaskImage: 'url("./images/wolfdog.png")',
        maskImage: 'url("./images/wolfdog.png")',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  );
};
