import { useState } from "react";
import { Link, useNavigate } from 'react-router';
import { useUser } from '@/shared/user';
import MainLayout from '@/shared/MainLayout';

function LoginPage() {
  const navigate = useNavigate();
  const user = useUser();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [selectedDept, setSelectedDept] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userId || !password || !selectedDept) {
      alert('아이디, 비밀번호, 부서를 모두 입력해주세요.');
      return;
    }

    try {
      await user.login(selectedDept, userId, password);
    }
    catch (e) {
      alert(e.message);
      return;
    }

    navigate('/');
  };

  return (
    <MainLayout>
      <div className="flex justify-center mt-16 px-4 lg:px-8">
        <div className="w-full max-w-[720px] p-8 bg-white shadow-md">

          <h2 className="text-2xl font-bold text-center text-[#456EBF] mb-2">
            UNION 구성원 로그인
          </h2>

          <p className="text-center text-sm text-[#435373] mb-10">
            본 시스템은 고도화된 <Link to="/hackerLogin">보안 기술</Link>을 <span className="lg:inline">적용하고 있습니다.</span>
          </p>

          <form onSubmit={handleLogin} className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-6">

              <div>
                <label className="block mb-2 text-sm font-semibold text-[#456EBF]">아이디</label>
                <input
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={userId}
                  maxLength={50}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full px-4 py-3 border border-[#456EBF] focus:outline-none focus:ring-2 focus:ring-[#456EBF] text-base"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-[#456EBF]">비밀번호</label>
                <input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-[#456EBF] focus:outline-none focus:ring-2 focus:ring-[#456EBF] text-base"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-[#456EBF]">소속 부서</label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {["헌터즈", "이글아이", "울프독", "드라칼"].map((dept, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setSelectedDept(dept)}
                      className={`px-4 py-3 border border-[#456EBF] text-sm transition ${
                        selectedDept === dept
                          ? "bg-[#456EBF] text-white"
                          : "bg-white text-[#456EBF] hover:bg-[#456EBF] hover:text-white"
                      }`}
                    >
                      {dept}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setSelectedDept("언더 그라운드")}
                    className={`px-4 py-3 border border-[#456EBF] text-sm transition ${
                      selectedDept === "언더 그라운드"
                        ? "bg-[#456EBF] text-white opacity-100"
                        : "bg-white opacity-0 hover:opacity-100 hover:text-white hover:bg-[#456EBF]"
                    }`}
                  >
                    언더 그라운드
                  </button>
                </div>
              </div>

            </div>

            <div className="flex items-stretch">
              <button
                type="submit"
                className="px-8 w-full h-14 lg:w-28 lg:h-auto bg-[#435373] text-white text-lg font-semibold hover:bg-[#3457A0] transition flex justify-center items-center"
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

export default LoginPage;
