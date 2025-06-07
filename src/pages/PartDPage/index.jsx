import MainLayout from '@/shared/MainLayout';
import { Link } from 'react-router';
import { useUser } from '@/shared/user';

function PartDPage() {
  const user = useUser();

  return (
    <MainLayout>
      {user.isLoggedIn && (user.isAdmin || user.part === "드라칼") && (
        <div>여기는 드라칼 전용 페이지입니다.</div>
      )}
      저기요
    </MainLayout>
  );
}

export default PartDPage;
