import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";

/**
 * 요구사항 요약
 * - 스탯: 정신력(mind), 도덕(ethics), 희망(hope) [0~100], 가로 게이지. (데모: 숫자도 표시)
 * - 15턴 진행. 매 턴 2장 중 1장 선택. 제한시간 10초.
 *   · 10초 지나면 랜덤 자동 선택 → 결과 2초 보여주고 다음 턴.
 *   · 직접 선택 시 2초 대기 없이 즉시 다음 턴.
 * - 카드 규칙:
 *   · 한 카드 = 서로 다른 두 스탯 중 하나 ↑(1~30), 하나 ↓(1~40).
 *   · "두 카드가 같은 조합(A↑ B↓)으로 나오면 안 됨."
 *     (반전(A↓ B↑)은 가능할 수도 있고 아닐 수도 있음. 핵심은 "동일 조합 금지")
 * - 엔딩:
 *   · 진행 중/종료 시점에 하나라도 0(이하)이면 엔딩 1.
 *   · 15턴 이전에 어떤 스탯이 100 도달하거나, 종료 시 모든 스탯이 1 이상이면 엔딩 2.
 * - 시작 전 “시작하기” 버튼, 종료 후 “다시하기” 버튼.
 */

const STAT_LABEL = {
  mind: "정신력",
  ethics: "도덕",
  hope: "희망",
};
const STAT_KEYS = Object.keys(STAT_LABEL); // ["mind","ethics","hope"]

const MAX_TURNS = 15;
const TURN_TIMEOUT_SEC = 10;
const AUTO_REVEAL_MS = 2000;

function clamp01(n) {
  return Math.max(0, Math.min(100, n));
}
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** △/▽ 개수 규칙 변환 */
function triangles(amount, isIncrease) {
  const symbol = isIncrease ? "△" : "▽";
  let count = 1;
  if (amount >= 11 && amount <= 20) count = 2;
  else if (amount >= 21 && amount <= 30) count = 3;
  else if (!isIncrease && amount >= 31) count = 4; // 감소 31~40은 네 개
  return symbol.repeat(count);
}

/** 서로 다른 두 스탯 뽑기 */
function pickTwoDistinctStats() {
  const a = STAT_KEYS[randInt(0, 2)];
  let b = a;
  while (b === a) b = STAT_KEYS[randInt(0, 2)];
  return [a, b];
}

/** 단일 카드 생성: upKey!=downKey 보장 */
function generateOneCard() {
  const [upKey, downKey] = pickTwoDistinctStats();
  return {
    upKey,
    downKey,
    upAmount: randInt(1, 30),
    downAmount: randInt(1, 40),
  };
}

/**
 * 두 카드 생성 (핵심 규칙):
 * - 두 카드의 (upKey, downKey) 조합이 "동일"하면 안 됨.
 *   (예: 둘 다 mind↑ ethics↓ 면 안 됨.)
 * - 반전(예: 한 장 mind↑ ethics↓, 다른 한 장 mind↓ ethics↑)은 '가능'.
 * - 완전히 다른 조합(예: mind↑ ethics↓ vs hope↑ mind↓ 등)도 물론 가능.
 */
function generateTwoCards() {
  const cardA = generateOneCard();
  let cardB = generateOneCard();
  let safety = 0;
  while (
    cardB.upKey === cardA.upKey &&
    cardB.downKey === cardA.downKey &&
    safety < 50
  ) {
    cardB = generateOneCard();
    safety++;
  }
  return [cardA, cardB];
}

function applyEffect(stats, effect) {
  const next = { ...stats };
  next[effect.upKey] = clamp01(stats[effect.upKey] + effect.upAmount);
  next[effect.downKey] = clamp01(stats[effect.downKey] - effect.downAmount);
  return next;
}

function BirthdayTerryPage() {
  // 시작 전/후 상태
  const [started, setStarted] = useState(false);

  // 스탯, 턴, 카드, 타이머
  const [stats, setStats] = useState({ mind: 50, ethics: 50, hope: 50 });
  const [turn, setTurn] = useState(1);
  const [cards, setCards] = useState(() => generateTwoCards());
  const [timeLeft, setTimeLeft] = useState(TURN_TIMEOUT_SEC);

  // 자동 선택 표시
  const [isAutoRevealing, setIsAutoRevealing] = useState(false);
  const [autoSelected, setAutoSelected] = useState(null);

  // 엔딩: null | {type:1|2, title, message, bg}
  const [ending, setEnding] = useState(null);

  const timerRef = useRef(null);

  const isGameActive = useMemo(
    () => started && !ending && turn <= MAX_TURNS && !isAutoRevealing,
    [started, ending, turn, isAutoRevealing]
  );

  /** 게임 시작 */
  function startGame() {
    // 초기화 후 시작
    resetGameCore();
    setStarted(true);
  }

  /** 내부 초기화 (시작/다시하기 공용) */
  function resetGameCore() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setStats({ mind: 50, ethics: 50, hope: 50 });
    setTurn(1);
    setCards(generateTwoCards());
    setEnding(null);
    setIsAutoRevealing(false);
    setAutoSelected(null);
    setTimeLeft(TURN_TIMEOUT_SEC);
  }

  /** 다시하기 (엔딩 화면에서 호출) */
  function restartGame() {
    resetGameCore();
    setStarted(true);
  }

  /** 나가기(옵션) */
  function exitToHome() {
    // 라우팅이 있다면 Link로 이동 가능. 여기선 단순히 시작 화면으로.
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setStarted(false);
  }

  /** 매 턴 타이머 */
  useEffect(() => {
    if (!isGameActive) return;

    setTimeLeft(TURN_TIMEOUT_SEC);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          handleAutoPick();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, ending, started]);

  /** 자동 선택 */
  function handleAutoPick() {
    if (ending) return;
    const chosen = Math.random() < 0.5 ? cards[0] : cards[1];
    const nextStats = applyEffect(stats, chosen);

    setStats(nextStats);
    setAutoSelected(chosen);
    setIsAutoRevealing(true);

    // 엔딩 즉시 판정 (우선순위: 0 → 100)
    const zeroOrBelow = Object.values(nextStats).some((v) => v <= 0);
    const fullReached = Object.values(nextStats).some((v) => v >= 100);

    if (zeroOrBelow) {
      setTimeout(() => {
        setEnding({
          type: 1,
          title: "엔딩 1 — 무너짐",
          message: "한 수치가 0이 되어 버렸습니다.",
          bg: "images/ending1.jpg",
        });
        setIsAutoRevealing(false);
      }, AUTO_REVEAL_MS);
      return;
    }
    if (fullReached) {
      setTimeout(() => {
        setEnding({
          type: 2,
          title: "엔딩 2 — 극복",
          message: "한 수치를 가득 채웠습니다. 당신은 견뎌냈어요.",
          bg: "images/ending2.jpg",
        });
        setIsAutoRevealing(false);
      }, AUTO_REVEAL_MS);
      return;
    }

    // 다음 턴으로
    setTimeout(() => {
      proceedToNextTurn(nextStats);
      setIsAutoRevealing(false);
      setAutoSelected(null);
    }, AUTO_REVEAL_MS);
  }

  /** 다음 턴 진행 or 종료 판정 */
  function proceedToNextTurn(currentStats = stats) {
    if (turn >= MAX_TURNS) {
      // 종료 시점 판정
      const zeroOrBelow = Object.values(currentStats).some((v) => v <= 0);
      if (zeroOrBelow) {
        setEnding({
          type: 1,
          title: "엔딩 1 — 무너짐",
          message: "한 수치가 0이 되었습니다.",
          bg: "images/ending1.jpg",
        });
      } else {
        setEnding({
          type: 2,
          title: "엔딩 2 — 극복",
          message: "모든 수치가 1 이상입니다. 무너지지 않았습니다.",
          bg: "images/ending2.jpg",
        });
      }
      return;
    }
    setTurn((t) => t + 1);
    setCards(generateTwoCards());
  }

  /** 사용자가 카드 선택 */
  function handlePick(effect) {
    if (ending || isAutoRevealing || !started) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const nextStats = applyEffect(stats, effect);
    setStats(nextStats);

    const zeroOrBelow = Object.values(nextStats).some((v) => v <= 0);
    const fullReached = Object.values(nextStats).some((v) => v >= 100);

    if (zeroOrBelow) {
      setEnding({
        type: 1,
        title: "엔딩 1 — 무너짐",
        message: "한 수치가 0이 되었습니다.",
        bg: "images/ending1.jpg",
      });
      return;
    }
    if (fullReached) {
      setEnding({
        type: 2,
        title: "엔딩 2 — 극복",
        message: "한 수치를 가득 채웠습니다. 당신은 견뎌냈어요.",
        bg: "images/ending2.jpg",
      });
      return;
    }

    // 즉시 다음 턴
    proceedToNextTurn(nextStats);
  }

  /** 게이지 */
  const StatBar = ({ label, value }) => (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-sm">
        <span>{label}</span>
        {/* 데모: 숫자 표시 */}
        <span className="opacity-80">{value}</span>
      </div>
      <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-300 to-cyan-300 transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  /** 카드 UI */
  const CardView = ({ effect, disabled, label }) => {
    const { upKey, downKey, upAmount, downAmount } = effect;
    return (
      <button
        onClick={() => handlePick(effect)}
        disabled={disabled}
        className={`w-full text-left rounded-2xl p-4 bg-white/10 hover:bg-white/15 border border-white/20 transition
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-semibold">{label}</div>
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-sm opacity-90">{STAT_LABEL[upKey]}</div>
            <div className="font-mono">
              <span className="text-emerald-300 mr-2">+{upAmount}</span>
              <span>{triangles(upAmount, true)}</span>
            </div>
          </div>
          <div>
            <div className="text-sm opacity-90">{STAT_LABEL[downKey]}</div>
            <div className="font-mono">
              <span className="text-rose-300 mr-2">-{downAmount}</span>
              <span>{triangles(downAmount, false)}</span>
            </div>
          </div>
        </div>
      </button>
    );
  };

  /** 자동 선택 2초 표시 */
  const AutoRevealOverlay = () => {
    if (!isAutoRevealing || !autoSelected) return null;
    const { upKey, downKey, upAmount, downAmount } = autoSelected;
    return (
      <div className="absolute inset-0 z-20 bg-black/70 flex items-center justify-center">
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-white text-center shadow-2xl max-w-md w-[90%]">
          <div className="text-xl font-bold mb-2">자동 선택됨</div>
          <div className="opacity-80 mb-4">결과가 적용되었습니다</div>
          <div className="text-left space-y-2 font-mono">
            <div>
              <span className="opacity-80 mr-2">{STAT_LABEL[upKey]}:</span>
              <span className="text-emerald-300 mr-2">+{upAmount}</span>
              <span>{triangles(upAmount, true)}</span>
            </div>
            <div>
              <span className="opacity-80 mr-2">{STAT_LABEL[downKey]}:</span>
              <span className="text-rose-300 mr-2">-{downAmount}</span>
              <span>{triangles(downAmount, false)}</span>
            </div>
          </div>
          <div className="mt-4 text-sm opacity-80">다음 카드로 넘어갑니다…</div>
        </div>
      </div>
    );
  };

  /** 엔딩 화면 */
  const EndingOverlay = () => {
    if (!ending) return null;
    return (
      <div className="absolute inset-0 z-30">
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: `url('${ending.bg}')` }}
        />
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
+
+        <div className="w-full h-full flex items-center justify-center p-4 relative">
+          <div className="relative z-10 pointer-events-auto bg-white/10 border border-white/20 rounded-3xl p-8 text-white text-center max-w-xl w-[95%] shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="text-2xl font-bold mb-2">{ending.title}</div>
            <div className="opacity-90 mb-6">{ending.message}</div>

            {/* 최종 스탯(데모 표기) */}
            <div className="grid grid-cols-3 gap-3 text-left mb-6">
              {STAT_KEYS.map((k) => (
                <div key={k} className="bg-white/5 rounded-xl p-3">
                  <div className="text-sm opacity-80 mb-1">{STAT_LABEL[k]}</div>
                  <div className="font-mono">{stats[k]}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={restartGame}
                className="px-4 py-2 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-black font-semibold"
              >
                다시하기
              </button>
              <button
                onClick={exitToHome}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30"
              >
                시작화면
              </button>
              <Link
                to="/"
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30"
              >
                나가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /** 시작 화면 */
  const StartOverlay = () => {
    if (started) return null;
    return (
      <div className="absolute inset-0 z-30">
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: "url('images/inside.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/70 pointer-events-none" />
+       <div className="w-full h-full flex items-center justify-center p-4 relative">
          <div className="bg-white/10 border border-white/20 rounded-3xl p-8 text-white text-center max-w-xl w-[95%] shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-10 pointer-events-auto">
            <div className="text-2xl font-bold mb-3">시작하기</div>
            <div className="opacity-90 mb-6">
              15턴 동안 카드로 운명을 선택하세요.<br />
              제한시간 10초, 미선택 시 자동으로 선택됩니다.
            </div>
            <button
              onClick={startGame}
              className="px-5 py-3 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-black font-semibold"
            >
              게임 시작
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 배경 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('images/inside.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60 -z-10" />

      <div className="w-full h-full flex flex-col items-center overflow-auto py-6 px-2">
        <div className="lg:w-3xl w-full flex flex-col items-center text-center text-white gap-8">
          {/* 상단 정보 */}
          <div className="w-full flex items-center justify-between">
            <div className="text-left">
              <div className="text-xs opacity-80">TURN</div>
              <div className="text-2xl font-bold">
                {started ? Math.min(turn, MAX_TURNS) : 0} / {MAX_TURNS}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs opacity-80">TIME</div>
              <div className="text-2xl font-bold tabular-nums">
                {!started || isAutoRevealing || ending ? "--" : `${timeLeft}s`}
              </div>
            </div>
          </div>

          {/* 스탯 바 (데모로 숫자 함께) */}
          <div className="w-full space-y-4">
            <StatBar label={STAT_LABEL.mind} value={stats.mind} />
            <StatBar label={STAT_LABEL.ethics} value={stats.ethics} />
            <StatBar label={STAT_LABEL.hope} value={stats.hope} />
          </div>

          {/* 카드 영역 */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <CardView label="카드 1" effect={cards[0]} disabled={!started || !!ending || isAutoRevealing} />
            <CardView label="카드 2" effect={cards[1]} disabled={!started || !!ending || isAutoRevealing} />
          </div>

          {/* 안내 텍스트 */}
          <div className="text-sm opacity-80">
            제한시간 {TURN_TIMEOUT_SEC}초 내에 카드를 고르세요. 미선택 시 자동 선택됩니다.
          </div>
        </div>
      </div>

      {/* 오버레이들 */}
      <StartOverlay />
      <AutoRevealOverlay />
      <EndingOverlay />
    </div>
  );
}

export default BirthdayTerryPage;
