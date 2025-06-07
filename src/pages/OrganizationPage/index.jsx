import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';

function OrganizationPage() {
  return (
    <MainLayout>
      <PageLayout
        title="조직도"
        sidebar={MENU_PROPS['유니온 소개']}
      >
        <img src="./images/organization.png"></img>
      </PageLayout>
    </MainLayout>
  );
}

export default OrganizationPage;
