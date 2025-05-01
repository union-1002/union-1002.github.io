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
        회사에서는 노조의 요청에 의해 노조 페이지를 개설하였습니다.<br/>
        자세한 운영 문의는 노조로 요청 부탁드립니다.
      </PageLayout>
    </MainLayout>
  );
}

export default NojoPage;
