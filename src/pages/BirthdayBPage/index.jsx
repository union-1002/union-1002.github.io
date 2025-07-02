import { useState } from 'react';
import MainLayout from '@/shared/MainLayout';
import { Link, useSearchParams } from 'react-router';
import { useUser } from '@/shared/user';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { Alert, Banner, BannerCollapseButton, Button, createTheme, Dropdown, DropdownItem, ThemeProvider } from "flowbite-react";


const partImageMap = {
  '울프독': '/images/wolfdog1.png',
  '이글아이': '/images/eagleeye1.png',
  '드라칼': '/images/dracal1.png',
  '언더 그라운드': '/images/underground1.png',
  '헌터즈': '/images/hunters1.png',
};



function BirthdayBPage() {
  const user = useUser();
  console.log(user, user.isAuthenticated)

  return (
    <div className="flex justify-center">
      준비 중입니다.
    </div>
  );
}

export default BirthdayBPage;


function LoginBanner({ className }) {
  const PART_LIST = ['헌터즈', '울프독', '이글아이', '드라칼', '언더 그라운드'];
  const user = useUser();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [part, setPart] = useState('소속 부서');

  const handleLogin = async (e) => {
    if (!userId || !password || !PART_LIST.includes(part)) {
      alert('아이디, 비밀번호, 부서를 모두 입력해주세요.');
      return;
    }

    try {
      await user.login(part, userId, password);
    }
    catch (e) {
      alert(e.message);
      return;
    }
  };

  return (
    <div className={`${className} flex justify-center`}>
      <div className='w-full max-w-2xl flex flex-col lg:flex-row items-center justify-center gap-4'>
        <div className="">
          <input
            type="text"
            placeholder="ID"
            value={userId}
            maxLength={50}
            onChange={(e) => setUserId(e.target.value)}
            className="w-30 h-6 px-1 py-1 rounded-md bg-white/20 backdrop-blur-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gray-700 text-sm"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-30 h-6 px-1 py-1 rounded-md bg-white/20 backdrop-blur-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gray-700 text-sm"
          />
        </div>
        <div className="flex gap-4">
          {PART_LIST.map((partName) => (
            <button
              key={partName}
              onClick={() => setPart(partName)}
              className={`p-1 rounded-md
                ${part === partName ? 'bg-gray-800' : 'bg-white/20'}
                backdrop-blur-md border hover:bg-white/30`}
            >
              <img
                src={partImageMap[partName]}
                alt={partName}
                className="w-4 h-4"
              />
            </button>
          ))}
        </div>



        <div>
          <Button
            className='w-30 h-6 px-1 py-1 rounded-md bg-white/20 backdrop-blur-md text-white focus:outline-none focus:ring-2 focus:ring-gray-700 text-sm hover:bg-white/30'
            onClick={handleLogin}>로그인</Button>
        </div>
      </div>
    </div>
  );
}

function LoginSuccessBanner({ className }) {
  const user = useUser();

  return (
    <Banner className={className}>
      {/* 로그인 됨
      <Button onClick={() => user.logout()}>로그아웃</Button> */}
    </Banner>
  );
}
