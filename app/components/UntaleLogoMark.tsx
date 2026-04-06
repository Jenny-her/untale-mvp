"use client";

export default function UntaleLogoMark({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="18"
        cy="18"
        r="17"
        stroke="rgba(232,121,160,0.22)"
        strokeWidth="1"
      />
      <path
        d="M11 9 C7 14, 7 24, 11 27 C13 28.5, 14.5 28, 15 26 C15 22, 13 15, 15 12 C13 9.5 11 9 11 9Z"
        fill="url(#petL)"
        opacity="0.9"
      />
      <path
        d="M25 9 C29 14, 29 24, 25 27 C23 28.5, 21.5 28, 21 26 C21 22, 23 15, 21 12 C23 9.5 25 9 25 9Z"
        fill="url(#petR)"
        opacity="0.9"
      />
      <circle cx="18" cy="28" r="2.2" fill="#e879a0" opacity="0.85" />
      <line
        x1="18"
        y1="11"
        x2="18"
        y2="27"
        stroke="rgba(232,121,160,0.30)"
        strokeWidth="0.8"
      />
      <defs>
        <linearGradient
          id="petL"
          x1="8"
          y1="8"
          x2="16"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#f5eeff" />
          <stop offset="100%" stopColor="#c084c8" />
        </linearGradient>
        <linearGradient
          id="petR"
          x1="28"
          y1="8"
          x2="20"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#f5eeff" />
          <stop offset="100%" stopColor="#e879a0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
