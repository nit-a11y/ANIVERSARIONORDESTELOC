import React from 'react';

interface NordesteBrandLockupProps {
  className?: string;
  variant?: 'full' | 'compact' | 'light';
}

export const NordesteBrandLockup: React.FC<NordesteBrandLockupProps> = ({
  className = '',
  variant = 'full',
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Upper Main Lockup: NORDESTE LOC + FEST & 15 ANOS */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-14 py-4">
        {/* Left: NORDESTE LOC + FEST */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="font-syne font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#fff8ed] uppercase select-none leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
            NORDESTE
          </div>
          <div className="flex items-center gap-2 sm:gap-3 mt-1.5 sm:mt-2">
            <span className="font-syne font-black text-2xl sm:text-3xl md:text-4xl text-[#fff8ed] tracking-wider uppercase">
              LOC
            </span>
            <span className="text-[#ffe3a6] text-xl sm:text-2xl font-black">✦</span>
            <span className="font-syne font-black text-2xl sm:text-3xl md:text-4xl text-[#fff8ed] tracking-wider uppercase border-b-2 border-[#fff8ed]/90 pb-0.5">
              FEST
            </span>
          </div>
        </div>

        {/* Right: 15 ANOS - É TEMPO DE CELEBRAR! */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">
          <div className="flex items-baseline gap-1 font-syne font-black leading-none text-[#fff8ed] drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] select-none">
            <span className="text-5xl sm:text-6xl md:text-7xl tracking-tighter">15</span>
            <span className="text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase">ANOS</span>
          </div>
          <div className="font-syne font-bold text-xs sm:text-sm tracking-[0.25em] uppercase text-[#ffe5b4] mt-2">
            É TEMPO DE CELEBRAR!
          </div>
        </div>
      </div>

      {/* Bottom Partners Strip */}
      {variant === 'full' && (
        <div className="w-full max-w-xl mt-6 pt-5 border-t border-white/20 flex flex-col items-center gap-3">
          <div className="text-[10px] font-syne font-bold uppercase tracking-[0.3em] text-[#ffe5b4]/80">
            Realização & Parceiros Oficiais
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {/* Nordeste Locações Logo with folded paper mark */}
            <div className="flex items-center gap-2.5">
              <svg className="w-6 h-6 text-[#fff8ed]" viewBox="0 0 32 32" fill="currentColor">
                <path d="M6 10L16 4L26 10L16 16L6 10Z" opacity="0.9" />
                <path d="M6 10L16 16V28L6 22V10Z" />
                <path d="M26 10L16 16V28L26 22V10Z" opacity="0.8" />
              </svg>
              <div className="text-left leading-none">
                <span className="font-syne font-bold text-sm tracking-tight text-white block">Nordeste</span>
                <span className="font-syne text-[8px] font-bold tracking-[0.2em] text-[#ffe5b4] uppercase">LOCAÇÕES</span>
              </div>
            </div>

            <div className="h-6 w-px bg-white/20" />

            {/* Partner 1: FORTEQUIP */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/20 border border-white/10">
              <span className="w-3.5 h-3.5 rounded-sm bg-[#cf4c28] flex items-center justify-center text-[8px] font-black text-white">F</span>
              <span className="font-syne font-black text-xs text-white tracking-wider">FORTEQUIP</span>
            </div>

            {/* Partner 2: JLG */}
            <div className="flex items-center px-2.5 py-1 rounded bg-black/20 border border-white/10">
              <span className="font-syne font-black italic text-sm text-[#ff6a42] tracking-tighter">JLG</span>
            </div>

            {/* Partner 3: M TOWER */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-black/20 border border-white/10">
              <span className="w-4 h-4 rounded-sm bg-[#1e7d98] flex items-center justify-center text-[9px] font-bold text-white">M</span>
              <span className="font-syne font-bold text-[10px] text-white tracking-wider">TOWER</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
