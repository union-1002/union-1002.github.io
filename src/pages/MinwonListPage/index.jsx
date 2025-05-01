import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';

function MinwonListPage() {
  return (
    <MainLayout>
      <PageLayout
        title="민원 사례"
        sidebar={MENU_PROPS['시민 마당']}
      >
        민원 사례 준비 중입니다.
      </PageLayout>
    </MainLayout>
  );
}

export default MinwonListPage;
