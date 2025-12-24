import { useState } from 'react';
import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';

function SchedulePage() {
  const [step, setStep] = useState(1);

  const handleClick = () => {
    setStep(prev => Math.min(prev + 1, 3));
  };

  const text =
    step === 1
      ? '일정 준비 중입니다.'
      : '예배 준비 중일까요?';

  return (
    <MainLayout>
      <PageLayout
        title="일정"
        sidebar={MENU_PROPS['유니온 소식']}
      >
        <div
          onClick={handleClick}
          className="select-none space-y-4"
        >
          <div>{text}</div>

          {step >= 3 && (
            <div className='text-center'>
              <img
                src="/images/c5y.png"
                alt="schedule"
                className="mx-auto max-w-sm"
              />
              <br/>
              바치시오. 모든 것을 바치면 그분께서도 기뻐하시리.
            </div>                     
          )}
        </div>
      </PageLayout>
    </MainLayout>
  );
}

export default SchedulePage;
