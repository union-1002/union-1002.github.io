import React from "react";
import { Link, useNavigate } from "react-router";
import { Mail } from "lucide-react";
import { useUser } from "../user";

function MemberStatus({ className, openNoteModal }) {
  const navigate = useNavigate();
  const user = useUser();

  const handleLogout = async () => {
    await user.logout();
    navigate("/");
  };

  if (!user.bootstrapped) {
    return (
      <div className={className}>
        <span className="text-xs text-gray-500">세션 확인 중…</span>
      </div>
    );
  }

  if (user.isLoggedIn) {
    // ✅ fake 로그인 = part에 문자열 들어있음 / 진짜 로그인 = group에도 있을 수 있음
    const partName = user.part ?? user.group?.group_name ?? "";

    return (
      <div className={className}>
        <div className="flex flex-col items-center lg:flex-row">
          <div className="mb-2 lg:mb-0 lg:mr-2">
            <span>
              <button
                onClick={openNoteModal}
                className="relative cursor-pointer align-middle"
              >
                <Mail className="w-4" />
                {user.hasNewNotes && (
                  <span className="absolute top-0 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                )}
              </button>
            </span>
            &nbsp;
            {partName === "새붉은 재앙" ? (
              <span>새붉은 재앙의 자녀 {user.username} 님 환영합니다!</span>
            ) : (
              <span>{partName} {user.username} 님 환영합니다!</span>
            )}
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="text-xs border-[0.5px] border-gray-400 px-2 py-1 rounded flex items-center cursor-pointer"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Link to="/login">
        <button className="text-xs border-[0.5px] border-gray-400 px-2 py-1 rounded flex items-center cursor-pointer">
          구성원 로그인
        </button>
      </Link>
    </div>
  );
}

export default MemberStatus;
