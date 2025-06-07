import MainLayout from '@/shared/MainLayout';
import { Link } from 'react-router';
import { useUser } from '@/shared/user';

function PartUPage() {
  const user = useUser();

  return (
    <MainLayout>
      {user.isLoggedIn && (user.isAdmin || user.part === "언더 그라운드") && (
        <div>여기는 언그 전용 페이지입니다.</div>
      )}
      저기요
    </MainLayout>
  );
}

export default PartUPage;
