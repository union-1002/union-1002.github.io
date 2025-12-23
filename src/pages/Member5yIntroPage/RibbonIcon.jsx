export default function RibbonIcon({ color = '#E25B7F', border = '#B02E52', size = 28 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke={border}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* 리본 중앙 매듭 */}
      <circle cx="32" cy="32" r="7" fill={color} stroke={border} />

      {/* 왼쪽 날개 */}
      <path
        d="M25 30 C15 25, 10 28, 10 36 C10 42, 15 44, 25 38 Z"
        fill={color}
        stroke={border}
      />

      {/* 오른쪽 날개 */}
      <path
        d="M39 30 C49 25, 54 28, 54 36 C54 42, 49 44, 39 38 Z"
        fill={color}
        stroke={border}
      />

      {/* 아래쪽 꼬리 */}
      <path
        d="M27 39 L23 54 L32 46 L41 54 L37 39 Z"
        fill={color}
        stroke={border}
      />
    </svg>
  );
}
