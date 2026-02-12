import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#f5efe6] px-4 py-10">
      {/* Decorative elements */}
      {/* Squiggly line top-left */}
      <svg
        className="absolute left-[8%] top-[12%] w-28 text-[#2d2d2d] opacity-70"
        viewBox="0 0 120 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M5 20 Q15 5 25 20 Q35 35 45 20 Q55 5 65 20 Q75 35 85 20 Q95 5 105 20" />
      </svg>

      {/* Dotted rectangle bottom-left */}
      <div className="absolute bottom-[8%] left-[5%] hidden h-40 w-28 rounded-lg bg-[#f0b45d] md:block">
        <svg className="h-full w-full" viewBox="0 0 112 160">
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 5 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={16 + col * 20}
                cy={16 + row * 20}
                r="3.5"
                fill="#2d2d2d"
              />
            ))
          )}
        </svg>
      </div>

      {/* Small card icon left */}
      <div className="absolute left-[12%] top-[45%] hidden h-16 w-20 rounded-lg border-2 border-[#2d2d2d] bg-white md:flex md:flex-col md:items-center md:justify-center md:gap-1.5">
        <div className="h-0.5 w-8 rounded bg-[#2d2d2d]" />
        <div className="h-0.5 w-8 rounded bg-[#2d2d2d]" />
      </div>

      {/* Curved arrow */}
      <svg
        className="absolute bottom-[22%] left-[18%] hidden w-12 text-[#2d2d2d] opacity-60 md:block"
        viewBox="0 0 50 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M25 55 C25 30 10 25 25 5" />
        <path d="M20 10 L25 2 L30 10" />
      </svg>

      {/* Squiggly line top-right */}
      <svg
        className="absolute right-[8%] top-[8%] w-32 text-[#2d2d2d] opacity-70"
        viewBox="0 0 140 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M5 25 Q20 5 35 25 Q50 45 65 25 Q80 5 95 25 Q110 45 125 25" />
      </svg>

      {/* Card icon right */}
      <div className="absolute right-[12%] top-[30%] hidden h-16 w-20 rounded-lg border-2 border-[#2d2d2d] bg-white md:flex md:flex-col md:items-center md:justify-center md:gap-1.5">
        <div className="h-0.5 w-8 rounded bg-[#2d2d2d]" />
        <div className="h-0.5 w-8 rounded bg-[#2d2d2d]" />
      </div>

      {/* Person illustration (right side) */}
      <div className="absolute bottom-[10%] right-[5%] hidden lg:block">
        <svg width="200" height="220" viewBox="0 0 200 220" fill="none">
          {/* Desk */}
          <rect x="40" y="160" width="120" height="8" rx="3" fill="#2d2d2d" />
          <rect x="55" y="168" width="8" height="40" rx="2" fill="#2d2d2d" />
          <rect x="137" y="168" width="8" height="40" rx="2" fill="#2d2d2d" />
          {/* Laptop */}
          <rect x="60" y="130" width="80" height="30" rx="4" fill="#2d2d2d" />
          <rect x="65" y="135" width="70" height="20" rx="2" fill="#e8ddd0" />
          <rect x="50" y="160" width="100" height="4" rx="2" fill="#444" />
          {/* Chair */}
          <rect x="90" y="170" width="50" height="6" rx="3" fill="#2d2d2d" />
          <rect x="112" y="176" width="6" height="30" rx="2" fill="#2d2d2d" />
          {/* Body */}
          <ellipse cx="115" cy="120" rx="25" ry="20" fill="#f0b45d" />
          {/* Head */}
          <circle cx="120" cy="90" r="18" fill="#c98a4b" />
          {/* Hair bun */}
          <circle cx="130" cy="75" r="10" fill="#2d2d2d" />
          {/* Arms reaching to laptop */}
          <path d="M95 125 Q80 140 75 145" stroke="#c98a4b" strokeWidth="8" strokeLinecap="round" />
          <path d="M98 130 Q85 145 80 150" stroke="#c98a4b" strokeWidth="8" strokeLinecap="round" />
          {/* Plant */}
          <rect x="150" y="110" width="8" height="20" rx="3" fill="#a0522d" />
          <ellipse cx="154" cy="105" rx="12" ry="10" fill="#6b8e5a" />
          <ellipse cx="148" cy="100" rx="8" ry="12" fill="#7da06a" />
          <ellipse cx="160" cy="100" rx="8" ry="10" fill="#5f7e50" />
        </svg>
      </div>

      {/* Dotted block bottom-right */}
      <div className="absolute bottom-[5%] right-[8%] hidden h-24 w-16 rounded-lg bg-[#f0b45d] md:block">
        <svg className="h-full w-full" viewBox="0 0 64 96">
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 3 }).map((_, col) => (
              <circle
                key={`br-${row}-${col}`}
                cx={12 + col * 18}
                cy={12 + row * 22}
                r="3.5"
                fill="#2d2d2d"
              />
            ))
          )}
        </svg>
      </div>

      {/* Logo top-left */}
      <div className="absolute left-6 top-6 text-2xl font-bold text-[#2d2d2d]">
        Logo
      </div>

      {/* Login form */}
      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
