// CrownIcon.jsx
export default function CrownIcon({
  className = "w-7 h-7",
  color = "#FFD76A", // 기본 골드
  border = "#A16207", // 윤곽선 색
  gemColor = "#7DD3FC", // 보석 색
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-label="리더"
      role="img"
      className={className}
    >
      <defs>
        {/* 메인 왕관 색상은 color prop으로 동적 지정 */}
        <linearGradient id="crownGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={border} />
        </linearGradient>

        {/* 보석 색상도 팀별로 다르게 */}
        <linearGradient id="gemGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gemColor} />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>

      {/* 왕관 그림자 */}
      <path
        d="M8 48 L56 48 L52 24 L40 34 L32 20 L24 34 L12 24 Z"
        fill="rgba(0,0,0,0.12)"
        transform="translate(0,1.5)"
      />

      {/* 왕관 본체 */}
      <path
        d="M8 48 L56 48 L52 24 L40 34 L32 20 L24 34 L12 24 Z"
        fill="url(#crownGrad)"
        stroke={border}
        strokeWidth="2"
        strokeLinejoin="round"
      />


      {/* 보석 */}
        <circle cx="32" cy="37" r="4.2" fill={gemColor} stroke={gemColor} strokeWidth="1.5" />
        <circle cx="22" cy="38.5" r="3.3" fill={gemColor} stroke={gemColor} strokeWidth="1.2" />
        <circle cx="42" cy="38.5" r="3.3" fill={gemColor} stroke={gemColor} strokeWidth="1.2" />
    </svg>
  );
}
