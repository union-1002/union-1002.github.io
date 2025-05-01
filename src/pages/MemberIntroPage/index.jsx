import { useState } from 'react';
import MainLayout from '@/shared/MainLayout';
import PageLayout from '@/shared/PageLayout';
import { MENU_PROPS } from '@/shared/SideNavigationBar';



const employees = [
  { id: 1, initials: 'E', name: 'E', position: '헌터즈' },
  { id: 2, initials: 'N', name: 'N', position: '헌터즈' },
  { id: 3, initials: 'S', name: 'S', position: '헌터즈' },
  { id: 4, initials: '오', name: '오르티', position: '헌터즈' },
  { id: 5, initials: 'H', name: 'H', position: '이글아이'},
  { id: 6, initials: 'L', name: 'L', position: '이글아이'},
  { id: 7, initials: 'M', name: 'M', position: '울프독' },
  { id: 8, initials: '테', name: '테리 도버만', position: '울프독' },
  { id: 9, initials: 'A', name: 'A', position: '울프독' },
  { id: 10,initials: 'I', name: 'I', position: '울프독' },
  { id: 11, initials:'J', name: 'J', position: '드라칼'},
  { id: 12, initials:'R', name: 'R', position: '언더그라운드' },
  { id: 13, initials: 'Y', name: 'Y', position: '언더그라운드' },
  { id: 14, initials: 'X', name: 'X', position: '언더그라운드' },
  { id: 15, initials: '라', name: '라멘타', position: '그림리퍼' },
  { id: 16, initials: 'F', name: '하피', position: '그림리퍼' },
  { id: 17, initials: '루', name: '루두스', position: '그림리퍼' },
  { id: 18, initials: 'P', name: '뽀삐', position: '그림리퍼' },
  { id: 19, initials: '느', name: '느베야', position: '그림리퍼' },
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
                    onClick={() => setSelected(emp)}
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
            <p className="text-lg text-gray-700">{selected.position}</p>
          </div>
        )}

      </PageLayout>
    </MainLayout>
  );
}

export default MemberIntroPage;
