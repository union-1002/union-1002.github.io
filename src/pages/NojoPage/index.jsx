import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';

function NojoPage() {
  return (
    <MainLayout>
      <PageLayout
        title="노동조합"
        sidebar={MENU_PROPS['직원 마당']}
      >
        내용
      </PageLayout>
    </MainLayout>
  );
}

export default NojoPage;
