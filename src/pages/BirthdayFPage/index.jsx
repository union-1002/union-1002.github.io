import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import supabase from '@/shared/supabase';


// 디폴트 메시지
const defaultCorrectMsgs = [
  "대단한 걸, 달링",
  "자기야, 역시 나에 대해 잘 아네👍",
  "이대로 조금만 더 맞혀줘",
];
const defaultWrongMsgs = [
  "아쉽네 😢",
  "그거 아닐 걸?",
  "달링, 다시!",
];

function BirthdayFPage() {
  const [questions, setQuestions] = useState([]); // 27문제
  const [currentIndex, setCurrentIndex] = useState(-1); // -1이면 아직 시작 안함
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [gameSuccess, setGameSuccess] = useState(false);
  const [timer, setTimer] = useState(10);
  const [isActive, setIsActive] = useState(false); // ⬅️ 타이머 동작 여부

  // 게임 시작하기
  // const startGame = async () => {
  //   setGameOver(false);
  //   setGameSuccess(false);
  //   setFeedbackMsg("");
  //   setSelectedAnswer(null);
  //   setCurrentIndex(0);

  //   // Supabase에서 id=1 문제만 가져오기
  //   const { data, error } = await supabase
  //     .from("f_quiz")
  //     .select("*")
  //     .eq("id", 1)   // 👈 여기서 id=1만 가져오도록
  //     .limit(1);

  //   if (error) {
  //     console.error("Supabase 에러:", error.message);
  //     return;
  //   }

  //   console.log("불러온 데이터:", data); // 👈 콘솔에서 확인
  //   setQuestions(data);
  // };


  // 게임 시작하기
  const startGame = async () => {
    setGameOver(false);
    setGameSuccess(false);
    setFeedbackMsg("");
    setSelectedAnswer(null);
    setCurrentIndex(0);

    // Supabase에서 모든 문제 가져오기
    const { data, error } = await supabase
      .from("f_quiz")
      .select("*");

    if (error) {
      console.error("Supabase 에러:", error.message);
      return;
    }

    if (!data || data.length === 0) {
      console.error("문제가 없습니다!");
      return;
    }

    // 프론트에서 랜덤 섞기 + 27문제 자르기
    const shuffled = data.sort(() => Math.random() - 0.5).slice(0, 27);

    console.log("선택된 문제들:", shuffled); // 디버깅용
    setQuestions(shuffled);
  };

  // 문제 불러올 때 선택지 섞기
  useEffect(() => {
    if (currentIndex >= 0 && currentIndex < questions.length) {
      const q = questions[currentIndex];
      const choices = [
        { text: q.answer, type: "answer" },
        { text: q.wrong1, type: "wrong1" },
        { text: q.wrong2, type: "wrong2" },
        { text: q.wrong3, type: "wrong3" },
      ];
      setShuffledChoices(choices.sort(() => Math.random() - 0.5));
      setTimer(10);
      setSelectedAnswer(null);
      setFeedbackMsg("");
    }
  }, [currentIndex, questions]);

  // 문제 불러올 때마다 타이머 새로 시작
  useEffect(() => {
    if (currentIndex >= 0 && currentIndex < questions.length) {
      setTimer(10);
      setIsActive(true); // 새 문제 시작 → 타이머 켜기
      setSelectedAnswer(null);
      setFeedbackMsg("");
    }
  }, [currentIndex, questions]);

  // 타이머 동작
  useEffect(() => {
    if (!isActive) return; // 타이머 꺼져 있으면 아무 것도 안 함
    if (timer === 0) {
      handleAnswer("timeout");
      return;
    }
    const countdown = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(countdown);
  }, [timer, isActive]);

  // 답 선택 처리
  const handleAnswer = (choiceType) => {
    if (!questions[currentIndex]) return;

    setIsActive(false); // ⬅️ 답 선택 시 타이머 멈춤

    const q = questions[currentIndex];

    if (choiceType === "answer") {
      const msg =
        q.answer_f ||
        defaultCorrectMsgs[Math.floor(Math.random() * defaultCorrectMsgs.length)];
      setFeedbackMsg(msg);

      if (currentIndex === questions.length - 1) {
        setGameSuccess(true);
      } else {
        setSelectedAnswer("correct");
      }
    } else {
      let msg = "";
      if (choiceType === "wrong1") msg = q.wrong1_f;
      if (choiceType === "wrong2") msg = q.wrong2_f;
      if (choiceType === "wrong3") msg = q.wrong3_f;

      msg =
        msg ||
        defaultWrongMsgs[Math.floor(Math.random() * defaultWrongMsgs.length)];

      setFeedbackMsg(msg);
      setGameOver(true);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{
        backgroundImage: gameOver
          ? "url('/images/F_F_back.png')" // 실패 시 배경
          : "url('/images/F_S_back.png')" // 기본/성공 배경
      }}
    >
      <div
        className={`absolute inset-0 z-0 ${
          gameSuccess ? "" : "bg-black/30"
        }`}
      />
      <div className="p-5 max-w-3xl w-full text-center z-10">

        {/* 게임 시작 전 */}
        {currentIndex === -1 && !gameOver && !gameSuccess && (
          <button
            onClick={startGame}
            className="bg-[#93A9D1] hover:bg-[#7a90b9] py-2 px-4 rounded-lg shadow-lg 
             transition-colors duration-300 ease-in-out"
          >
            자기야, 나에 대해 잘 알아?
          </button>
        )}

        {/* 문제 진행 UI */}
        {currentIndex >= 0 && (
          <div className="flex flex-col items-center">
            {/* 문제 카드 */}
            <div className="bg-gradient-to-br from-pink-100/30 via-white/30 to-blue-100/30 shadow-2xl rounded-3xl p-6 w-full relative">

              {/* 문제 번호 표시 */}
              <div className="text-sm mb-2">
                {currentIndex + 1} / {questions.length}
              </div>
              <div className="rounded-2xl p-4 text-center">
                
                {/* 진행 중 → 문제 */}
                {!selectedAnswer && !gameOver && !gameSuccess && (
                  <p className="text-xl font-bold">
                    {questions[currentIndex]?.question}
                  </p>
                )}

                {/* 답을 눌렀거나 게임 종료/성공 → feedbackMsg 출력 */}
                {feedbackMsg && (
                  <p
                    className={`text-lg font-semibold ${
                      gameOver ? "text-red-200" : "text-green-200"
                    }`}
                  >
                    {feedbackMsg}
                  </p>
                )}

                {/* 정답 → 다음 문제 버튼 */}
                {selectedAnswer === "correct" && !gameOver && !gameSuccess && (
                  <button
                    onClick={() => setCurrentIndex((i) => i + 1)}
                    className="mt-4 bg-[#93A9D1] hover:bg-[#7a90b9] transform hover:scale-102 text-white py-2 px-5 rounded-xl shadow-md transition duration-300"
                  >
                    다음 문제 풀기 →
                  </button>
                )}

                {/* 성공일 때 */}
                {gameSuccess && (
                  <p className="text-lg font-bold">
                    <br/>🎉 내 생일 축하해줘서 고마워 달링 🎉
                  </p>
                )}
              </div>
            </div>

            {/* 타이머 */}
            {!selectedAnswer && !gameOver && !gameSuccess && (
              <span className="mt-4 bg-gray-800 text-white px-4 py-1 rounded-full shadow-lg animate-pulse">
                ⏳ {timer}초
              </span>
            )}

            {/* 선택지 */}
            {!selectedAnswer && !gameOver && !gameSuccess && (
              <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-md">
                {shuffledChoices.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(c.type)}
                    className="bg-white/30 shadow-md border border-gray-200/30 rounded-xl py-3 px-2 font-semibold
                              hover:bg-blue-100/30 hover:scale-102 transition duration-300 ease-in-out"
                  >
                    {c.text}
                  </button>
                ))}
              </div>
            )}

            {/* 게임 실패 */}
            {gameOver && (
              <div className="animate-fadeIn">
                <img
                  src="/images/F_F_img.png"
                  alt="게임 실패"
                  className="w-300 h-auto mx-auto mb-4"
                />
                <button
                  onClick={startGame}
                  className="bg-red-400/50 hover:bg-red-400/50 transform hover:scale-105 transition duration-300 text-white py-2 px-5 rounded-xl shadow-lg"
                >
                  다시하기
                </button>
              </div>
            )}

            {/* 게임 성공 */}
            {gameSuccess && (
              <div className="animate-fadeIn">
                <img
                  src="/images/F_S_img.png"
                  alt="게임 성공"
                  className="w-300 h-auto mx-auto"
                />
              </div>
            )}
          </div>
        )}


      </div>
    </div>
  );
}

export default BirthdayFPage;