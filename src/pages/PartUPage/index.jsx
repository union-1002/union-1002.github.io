import MainLayout from '@/shared/MainLayout';
import { Link } from 'react-router';
import { useUser } from '@/shared/user';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

function PartUPage() {
  const user = useUser();

  return (
    <MainLayout>

      {(user.isLoggedIn == false || (user.isAdmin == false && user.part != "언더 그라운드")) && (
        <div className='mt-10 p-20 text-center text-white bg-black'>이 페이지는 허가 받은 인원외에 절대 접근할 수 없습니다.</div>
      )}
      {(user.isLoggedIn && (user.isAdmin || user.part === "언더 그라운드")) && (
        <div className="bg-gray-100">
          <div className="relative w-full pt-50">
            {/* 배경 박스 */}
            <div className="text-center z-0 relative">
            </div>

            {/* 로고 - 배경 위에 겹쳐지게 */}
            <img
              src="/images/underground1.png"
              alt="언그 로고"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-30 h-30 z-10"
            />
          </div>

          <div className="max-w-3xl mx-auto px-2 py-8 space-y-6">
            <MissionCard
              subtitle="[014-A] Hollow Cleanse"
              title="오로라웨이 B-36 S급 게이트"
              object="게이트 내부에서 비정상 행동을 보이는 오염된 에스퍼 처리"
              footer={<StatusBadge className="bg-red-500 text-white font-semibold">진행</StatusBadge>}
            >
              <div className="px-2 text-sm border-gray-400">
                <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                  <div className="font-semibold text-center">R</div>
                  <div>차질없이 진행하세요.</div>
                </div>
                <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                  <div className="font-semibold text-center">X</div>
                  <div>넵...</div>
                </div>
              </div>
            </MissionCard>

            <MissionCard
              subtitle="[001-B] Silence Protocol"
              title="#A-1982 타깃 집중 마크"
              object="#A-1982 처리"
              footer={<StatusBadge className="bg-red-500 text-white font-semibold">완료</StatusBadge>}
            >
              <div className="px-2 text-sm border-gray-400">
                <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                  <div className="font-semibold text-center">Y</div>
                  <div>완료.</div>
                </div>
                <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                  <div className="font-semibold text-center">X</div>
                  <div>고생했어요..</div>
                </div>
              </div>
            </MissionCard>

            <MissionCard
              subtitle="[091-X] Meeting"
              title="슬럼 접선 및 미팅"
              object="패군에게 서류 받아오기"
              footer={<StatusBadge className="bg-red-500 text-white font-semibold">진행</StatusBadge>}
            >
              <div className="px-2 text-sm border-gray-400">
                <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                  <div className="font-semibold text-center">Y</div>
                  <div>진짜 제가 가요?</div>
                </div>
                <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                  <div className="font-semibold text-center">Y</div>
                  <div>진짜?</div>
                </div>
                <div className="grid grid-cols-[4rem_1fr] py-1 border-b border-gray-300">
                  <div className="font-semibold text-center">R</div>
                  <div>말도 잘 통하지 않습니까.</div>
                </div>
              </div>
            </MissionCard>

          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default PartUPage;

function MissionCard({ header, subtitle, title, object, footer, children }) {
  return (
    <div className="px-1.5 relative">
      <TitleBox className="relative z-2 -left-1.5" header={header} subtitle={subtitle} title={title} object={object} footer={footer} />
      <ContentBox className="relative z-1 -right-1.5 -mt-24 pt-28">{children}</ContentBox>
    </div>
  );
}

function TitleBox({ className, header, subtitle, title, object, footer }) {
  return (
    <div
      className={`${className} w-full max-w-4xl overflow-hidden rounded-lg px-8 py-6 bg-black text-white`}
      style={{
        filter: 'drop-shadow(0.125rem 0.125rem 0.125rem rgba(0,0,0,0.2))',
      }}
    >
      <div data-role="background" className="absolute flex flex-row-reverse -right-18 -top-2 w-[150%] h-[150%]">
        <UnderGroundIcon className="aspect-square max-w-full max-h-full" />
      </div>
      <div data-role="content" className="relative z-10">
        <div data-role="header" className="min-h-4">{header}</div>
        <div data-role="body" className="max-w-80 min-h-34">
          <div className="text-sm font-semibold mb-0.125">{subtitle}</div>
          <div className="text-2xl font-bold border-b-2 border-b-red-600 mb-1.5">{title}</div>
          <div className="flex flex-row text-sm text-gray-200">
            <div className="min-w-fit">목표&nbsp;&nbsp;|&nbsp;&nbsp;</div>
            <div className="break-keep">{object}</div>
          </div>
        </div>
        <div data-role="footer" className="bottom-0">
          {footer}
        </div>
      </div>
    </div>
  );
}

function ContentBox({ className, children }) {
  return (
    <div className={`${className} rounded-lg px-6 py-4 bg-white shadow-xs`}>
      {children}
    </div>
  );
}

function StatusBadge({ className, children }) {
  return (
    <div className={`${className} inline-block p-0.125 rounded-xs px-8`}>
      {children}
    </div>
  );
}

function UnderGroundIcon({ className }) {
  return (
    <div
      className={className}
      style={{
        background: '#6D6D6D',
        WebkitMaskImage: 'url("./images/underground.png")',
        maskImage: 'url("./images/underground.png")',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        transform: 'scaleX(-1)',
      }}
    />
  );
};
