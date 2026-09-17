import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export default function Home() {
  return (
    <main className="fixed inset-0 flex h-dvh w-screen flex-col overflow-hidden bg-[#0a0a0b] text-[#ECE6D6]">
      {/* Atmosphere layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Faint London grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #C7A667 1px, transparent 1px), linear-gradient(to bottom, #C7A667 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 35%, transparent 0%, rgba(10,10,11,0.4) 60%, #0a0a0b 100%)",
          }}
        />

        {/* Burgundy atmosphere, upper left */}
        <div
          className="fog-a absolute -left-1/4 -top-1/4 h-[70%] w-[70%] rounded-full opacity-40 blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(74,20,34,0.5), transparent 70%)" }}
        />

        {/* Brass atmosphere, lower right */}
        <div
          className="fog-b absolute -bottom-1/4 -right-1/4 h-[65%] w-[65%] rounded-full opacity-30 blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(198,166,103,0.25), transparent 70%)" }}
        />

        {/* Faint deduction lines connecting corners */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.08]"
          viewBox="0 0 1000 700"
          fill="none"
          preserveAspectRatio="none"
        >
          <circle cx="140" cy="120" r="2.5" fill="#C7A667" />
          <circle cx="860" cy="90" r="2.5" fill="#C7A667" />
          <circle cx="920" cy="560" r="2.5" fill="#C7A667" />
          <circle cx="90" cy="600" r="2.5" fill="#C7A667" />
          <circle cx="500" cy="350" r="2.5" fill="#C7A667" />
          <path
            d="M140,120 L500,350 L860,90 M500,350 L920,560 M500,350 L90,600"
            stroke="#8a1f2d"
            strokeWidth="1"
          />
        </svg>

        {/* Magnifying glass motif */}
        <svg
          className="glass-pulse absolute right-[6%] top-[14%] h-28 w-28 opacity-[0.14] sm:h-44 sm:w-44 sm:top-[16%] lg:right-[12%] lg:h-64 lg:w-64"
          viewBox="0 0 220 220"
          fill="none"
        >
          <circle cx="92" cy="92" r="66" stroke="#C7A667" strokeWidth="6" />
          <line x1="138" y1="138" x2="200" y2="200" stroke="#C7A667" strokeWidth="12" strokeLinecap="round" />
        </svg>

        {/* Drifting particles */}
        <span className="particle absolute left-[20%] top-[30%] h-1 w-1 rounded-full bg-[#C7A667]" style={{ animationDelay: "0s" }} />
        <span className="particle absolute left-[70%] top-[55%] h-1 w-1 rounded-full bg-[#C7A667]" style={{ animationDelay: "1.4s" }} />
        <span className="particle absolute left-[45%] top-[70%] h-1 w-1 rounded-full bg-[#C7A667]" style={{ animationDelay: "2.6s" }} />
        <span className="particle absolute left-[85%] top-[25%] h-1 w-1 rounded-full bg-[#C7A667]" style={{ animationDelay: "3.8s" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 flex shrink-0 items-center justify-between px-6 py-4 sm:px-10 sm:py-6 lg:px-14">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded border border-[#C7A667]/40 font-serif text-xs text-[#C7A667] sm:h-10 sm:w-10 sm:text-sm">
            221B
          </div>
          <div className="leading-tight">
            <p className="font-serif text-sm text-[#ECE6D6]">Holmes</p>
            <p className="text-[9px] tracking-[0.22em] text-[#8a8172] sm:text-[10px]">
              PERSONAL INTELLIGENCE SYSTEM
            </p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center sm:px-10">
        <p
          className="fade-up mb-4 flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#8a8172] sm:mb-6 sm:text-xs"
          style={{ animationDelay: "0.05s" }}
        >
          <Search size={13} className="text-[#C7A667]" aria-hidden="true" />
          221B BAKER STREET · LONDON
        </p>

        <h1
          className="fade-up max-w-4xl font-serif text-4xl leading-[1.08] text-[#F3EEDF] sm:text-6xl md:text-7xl"
          style={{ animationDelay: "0.15s" }}
        >
          The Game Is Afoot.
        </h1>

        <p
          className="fade-up mt-4 max-w-md text-balance text-sm leading-relaxed text-[#B8AF9C] sm:mt-6 sm:max-w-lg sm:text-base"
          style={{ animationDelay: "0.28s" }}
        >
          A personal intelligence system for managing investigations,
          deductions, and the day ahead.
        </p>

        <div className="fade-up mt-7 sm:mt-10" style={{ animationDelay: "0.42s" }}>
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-3 rounded-md border border-[#C7A667]/50 bg-gradient-to-b from-[#D8B876] to-[#9E7B3C] px-7 py-3 text-sm font-medium tracking-wide text-[#0a0a0b] shadow-[0_8px_30px_-8px_rgba(198,166,103,0.5)] transition-all duration-300 hover:shadow-[0_10px_36px_-6px_rgba(198,166,103,0.7)] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7A667] sm:px-8 sm:py-3.5"
          >
            Enter 221B
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      {/* Case annotations footer */}
      <footer className="relative z-10 shrink-0 border-t border-[#C7A667]/10 px-6 py-3 sm:px-10 sm:py-5 lg:px-14">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[9px] tracking-[0.2em] text-[#6f6759] sm:justify-between sm:gap-x-8 sm:text-[10px]">
          <li>CASE INTELLIGENCE</li>
          <li className="hidden sm:list-item">DAILY SCHEDULE</li>
          <li className="hidden sm:list-item">DEDUCTION</li>
          <li>SCOTLAND YARD</li>
        </ul>
      </footer>

      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          opacity: 0;
          animation: fade-up 0.9s ease-out forwards;
        }

        @keyframes fog-drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(4%, 3%) scale(1.06); }
        }
        @keyframes fog-drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-3%, -4%) scale(1.04); }
        }
        .fog-a { animation: fog-drift-a 24s ease-in-out infinite; }
        .fog-b { animation: fog-drift-b 28s ease-in-out infinite; }

        @keyframes glass-pulse {
          0%, 100% { transform: rotate(-2deg); opacity: 0.14; }
          50% { transform: rotate(2deg); opacity: 0.2; }
        }
        .glass-pulse { animation: glass-pulse 10s ease-in-out infinite; }

        @keyframes particle-float {
          0%, 100% { transform: translateY(0); opacity: 0.25; }
          50% { transform: translateY(-16px); opacity: 0.6; }
        }
        .particle { animation: particle-float 7s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .fade-up { opacity: 1; animation: none; transform: none; }
          .fog-a, .fog-b, .glass-pulse, .particle { animation: none; }
        }
      `}</style>
    </main>
  );
}