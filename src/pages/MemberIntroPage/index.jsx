import { useState } from 'react';
import { Link } from 'react-router';
import MainLayout from '@/shared/MainLayout';



const employees = [
  { id: 1, initials: 'E', name: 'E', position: '헌터즈' },
  { id: 2, initials: 'N', name: 'N', position: '헌터즈' },
  { id: 3, initials: 'S', name: 'S', position: '헌터즈' },
  { id: 4, initials: '오', name: '오르티', position: '헌터즈' },
  { id: 5, initials: 'L', name: 'L', position: '이글아이'},
  { id: 6, initials: 'M', name: 'M', position: '울프독' },
  { id: 7, initials: '테', name: '테리 도버만', position: '울프독' },
  { id: 8, initials: 'A', name: 'A', position: '울프독' },
  { id: 9, initials: 'I', name: 'I', position: '울프독' },
  { id: 10,initials: 'J', name: 'J', position: '드라칼'},
  { id: 11, initials:'R', name: 'R', position: '언더그라운드' },
  { id: 12, initials: 'Y', name: 'Y', position: '언더그라운드' },
  { id: 13, initials: 'X', name: 'X', position: '언더그라운드' },
  { id: 14, initials: '라', name: '라멘타', position: '그림리퍼' },
  { id: 15, initials: 'F', name: '하피', position: '그림리퍼' },
  { id: 16, initials: '루', name: '루두스', position: '그림리퍼' },
  { id: 17, initials: 'P', name: '뽀삐', position: '그림리퍼' },
  { id: 18, initials: '느', name: '느베야', position: '그림리퍼' },
];

const groups = [
  ['E', 'N', 'S', '오'],
  ['L'],
  ['M', '테', 'A', 'I'],
  ['J'],
  ['R', 'Y', 'X'],
  ['라', 'F', '루', 'P', '느'],
];


const circleColors = {
  "E": "#a4b778",
  "N": "#a4b778",
  "S": "#a4b778",
  "오": "#a4b778",
  "L": "#af9cb8",
  "M": "#94b0b7",
  "테": "#94b0b7",
  "A": "#94b0b7",
  "I": "#94b0b7",
  "J": "#aabacc",
  "R": "#b9a1a3",
  "Y": "#b9a1a3",
  "X": "#b9a1a3",
  "라": "#d1d5db", // 기본 회색 (지금 유지)
  "F": "#d1d5db",
  "루": "#d1d5db",
  "P": "#d1d5db",
  "느": "#d1d5db",
};

// 선택시 테두리 색상
const borderColors = {
  "E": "#595f4b",
  "N": "#595f4b",
  "S": "#595f4b",
  "오": "#595f4b",
  "L": "#683c7a",
  "M": "#316d7d",
  "테": "#316d7d",
  "A": "#316d7d",
  "I": "#316d7d",
  "J": "#5e7185",
  "R": "#8c323b",
  "Y": "#8c323b",
  "X": "#8c323b",
  "라": "#111111", // 더 진한 검정
  "F": "#111111",
  "루": "#111111",
  "P": "#111111",
  "느": "#111111",
};

const titles = {
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
    '느': [{ text: '없음', isSpoiler: false }]
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
    '느': [{ text: '없음', isSpoiler: false }]
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
    '느': [{ text: '없음', isSpoiler: false }]
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
      { text: '없음', isSpoiler: false }
    ]
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
      { text: '없음', isSpoiler: false }
    ]
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
      { text: '없음', isSpoiler: false }
    ]
  },

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
      { text: '없음', isSpoiler: false }
    ]
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
      { text: '없음', isSpoiler: false }
    ]
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
      { text: '없음', isSpoiler: false }
    ]
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
      { text: '없음', isSpoiler: false }
    ]
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
      { text: '없음', isSpoiler: false }
    ]
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
      { text: '없음', isSpoiler: false }
    ]
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
      { text: '없음', isSpoiler: false }
    ]
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
      { text: '없음', isSpoiler: false }
    ]
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
      { text: '없음', isSpoiler: false }
    ]
  },

  '느': {
    'J': [
      { text: '없음', isSpoiler: false }
    ],
    'R': [
      { text: '없음', isSpoiler: false }
    ],
    '테': [
      { text: '없음', isSpoiler: false }
    ],
    'F': [
      { text: '없음', isSpoiler: false }
    ],
    'A': [
      { text: '없음', isSpoiler: false }
    ],
    'L': [
      { text: '없음', isSpoiler: false }
    ],
    'E': [
      { text: '없음', isSpoiler: false }
    ],
    'N': [
      { text: '없음', isSpoiler: false }
    ],
    'Y': [
      { text: '없음', isSpoiler: false }
    ],
    'M': [
      { text: '없음', isSpoiler: false }
    ],
    'X': [
      { text: '없음', isSpoiler: false }
    ],
    '오': [
      { text: '없음', isSpoiler: false }
    ],
    '라': [
      { text: '없음', isSpoiler: false }
    ],
    '루': [
      { text: '없음', isSpoiler: false }
    ],
    'P': [
      { text: '없음', isSpoiler: false }
    ]
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
      <div className="flex max-w-7xl mx-auto px-4 lg:px-8 mt-8 space-x-8 items-start">
        
        {/* 좌측 네비게이션 */}
        <div className="hidden flex-shrink-0  lg:flex flex-col w-60 rounded-md border-[0.5px] border-[#435373]">

          {/* 대제목 */}
          <div className=" bg-[#435373] h-40 flex items-center justify-center">
            <h2 className="text-[#ffffff] font-bold text-lg text-center">
              유니온 소개
            </h2>
          </div>

          {/* 소메뉴 */}
          <div className="flex flex-col divide-y divide-gray-300">
            {subMenus.map((menu, idx) => (
              <Link
                key={idx}
                to={menuLinks[menu] || "/"}
                onClick={() => setActiveMenu(menu)}
                className={`text-sm text-left font-semibold px-4 py-4 transition 
                  ${
                    activeMenu === menu
                      ? 'border-l-4 border-l-[#456EBF] text-[#456EBF]'
                      : 'text-[#404040] hover:text-[#456EBF]'
                  }`}
              >
                {menu}
              </Link>
            ))}
          </div>

        </div>


        {/* 본문 */}
        <div className="flex-1 flex flex-col items-center space-y-8">

          {/* 제목 */}
            <div className="w-full text-left mt-8 mb-6">
              <h1 className="text-3xl font-bold text-[#435373] mb-2">
                직원 소개
              </h1>
              <div className="w-full h-0.5 bg-[#435373]"></div>
            </div>

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
                              key={idx}
                              className={`transition cursor-pointer ${revealedTitles.has(`${selected.initials}-${emp.initials}-${idx}`) || !title.isSpoiler ? '' : 'blur-xs'}`}
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

        </div>
      </div>
    </MainLayout>
  );
}

export default MemberIntroPage;
