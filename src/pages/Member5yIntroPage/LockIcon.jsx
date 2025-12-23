import React from "react";

export default function LockIcon({ color = "currentColor", className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* 자물쇠 몸통 (채워짐) */}
      <rect
        x="6.5"
        y="10.5"
        width="11"
        height="10"
        rx="2"
        fill={color}              // 🔹 몸통 채우기
        stroke={color}
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* U자 고리 (라인 유지) */}
      <path
        d="M8.5 10.5V8.5a3.5 3.5 0 0 1 7 0v2"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 키홀 (흰색) */}
      <path
        d="M12 14.5v3"
        fill="none"
        stroke="#ffffff"          // 🔑 키홀 흰색
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
