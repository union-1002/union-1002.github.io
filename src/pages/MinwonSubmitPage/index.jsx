import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';

function MinwonSubmitPage() {
  return (
    <MainLayout>
      <PageLayout
        title="민원 신청"
        sidebar={MENU_PROPS['시민 마당']}
      >
        내용
      </PageLayout>
    </MainLayout>
  );
}

export default MinwonSubmitPage;
