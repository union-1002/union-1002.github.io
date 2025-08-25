import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";

/**
 * 화면 전환 버전
 * - screen: "start" | "game" | "reveal" | "ending"
 * - 자동선택 시 2초 동안 'reveal' 전용 화면을 보여주고 다음 턴으로
 * - 수동 선택 시 바로 다음 턴(리빌 화면 없음)
 */

const STAT_LABEL = { mind: "정신력", ethics: "도덕", hope: "희망" };
const STAT_KEYS = Object.keys(STAT_LABEL); // ["mind","ethics","hope"]

const MAX_TURNS = 15;
const TURN_TIMEOUT_SEC = 10;
const REVEAL_MS = 2000;

const CARD_POOLS = {
  mind_up_hope_down: [
    {
      title: "상처 위의 결심",
      desc: "형의 묘비 앞에서 끝까지 싸우겠다고 다짐한다. 멘탈은 강해지지만, 앞으로 행복할 수 있다는 희망은 더 멀어진다.",
      upKey: "mind",
      downKey: "hope",
    },
    {
      title: "불면의 수련",
      desc: "밤마다 훈련실에서 반복 훈련한다. 멘탈은 단단해지지만, 내일을 바라보는 희망은 사라져간다.",
      upKey: "mind",
      downKey: "hope",
    },
    {
      title: "피범벅의 현장",
      desc: "범죄자들을 제압하고도, 그들의 아이가 우는 모습이 눈에 밟힌다. 버티는 정신은 강해지지만, 세상이 나아질 희망은 줄어든다.",
      upKey: "mind",
      downKey: "hope",
    },
  ],
  mind_down_hope_up: [
    {
      title: "낡은 사진",
      desc: "형과 찍은 어릴 적 사진을 바라본다. 멘탈은 무너지지만, 그 시절의 기억이 작은 희망을 불러온다.",
      upKey: "hope",
      downKey: "mind",
    },
    {
      title: "시민의 미소",
      desc: "구조한 사람에게 “고맙다”는 말을 듣는다. 마음은 흔들리지만, 이 세계가 아직 살 만하다는 희망은 커진다.",
      upKey: "hope",
      downKey: "mind",
    },
    {
      title: "짧은 휴식",
      desc: "동료와 밤을 새우다 근처 포장마차에 들른다. 멘탈은 풀리지만, 따뜻한 국물 속에서 내일을 살아갈 힘을 찾는다.",
      upKey: "hope",
      downKey: "mind",
    },
  ],
  mind_up_ethics_down: [
    {
      title: "비밀 심문",
      desc: "증거를 얻기 위해 범죄자를 불법적으로 협박한다. 멘탈은 강해지지만, 정의에서 멀어진다.",
      upKey: "mind",
      downKey: "ethics",
    },
    {
      title: "번개같은 판단",
      desc: "도망치는 범죄자에게 경고도 없이 번개를 쓴다. 멘탈은 흔들림 없지만, 도덕은 깎여 나간다.",
      upKey: "mind",
      downKey: "ethics",
    },
    {
      title: "거래의 손",
      desc: "조직의 정보를 얻기 위해 작은 범죄를 묵인한다. 멘탈은 단단해지지만, 양심은 타락한다.",
      upKey: "mind",
      downKey: "ethics",
    },
  ],
  mind_down_ethics_up: [
    {
      title: "양심의 고백",
      desc: "데스사이드 당시 자신이 형을 구하지 못했다는 사실을 동료에게 털어놓는다. 멘탈은 약해지지만, 도덕성은 회복된다.",
      upKey: "ethics",
      downKey: "mind",
    },
    {
      title: "자비의 선택",
      desc: "무력한 범죄자를 체포만 하고 끝낸다. 멘탈은 흔들리지만, 정의감은 살아난다.",
      upKey: "ethics",
      downKey: "mind",
    },
    {
      title: "헌신의 기억",
      desc: "형이 마지막까지 동료들을 지키다 죽었다는 기록을 본다. 멘탈은 무너지지만, 올곧은 도덕은 지켜진다.",
      upKey: "ethics",
      downKey: "mind",
    },
  ],
  hope_up_ethics_down: [
    {
      title: "거짓된 방송",
      desc: "시민들에게 안심시키기 위해 사실을 숨긴다. 희망은 커지지만, 진실은 짓밟힌다.",
      upKey: "hope",
      downKey: "ethics",
    },
    {
      title: "금지된 약품",
      desc: "치료 불가능한 부상을 막기 위해 불법 약물을 사용한다. 희망은 피어나지만, 도덕은 타락한다.",
      upKey: "hope",
      downKey: "ethics",
    },
    {
      title: "어둠의 동맹",
      desc: "범죄 조직의 정보를 얻기 위해 은밀히 손을 잡는다. 내일을 위한 희망은 생기지만, 정의는 사라진다.",
      upKey: "hope",
      downKey: "ethics",
    },
  ],
  hope_down_ethics_up: [
    {
      title: "냉정한 브리핑",
      desc: "데스사이드 사망자 수를 있는 그대로 보고한다. 희망은 사라지지만, 정직함은 살아남는다.",
      upKey: "ethics",
      downKey: "hope",
    },
    {
      title: "희생의 장례식",
      desc: "동료의 관을 묵묵히 운구한다. 모두가 희망을 잃지만, 도덕적 의무는 빛난다.",
      upKey: "ethics",
      downKey: "hope",
    },
    {
      title: "엄정한 명령",
      desc: "오염된 동료를 직접 사살한다. 희망은 꺾이지만, 도덕적 책임은 무겁게 지켜진다.",
      upKey: "ethics",
      downKey: "hope",
    },
  ],
};

const POOL_KEYS = Object.keys(CARD_POOLS);

function clamp01(n) {
  return Math.max(0, Math.min(100, n));
}
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** △/▽ 개수 규칙 변환 */
function triangles(amount, isIncrease) {
  const symbol = isIncrease ? "▲" : "▼";
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

/** 카드 하나 생성 (up!=down 보장) */
function generateOneCard(fromPoolKey) {
  if (fromPoolKey) {
    const pool = CARD_POOLS[fromPoolKey];
    const pick = pool[randInt(0, pool.length - 1)];
    return {
      // 내러티브(제목/설명)
      title: pick.title,
      desc: pick.desc,
      // 효과키
      upKey: pick.upKey,
      downKey: pick.downKey,
      // 양/음수 랜덤량
      upAmount: randInt(1, 20),
      downAmount: randInt(11, 40),
    };
  }
  // (혹시 풀 없이 랜덤을 쓰고 싶을 때의 백업 로직)
  const a = STAT_KEYS[randInt(0, 2)];
  let b = a;
  while (b === a) b = STAT_KEYS[randInt(0, 2)];
  return {
    upKey: a,
    downKey: b,
    upAmount: randInt(1, 30),
    downAmount: randInt(1, 40),
  };
}
/**
 * 두 카드 생성 규칙:
 * - 두 카드의 (upKey, downKey) 조합이 "동일"하면 안 됨.
 *   (예: 둘 다 mind↑ ethics↓ 면 안 됨.)
 * - 반전(A↓ B↑)이든, 완전 다른 조합이든 상관없음. 단 동일 조합만 금지.
 */
function generateTwoCards() {
  // 카드 A: 임의의 풀에서 1장
  const poolA = POOL_KEYS[randInt(0, POOL_KEYS.length - 1)];
  const cardA = generateOneCard(poolA);

  // 카드 B: A와 "동일 조합(upKey,downKey)"만 피해서 선택
  let poolB = POOL_KEYS[randInt(0, POOL_KEYS.length - 1)];
  let safety = 0;
  while (
    safety < 50 &&
    CARD_POOLS[poolB][0].upKey === cardA.upKey &&
    CARD_POOLS[poolB][0].downKey === cardA.downKey
  ) {
    poolB = POOL_KEYS[randInt(0, POOL_KEYS.length - 1)];
    safety++;
  }
  const cardB = generateOneCard(poolB);

  return [cardA, cardB];
}

function applyEffect(stats, effect) {
  const next = { ...stats };
  next[effect.upKey] = clamp01(stats[effect.upKey] + effect.upAmount);
  next[effect.downKey] = clamp01(stats[effect.downKey] - effect.downAmount);
  return next;
}

function BirthdayTerryPage() {
  // 화면 상태: start | game | reveal | ending
  const [screen, setScreen] = useState("start");

  // 스탯/턴/카드
  const [stats, setStats] = useState({ mind: 50, ethics: 50, hope: 50 });
  const [turn, setTurn] = useState(1);
  const [cards, setCards] = useState(() => generateTwoCards());

  // 타이머
  const [timeLeft, setTimeLeft] = useState(TURN_TIMEOUT_SEC);
  const timerRef = useRef(null);

  // 자동선택 결과 보여줄 때 쓰는 상태 (reveal 화면 전용)
  const [revealCard, setRevealCard] = useState(null);

  // 엔딩 데이터
  const [ending, setEnding] = useState(null); // {type, title, message, bg}

  // 게임 진행 중인지
  const isGameActive = useMemo(
    () => screen === "game" && !ending && turn <= MAX_TURNS,
    [screen, ending, turn]
  );

  /** 공용 초기화 */
  function resetCore() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setStats({ mind: 50, ethics: 50, hope: 50 });
    setTurn(1);
    setCards(generateTwoCards());
    setEnding(null);
    setRevealCard(null);
    setTimeLeft(TURN_TIMEOUT_SEC);
  }

  /** 시작하기 */
  function startGame() {
    resetCore();
    setScreen("game");
  }

  /** 다시하기(엔딩 → 게임) */
  function restartGame() {
    resetCore();
    setScreen("game");
  }

  /** 시작화면으로(엔딩 → 시작) */
  function backToStart() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setScreen("start");
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
  }, [turn, screen]);

  /** 자동 선택 → reveal 화면 전환 후 2초 뒤 다음 턴 */
  function handleAutoPick() {
    if (ending) return;
    const chosen = Math.random() < 0.5 ? cards[0] : cards[1];
    const nextStats = applyEffect(stats, chosen);
    setStats(nextStats);
    setRevealCard(chosen);
    setScreen("reveal"); // 화면 전체 전환

    // 엔딩 우선 판정
    const zeroOrBelow = Object.values(nextStats).some((v) => v <= 0);
    const fullReached = Object.values(nextStats).some((v) => v >= 100);

    if (zeroOrBelow) {
      setTimeout(() => {
        setEnding({
          type: 1,
          title: "엔딩 1 — IF 테리",
          message: "자신이 게이트 내부로 들어갔더라면, 조금이라도 희생자가 줄었을지도 모르는 일인데.\n망설이지 않았으면 누구도 죽지 않았을 텐데.\n……먼저 죽여버리면 될 일이었을 텐데!\n“어? 그러네.”\n멍하니 바라보던 파란 하늘이 빌어먹을 만큼 아름다웠다.",
          bg: "images/terry_ending1.jpg",
        });
        setScreen("ending");
      }, REVEAL_MS);
      return;
    }
    if (fullReached) {
      setTimeout(() => {
        setEnding({
          type: 2,
          title: "엔딩 2 — 극복",
          message: "한 수치를 가득 채웠습니다. 당신은 견뎌냈어요.",
          bg: "images/terry_ending2.jpg",
        });
        setScreen("ending");
      }, REVEAL_MS);
      return;
    }

    // 다음 턴으로 넘어가거나 종료
    setTimeout(() => {
      proceedToNextTurn(nextStats);
    }, REVEAL_MS);
  }

  /** 다음 턴 or 종료 */
  function proceedToNextTurn(currentStats = stats) {
    if (turn >= MAX_TURNS) {
      const zeroOrBelow = Object.values(currentStats).some((v) => v <= 0);
      if (zeroOrBelow) {
        setEnding({
          type: 1,
          title: "엔딩 1 — IF 테리",
          message: "자신이 게이트 내부로 들어갔더라면, 조금이라도 희생자가 줄었을지도 모르는 일인데.\n망설이지 않았으면 누구도 죽지 않았을 텐데.\n……먼저 죽여버리면 될 일이었을 텐데!\n“어? 그러네.”\n멍하니 바라보던 파란 하늘이 빌어먹을 만큼 아름다웠다.",
          bg: "images/terry_ending1.jpg",
        });
      } else {
        setEnding({
          type: 2,
          title: "엔딩 2 — 극복",
          message: "모든 수치가 1 이상입니다. 무너지지 않았습니다.",
          bg: "images/terry_ending2.jpg",
        });
      }
      setScreen("ending");
      return;
    }
    // 다음 턴 준비 후 게임 화면으로 복귀
    setTurn((t) => t + 1);
    setCards(generateTwoCards());
    setRevealCard(null);
    setScreen("game");
  }

  /** 사용자가 카드 선택(리빌 화면 없음) */
  function handlePick(effect) {
    if (!isGameActive) return;

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
        title: "엔딩 1 — IF 테리",
        message: "자신이 게이트 내부로 들어갔더라면, 조금이라도 희생자가 줄었을지도 모르는 일인데.\n망설이지 않았으면 누구도 죽지 않았을 텐데.\n……먼저 죽여버리면 될 일이었을 텐데!\n“어? 그러네.”\n멍하니 바라보던 파란 하늘이 빌어먹을 만큼 아름다웠다.",
        bg: "images/terry_ending1.jpg",
      });
      setScreen("ending");
      return;
    }
    if (fullReached) {
      setEnding({
        type: 2,
        title: "엔딩 2 — 극복",
        message: "한 수치를 가득 채웠습니다. 당신은 견뎌냈어요.",
        bg: "images/terry_ending2.jpg",
      });
      setScreen("ending");
      return;
    }

    // 즉시 다음 턴
    proceedToNextTurn(nextStats);
  }

  /** 공통 UI들 */
  // 스탯바 색깔
  const STAT_COLORS = {
    mind: "from-indigo-400 to-purple-400",  // 정신력: 파랑/보라 계열
    ethics: "from-amber-400 to-orange-500", // 도덕: 주황 계열
    hope: "from-emerald-300 to-cyan-300",   // 희망: 초록/하늘 계열
  };

  const StatBar = ({ statKey, label, value }) => (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-sm">
        <span>{label}</span>
        {/* 데모: 숫자 표시 (원하면 나중에 숨기기) */}
        <span className="opacity-80">{value}</span>
      </div>
      <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${STAT_COLORS[statKey]} transition-all duration-300`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  const CardView = ({ effect, label }) => {
    const { upKey, downKey, upAmount, downAmount } = effect;
    return (
      <button
        onClick={() => handlePick(effect)}
        className="w-full text-left rounded-2xl p-4 bg-white/10 hover:bg-white/15 border border-white/20 transition"
      >
      <div className="mb-2">
        {effect.title ? (
          <>
            <div className="text-lg font-bold">{effect.title}</div>
            {effect.desc && (
              <div className="text-sm opacity-80 mt-1 whitespace-pre-line">
                {effect.desc}
              </div>
            )}
          </>
        ) : (
          <div className="text-lg font-semibold">{label}</div>
        )}
        </div>
        <div className="space-y-3">
          <div>
            <div className="text-sm opacity-90">{STAT_LABEL[upKey]}</div>
            <div className="font-mono">
              {/* <span className="text-emerald-300 mr-2">+{upAmount}</span> */}
              <span className="text-emerald-300">{triangles(upAmount, true)}</span>
            </div>
          </div>
          <div>
            <div className="text-sm opacity-90">{STAT_LABEL[downKey]}</div>
            <div className="font-mono">
              {/* <span className="text-rose-300 mr-2">-{downAmount}</span> */}
              <span className="text-rose-300">{triangles(downAmount, false)}</span>
            </div>
          </div>
        </div>
      </button>
    );
  };

  /** ===== 화면별 렌더링 ===== */
  const StartScreen = () => (
    <div className="relative w-full min-h-screen overflow-y-auto">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('images/terry_back.jpg')" }}
      />
      <div className="w-full min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl">
          <img
            src="/images/terry_title24.png" />
        </div>
        <div className="bg-black/40 border border-white/20 rounded-3xl p-8 text-white text-center max-w-xl w-[95%] shadow-[0_0_30px_rgba(255, 255, 255, 0.9)]">
          <div className="text-2xl font-bold mb-3">Happy Terry Day</div>
          <div className="opacity-90 mb-6">
            15턴 동안 카드로 테리의 운명을 선택하세요.
            <br />
            제한시간 10초, 미선택 시 자동으로 선택됩니다.
          </div>
          <button
            onClick={startGame}
            className="px-5 py-3 rounded-xl bg-[#8BFEFE] hover:bg-[#B4FDFD] text-black font-semibold"
          >
            게임 시작
          </button>
        </div>
      </div>
    </div>
  );

  const GameScreen = () => (
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20"
        style={{ backgroundImage: "url('images/terry_back.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60 -z-10" />

      <div className="w-full h-full flex flex-col items-center overflow-auto py-6 px-2">
        <div className="max-w-3xl w-full flex flex-col items-center text-center text-white gap-8">
          {/* 상단 정보 */}
          <div className="w-full flex items-center justify-between">
            <div className="text-left">
              <div className="text-xs opacity-80">TURN</div>
              <div className="text-2xl font-bold">
                {Math.min(turn, MAX_TURNS)} / {MAX_TURNS}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs opacity-80">TIME</div>
              <div className="text-2xl font-bold tabular-nums">{`${timeLeft}s`}</div>
            </div>
          </div>

          {/* 스탯 바 */}
          <div className="w-full space-y-4">
            <StatBar statKey="mind" label={STAT_LABEL.mind} value={stats.mind} />
            <StatBar statKey="ethics" label={STAT_LABEL.ethics} value={stats.ethics} />
            <StatBar statKey="hope" label={STAT_LABEL.hope} value={stats.hope} />
          </div>

          {/* 카드 영역 */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <CardView label="카드 1" effect={cards[0]} />
            <CardView label="카드 2" effect={cards[1]} />
          </div>

          <div className="text-sm opacity-80">
            제한시간 {TURN_TIMEOUT_SEC}초 내에 카드를 고르세요. 미선택 시 자동 선택됩니다.
          </div>
        </div>
      </div>
    </div>
  );

  const RevealScreen = () => {
    const c = revealCard;
    if (!c) return null;
    return (
      <div className="relative w-screen h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20"
          style={{ backgroundImage: "url('images/terry_back.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/70 -z-10" />
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="bg-white/10 border border-white/20 rounded-3xl p-8 text-white text-center max-w-md w-[90%] shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="text-xl font-bold mb-2">자동 선택됨</div>
            {c.title && <div className="text-lg font-bold mb-1 text-left">{c.title}</div>}
            {c.desc && <div className="text-sm opacity-80 mb-3 whitespace-pre-line text-left">{c.desc}</div>}
            <div className="text-left space-y-2 font-mono">
              <div>
                <span className="opacity-80 mr-2">{STAT_LABEL[c.upKey]}:</span>
                <span className="text-emerald-300 mr-2">+{c.upAmount}</span>
                <span>{triangles(c.upAmount, true)}</span>
              </div>
              <div>
                <span className="opacity-80 mr-2">{STAT_LABEL[c.downKey]}:</span>
                <span className="text-rose-300 mr-2">-{c.downAmount}</span>
                <span>{triangles(c.downAmount, false)}</span>
              </div>
            </div>
            <div className="mt-4 text-sm opacity-80">다음 카드로 넘어갑니다…</div>
          </div>
        </div>
      </div>
    );
  };

  const EndingScreen = () => {
    if (!ending) return null;
    return (
      <div className="relative w-screen h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-20"
          style={{ backgroundImage: `url('${ending.bg}')` }}
        />
        <div className="absolute inset-0 bg-black/60 -z-10" />
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="bg-white/10 border border-white/20 rounded-3xl p-8 text-white text-center max-w-xl w-[95%] shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="text-2xl font-bold mb-2">{ending.title}</div>
            <div className="opacity-90 mb-6 whitespace-pre-line text-left">{ending.message}</div>

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
                className="px-4 py-2 rounded-xl bg-[#8BFEFE] hover:bg-[#B4FDFD] text-black font-semibold"
              >
                다시하기
              </button>
              <button
                onClick={backToStart}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 border border-[#8BFEFE]/30"
              >
                시작화면
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /** 루트: 화면 전환 */
  if (screen === "start") return <StartScreen />;
  if (screen === "game") return <GameScreen />;
  if (screen === "reveal") return <RevealScreen />;
  if (screen === "ending") return <EndingScreen />;

  // fallback
  return null;
}

export default BirthdayTerryPage;
