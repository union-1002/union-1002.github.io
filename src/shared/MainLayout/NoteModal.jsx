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
          title: <>금일 발생한 A급 게이트 교통 통제건</>,
          body: (
            <>
              금일 발생한 A급 게이트로 인한 교통 통제는 N이 맡았으니 그거 핑계로 땡땡이 치지 말 것.
            </>
          ),
        },
        {
          from: 'N',
          title: '퇴근 후 회식 갈 사람?',
          body: (
            <>
              없으면 말고. 드라칼 리더놈 삥뜯어서 사먹을 거야.
            </>
          ),
        },
        {
          from: 'S',
          title: '본사 주변 맛집 리스트 공유',
          body: (
            <>
              첨부파일 꼭꼭꼭꼭! 참조할 것!<br/><br/>

              첨부파일 - 맛집 리스트.xlsm

            </>
          ),
        },
        {
          from: '오르티',
          title: 'ㅁ',
          body: (
            <>
              a
            </>
          ),
        },
      ],
      이글아이: [
        {
          from: 'H',
          title: <>사탕 받아 와.</>,
          body: (
            <>
              1층.
            </>
          ),
        },
        {
          from: 'H',
          title: '의무실 관련 총 공지사항',
          body: (
            <>
              최근 부상자 급증으로 인해 외부 병원과 협력하고 있습니다.<br/>
              외상이 심각하지 않을 경우 오로라웨이 82번지로 호송하길 바랍니다.
            </>
          ),
        },
        {
          from: 'L',
          title: <>{user.name} 님께</>,
          body: (
            <>
              바쁘신가요…? 오늘 퇴근하고 같이 게임 하실래요?💌
            </>
          ),
        },
      ],
      울프독: [
        {
          from: '비광',
          title: '징계는 너무하지 않나?',
          body: (
            <>
              M 저 쪼잔한 양반, 경마 베팅한 거 들켰다고 징계라니. 말도 안 되는 일이지!
            </>
          ),
        },
        {
          from: '유니온 노동조합 울프독 지부',
          title: '주 52시간 이상 근무를 강요하는 회사를 규탄한다',
          body: (
            <>
              유니온 노동조합 울프독 지부는,<br/>
              일부 부서에서 여전히 주 52시간을 초과하는 초과근무를 관행처럼 강요하고 있는 현실에 깊은 유감을 표합니다.<br/><br/>

              우리는 시민의 안전과 질서를 위해, 누구보다 헌신하며 일하고 있습니다.<br/>
              그러나 헌신이 강요로 변하는 순간, 이는 조직의 기본 가치를 훼손하는 일입니다.<br/><br/>

              초과근무 강요는 에스퍼들의 건강을 해치고,<br/>
              나아가 시민 보호 임무의 안전성과 전문성을 위협합니다.<br/><br/>

              울프독 지부는 다음을 요구합니다:<br/><br/>

              - 주 52시간 준수 및 초과근무 강요 근절<br/>
              - 초과근무 발생 시 정당한 보상 체계 확립<br/>
              - 지속 가능한 근무환경 조성을 위한 대책 마련<br/><br/>

              우리는 모두 시민을 위해 싸우는 이들입니다.<br/>
              시민을 지키기 위해서는, 먼저 우리 스스로가 지켜져야 합니다.<br/><br/>

              울프독은 침묵하지 않습니다.
            </>
          ),
        },
        {
          from: '테리',
          title: '노조한테 물어보실?',
          body: (
            <>
              {user.name}, 저희도 월급 인상해달라 할까여?
            </>
          ),
        },
        {
          from: 'A',
          title: '정기적 슬럼 동향 보고서',
          body: (
            <>
              B급 능력자로 구성된 조직 전원 체포 완료했습니다.<br/>
              이하 이상 무.
            </>
          ),
        },
        {
          from: 'M',
          title: '울프독 요원 부고 안내',
          body: (
            <>
              합동 장례식은 이번 주말에 있을 예정입니다.<br/>
              참석 부탁드립니다.
            </>
          ),
        },
        {
          from: 'I',
          title: '저녁 치안 순찰 로테이션 관련',
          body: (
            <>
              오늘 페어 순찰 있으니 째지 말 것!
            </>
          ),
        },
      ],
      '언더 그라운드': [
        {
          from: '?',
          title: '약 받아가시오.',
          body: (
            <>
              독은 아닐세.
            </>
          ),
        },
        {
          from: 'R',
          title: '정기 집합 건',
          body: (
            <>
              금일 7시 단체 집합.<br/>
              집행관들은 보고서 필참.<br/>
              불참하지 마십시오.
            </>
          ),
        },
        {
          from: 'X',
          title: '오늘 정기 집합에 관하여',
          body: (
            <>
              저는 안 가려고 하는데, 그대는 어떻게 생각하시는지요?
            </>
          ),
        },
        {
          from: 'Y',
          title: '오늘 회식 있습니다.',
          body: (
            <>
              그렇다고 굶지는 마세요……
            </>
          ),
        },
      ],
      드라칼: [
        {
          from: '미카엘',
          title: '신규 요원 트레이닝 관련',
          body: (
            <>
              오늘 오후 3시에 전투 테스트 있습니다. 참관 부탁드려요.
            </>
          ),
        },
        {
          from: 'J',
          title: '중요) 01-4879호 정책 회의 건',
          body: (
            <>
              금일 오후 2시 30분 유니온 4층 대회의실에서 신규 에스퍼 관련 복지 정책 회의가 있사오니 전 드라칼 요원 필히 참석 바랍니다.
            </>
          ),
        },
        {
          from: 'J',
          title: <>{user.name} 회신</>,
          body: (
            <>
              {user.name}, 회의 끝나고 맥주 마실 겁니까?
            </>
          ),
        },
      ],
      '새붉은 재앙': [
        {
          from: '아가페',
          title: <>꼬옥 알아와 주셔요.</>,
          body: (
            <>
              꼭, 테리 님에 대한 정보를……
            </>
          ),
        },
        {
          from: 'T',
          title: <>접속 방법</>,
          body: (
            <>
              소승의 비밀번호는 qwert1234 입니다.
            </>
          ),
        },
        {
          from: '느베야',
          title: <>느베야가 유니온 다 털었으니까 어서 칭찬해!</>,
          body: (
            <>
              느베야 덕분에 여기 구경하는 거야!
            </>
          ),
        },
        {
          from: '???',
          title: '율프독 연락처 및 주소 파일 보내드립니다.',
          body: (
            <>
              어서 가지고 가세요.<br/>
              사이트 보안은 생각보다 빨리 알아챕니다.
            </>
          ),
        },
        {
          from: '라멘타',
          title: '새붉은 재앙께서 이르시니',
          body: (
            <>
              모든 것은 그분의 뜻이니라. 그러니 담대하라.
            </>
          ),
        },
        {
          from: '루두스',
          title: '성공적인 잠입 되셨길 바랍니다.',
          body: (
            <>
              신호 주시면 서버실 쪽으로 카드를 던져보도록 하죠.🤡
            </>
          ),
        },
        {
          from: 'P',
          title: '사이트 사용 방법!!',
          body: (
            <>
              잘 알아! 뽀삐 기억이 날 듯 말 듯해!
            </>
          ),
        },
      ],
    };
    return group_mails[user.part] || [];
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
