import { useEffect, useState } from 'react';
import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';



const employees = [
  { id: 1, initials: 'E', name: 'E', position: '헌터즈 · 수호자', birthday:'4/21', age: '41', height: '192', gen: '1', fullname:'에반 하워드 브라이트', engname:'Evan Howard Bright', nationality: '미국', etc:'', },
  { id: 2, initials: 'N', name: 'N', position: '헌터즈 · 맹수', birthday:'5/15', age: '27', height: '178', gen: '2', fullname:'니케 바네사 와이즈맨', engname:'Nike Vanessa Wiseman', nationality: '미국 · 스타레인', etc:'',},
  { id: 3, initials: 'S', name: 'S', position: '헌터즈 · 도살자', birthday:'', age: '22', height: '157', gen: '2', fullname:'슈슈', engname:'Chouchou', nationality: '프랑스 · 스타레인 슬럼 보육원', },
  { id: 4, initials: '오', name: '오르티', position: '헌터즈 · 천방지축', birthday:'모른다! 매일이 생일이면 좋겠도다!', age: '200', height: '166', gen: '?', fullname:'오르토스', engname:'Όρθρος', nationality: '게이트?', },
  { id: 5, initials: 'H', name: 'H', position: '이글아이 · 피곤한 리더', birthday:'', age: '33', height: '185', gen: '1', fullname:'헤르베르트 페터 슈나이더', engname:'Herbert Peter Schneider', nationality: '독일 · 스타레인',},
  { id: 6, initials: 'L', name: 'L', position: '이글아이 · 이해자', birthday:'3/20', age: '20', height: '165', gen: '1', fullname:'라비 블랑쉬 브누아', engname:'Lavi Blanche Benoit', nationality: '프랑스',},
  { id: 7, initials: 'M', name: 'M', position: '울프독 · 변덕쟁이', birthday:'7/3', age: '26', height: '188', gen: '1', fullname:'모르페우스 레지오', engname:'Morpheus Leggio', nationality: '이탈리아', },
  { id: 8, initials: '테', name: '테리 도버만', position: '울프독 · 추격자, 앙숙', birthday:'8/26', age: '24', height: '180', gen: '1.5', fullname:'테리 로이드 도버만', engname:'Terry Dobermann', nationality: '독일-미국 혼혈 · 스타레인', },
  { id: 9, initials: 'A', name: 'A', position: '울프독 · 악몽', birthday:'1/15', age: '24', height: '184', gen: '2', fullname:'앙헬 헤세 베르너', engname:'Angel Hesse Werner', nationality: '독일 · 스타레인 슬럼',
    etc:
      `
        1. 스스로 격식을 차리기 때문에(슬럼 출신이라는 것이 약한 콤플렉스로 자리해서) 평소에는 존댓말-경어를 쓰지만, 본인의 격식마저 잊을 정도로 감정이 격해지거나 충분한 친밀도가 쌓였을 때, 그리고 마지막으로... 같은 슬럼 출신이라서 따질 필요 없이 진창으로 처박힐 일만 남았을 때... 반말을 사용.
        2. 운전은 면허만 있음
      `},
  { id: 10,initials: 'I', name: 'I', position: '울프독 · 유쾌한 친구?', birthday:'', age: '24', height: '182', gen: '', fullname:'아이작', engname:'Isaac', nationality: '독일 · 스타레인 슬럼', },
  { id: 11, initials:'J', name: 'J', position: '드라칼 · 불편한 동거인, 웬수', birthday:'10/21', age: '26', height: '182', gen: '1', fullname:'주다스 데이 와이즈맨', engname:'Judas Day Wiseman', nationality: '미국 · 스타레인',},
  { id: 12, initials:'R', name: 'R', position: '언더 그라운드 · 감시관, 처형인', birthday:'6/16', age: '30', height: '185', gen: '1', fullname:'리하르트 헬무트 하이넬', engname:'Richard Helmut Heinel', nationality: '독일',
    etc:
      `
        1. 문신의 뜻은 '책임'. 불꽃처럼 올라가는 기하학적 문양.
        2. 고양이와 개 중에서는 둘 다 번거롭지만 개인시간 더 주는 동물이 좋다.
        3. 아직도 식사 예절을 엄격하게 지키는 편
        4. 헌터즈 시절, 능력 사용 중에 물대포 맞아본 적 있음
        5. 정말 안 되겠다 싶으면 본인 소유 별장으로 가서 휴가를 보냄. 주로 주변 바닷가에서 서핑을 하거나 하루종일 누워있음!
        6. 메르세데스-마이바흐 S클래스 오너
      `,},
  { id: 13, initials: 'Y', name: 'Y', position: '언더 그라운드 · 양육자', birthday:'4/23', age: '22', height: '182', gen: '3', fullname:'백연', engname:'白姸', nationality: '대한민국 전주',
    etc:
    `
      조손가정(할머니 할아버지 편히 가셨음) / 판소리 집안 출신
    `
   },
  { id: 14, initials: 'X', name: 'X', position: '언더 그라운드 · 예술가', birthday:'8/12', age: '25', height: '176', gen: '1', fullname:'위신옌', engname:'危歆魇', nationality: '홍콩', },
  { id: 15, initials: '라', name: '라멘타', position: '그림 리퍼 · 재앙', birthday:'11/27', age: '34', height: '190', gen: '1', fullname:'라멘타', engname:'Laménta', nationality: '불명', },
  { id: 16, initials: 'F', name: '하피', position: '? · 배신자', birthday:'9/15', age: '27', height: '196', gen: '1', fullname:'펠리체 에런 도버만', engname:'Felice Aaron Dobermann', nationality: '독일-미국 혼혈 · 스타레인', },
  { id: 17, initials: '루', name: '루두스', position: '그림 리퍼 · 조련사, 광대', birthday:'9/16', age: '26', height: '186', gen: '3', fullname:'루두스', engname:'Lūdus', nationality: '불명',
    etc:
      `
        각성 전, 프로레슬링 경기의 사회자 일을 했음. 청중의 반응을 유도하고 언변이 중요한 그 직군으로 쭉 이어가려고 하면서 더 큰 케이블 채널에 출연할 기회를 잡았다 싶었는데...
      `
   },
  { id: 18, initials: 'P', name: '뽀삐', position: '그림 리퍼 · 맹수', birthday:'11/7', age: '28', height: '176', gen: '1', fullname:'피에르 리오넷', engname:'Pierre', nationality: '프랑스', },
  { id: 19, initials: '느', name: '느베야', position: '그림 리퍼 · 간교한 자', birthday:'', age: '20', height: '165', gen: '?', fullname:'느베야', engname:'Nevaeh', nationality: '게이트?', },
];

const groups = [
  ['E', 'N', 'S', '오'],
  ['H', 'L'],
  ['M', '테', 'A', 'I'],
  ['J'],
  ['R', 'Y', 'X'],
  ['라', 'F', '루', 'P', '느'],
];

const colorGroups = {
  green: ["E", "N", "S", "오"],
  purple: ["H", "L"],
  blue: ["M", "테", "A", "I"],
  grayBlue: ["J"],
  red: ["R", "Y", "X"],
  gray: ["라", "F", "루", "P", "느"],
};

const colorValues = {
  green: "#a4b778",
  purple: "#af9cb8",
  blue: "#94b0b7",
  grayBlue: "#aabacc",
  red: "#b9a1a3",
  gray: "#d1d5db",
};

const circleColors = {};

Object.entries(colorGroups).forEach(([groupName, initials]) => {
  initials.forEach(initial => {
    circleColors[initial] = colorValues[groupName];
  });
});


const borderColorValues = {
  green: "#595f4b",
  purple: "#683c7a",
  blue: "#316d7d",
  grayBlue: "#5e7185",
  red: "#8c323b",
  gray: "#111111",
};

const borderColors = {};

Object.entries(colorGroups).forEach(([groupName, initials]) => {
  initials.forEach(initial => {
    borderColors[initial] = borderColorValues[groupName];
  });
});


const titles = {

  'E': {
    'J': [
      { text: 'J 군', isSpoiler: false },
      { text: '작은 와이즈맨', isSpoiler: true }
    ],
    'R': [
      { text: 'R 군', isSpoiler: false },
      { text: '하이넬', isSpoiler: true }
    ],
    '테': [
      { text: '테리', isSpoiler: false }
    ],
    'F': [
      { text: 'F', isSpoiler: false }
    ],
    'A': [
      { text: '베르너 군', isSpoiler: true }
    ],
    'L': [
      { text: '라비', isSpoiler: true },
      { text: 'L 군', isSpoiler: false }
    ],
    'N': [
      { text: 'N', isSpoiler: false },
      { text: '큰 와이즈맨', isSpoiler: true }
    ],
    'Y': [
      { text: 'Y', isSpoiler: false },
      { text: '백', isSpoiler: true }
    ],
    'M': [
      { text: '레지오', isSpoiler: true }
    ],
    'X': [
      { text: 'X 군', isSpoiler: false }
    ],
    '오': [
      { text: '오르티', isSpoiler: false }
    ],
    '라': [
      { text: '그 녀석', isSpoiler: false }
    ],
    '루': [
      { text: '그 녀석의 수하', isSpoiler: false }
    ],
    'P': [
      { text: 'P 군', isSpoiler: false }
    ],
    '느': [
      { text: '작은 아이?', isSpoiler: false }
    ],
    'S': [
      { text: 'S', isSpoiler: false },
      { text: '딸 같은 아이', isSpoiler: false }
    ],
    'I': [
      { text: '가여운 청년', isSpoiler: false },
    ],
    'H': [
      { text: 'H 군', isSpoiler: false },
      { text: '슈나이더 군', isSpoiler: true },
    ],
  },

  'N': {
    'J': [
      { text: '야', isSpoiler: false },
      { text: '너', isSpoiler: false },
      { text: '저 새끼', isSpoiler: false }
    ],
    'R': [
      { text: '미친 새끼', isSpoiler: false },
      { text: '브루주아 놈', isSpoiler: false }
    ],
    '테': [
      { text: '테리', isSpoiler: false }
    ],
    'F': [
      { text: '에런', isSpoiler: true },
      { text: '절친', isSpoiler: false }
    ],
    'A': [
      { text: 'Kiddo', isSpoiler: false }
    ],
    'L': [
      { text: '토끼', isSpoiler: false }
    ],
    'E': [
      { text: '선배', isSpoiler: false },
      { text: '삼촌', isSpoiler: false }
    ],
    'Y': [
      { text: '하얀 말랑이', isSpoiler: false }
    ],
    'M': [
      { text: '가면남', isSpoiler: false }
    ],
    'X': [
      { text: '그 미친 놈', isSpoiler: false }
    ],
    '오': [
      { text: '오르티', isSpoiler: false },
      { text: '용용이', isSpoiler: false }
    ],
    '라': [
      { text: '또라이', isSpoiler: false }
    ],
    '루': [
      { text: '광대', isSpoiler: false }
    ],
    'P': [
      { text: '영웅?', isSpoiler: false }
    ],
    '느': [
      { text: '상어토끼', isSpoiler: false }
    ],
    'S': [
      { text: '솜사탕', isSpoiler: false }
    ],
    'I': [
      { text: '슬럼의 걔', isSpoiler: false }
    ],
    'H': [
      { text: '헤베', isSpoiler: true }
    ],
  },

  'S': {
    'J': [
      { text: '드라칼 리더님', isSpoiler: false }
    ],
    'R': [
      { text: '무시무시한 분!', isSpoiler: false }
    ],
    '테': [
      { text: '테리 오빠', isSpoiler: false }
    ],
    'F': [
      { text: '영웅', isSpoiler: false }
    ],
    'A': [
      { text: '베르링', isSpoiler: true }
    ],
    'L': [
      { text: '폭신토끼', isSpoiler: false }
    ],
    'E': [
      { text: '선배', isSpoiler: false },
      { text: '삼촌', isSpoiler: false },
      { text: '리더 님', isSpoiler: false },
    ],
    'N': [
      { text: '언니', isSpoiler: false },
    ],
    'Y': [
      { text: '백 오빠', isSpoiler: true }
    ],
    'M': [
      { text: '안경 오빠', isSpoiler: false }
    ],
    'X': [
      { text: '마른 사람', isSpoiler: false }
    ],
    '오': [
      { text: '오르링', isSpoiler: false },
      { text: '용용이', isSpoiler: false }
    ],
    '라': [
      { text: '기분 나쁜 사람', isSpoiler: false }
    ],
    '루': [
      { text: '무서운 광대!', isSpoiler: false }
    ],
    'P': [
      { text: '영웅…?', isSpoiler: false }
    ],
    '느': [
      { text: '뾰족상어', isSpoiler: false }
    ],
    'H': [
      { text: 'H 선생님!', isSpoiler: false }
    ],
    'I': [
      { text: '이삭 오빠', isSpoiler: true }
    ],
  },

  '오': {
    'J': [
      { text: '까망이!', isSpoiler: false }
    ],
    'R': [
      { text: '화르륵!', isSpoiler: false }
    ],
    '테': [
      { text: '짜릿짜릿!', isSpoiler: false }
    ],
    'F': [
      { text: '팔락이', isSpoiler: false },
      { text: '하피', isSpoiler: false }
    ],
    'A': [
      { text: '딱딱이', isSpoiler: false }
    ],
    'L': [
      { text: '리퍼가 따라한 인간', isSpoiler: false }
    ],
    'E': [
      { text: '반짝이', isSpoiler: false }
    ],
    'N': [
      { text: '누나', isSpoiler: false },
      { text: '초콜릿 잘 주는 인간', isSpoiler: false },
      { text: '쌩쌩이', isSpoiler: false }
    ],
    'Y': [
      { text: '하양이', isSpoiler: false }
    ],
    'M': [
      { text: '슬라임', isSpoiler: false }
    ],
    'X': [
      { text: '하늘이', isSpoiler: false }
    ],
    '라': [
      { text: '비린내 나는 인간', isSpoiler: false }
    ],
    '루': [
      { text: '펑펑이', isSpoiler: false }
    ],
    'P': [
      { text: '으르렁!', isSpoiler: false }
    ],
    '느': [
      { text: '뾰족이', isSpoiler: false },
      { text: '이 몸의 백성?', isSpoiler: true }
    ],
    'S': [
      { text: '폭신이!', isSpoiler: false }
    ],
    'I': [
      { text: '둥실이', isSpoiler: false }
    ],
    'H': [
      { text: '쑥쑥이', isSpoiler: false }
    ],
  },

  'H': {
    'J': [
      { text: 'J', isSpoiler: false },
      { text: '작은 와이즈맨', isSpoiler: true },
    ],
    'R': [
      { text: 'R', isSpoiler: false },
      { text: '하이넬', isSpoiler: true },
    ],
    '테': [
      { text: '테리', isSpoiler: false },
      { text: '제일 많이 다치는 걔', isSpoiler: false },
    ],
    'F': [
      { text: 'F', isSpoiler: false },
      { text: '영웅', isSpoiler: false }
    ],
    'A': [
      { text: '병원이 리스폰 장소', isSpoiler: false },
      { text: '인 줄 아는 멍청이', isSpoiler: false }
    ],
    'L': [
      { text: '쪼꼬미', isSpoiler: false }
    ],
    'E': [
      { text: '형님', isSpoiler: false }
    ],
    'N': [
      { text: 'N', isSpoiler: false },
      { text: '큰 와이즈맨', isSpoiler: true },
    ],
    'Y': [
      { text: 'Y', isSpoiler: false },
      { text: '소화제 받아가는 걔', isSpoiler: false },
    ],
    'M': [
      { text: 'M', isSpoiler: false },
      { text: '레지오', isSpoiler: true },
    ],
    'X': [
      { text: '나갔으면 좋겠는 걔', isSpoiler: false }
    ],
    '라': [
      { text: '거슬리는 놈', isSpoiler: false }
    ],
    '루': [
      { text: '현장 뛰게 만드는', isSpoiler: false },
      { text: '광대놈', isSpoiler: false },
    ],
    'P': [
      { text: '피에르', isSpoiler: true }
    ],
    '느': [
      { text: '꼬맹이', isSpoiler: false },
    ],
    'S': [
      { text: '건강한 애', isSpoiler: false }
    ],
    'I': [
      { text: '요주의 인물', isSpoiler: false }
    ],
    '오': [
      { text: '용용이', isSpoiler: false }
    ],
  },

  'L': {
    'J': [
      { text: '형', isSpoiler: false }
    ],
    'R': [
      { text: '아저씨', isSpoiler: false },
      { text: '삼촌', isSpoiler: false },
      { text: '리리', isSpoiler: true }
    ],
    '테': [
      { text: '테리테리', isSpoiler: false }
    ],
    'F': [
      { text: '형', isSpoiler: false }
    ],
    'A': [
      { text: 'A 씨', isSpoiler: false },
      { text: '헤시', isSpoiler: true },
      { text: '형', isSpoiler: false }
    ],
    'E': [
      { text: '삼촌', isSpoiler: false }
    ],
    'N': [
      { text: '누나', isSpoiler: false }
    ],
    'Y': [
      { text: '형', isSpoiler: false }
    ],
    'M': [
      { text: '형', isSpoiler: false }
    ],
    'X': [
      { text: '형', isSpoiler: false },
      { text: '가끔 누나', isSpoiler: false }
    ],
    '오': [
      { text: '오리오리', isSpoiler: false }
    ],
    '라': [
      { text: '불쌍한 사람', isSpoiler: false }
    ],
    '루': [
      { text: '연결된 사람', isSpoiler: false }
    ],
    'P': [
      { text: '형', isSpoiler: false },
      { text: '뽀삐', isSpoiler: false }
    ],
    '느': [
      { text: '뱀', isSpoiler: false }
    ],
    'S': [
      { text: '누나', isSpoiler: false }
    ],
    'I': [
      { text: '삶이 보이는 자', isSpoiler: false }
    ],
    'H': [
      { text: '삼촌', isSpoiler: false }
    ],
  },

  'M': {
    'J': [
      { text: '와이즈맨', isSpoiler: true },
      { text: 'J', isSpoiler: false }
    ],
    'R': [
      { text: 'R 씨', isSpoiler: false }
    ],
    '테': [
      { text: '테리 군', isSpoiler: false }
    ],
    'F': [
      { text: 'F', isSpoiler: false }
    ],
    'A': [
      { text: 'A 군', isSpoiler: false }
    ],
    'L': [
      { text: 'L', isSpoiler: false },
      { text: '어린 아이', isSpoiler: false }
    ],
    'E': [
      { text: '선배님', isSpoiler: false }
    ],
    'N': [
      { text: 'N 씨', isSpoiler: false }
    ],
    'Y': [
      { text: 'Y 씨', isSpoiler: false }
    ],
    'X': [
      { text: '그 미친놈', isSpoiler: false }
    ],
    '오': [
      { text: '드래곤?', isSpoiler: false },
      { text: '용?', isSpoiler: false }
    ],
    '라': [
      { text: '라멘타', isSpoiler: false }
    ],
    '루': [
      { text: '루두스', isSpoiler: false }
    ],
    'P': [
      { text: 'P', isSpoiler: false }
    ],
    '느': [
      { text: '제사장', isSpoiler: false }
    ],
    'S': [
      { text: 'S 양', isSpoiler: false }
    ],
    'I': [
      { text: 'I 군', isSpoiler: false }
    ],
    'H': [
      { text: 'H 씨', isSpoiler: false }
    ],
  },

  '테': {
    'J': [{ text: '형', isSpoiler: false }],
    'R': [{ text: '슨배임', isSpoiler: false }],
    'F': [{ text: '배신자', isSpoiler: false }, { text: '에런', isSpoiler: true }],
    'A': [{ text: '저 새끼', isSpoiler: false }, { text: '그 새끼', isSpoiler: false }, { text: '베르너', isSpoiler: true }],
    'L': [{ text: '라비라비', isSpoiler: true }],
    'E': [{ text: '선배', isSpoiler: false }, { text: '대부님', isSpoiler: false }],
    'N': [{ text: '누님', isSpoiler: false }],
    'Y': [{ text: '와이와이', isSpoiler: false }],
    'M': [{ text: '형님', isSpoiler: false }],
    'X': [{ text: '형', isSpoiler: false }, { text: '은인', isSpoiler: false }],
    '오': [{ text: '용용이', isSpoiler: false }],
    '라': [{ text: '씨발 새끼', isSpoiler: false }],
    '루': [{ text: '광대', isSpoiler: false }],
    'P': [{ text: '선배', isSpoiler: false }],
    '느': [{ text: '라비라비랑', isSpoiler: true }, { text: '비슷하게 생긴 걔', isSpoiler: false }],
    'S': [
      { text: '슈시', isSpoiler: true }
    ],
    'I': [
      { text: '아이쟝', isSpoiler: true },
      { text: '이작', isSpoiler: true },
      { text: '아이아이', isSpoiler: false },
    ],
    'H': [
      { text: '형님', isSpoiler: false }
    ],
  },

  'A': {
    'J': [
      { text: '선배님', isSpoiler: false },
      { text: 'J 님', isSpoiler: false }
    ],
    'R': [
      { text: '선배님', isSpoiler: false },
      { text: 'R 님', isSpoiler: false }
    ],
    '테': [
      { text: '그 새끼', isSpoiler: false },
      { text: '저 새끼', isSpoiler: false },
      { text: '도버만', isSpoiler: false }
    ],
    'F': [
      { text: '선배', isSpoiler: false },
      { text: '배신자', isSpoiler: false }
    ],
    'L': [
      { text: 'L 군', isSpoiler: false },
      { text: '당신', isSpoiler: false },
      { text: '블리', isSpoiler: true }
    ],
    'E': [
      { text: '선배님', isSpoiler: false },
      { text: 'E 님', isSpoiler: false }
    ],
    'N': [
      { text: '누님', isSpoiler: false }
    ],
    'Y': [
      { text: 'Y 씨', isSpoiler: false }
    ],
    'M': [
      { text: '선배님', isSpoiler: false },
      { text: 'M 씨', isSpoiler: false }
    ],
    'X': [
      { text: '그 남자', isSpoiler: false }
    ],
    '오': [
      { text: '오르티', isSpoiler: false }
    ],
    '라': [
      { text: '악인', isSpoiler: false }
    ],
    '루': [
      { text: '시끄러운 광대', isSpoiler: false }
    ],
    'P': [
      { text: '강아지', isSpoiler: false }
    ],
    '느': [
      { text: '처분대상', isSpoiler: false }
    ],
    'S': [
      { text: '슈시', isSpoiler: true },
      { text: '(테리가 따라한 거)', isSpoiler: false },
    ],
    'I': [
      { text: '아이작', isSpoiler: true },
    ],
    'H': [
      { text: 'H 선배님', isSpoiler: false }
    ],
  },

  'I': {
    'J': [
      { text: '선배님', isSpoiler: false },
    ],
    'R': [
      { text: 'R 선배', isSpoiler: false },
    ],
    '테': [
      { text: '테리', isSpoiler: false },
    ],
    'F': [
      { text: '영웅이었던 것', isSpoiler: false },
    ],
    'L': [
      { text: '토끼 친구', isSpoiler: false },
    ],
    'E': [
      { text: '선배님', isSpoiler: false },
    ],
    'N': [
      { text: '그 여자', isSpoiler: false }
    ],
    'Y': [
      { text: '흰 친구', isSpoiler: false }
    ],
    'M': [
      { text: '선배', isSpoiler: false },
    ],
    'X': [
      { text: '예술가 친구', isSpoiler: false },
      { text: '기분 나쁜 것', isSpoiler: true },
    ],
    '오': [
      { text: '오르티', isSpoiler: false },
      { text: '용용이', isSpoiler: false },
    ],
    '라': [
      { text: '미친 새끼', isSpoiler: false }
    ],
    '루': [
      { text: '광대', isSpoiler: false }
    ],
    'P': [
      { text: '가죽만 남은 것', isSpoiler: false }
    ],
    '느': [
      { text: '상어토끼', isSpoiler: false }
    ],
    'S': [
      { text: '슈슈', isSpoiler: true },
    ],
    'A': [
      { text: '베르너', isSpoiler: true },
    ],
    'H': [
      { text: '의사 쌤', isSpoiler: false }
    ],
  },

  'J': { 
    'R': [{ text: 'R', isSpoiler: false }, { text: '그 사람', isSpoiler: false }, { text: 'R씨', isSpoiler: false }],
    '테': [{ text: '테리', isSpoiler: false }],
    'F': [{ text: '그', isSpoiler: false }, { text: 'F', isSpoiler: false }, { text: '에런/페피', isSpoiler: true }],
    'A': [{ text: 'A 군', isSpoiler: false }],
    'L': [{ text: 'L', isSpoiler: false }, { text: '라비', isSpoiler: true }],
    'E': [{ text: '선배님', isSpoiler: false }, { text: 'E 님', isSpoiler: false }],
    'N': [{ text: '야', isSpoiler: false }, { text: '걔', isSpoiler: false }, { text: '가끔 누나', isSpoiler: false }],
    'Y': [{ text: 'Y 군', isSpoiler: false }],
    'M': [{ text: '레지오', isSpoiler: true }],
    'X': [{ text: 'X 씨', isSpoiler: false }],
    '오': [{ text: '오르티', isSpoiler: false }],
    '라': [{ text: '사살 대상', isSpoiler: false }],
    '루': [{ text: '루두스', isSpoiler: false }],
    'P': [{ text: 'P', isSpoiler: false }],
    '느': [{ text: '느베야', isSpoiler: false }],
    'S': [
      { text: 'S 양', isSpoiler: false },
    ],
    'I': [
      { text: 'I 군', isSpoiler: false },
    ],
    'H': [
      { text: '형님', isSpoiler: false }
    ],
  },

  'R': {
    'J': [{ text: 'J', isSpoiler: false }, { text: '그 사람', isSpoiler: false }, { text: 'J 씨', isSpoiler: false }],
    '테': [{ text: '도버만 군', isSpoiler: false }],
    'F': [{ text: '그거', isSpoiler: false }],
    'A': [{ text: 'A 군', isSpoiler: false }],
    'L': [{ text: '블랑쉬', isSpoiler: true }, { text: '라비', isSpoiler: true }, { text: 'L', isSpoiler: false }],
    'E': [{ text: '선배님', isSpoiler: false }],
    'N': [{ text: '미친 여자', isSpoiler: false }, { text: 'N', isSpoiler: false }],
    'Y': [{ text: 'Y 군', isSpoiler: false }],
    'M': [{ text: 'M', isSpoiler: false }],
    'X': [{ text: '걔', isSpoiler: false }],
    '오': [{ text: '작은 용', isSpoiler: false }],
    '라': [{ text: '쓰레기 하나', isSpoiler: false }],
    '루': [{ text: '시끄러운 놈', isSpoiler: false }],
    'P': [{ text: 'P', isSpoiler: false }, { text: '시체', isSpoiler: false }],
    '느': [{ text: '까다로운 것', isSpoiler: false }],
    'S': [
      { text: '솜사탕', isSpoiler: false },
    ],
    'I': [
      { text: '영입 대상', isSpoiler: false },
    ],
    'H': [
      { text: '의사', isSpoiler: false },
      { text: '헤리', isSpoiler: true },
    ],
  },

  'Y': {
    'J': [
      { text: 'J 선배님', isSpoiler: false }
    ],
    'R': [
      { text: 'R 선배님', isSpoiler: false }
    ],
    '테': [
      { text: '선배님', isSpoiler: false },
      { text: '형님', isSpoiler: false }
    ],
    'F': [
      { text: '영웅', isSpoiler: false }
    ],
    'A': [
      { text: '선배님', isSpoiler: false },
      { text: '형님', isSpoiler: false }
    ],
    'L': [
      { text: 'L 님', isSpoiler: false }
    ],
    'E': [
      { text: '선배님', isSpoiler: false }
    ],
    'N': [
      { text: '누님', isSpoiler: false }
    ],
    'M': [
      { text: '선배님', isSpoiler: false }
    ],
    'X': [
      { text: '챙겨줘야 하는 선배님', isSpoiler: false }
    ],
    '오': [
      { text: '용용이', isSpoiler: false }
    ],
    '라': [
      { text: '이상하신 분', isSpoiler: false }
    ],
    '루': [
      { text: '영웅님의 서방님…?', isSpoiler: false }
    ],
    'P': [
      { text: '영웅', isSpoiler: false }
    ],
    '느': [
      { text: '어린 아이…?', isSpoiler: false }
    ],
    'S': [
      { text: '잘 먹는 아씨', isSpoiler: false },
    ],
    'I': [
      { text: '박카스 챙겨드려야', isSpoiler: false },
      { text: '하는 분', isSpoiler: false },
    ],
    'H': [
      { text: '항상 감사한 선배님', isSpoiler: false },
    ],
  },

  'X': {
    'J': [
      { text: '선배', isSpoiler: false },
      { text: '형', isSpoiler: false }
    ],
    'R': [
      { text: '주인님', isSpoiler: false }
    ],
    '테': [
      { text: '테리', isSpoiler: false }
    ],
    'F': [
      { text: '형님', isSpoiler: false }
    ],
    'A': [
      { text: '베르너', isSpoiler: true }
    ],
    'L': [
      { text: '작고 귀여운 아이', isSpoiler: false }
    ],
    'E': [
      { text: '선배님', isSpoiler: false }
    ],
    'N': [
      { text: '언니', isSpoiler: false },
      { text: '누나', isSpoiler: false }
    ],
    'Y': [
      { text: 'Y 군', isSpoiler: false }
    ],
    'M': [
      { text: '개새끼', isSpoiler: false }
    ],
    '오': [
      { text: '오르티', isSpoiler: false }
    ],
    '라': [
      { text: '예술가', isSpoiler: false }
    ],
    '루': [
      { text: '연출가', isSpoiler: false }
    ],
    'P': [
      { text: 'P', isSpoiler: false }
    ],
    '느': [
      { text: '열매', isSpoiler: false }
    ],
    'S': [
      { text: '동생', isSpoiler: false },
    ],
    'I': [
      { text: '동류', isSpoiler: false },
    ],
    'H': [
      { text: '튕기는 분', isSpoiler: false },
    ],
  },

  'F': {
    'J': [
      { text: '주다스', isSpoiler: true },
      { text: '주디', isSpoiler: true }
    ],
    'R': [
      { text: '리하르트', isSpoiler: true },
      { text: '개새끼', isSpoiler: false }
    ],
    '테': [
      { text: '로이드', isSpoiler: true }
    ],
    'A': [
      { text: '배트맨', isSpoiler: false }
    ],
    'L': [
      { text: '라비', isSpoiler: true },
      { text: '작은 토끼', isSpoiler: false }
    ],
    'E': [
      { text: '형님', isSpoiler: false }
    ],
    'N': [
      { text: '니니', isSpoiler: false },
      { text: '내 절친', isSpoiler: false }
    ],
    'Y': [
      { text: '어리고 하얀 친구', isSpoiler: false }
    ],
    'M': [
      { text: '레지오', isSpoiler: true }
    ],
    'X': [
      { text: '예예', isSpoiler: false }
    ],
    '오': [
      { text: '오르토스', isSpoiler: false }
    ],
    '라': [
      { text: '그 양반', isSpoiler: false }
    ],
    '루': [
      { text: '루디', isSpoiler: false }
    ],
    'P': [
      { text: '피에르', isSpoiler: true }
    ],
    '느': [
      { text: '작은 상어 토끼', isSpoiler: false }
    ],
    'S': [
      { text: '슈시', isSpoiler: true },
      { text: '복숭아 토끼', isSpoiler: false },
    ],
    'I': [
      { text: '새 영웅?', isSpoiler: false },
    ],
    'H': [
      { text: '헤리', isSpoiler: true },
    ],
  },

  '라': {
    'J': [
      { text: '깨닫지 못한 자', isSpoiler: false }
    ],
    'R': [
      { text: '닮되 닮지 못한 자', isSpoiler: false }
    ],
    '테': [
      { text: '어리석은 개', isSpoiler: false }
    ],
    'F': [
      { text: '위대한 존재를 잇는 자', isSpoiler: false }
    ],
    'A': [
      { text: '길가를 나도는 개', isSpoiler: false }
    ],
    'L': [
      { text: '선악과', isSpoiler: false }
    ],
    'E': [
      { text: '잘못된 신념을 품은 자', isSpoiler: false }
    ],
    'N': [
      { text: '진창에 빠짐을 모르는 자', isSpoiler: false }
    ],
    'Y': [
      { text: '눈이 가려진 가여운 자', isSpoiler: false }
    ],
    'M': [
      { text: '잃어버린 자', isSpoiler: false }
    ],
    'X': [
      { text: '이해자', isSpoiler: false }
    ],
    '오': [
      { text: '위대한 존재 중 하나', isSpoiler: false }
    ],
    '루': [
      { text: '나의 오른팔', isSpoiler: false }
    ],
    'P': [
      { text: '나의 맹수', isSpoiler: false }
    ],
    '느': [
      { text: '내 아이', isSpoiler: true }
    ],
    'S': [
      { text: '탐식에 눈이 가려진 자', isSpoiler: false },
    ],
    'I': [
      { text: '앞길을 보지 못하는 자', isSpoiler: false },
    ],
    'H': [
      { text: '생명의 근원 되는 자', isSpoiler: false },
    ],
  },

  '루': {
    'J': [
      { text: '쇼를 방해하는 과묵하신 분', isSpoiler: false }
    ],
    'R': [
      { text: '가장 거슬리는 분', isSpoiler: false }
    ],
    '테': [
      { text: '멍청한 강아지', isSpoiler: false }
    ],
    'F': [
      { text: '내 사랑의 옛 동료', isSpoiler: false }
    ],
    'A': [
      { text: '처음 보는 개', isSpoiler: false }
    ],
    'L': [
      { text: '관전자', isSpoiler: false }
    ],
    'E': [
      { text: '안타까우신 분', isSpoiler: false }
    ],
    'N': [
      { text: '쇼를 망치는 분', isSpoiler: false }
    ],
    'Y': [
      { text: '보물을 숨긴 분', isSpoiler: false }
    ],
    'M': [
      { text: '화려한 배우', isSpoiler: false }
    ],
    'X': [
      { text: '연출가', isSpoiler: false }
    ],
    '오': [
      { text: '위대하신 분', isSpoiler: false }
    ],
    '라': [
      { text: '교주님', isSpoiler: false }
    ],
    'P': [
      { text: '내 사랑', isSpoiler: false },
      { text: '나의 맹수', isSpoiler: false }
    ],
    '느': [
      { text: '위대한 제사장', isSpoiler: false }
    ],
    'S': [
      { text: '대단한 능력을 지닌 분', isSpoiler: false },
    ],
    'I': [
      { text: '가면을 쓴 분', isSpoiler: false },
    ],
    'H': [
      { text: '나타나면 방해되는 분', isSpoiler: false },
    ],
  },

  'P': {
    'J': [
      { text: '깜짝 놀라는 애', isSpoiler: false }
    ],
    'R': [
      { text: '뜨거운 애', isSpoiler: false }
    ],
    '테': [
      { text: '멍멍이!', isSpoiler: false }
    ],
    'F': [
      { text: '하피~ 하피!', isSpoiler: false }
    ],
    'A': [
      { text: '공 던져주는 애', isSpoiler: false }
    ],
    'L': [
      { text: '친구?', isSpoiler: false }
    ],
    'E': [
      { text: '따뜻한 아저씨', isSpoiler: false }
    ],
    'N': [
      { text: '같이 놀아주는 친구', isSpoiler: false }
    ],
    'Y': [
      { text: '밥을 챙겨주는 좋은 사람', isSpoiler: false }
    ],
    'M': [
      { text: '사탕을 주는 인간', isSpoiler: false }
    ],
    'X': [
      { text: '인형놀이 친구', isSpoiler: false }
    ],
    '오': [
      { text: '용용이', isSpoiler: false }
    ],
    '라': [
      { text: '교주님', isSpoiler: false }
    ],
    '루': [
      { text: '내 사랑', isSpoiler: false }
    ],
    '느': [
      { text: '느베야! 느베야!', isSpoiler: false }
    ],
    'S': [
      { text: '매일 맛있는 걸 주는 인간!', isSpoiler: false },
    ],
    'I': [
      { text: '왜 그런 눈으로 보는지', isSpoiler: false },
      { text: '모를 인간', isSpoiler: false },
    ],
    'H': [
      { text: '맛없는 사탕 인간', isSpoiler: false },
    ],
  },

  '느': {
    'J': [
      { text: '선글라스 바보', isSpoiler: false },
      { text: '억제하는 자', isSpoiler: true },

    ],
    'R': [
      { text: '화르륵 삐죽이', isSpoiler: false },
      { text: '단죄하는 자', isSpoiler: true },
    ],
    '테': [
      { text: '따끔따끔 바보!', isSpoiler: false },
      { text: '눈 가려진 자', isSpoiler: true },
    ],
    'F': [
      { text: '하피!', isSpoiler: false },
      { text: '위대한 피를 이은 자', isSpoiler: true },
    ],
    'A': [
      { text: '무시무시한 애!', isSpoiler: false },
      { text: '꿰뚫는 자', isSpoiler: true },
    ],
    'L': [
      { text: '싫은 애', isSpoiler: false },
      { text: '선악과', isSpoiler: true },
    ],
    'E': [
      { text: '안경 쓴 번쩍이', isSpoiler: false },
      { text: '흔들고 싶은 자', isSpoiler: true },
    ],
    'N': [
      { text: '치타같은 누나', isSpoiler: false },
      { text: '빛을 잇는 자', isSpoiler: true },
    ],
    'Y': [
      { text: '온통 하얀 친구', isSpoiler: false },
      { text: '위대한 종족을 숨기는 자', isSpoiler: true },
    ],
    'M': [
      { text: '재밌는 애', isSpoiler: false },
      { text: '레지오', isSpoiler: true },
    ],
    'X': [
      { text: '이상한 애', isSpoiler: false },
      { text: '홀리고 싶은 애', isSpoiler: true },
    ],
    '오': [
      { text: '기분 나쁜 애', isSpoiler: false },
      { text: '위대한 군주', isSpoiler: true },
    ],
    '라': [
      { text: '파파', isSpoiler: true },
    ],
    '루': [
      { text: '루디', isSpoiler: false },
      { text: '연결된 존재', isSpoiler: true },
    ],
    'P': [
      { text: '뽀삐', isSpoiler: false },
      { text: '심겨진 자', isSpoiler: true },
    ],
    'S': [
      { text: '말랑한 애', isSpoiler: false },
      { text: '친해지고 싶은 애!', isSpoiler: true },
    ],
    'I': [
      { text: '속일 수 없는 애', isSpoiler: false },
      { text: '가면쓴 자', isSpoiler: true },
    ],
    'H': [
      { text: '피곤해 보이는 아저씨', isSpoiler: false },
      { text: '위대한 생명의 싹', isSpoiler: true },
    ],
  },

};

const subMenus = ['총장 인사말', '연혁', '부서 소개', '직원 소개'];

const menuLinks = {
  "총장 인사말": "/hello",
  "연혁": "/timeline",
  "부서 소개": "/teamintro",
  "직원 소개": "/memberintro",
};



function MemberIntroPage() {
  const [selected, setSelected] = useState(null);
  const [activeMenu, setActiveMenu] = useState('직원 소개'); // 현재 선택된 메뉴
  const [revealedTitles, setRevealedTitles] = useState(new Set());
  const handleReveal = (sel, target, idx) => {
    setRevealedTitles(prev => new Set(prev).add(`${sel}-${target}-${idx}`));
  };

  const [revealedFields, setRevealedFields] = useState({
    fullname: false,
    nationality: false,
  });

  


  return (
    <MainLayout>
      <PageLayout
        title="직원 소개"
        sidebar={MENU_PROPS['유니온 소개']}
      >
        <div className="flex flex-col items-center space-y-4 w-full">
            {groups.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center flex-wrap max-w-4xl w-full">
            {row.map((initial) => {
              const emp = employees.find(e => e.initials === initial);
              if (!emp) return null;
              return (
                <div key={emp.id} className="flex flex-col items-center" style={{minWidth:"9rem", minHeight:"10rem", alignItems: "center"}}>
                  <button
                    onClick={() => 
                      {
                        setSelected(emp);
                        setRevealedFields({
                          fullname: false,
                          nationality: false,
                        });    
                      }             
                    }
                    className={`w-20 h-20 flex items-center justify-center text-xl font-bold`}
                    style={{
                      backgroundColor: circleColors[initial],
                      border: selected?.initials === initial ? `3px solid ${borderColors[initial]}` : "none",
                      borderRadius: "9999px",
                    }}
                  >
                    {emp.initials}
                  </button>
                  {selected && selected.initials !== emp.initials && (
                    <div className="mt-2 text-xs text-gray-700 flex flex-col items-center">
                      {(titles[selected.initials]?.[emp.initials] || [{ text: '-', isSpoiler: false }]).map((title, idx) => (
                        <div
                          key={`${title.text}-${idx}`}
                          className={`cursor-pointer ${revealedTitles.has(`${selected.initials}-${emp.initials}-${idx}`) || !title.isSpoiler
                            ? 'transition-all duration-300 blur-none'
                            : 'transition-none blur-xs'}`}
                          onClick={() => handleReveal(selected.initials, emp.initials, idx)}
                        >
                          {title.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}



        </div>

        {/* 선택한 직원 정보 출력 */}
        {selected && (
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
            <p className="text-lg text-gray-700 mb-6">{selected.position}</p>

            <div className="grid grid-cols-2 lg:max-w-lg mx-auto text-left">
              <div className="border border-gray-300 p-4">
                <p className="text-xs text-gray-500 mb-1">생일</p>
                <p className="text-sm font-medium">{selected.birthday}</p>
              </div>
              <div className="border-b border-r border-t border-gray-300 p-4">
                <p className="text-xs text-gray-500 mb-1">나이</p>
                <p className="text-sm font-medium">{selected.age}세</p>
              </div>
              <div className="border-b border-l border-r border-gray-300 p-4">
                <p className="text-xs text-gray-500 mb-1">키</p>
                <p className="text-sm font-medium">{selected.height}cm</p>
              </div>
              <div className="border-b border-r border-gray-300 p-4">
                <p className="text-xs text-gray-500 mb-1">세대</p>
                <p className="text-sm font-medium">{selected.gen}세대</p>
              </div>
              <div className="border-b border-l border-r border-gray-300 p-4">
                <p className="text-xs text-gray-500 mb-1">본명</p>
                <p
                  className={`text-sm font-medium cursor-pointer ${
                    revealedFields.fullname
                      ? 'transition-[filter] duration-300 ease-out blur-none'
                      : 'transition-none [filter:blur(5px)]'
                  }`}
                  onClick={() => setRevealedFields({ ...revealedFields, fullname: true })}
                >
                  {selected.fullname}<br/>
                  {selected.engname}
                </p>
              </div>
              <div className="border-b border-r border-gray-300 p-4">
                <p className="text-xs text-gray-500 mb-1">출신</p>
                <p
                  className={`text-sm font-medium cursor-pointer ${
                    revealedFields.nationality
                      ? 'transition-[filter] duration-300 ease-out blur-none'
                      : 'transition-none [filter:blur(5px)]'
                  }`}
                  onClick={() => setRevealedFields({ ...revealedFields, nationality: true })}
                >
                  {selected.nationality}
                </p>
              </div>
              <div className="col-span-2 p-4 border-b border-l border-r border-gray-300">
                <p className="text-xs text-gray-500 mb-1">기타</p>
                <p className="text-sm font-medium whitespace-pre-line">{selected.etc}</p>
              </div>
            </div>
          </div>
        )}

      </PageLayout>
    </MainLayout>
  );
}

export default MemberIntroPage;
