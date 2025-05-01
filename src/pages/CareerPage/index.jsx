import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';

function CareerPage() {
  return (
    <MainLayout>
      <PageLayout
        title="채용"
        sidebar={MENU_PROPS['유니온 소식']}
      >
        내용
      </PageLayout>
    </MainLayout>
  );
}

export default CareerPage;
