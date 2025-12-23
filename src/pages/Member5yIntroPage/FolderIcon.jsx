import React from "react";

export default function FolderIcon({
  className,
  stroke = "#999",
  topColor = "#000000", // ← 여기로 emp.gradient_5y 넘기면 됨
  ...props
}) {
  const gid = React.useId();

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        {/* 오른쪽 위 → 왼쪽 아래 그라데이션 */}
        <linearGradient
          id={`${gid}-folder`}
          x1="1" y1="0"
          x2="0" y2="1"
        >
          {/* 오른쪽 위: 지정 색 */}
          <stop offset="0%" stopColor={topColor} />

          {/* 왼쪽 아래: 흰색 */}
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>

      <path
        d="
          M9 15
          a4 4 0 0 1 4-4
          h14
          l4 4
          h20
          a4 4 0 0 1 4 4
          v27
          a4 4 0 0 1-4 4
          H13
          a4 4 0 0 1-4-4
          Z
        "
        transform="translate(0 0)"
        fill={`url(#${gid}-folder)`}
        stroke={stroke}
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
