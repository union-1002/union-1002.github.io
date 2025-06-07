import MainLayout from '@/shared/MainLayout';
import { Link } from 'react-router';
import { useUser } from '@/shared/user';

function PartEPage() {
  const user = useUser();

  return (
    <MainLayout>
      {user.isLoggedIn && (user.isAdmin || user.part === "이글아이") && (
        <div>여기는 이글아이 전용 페이지입니다.</div>
      )}
      저기요
    </MainLayout>
  );
}

export default PartEPage;
