import { useState, useEffect } from 'react';
import { Link } from 'react-router';



const patients = [
  {
    name: '테리',
    age: 27,
    speak: (symptoms) => `으... 즈 ${symptoms.map(s => `${s}`).join(', ')} 있어여... 어케 함까...?`
  },
  {
    name: 'R',
    age: 30,
    speak: (symptoms) => `${symptoms[0]} 있습니다. 그리고 ${symptoms.slice(1).map(s => `${s}`).join(', ')} 상태입니다.`
  },
  {
    name: '오르티',
    age: 200,
    speak: (symptoms) => `이몸에게 ${symptoms.join(', ')} 증상이 있어 기운이 없노라...`
  },
  {
    name: 'A',
    age: 24,
    speak: (symptoms) => `${symptoms.map(s => `『${s}』`).join(' | ')}. 판단 부탁드립니다.`
  },
  {
    name: '하피',
    age: 27,
    speak: (symptoms) => `나이가 들었나? 어쩌다 보니 ${symptoms.map(s => `${s}`).join(', ')}... 뭐 이렇네. 어떻게 해야돼, 달링?`
  },
  {
    name: 'L',
    age: 20,
    speak: (symptoms) => `삼촌🥹🥹 저 ${symptoms.map(s => `${s}`).join(', ')} 있어요.... 저 죽어요오...?`
  },
  {
    name: 'J',
    age: 26,
    speak: (symptoms) => `게이트 긴급 호출 다녀온 뒤로 영 몸이 안 좋습니다. ${symptoms.map(s => `${s}`).join(', ')}. 이런 증상들이 있습니다.`
  },
  {
    name: 'E',
    age: 41,
    speak: (symptoms) => `${symptoms.map(s => `${s}`).join(', ')} 같은 증상들이 있다네. 어떤가?`
  },
  {
    name: 'N',
    age: 27,
    speak: (symptoms) => `야 헤베, 간만에 죽겠다. ${symptoms.map(s => `${s}`).join(', ')}? 하 나도 애송이 다 됐네.`
  },
  {
    name: 'X',
    age: 25,
    speak: (symptoms) => `오늘은 진짜 안좋은데.... ${symptoms.map(s => `'${s}'`).join('... ')}... 정말이에요....`
  },
  {
    name: 'M',
    age: 25,
    speak: (symptoms) => `아파서 왔습니다. ${symptoms.map(s => `${s}`).join(', ')}. 하아, 리더의 무게는 가볍지 않군요.`
  },

];

const diseases = [
  {
    name: '감기',
    symptoms: ['기침', '콧물', '피로감'],
    prescriptions: ['진해거담제', '해열제']
  },
  {
    name: '기관지염',
    symptoms: ['기침', '가래', '발열'],
    prescriptions: ['항생제', '해열제']
  },
  {
    name: '장염',
    symptoms: ['복통', '설사', '피로감'],
    prescriptions: ['지사제', '수액']
  },
  {
    name: '식중독',
    symptoms: ['복통', '구토', '설사'],
    prescriptions: ['활성탄', '수액']
  },
  {
    name: '위염',
    symptoms: ['속쓰림', '구토', '식욕부진'],
    prescriptions: ['제산제', '수액']
  },
  {
    name: '편두통',
    symptoms: ['두통', '메스꺼움', '눈부심'],
    prescriptions: ['진통제', '진정제']
  },
  {
    name: '우울증',
    symptoms: ['무기력', '불면', '식욕저하'],
    prescriptions: ['심리상담', '진정제']
  },
  {
    name: '불안장애',
    symptoms: ['두근거림', '불면', '과호흡'],
    prescriptions: ['진정제', '심리상담']
  },
  {
    name: '데스사이드 PTSD',
    symptoms: ['불면', '헛것 보임', '가슴 답답함'],
    prescriptions: ['진정제', '심리상담', '수면제']
  },
  {
    name: '탈수',
    symptoms: ['피로감', '입 마름', '소변량 감소'],
    prescriptions: ['수분섭취', '수액']
  },
  {
    name: '천식',
    symptoms: ['기침', '호흡곤란', '가슴 답답함'],
    prescriptions: ['흡입제', '기관지확장제']
  },
  {
    name: '중이염',
    symptoms: ['귀 통증', '청력 저하', '발열'],
    prescriptions: ['항생제', '진통제']
  },
  {
    name: '피부염',
    symptoms: ['가려움', '붉은 반점', '건조함'],
    prescriptions: ['연고', '항히스타민제']
  },
  {
    name: '이석증',
    symptoms: ['어지럼증', '구토', '눈 떨림'],
    prescriptions: ['진정제', '이석 조절운동']
  },
  {
    name: '화상',
    symptoms: ['발열', '외상', '통증'],
    prescriptions: ['연고', '진통제']
  },
  {
    name: '빈혈',
    symptoms: ['현기증', '피로감', '창백함'],
    prescriptions: ['철분제', '수액']
  },
  {
    name: '불면증',
    symptoms: ['불면', '자주 깸', '피로감'],
    prescriptions: ['수면제', '심리상담']
  },
  {
    name: '게이트 환청',
    symptoms: ['두근거림', '헛것 보임', '환청'],
    prescriptions: ['수면제', '심리상담']
  },
  {
    name: '기관지 천식',
    symptoms: ['기침', '쌕쌕거림', '호흡곤란'],
    prescriptions: ['흡입제', '항히스타민제']
  },
  {
    name: '만성 피로 증후군',
    symptoms: ['무기력', '피로감', '불면'],
    prescriptions: ['심리상담', '수면제']
  }
];


const allPrescriptions = [
  ...new Set(diseases.flatMap(d => d.prescriptions))
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}





function BirthdayHGPage() {
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(240);
  const [cases, setCases] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [finished, setFinished] = useState(false);

  const restartGame = () => {
    setStarted(false);
    setTimer(180);
    setCases([]);
    setCurrentIdx(0);
    setSelectedPrescriptions([]);
    setAnswers([]);
    setShowAnswer(false);
    setFinished(false);
  };

  useEffect(() => {
    if (!started || finished) return;

    if (timer === 0) {
      setFinished(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [started, timer, finished]);

  const startGame = () => {
    const selectedCases = Array.from({ length: 10 }, () => {
      const patient = patients[Math.floor(Math.random() * patients.length)];

      const diseaseCount = Math.floor(Math.random() * 2) + 2; // 2~3개 질병
      const selectedDiseases = shuffle(diseases).slice(0, diseaseCount);

      const allSymptoms = [...new Set(selectedDiseases.flatMap(d => d.symptoms))];
      const allPrescs = [...new Set(selectedDiseases.flatMap(d => d.prescriptions))];

      // 증상 순서 셔플 추가
      const randomizedSymptoms = shuffle(allSymptoms);

      return {
        patient,
        diseases: selectedDiseases.map(d => d.name), // 내부 기록용
        symptoms: randomizedSymptoms, // 섞은 증상
        correct: allPrescs
      };
    });

    setCases(selectedCases);
    setAnswers(Array(10).fill(null));
    setStarted(true);
  };

  const togglePrescription = (p) => {
    if (selectedPrescriptions.includes(p)) {
      setSelectedPrescriptions(selectedPrescriptions.filter((x) => x !== p));
    } else {
      setSelectedPrescriptions([...selectedPrescriptions, p]);
    }
  };

  const submitAnswer = () => {
    if (showAnswer) return;

    const correct = cases[currentIdx].correct.sort().join(',');
    const user = selectedPrescriptions.sort().join(',');
    const isCorrect = correct === user;

    const newAnswers = [...answers];
    newAnswers[currentIdx] = isCorrect;
    setAnswers(newAnswers);
    setShowAnswer(true);
  };

  const goNext = () => {
    if (currentIdx === 9) {
      setFinished(true);
    } else {
      setCurrentIdx(currentIdx + 1);
      setSelectedPrescriptions([]);
      setShowAnswer(false);
    }
  };

  const correctCount = answers.filter((a) => a === true).length;


  const currentCase = cases[currentIdx];

  const idleMessages = [
    '제발 가라...',
    '나에게 휴가를...',
    '인마... 왜 또...',
    '휴가 갈 수 있을까...?',
    '삡... 아 피곤하니까 입에서 별 소리가 다 나오네',
    '과로사 직전이다 진짜...',
    '완전 꾀병이잖냐.',
    '야 인마...'
  ];

  const [idleMessage, setIdleMessage] = useState('');

  useEffect(() => {
    if (!showAnswer) {
      const random = idleMessages[Math.floor(Math.random() * idleMessages.length)];
      setIdleMessage(random);
    }
  }, [currentIdx, showAnswer]);

  let resultImage = '';

  if (correctCount >= 9) {
    resultImage = '/images/h_goto.png';
  } else if (timer === 0) {
    resultImage = '/images/h_time.png';
  } else {
    resultImage = '/images/h_fail.png';
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex justify-center"
     style={{ backgroundImage: "url('/images/bg-hday.png')" }}>
      <div className="p-5 max-w-lg w-full">

        <div className='flex justify-center'>
            <img
              src='/images/hday.png'
              alt="생일 축하 이미지"
              className="w-100 h-auto mb-4"
            />
        </div>

        {/* 아직 시작 안 했을 때 */}
        {!started && (
          <div className="text-center">
            <button
              onClick={startGame}
              className="px-4 py-2 border border-gray-950 bg-[#F0BFE2] rounded hover:bg-[#F7DEF0]"
            >
              🩺 치료 시작
            </button>
          </div>
        )}

        {/* 게임 끝났을 때 */}
        {started && finished && (
          <div className="text-center bg-white/40 py-4">
            <h2 className="text-xl font-bold mb-2">🧾 게임 종료</h2>
            <p className="mb-1">성공 치료: {correctCount} / 10</p>
            <p className="mb-4">{timer > 0 ? `⏱ 남은 시간: ${timer}초` : '⛔ Time Over!'}</p>

            {/* ✅ 결과 이미지 표시 */}
            <img src={resultImage} alt="결과 이미지" className="mx-auto mb-4" />

            <button
              onClick={restartGame}
              className="px-4 py-2 border border-gray-950 bg-[#F7DEF0] rounded hover:bg-[#F0BFE2]"
            >
              다시 하기
            </button>
          </div>
        )}

        {/* 게임 진행 중 */}
        {started && !finished && (
          <div>
            <div className="mb-4 font-semibold text-center bg-white/40 p-8 rounded-md">⏱ 남은 시간: {timer}초</div>

            <div className="flex justify-center gap-2 mb-4">
              {answers.map((a, i) => (
                <span key={i}>
                  {a === null ? '❓' : a ? '⭕' : '❌'}
                </span>
              ))}
            </div>
            <div className="bg-white/40 px-2 py-8 rounded-md flex flex-col justify-center">
              <h3 className="text-lg font-bold mb-2 px-2">환자 {currentCase.patient.name} ({currentCase.patient.age}세)</h3>
              <p className="">🗣️ {currentCase.patient.speak(currentCase.symptoms)}</p>
            </div>
            <div className='mt-10'>
              <h4 className="font-semibold mb-2">💊 처방 선택</h4>
              <div className="flex flex-wrap gap-2">
                {allPrescriptions.map((p) => {
                  const isChecked = selectedPrescriptions.includes(p);
                  return (
                    <label
                      key={p}
                      className={`cursor-pointer px-3 py-2 rounded border text-sm transition
                        ${isChecked ? 'bg-[#404040] text-white border-gray-900' : 'bg-white border-gray-300'}
                        ${showAnswer ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-100 hover:text-black'}
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => togglePrescription(p)}
                        disabled={showAnswer}
                        className="hidden"
                      />
                      {p}
                    </label>
                  );
                })}
              </div>
            </div>
            <div className='my-3 py-3 bg-white/40 flex flex-col justify-center'>
              <p className="text-center text-sm italic">
                  {showAnswer
                    ? answers[currentIdx]
                      ? '✅ 휴가가 가까워온다...!'
                      : '❌ 조졌네 이거'
                    : idleMessage}
              </p>
            </div>
            {!showAnswer ? (
              <button onClick={submitAnswer} className="px-4 py-2 bg-[#F0BFE2] rounded hover:bg-[#F7DEF0] border border-gray-950">
                제출
              </button>
            ) : (
              <button onClick={goNext} className="px-4 py-2 bg-[#F7DEF0] rounded hover:bg-[#F0BFE2] border border-gray-950">
                ➡️ 다음 환자
              </button>
            )}

            <div className="mt-8 border-t pt-4">
              <h4 className="font-bold mb-2">🧾 질병 참고표</h4>
              <div className="overflow-x-auto">
                <table className="table-auto w-full border border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-2 py-1">질병</th>
                      <th className="border px-2 py-1">증상</th>
                      <th className="border px-2 py-1">필요한 처방</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diseases.map((d) => (
                      <tr key={d.name}>
                        <td className="border px-2 py-1">{d.name}</td>
                        <td className="border px-2 py-1">{d.symptoms.join(', ')}</td>
                        <td className="border px-2 py-1">{d.prescriptions.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>

  );
}

export default BirthdayHGPage;