// StarIcon.jsx
export default function StarIcon({
  className = "w-7 h-7",
  color = "#FFD76A",      // 별 단색
  border = "#A16207",     // 윤곽선
  gemColor = "#7DD3FC",   // 가운데 보석
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-label="리더"
      role="img"
      className={className}
    >
      {/* 별 본체 (단일 path, 단색) */}
      <path
        d="
          M32 8
          L40 24
          L58 26
          L44 38
          L48 56
          L32 46
          L16 56
          L20 38
          L6 26
          L24 24
          Z
        "
        fill={color}
        stroke={border}
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* 가운데 보석 (점 3개 유지) */}
      <circle cx="32" cy="34" r="3.6" fill={gemColor} />
      <circle cx="26" cy="36.5" r="2.4" fill={gemColor} />
      <circle cx="38" cy="36.5" r="2.4" fill={gemColor} />
    </svg>
  );
}
