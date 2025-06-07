import MainLayout from '@/shared/MainLayout';
import { Link } from 'react-router';
import { useUser } from '@/shared/user';

function PartWPage() {
  const user = useUser();

  return (
    <MainLayout>
      {user.isLoggedIn && (user.isAdmin || user.part === "울프독") && (
        <div>여기는 울프독 전용 페이지입니다.</div>
      )}
      저기요
    </MainLayout>
  );
}

export default PartWPage;
