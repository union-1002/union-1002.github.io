import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';

function NoticePage() {
  return (
    <MainLayout>
      <PageLayout
        title="공지사항"
        sidebar={MENU_PROPS['유니온 소식']}
      >
        내용
      </PageLayout>
    </MainLayout>
  );
}

export default NoticePage;
