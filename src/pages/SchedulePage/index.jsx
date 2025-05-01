import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';

function SchedulePage() {
  return (
    <MainLayout>
      <PageLayout
        title="일정"
        sidebar={MENU_PROPS['유니온 소식']}
      >
        일정 준비 중입니다.
      </PageLayout>
    </MainLayout>
  );
}

export default SchedulePage;
