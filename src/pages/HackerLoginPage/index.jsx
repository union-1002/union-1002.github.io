import { useState } from "react";
import { useNavigate } from 'react-router';
import { useUser } from '@/shared/user';
import MainLayout from '@/shared/MainLayout';

function HackerLoginPage() {
  const navigate = useNavigate();
  const user = useUser();

  const [username, setUsername] = useState('');
  const [selectedDept, setSelectedDept] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !selectedDept) {
      alert('이름과 부서를 모두 입력해주세요!');
      return;
    }

    await user.loginWithoutAuth("새붉은 재앙", username, null);
    navigate('/');
  };

  return (
    <MainLayout>
      <div className="flex justify-center mt-16 px-4 lg:px-8">
        <div className="w-full max-w-[720px] p-8 bg-white shadow-md">

          {/* 제목 */}
          <h2 className="text-2xl font-bold text-center text-[#770000] mb-2">
            Grim Reaper 신도 로그인
          </h2>

          {/* 부제 */}
          <p className="text-center text-sm text-[#435373] mb-10">
             기도하라. 고통하라. 깨달으라. <p className="lg:inline">새붉은 재앙의 뜻대로.</p>
          </p>

          {/* 폼 전체 */}
          <form onSubmit={handleLogin} className="flex flex-col lg:flex-row gap-4">

            {/* 왼쪽 입력 영역 */}
            <div className="flex-1 flex flex-col gap-6">

              {/* 이름 입력 */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-[#770000]">이름</label>
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-[#770000] focus:outline-none focus:ring-2 focus:ring-[#770000] text-base"
                />
              </div>

              {/* 소속 부서 선택 */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-[#770000]">소속 부서</label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {["새붉은 재앙1", "새붉은 재앙2", "새붉은 재앙3", "새붉은 재앙4"].map((dept, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setSelectedDept(dept)}
                      className={`px-4 py-3 border border-[#770000] text-sm transition ${
                        selectedDept === dept
                          ? "bg-[#770000] text-white"
                          : "bg-white text-[#770000] hover:bg-[#770000] hover:text-white"
                      }`}
                    >
                      새붉은 재앙
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setSelectedDept("체페슈")}
                    className={`px-4 py-3 border border-[#770000] text-sm transition ${
                      selectedDept === "체페슈"
                        ? "bg-[#770000] text-white opacity-100"
                        : "bg-white opacity-0 hover:opacity-100 hover:text-white hover:bg-[#770000]"
                    }`}
                  >
                    체페슈
                  </button>
                </div>
              </div>

            </div>

            {/* 오른쪽 로그인 버튼 (높이 꽉 채우고 가로 줄임) */}
            <div className="flex items-stretch">
            <button
              type="submit"
              className="px-8 w-full h-14 lg:w-28 lg:h-auto bg-[#410a0a] text-white text-lg font-semibold hover:bg-[#2d0707] transition flex justify-center items-center"
            >
              <span className="writing-mode-vertical">로그인</span>
            </button>

            </div>

          </form>

        </div>
      </div>
    </MainLayout>
  );
}

export default HackerLoginPage;
