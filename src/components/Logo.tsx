export default function Logo({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6C63FF" />
          <stop offset="100%" stopColor="#8E44AD" />
        </linearGradient>
        <linearGradient id="logo-accent" x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#d4cfff" stopOpacity="1" />
        </linearGradient>
        <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background rounded square */}
      <rect x="0" y="0" width="48" height="48" rx="12" fill="url(#logo-bg)" />

      {/* Subtle inner glow overlay */}
      <rect
        x="0" y="0" width="48" height="24" rx="12"
        fill="white" fillOpacity="0.06"
      />

      {/* W letterform — bold geometric W */}
      <path
        d="M 8 13 L 15.5 35 L 24 19.5 L 32.5 35 L 40 13"
        stroke="url(#logo-accent)"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Sparkle — 4-point star accent for "wise" */}
      <path
        d="M 37 5.8 L 37.8 8.2 L 40.2 9 L 37.8 9.8 L 37 12.2 L 36.2 9.8 L 33.8 9 L 36.2 8.2 Z"
        fill="#00C2FF"
        opacity="0.9"
      />
    </svg>
  )
}

/** Logomark without the rounded-square background — for inline/text contexts */
export function LogoMark({ size = 32, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path
        d="M 8 13 L 15.5 35 L 24 19.5 L 32.5 35 L 40 13"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 37 5 L 37.7 7.3 L 40 8 L 37.7 8.7 L 37 11 L 36.3 8.7 L 34 8 L 36.3 7.3 Z"
        fill="#00C2FF"
      />
    </svg>
  )
}
