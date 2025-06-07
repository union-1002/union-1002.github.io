import MainLayout from '@/shared/MainLayout';
import { Link } from 'react-router';
import { useUser } from '@/shared/user';

function PartHPage() {
  const user = useUser();

  return (
    <MainLayout>
      {user.isLoggedIn && (user.isAdmin || user.part === "헌터즈") && (
        <div>
          <div className="w-full bg-gray-800 text-white py-8 text-center mt-10">
            🧭 여기는 웹페이지 최상단 전체 가로바입니다.
          </div>

          <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
            <div className="bg-white shadow p-4 rounded">
              <h2 className="text-lg font-bold">첫 번째 요소</h2>
              <p className="text-sm text-gray-600">내용을 여기에 작성하세요.</p>
            </div>

            <div className="bg-white shadow p-4 rounded">
              <h2 className="text-lg font-bold">두 번째 요소</h2>
              <p className="text-sm text-gray-600">또 다른 내용을 여기에 작성하세요.</p>
            </div>

            <div className="bg-white shadow p-4 rounded">
              <h2 className="text-lg font-bold">세 번째 요소</h2>
              <p className="text-sm text-gray-600">더 많은 내용을 추가할 수 있습니다.</p>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default PartHPage;
