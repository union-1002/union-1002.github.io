import React from 'react';
import { Link, useNavigate } from 'react-router';
import { Mail } from 'lucide-react';
import { useUser } from '../user';
import supabase from '../supabase';

function MemberStatus({ className, openNoteModal }) {
  const navigate = useNavigate();
  const user = useUser();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    // if (error) {
    //   console.warn("⚠️ Supabase 로그아웃 실패:", error);
    // } else {
    //   console.log("✅ Supabase 로그아웃 완료");
    // }

    user.logout(); // 세션 기반 로그아웃 처리
    navigate('/');
  };

  if (user.isLoggedIn) {
    return (
      <div className={className}>
        <div className="flex flex-col items-center lg:flex-row">
          <div className="mb-2 lg:mb-0 lg:mr-2">
            <span>
              <button onClick={openNoteModal} className="relative cursor-pointer align-middle">
                <Mail className="w-4" />
                {user.hasNewNotes && <span className="absolute top-0 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />}
              </button>
            </span>&nbsp;
            { user.part === '새붉은 재앙'
              ? (<span>새붉은 재앙의 자녀 {user.username} 님 환영합니다!</span>)
              : (<span>{user.part} {user.username} 님 환영합니다!</span>)
            }
          </div>
          <div className="">
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
  } else {
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
}

export default MemberStatus;
