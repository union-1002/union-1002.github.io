import React from 'react';
import { Link, useNavigate } from 'react-router';
import { Mail } from 'lucide-react';
import { useUser } from '../user';

function MemberStatus({ className, openNoteModal }) {
  const navigate = useNavigate();
  const user = useUser();

  const handleLogout = () => {
    user.logout();
    navigate('/');
  };

  if (user.isLoggedIn()) {
    return (
      <div className={className}>
        <div className="flex">
          <div className="">
            <span>
              <button onClick={openNoteModal} className="relative cursor-pointer align-middle">
                <Mail className="w-4" />
                {user.hasNewNotes && <span className="absolute top-0 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />}
              </button>
            </span>&nbsp;
            <span>{user.group}</span>&nbsp;
            <span>{user.name} 님</span> 환영합니다!
          </div>&nbsp;
          <button
            onClick={handleLogout}
            className="text-xs border-[0.5px] border-gray-400 px-2 py-1 rounded flex items-center cursor-pointer"
          >
            로그아웃
          </button>
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
