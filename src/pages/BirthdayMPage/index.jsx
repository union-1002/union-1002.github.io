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


function BirthdayMPage() {

  const triggerIds = [3, 7];

  const initialNotes = [
    { id: 1, title: 'From. 테리', content: '임시 리더님 생일 축하드림다!!!!!!!! 그런데 사람이 어떻게 임시 리더' },
    { id: 2, title: 'From. A', content: '앞으로도 잘 부탁드립니다.' },
    { id: 3, title: 'From. C', content: '오늘 하루는 심상의 불안 없이 평안하길 바라외다.' },
    { id: 4, title: 'From. I', content: '잊지 마, 친구! 내 이름은 I지 론이 아니라고.' },
    { id: 5, title: 'From. X', content: '생세일은 기억해도 원산지는 기억 못하는 불상사는 없길 바란답니다.' },
    { id: 6, title: 'From. J', content: '축하합니다. 앞으로도 부디 잘 이끌어주기를.' },
    { id: 7, title: 'From. 비광', content: '이거, 일팔광땡으로 판 휘어잡을 만큼 경사 아닌가? 축하하네!' },
    { id: 8, title: 'From. D', content: '오늘은 사고 안 칠게요.' },
  ];

  const changeNotes = [
    { id: 1, title: 'From. 뽀삐', content: '생일은 축하하는 거랬어! 뽀삐가 젤 먼저 축하해줄거야!\n어라? 예전에도 축하했나?' },
    { id: 2, title: 'From. 라멘타', content: '나의 어린양아, 너의 앞길에 새붉은 재앙의 축복 있을지니.' },
    { id: 3, title: 'From. T', content: '생세일을 경하드리나이다.' },
    { id: 4, title: 'From. 아가페', content: '선물로 좋은 인형을 보내드렸어요……♥︎' },
    { id: 5, title: 'From. 루두스', content: '놀랍게도, 오늘은 생일이니 정시 퇴근이겠죠. 언제 퇴근합니까? 술이나 마시죠?' },
    { id: 6, title: 'From. 느베야', content: '유니온보다 우리가 좋지?? 느베야가 케이크 사놨어!!' },
    { id: 7, title: 'From. 하피', content: '자기야, 달링. 숨겨줘서 항상 고마워. 앞으로도 잘 숨어보자.' },
    { id: 8, title: 'From. ?', content: '?' },
  ];

  const [clickedIds, setClickedIds] = useState([]);

  const toggleCard = (id) => {
    setClickedIds((prev) => {
      const alreadyClicked = prev.includes(id);
      const updated = alreadyClicked ? prev.filter((x) => x !== id) : [...prev, id];
      return updated;
    });
  };

  const isTriggered = triggerIds.every((id) => clickedIds.includes(id));
  const currentNotes = isTriggered ? changeNotes : initialNotes;

  return (
    <div
      className="w-full h-screen flex justify-center py-8 transition-colors duration-300"
      style={{ backgroundColor: isTriggered ? 'black' : 'white' }} // Tailwind bg-orange-100에 해당
    >
      <div className="w-4xl max-w-full px-4">
        <div className='flex justify-center'>
          <img
            src={isTriggered ? '/images/happyM2.png' : '/images/happyM1.png'}
            alt="생일 축하 이미지"
            className="w-100 h-auto mb-4"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
          {currentNotes.map((note) => {
            const isClicked = clickedIds.includes(note.id);
            return (
              <div
                key={note.id}
                className={`rounded p-4 h-36 flex flex-col cursor-pointer transition-colors duration-200 shadow-md ${
                  isClicked ? 'bg-[#becdcd]' : ''
                }`}
                style={{ backgroundColor: isClicked ? undefined : '#d8dede' }}
                onClick={() => toggleCard(note.id)}
              >
                <h3 className="text-lg font-bold text-gray-800">{note.title}</h3>
                <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">{note.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BirthdayMPage;