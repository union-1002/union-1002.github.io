import { useEffect, useState } from "react";

const initialCharacters = [
  "E", "N", "S", "오르티", "H", "L",
  "M", "테리", "A", "I", "비광", "론",
  "J", "미카엘", "R", "Y", "X",
  "라멘타", "루두스", "뽀삐", "느베야", "T", "아가페",
  "하피", "사"
];

const K = 32;
const MAX_COUNT = 300;

function expectedScore(ratingA, ratingB) {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

function updateElo(winner, loser, scores) {
  const Ra = scores[winner];
  const Rb = scores[loser];

  const Ea = expectedScore(Ra, Rb);
  const Eb = 1 - Ea;

  return {
    ...scores,
    [winner]: Ra + K * (1 - Ea),
    [loser]: Rb + K * (0 - Eb)
  };
}

function generateAllPairs(characters) {
  const pairs = [];
  for (let i = 0; i < characters.length; i++) {
    for (let j = i + 1; j < characters.length; j++) {
      // 무작위로 순서를 뒤섞음
      if (Math.random() < 0.5) {
        pairs.push([characters[i], characters[j]]);
      } else {
        pairs.push([characters[j], characters[i]]);
      }
    }
  }
  return pairs;
}

function shuffleArray(array) {
  return [...array].sort(() => 0.5 - Math.random());
}

function RankPage() {
  const [scores, setScores] = useState({});
  const [pair, setPair] = useState([null, null]);
  const [count, setCount] = useState(0);
  const [remainingPairs, setRemainingPairs] = useState([]);
  const [totalPairs, setTotalPairs] = useState(0);

  useEffect(() => {
    const savedScores = localStorage.getItem("eloScores");
    const savedPairs = localStorage.getItem("eloPairs");

    if (savedScores && savedPairs) {
      const parsedPairs = JSON.parse(savedPairs);
      setScores(JSON.parse(savedScores));
      setRemainingPairs(parsedPairs);
      setTotalPairs(parsedPairs.length);
      setCount(0);
    } else {
      const initScores = {};
      initialCharacters.forEach(c => (initScores[c] = 1500));
      const allPairs = shuffleArray(generateAllPairs(initialCharacters));
      setScores(initScores);
      setRemainingPairs(allPairs);
      setTotalPairs(allPairs.length);
      setCount(0);
      localStorage.setItem("eloScores", JSON.stringify(initScores));
      localStorage.setItem("eloPairs", JSON.stringify(allPairs));
    }
  }, []);

  useEffect(() => {
    if (remainingPairs.length > 0) {
      setPair(remainingPairs[0]);
    } else {
      setPair([null, null]);
    }
  }, [remainingPairs]);

  function handleVote(winner, loser) {
    const newScores = updateElo(winner, loser, scores);
    const newPairs = remainingPairs.slice(1);

    setScores(newScores);
    setRemainingPairs(newPairs);
    setCount(count + 1);

    localStorage.setItem("eloScores", JSON.stringify(newScores));
    localStorage.setItem("eloPairs", JSON.stringify(newPairs));
  }

  function handleReset() {
    const initScores = {};
    initialCharacters.forEach(c => (initScores[c] = 1500));
    const allPairs = shuffleArray(generateAllPairs(initialCharacters));

    setScores(initScores);
    setRemainingPairs(allPairs);
    setCount(0);
    setTotalPairs(allPairs.length);

    localStorage.setItem("eloScores", JSON.stringify(initScores));
    localStorage.setItem("eloPairs", JSON.stringify(allPairs));
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  return (
    <div className="p-6 max-w-xl mx-auto text-center space-y-6">
      <h1 className="text-2xl font-bold">스타레인 정실을 찾아서</h1>
      {pair[0] && pair[1] ? (
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => handleVote(pair[0], pair[1])}
            className="flex-1 border rounded-xl p-4 hover:bg-gray-100 shadow-md"
          >
            <img
              src={`/images/rank/${pair[0]}.png`}
              alt={pair[0]}
              className="w-full aspect-[9/16] object-cover rounded-md mb-2"
            />
            <div className="font-semibold">{pair[0]}</div>
          </button>

          <div className="text-xl font-bold text-gray-500">VS</div>

          <button
            onClick={() => handleVote(pair[1], pair[0])}
            className="flex-1 border rounded-xl p-4 hover:bg-gray-100 shadow-md"
          >
            <img
              src={`/images/rank/${pair[1]}.png`}
              alt={pair[1]}
              className="w-full aspect-[9/16] object-cover rounded-md mb-2"
            />
            <div className="font-semibold">{pair[1]}</div>
          </button>
        </div>
      ) : (
        <p className="text-green-600 font-semibold">🎉 모든 비교가 완료되었습니다!</p>
      )}


      <div className="text-sm text-gray-500">
        남은 비교 수: {remainingPairs.length} / {MAX_COUNT}
      </div>

      <h2 className="text-xl font-semibold mt-6">현재 순위</h2>
      <ol className="text-left space-y-1">
        {sorted.map(([name, score], i) => (
          <li key={name} className="flex items-center gap-2">
            <img
              src={`/images/rank/${name}.png`}
              alt={name}
              className="w-8 h-8 object-cover rounded-full"
            />
            {i + 1}. {name} - {score.toFixed(1)}
          </li>
        ))}
      </ol>
      <button
        onClick={handleReset}
        className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
      >
        처음부터 다시 하기
      </button>
    </div>
  );
}

export default RankPage;
