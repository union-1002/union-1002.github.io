import { useState } from 'react';


const rawCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const cards = rawCards.flatMap((num) => {
  if (num === 1) return [{ num, isGwang: true }, { num, isGwang: false }];
  if (num === 3) return [{ num, isGwang: false }, { num, isGwang: true }];
  if (num === 8) return [{ num, isGwang: false }, { num, isGwang: true }];
  return [{ num, isGwang: false }, { num, isGwang: false }];
});

const getCombinationName = (selected) => {
  if (selected.length !== 2) return '';

  const [a, b] = selected.map((i) => cards[i]);

  const nums = [a.num, b.num].sort((x, y) => x - y);
  const isSame = a.num === b.num;

  const is1G = a.num === 1 && a.isGwang || b.num === 1 && b.isGwang;
  const is3G = a.num === 3 && a.isGwang || b.num === 3 && b.isGwang;
  const is8G = a.num === 8 && a.isGwang || b.num === 8 && b.isGwang;

  const comboKey = `${nums[0]},${nums[1]}`;

  // 1. 광땡
  if (is3G && is8G) return "삼팔광땡";
  if (is1G && is8G) return "일팔광땡";
  if (is1G && is3G) return "일삼광땡";

  // 2. 땡
  if (isSame && a.num === 10) return "장땡";
  if (isSame && a.num >= 1 && a.num <= 9) return `${a.num}땡`;

  // 3. 숫자 조합 (광 무시)
  const namedCombos = {
    "1,2": "알리",
    "1,4": "독사",
    "1,9": "구삥",
    "1,10": "장삥",
    "4,10": "장사",
    "4,6": "세륙",
    "4,7": "광잡이",
    "4,9": "구사",
  };
  // 특수: 땡잡이는 3광 + 7일 때만
  if (nums[0] === 3 && nums[1] === 7) {
    const three = a.num === 3 ? a : b;
    if (three.isGwang) return "땡잡이";
  }
  
  if (namedCombos[comboKey]) return namedCombos[comboKey];

  // 4. 끗 (그 외)
  const sum = a.num + b.num;
  const kkut = sum % 10;
  if (kkut == 0) return "망통";
  return `${kkut}끗`;
};

const getDialogue = (selected, comboName) => {
  if (selected.length !== 2 || !comboName) {
    return [
      { speaker: "?", text: "(패를 두 장 골라보세요)" },
      { speaker: "비광", text: "이 비광이 직접 상대해주지" }
    ];
  }

  switch (comboName) {
    case "삼팔광땡":
      return [
        { speaker: "테리", text: "즈 삼팔광땡임다ㅋㅋㅋ 생일 축하드려여" },
        { speaker: "비광", text: "아주 아사리판이구먼 생일 축하 맞는가?" }
      ];
    case "일팔광땡":
      return [
        { speaker: "M", text: "일팔광땡입니다. 생일에 제가 이긴 것 같아 죄송합니다만" },
        { speaker: "비광", text: "하지만 어디나 광잡이는 존재하는 법 아니겠는가?" }
      ];
    case "일삼광땡":
      return [
        { speaker: "C", text: "일삼광땡. 아무래도 그쪽이 수를 쓴 듯한데." },
        { speaker: "비광", text: "큰일 날 소리, 운칠기삼일세! 운이 70프로, 기세가 30프로. 그쪽 기세가 결국 판돈이지" }
      ];
    case "4땡":
      return [
        { speaker: "사", text: "왜놈이랑 이래서 노름하면 안 되는 건데." },
        { speaker: "비광", text: "그렇다기엔 결과 상관없이 4가 두개란 사실에 만족하는 것 같구먼." }
      ];
    case "독사":
      return [
        { speaker: "R", text: "화투 패로 치냐, 돈으로 치지, 안 그렇습니까?" },
        { speaker: "비광", text: "에잉 독사같은 양반. 돈으로 칠 거면 뭐하러 판을 벌이겠나? 그냥 계좌 까고 끝내지" }
      ];
    case "세륙":
      return [
        { speaker: "오르티", text: "이몸이 엄청난 패를 뽑았도다! 초콜릿을 주도록!" },
        { speaker: "비광", text: "어이쿠, 여러 의미로 대단한 패구먼. 생일 축하해주면 두 개로 주지!" }
      ];
    case "장사":
      return [
        { speaker: "론", text: "축하해, 친구." },
        { speaker: "비광", text: "그립구먼." }
      ];
    case "광잡이":
      return [
        { speaker: "T", text: "모든 것이 무상하군요. 그렇지 않사옵니까, 선배님." },
        { speaker: "비광", text: "잡았다. 이 새끼." }
      ];
    case "땡잡이":
      return [
        { speaker: "A", text: "흠... 생일이니 땡 잡지 않으셨습니까?" },
        { speaker: "비광", text: "어쩌나, 난 1끗일세" }
      ];
    case "망통":
      return [
        { speaker: "???", text: "맹랑하네, 나한테 도와달라 말도 걸고." },
        { speaker: "비광", text: "어이쿠, 심연 한 번 아찔하구먼" }
      ];
    case "구사":
      return [
        { speaker: "루두스", text: "구사, 끝나지 않을 무대는 어떠신지요?" },
        { speaker: "비광", text: "에잉, 기분 나쁜 놈 같으니라고." }
      ];
    case "1땡":
      return [
        { speaker: "Y", text: "워메, 왜 일땡이여...?" },
        { speaker: "비광", text: "어이쿠, 그래도 땡 잡았구먼." }
      ];
    case "3땡":
      return [
        { speaker: "미카엘", text: "벚꽃이 2송이네요. 축하드려요." },
        { speaker: "비광", text: "사쿠라네? 사쿠라여? 게티아가 돕진 못했나보구먼" }
      ];
    case "6땡":
      return [
        { speaker: "I", text: "친구! 이거 이름이 뭐랬지? 지미?" },
        { speaker: "비광", text: "모란패 말인감? 옆나라는 장미라 하더구먼" }
      ];
    case "8땡":
      return [
        { speaker: "D", text: "축하해…… 오늘은 아무것도 안 보이네" },
        { speaker: "비광", text: "고맙게 됐네만, 달이 훤한 날에도 사고를 쳐야 쓰나?" }
      ];
    default:
      return [
        { speaker: "?", text: `${comboName}인가?` },
        { speaker: "비광", text: `맞네, ${comboName}!` }
      ];
  }
};



function BirthdayBPage() {
  const [selected, setSelected] = useState([]);

  const toggleCard = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      if (selected.length < 2) {
        setSelected([...selected, index]);
      }
    }
  };
  const comboName = getCombinationName(selected);
  const dialogue = getDialogue(selected, comboName);
  


  return (
    <div className='w-full min-h-screen bg-gray-900'>
      <div className="p-6 max-w-md mx-auto space-y-4">
        <div className='flex justify-center'>
            <img
              src='/images/happyBK.png'
              alt="생일 축하 이미지"
              className="w-100 h-auto mb-4"
            />
          </div>
        
        <div className="space-y-2 mb-10">
          {dialogue.map((line, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${line.speaker === "비광" ? "items-end" : "items-start"}`}
            >
              <div className="text-xs text-gray-300 mb-1">{line.speaker}</div>
              <div
                className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm ${
                  line.speaker === "비광"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {line.text}
              </div>
            </div>
          ))}
        </div>
        {/* <div className="text-center text-xl bg-white py-3">
          {selected.length === 2
            ? `${getCombinationName(selected)}`
            : "두 장을 선택해보게, 이 비광이 상대해주지."}
        </div> */}
        <div className="grid grid-cols-5 gap-4">
          {cards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => toggleCard(idx)}
              className={`h-25 cursor-pointer p-4 rounded-lg border text-center font-semibold
                ${selected.includes(idx) ? "bg-red-300 text-white" : "bg-white hover:bg-gray-100"}
              `}
            >
              <img
                src={`/images/bk/${card.num}.png`}
                alt={`${card.num}번 패`}
                className="w-full h-auto"
              />
              {card.isGwang && <span className="text-yellow-500 font-bold">(光)</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BirthdayBPage;