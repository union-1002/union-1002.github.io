import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useUser } from '../user';
import ModalLayout from '../ModalLayout';
import Markdown from 'react-markdown';

function useMails(user) {
  return useMemo(() => {
    const group_mails = {
      헌터즈: [
        {
          from: 'E',
          title: <>{user.name}에게</>,
          body: (
            <>
              love is open door
            </>
          ),
        },
        {
          from: 'S',
          title: '회사 주변 회식 맛집 모음',
          body: (
            <>
              첨부파일 참조
            </>
          ),
        },
      ],
      이글아이: [
        {
          from: '인사팀',
          title: '2025년 노사 협상 결과 안내',
          body: (
            <>
              어쩌구 저쩌구
            </>
          ),
        },
      ],
      울프독: [
        {
          from: '유니온 노동조합 울프독 지부',
          title: '주 52시간 이상 근무를 강요하는 회사를 규탄한다',
          body: (
            <>
              노측이면 주2일제 합시다
            </>
          ),
        },
      ],
      언더그라운드: [
        {
          from: 'R',
          title: '지금 제 자리로 오세요',
          body: (
            <>
              진짜 이런 쪽지 받으면 무서워서 울겁니다.
            </>
          ),
        },
      ],
      드라칼: [
        {
          from: 'J',
          title: '신입사원 연수 일정 안내',
          body: (
            <>
              유니온에 입사함을 다시 한 번 축하드립니다.
            </>
          ),
        },
      ],
    };
    return group_mails[user.group] || [];
  }, [user]);
}

function NoteModal({ isOpen, handleClose }) {
  const user = useUser();
  const mails = useMails(user);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const toggleItem = (index) => {
    selectedIndex == index ? setSelectedIndex(null) : setSelectedIndex(index);
  }

  useEffect(() => {
    if (isOpen && user.hasNewNotes) {
      user.clearNewNotes();
    }
  }, [isOpen, user]);

  return (
    <ModalLayout
      className="max-w-md w-full"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      {/* 제목 */}
      <h2 className="text-xl font-semibold mb-4">쪽지함</h2>

      {/* 메시지 목록 */}
      <div className="space-y-4 max-h-dvh overflow-y-auto">
        {mails.map((mail, index) => (
          <NoteListItem key={index} from={mail.from} title={mail.title} isOpen={index == selectedIndex} toggle={() => toggleItem(index)} >
            {mail.body}
          </NoteListItem>
        ))}
      </div>
    </ModalLayout>
  );
}

export default NoteModal;

function NoteListItem({ key, from, title, children, isOpen, toggle }) {
  return (
    <div key={key} className="border-b border-slate-200">
      <button onClick={toggle} className="w-full flex justify-between items-center py-5 text-slate-800 cursor-pointer">
        <div className="flex-1">
          <div className="text-left font-bold">{title}</div>
          <div className="text-left text-xs text-slate-500">{from}</div>
        </div>
        <span id="icon-1" className="text-slate-800 transition-transform duration-300">
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>
      <div className={`overflow-auto transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
        <div className="pb-5 text-sm text-slate-800">
          {children}
        </div>
      </div>
    </div>
  );
}
