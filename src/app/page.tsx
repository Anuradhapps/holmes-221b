import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export default function Home() {
  return (
    <main className="fixed inset-0 flex h-dvh w-screen flex-col overflow-hidden bg-[#0a0a0b] text-[#ECE6D6]">
      {/* Atmosphere layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Base grid */}
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
          className="absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 35%, transparent 0%, rgba(10,10,11,0.45) 60%, #0a0a0b 100%)",
          }}
        />

        {/* Three drifting fog banks */}
        <div
          className="fog-a absolute -left-1/4 -top-1/4 h-[70%] w-[70%] rounded-full opacity-40 blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(74,20,34,0.55), transparent 70%)" }}
        />
        <div
          className="fog-b absolute -bottom-1/4 -right-1/4 h-[65%] w-[65%] rounded-full opacity-30 blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(198,166,103,0.28), transparent 70%)" }}
        />
        <div
          className="fog-c absolute left-1/3 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(27,43,34,0.6), transparent 70%)" }}
        />

        {/* Breathing lamp glow behind CTA area */}
        <div
          className="lamp-breathe absolute left-1/2 top-[62%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-72 sm:w-72"
          style={{ background: "radial-gradient(circle, rgba(216,184,118,0.25), transparent 72%)" }}
        />

        {/* Deduction string board */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.1]"
          viewBox="0 0 1000 700"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            className="string-draw"
            d="M140,120 L500,350 L860,90 M500,350 L920,560 M500,350 L90,600"
            stroke="#8a1f2d"
            strokeWidth="1"
          />
          <circle className="pin pin-1" cx="140" cy="120" r="2.5" fill="#C7A667" />
          <circle className="pin pin-2" cx="860" cy="90" r="2.5" fill="#C7A667" />
          <circle className="pin pin-3" cx="920" cy="560" r="2.5" fill="#C7A667" />
          <circle className="pin pin-4" cx="90" cy="600" r="2.5" fill="#C7A667" />
          <circle className="pin pin-5" cx="500" cy="350" r="2.5" fill="#C7A667" />
        </svg>

        {/* Magnifying glass with sweeping sheen */}
        <div className="glass-float absolute right-[6%] top-[13%] h-28 w-28 sm:h-44 sm:w-44 sm:top-[15%] lg:right-[12%] lg:h-64 lg:w-64">
          <svg className="glass-tilt h-full w-full opacity-[0.16]" viewBox="0 0 220 220" fill="none">
            <defs>
              <clipPath id="lensClip">
                <circle cx="92" cy="92" r="63" />
              </clipPath>
            </defs>
            <circle cx="92" cy="92" r="66" stroke="#C7A667" strokeWidth="6" />
            <line x1="138" y1="138" x2="200" y2="200" stroke="#C7A667" strokeWidth="12" strokeLinecap="round" />
            <g clipPath="url(#lensClip)">
              <rect className="lens-sheen" x="-40" y="0" width="40" height="220" fill="#F3EEDF" opacity="0.5" />
            </g>
          </svg>
        </div>

        {/* Rising embers / dust */}
        <span className="particle p1 absolute h-[3px] w-[3px] rounded-full bg-[#D8B876]" />
        <span className="particle p2 absolute h-[2px] w-[2px] rounded-full bg-[#C7A667]" />
        <span className="particle p3 absolute h-1 w-1 rounded-full bg-[#D8B876]" />
        <span className="particle p4 absolute h-[2px] w-[2px] rounded-full bg-[#C7A667]" />
        <span className="particle p5 absolute h-[3px] w-[3px] rounded-full bg-[#D8B876]" />
        <span className="particle p6 absolute h-1 w-1 rounded-full bg-[#C7A667]" />
        <span className="particle p7 absolute h-[2px] w-[2px] rounded-full bg-[#D8B876]" />
        <span className="particle p8 absolute h-[3px] w-[3px] rounded-full bg-[#C7A667]" />

        {/* Occasional light sweep across the whole scene */}
        <div className="light-sweep absolute inset-y-0 -left-1/3 w-1/3 opacity-[0.05]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex shrink-0 items-center justify-between px-6 py-4 sm:px-10 sm:py-6 lg:px-14">
        <div className="fade-up flex items-center gap-3" style={{ animationDelay: "0s" }}>
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
          className="fade-up shimmer max-w-4xl font-serif text-4xl leading-[1.08] sm:text-6xl md:text-7xl"
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

        <div className="fade-up relative mt-7 sm:mt-10" style={{ animationDelay: "0.42s" }}>
          <Link
            href="/dashboard"
            className="group relative inline-flex items-center gap-3 rounded-md border border-[#C7A667]/50 bg-gradient-to-b from-[#D8B876] to-[#9E7B3C] px-7 py-3 text-sm font-medium tracking-wide text-[#0a0a0b] shadow-[0_8px_30px_-8px_rgba(198,166,103,0.5)] transition-all duration-300 hover:shadow-[0_12px_40px_-4px_rgba(198,166,103,0.8)] hover:brightness-110 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7A667] sm:px-8 sm:py-3.5"
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
        .fade-up { opacity: 0; animation: fade-up 0.9s ease-out forwards; }

        /* Shimmering gold sweep across the headline, once */
        .shimmer {
          background: linear-gradient(100deg, #F3EEDF 40%, #F7E7B8 50%, #F3EEDF 60%);
          background-size: 250% 100%;
          background-position: 100% 0;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: fade-up 0.9s ease-out forwards, shimmer-sweep 2.6s ease-out 1s forwards;
        }
        @keyframes shimmer-sweep {
          to { background-position: 0% 0; }
        }

        @keyframes fog-drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5%, 4%) scale(1.08); }
        }
        @keyframes fog-drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-4%, -5%) scale(1.05); }
        }
        @keyframes fog-drift-c {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-46%, -54%) scale(1.1); }
        }
        .fog-a { animation: fog-drift-a 22s ease-in-out infinite; }
        .fog-b { animation: fog-drift-b 26s ease-in-out infinite; }
        .fog-c { animation: fog-drift-c 30s ease-in-out infinite; }

        @keyframes lamp-breathe {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.85; transform: translate(-50%, -50%) scale(1.15); }
        }
        .lamp-breathe { animation: lamp-breathe 5s ease-in-out infinite; }

        @keyframes string-draw {
          from { stroke-dasharray: 1400; stroke-dashoffset: 1400; }
          to { stroke-dasharray: 1400; stroke-dashoffset: 0; }
        }
        .string-draw { animation: string-draw 2.2s ease-out 0.4s forwards; stroke-dashoffset: 1400; }

        @keyframes pin-glow {
          0%, 100% { opacity: 0.6; r: 2.5; }
          50% { opacity: 1; r: 3.6; }
        }
        .pin { animation: pin-glow 3.2s ease-in-out infinite; opacity: 0; animation-delay: 2.4s, 2.4s; }
        .pin-1 { animation-delay: 2.4s; }
        .pin-2 { animation-delay: 2.7s; }
        .pin-3 { animation-delay: 3s; }
        .pin-4 { animation-delay: 3.3s; }
        .pin-5 { animation-delay: 3.6s; }

        @keyframes glass-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        .glass-float { animation: glass-float 7s ease-in-out infinite; }

        @keyframes glass-tilt {
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        .glass-tilt { animation: glass-tilt 9s ease-in-out infinite; }

        @keyframes lens-sheen {
          0% { transform: translateX(0); }
          100% { transform: translateX(280px); }
        }
        .lens-sheen { animation: lens-sheen 4.5s ease-in-out infinite; }

        @keyframes light-sweep-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(500vw); }
        }
        .light-sweep {
          background: linear-gradient(100deg, transparent, #F3EEDF, transparent);
          animation: light-sweep-move 14s linear infinite;
          animation-delay: 3s;
        }

        @keyframes rise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-90vh) translateX(20px); opacity: 0; }
        }
        .particle { bottom: -5%; animation: rise linear infinite; }
        .p1 { left: 12%; animation-duration: 14s; animation-delay: 0s; }
        .p2 { left: 24%; animation-duration: 18s; animation-delay: 2s; }
        .p3 { left: 38%; animation-duration: 12s; animation-delay: 4s; }
        .p4 { left: 52%; animation-duration: 20s; animation-delay: 1s; }
        .p5 { left: 66%; animation-duration: 15s; animation-delay: 5s; }
        .p6 { left: 78%; animation-duration: 17s; animation-delay: 3s; }
        .p7 { left: 88%; animation-duration: 13s; animation-delay: 6s; }
        .p8 { left: 45%; animation-duration: 19s; animation-delay: 7s; }

        @media (prefers-reduced-motion: reduce) {
          .fade-up { opacity: 1; animation: none; transform: none; }
          .shimmer { color: #F3EEDF; -webkit-background-clip: initial; background-clip: initial; background: none; }
          .fog-a, .fog-b, .fog-c, .lamp-breathe, .string-draw, .pin,
          .glass-float, .glass-tilt, .lens-sheen, .light-sweep, .particle {
            animation: none !important;
          }
          .string-draw { stroke-dashoffset: 0; }
          .pin { opacity: 0.8; }
        }
      `}</style>
    </main>
  );
}