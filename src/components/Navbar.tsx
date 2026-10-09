import React from 'react';
import { Users } from 'lucide-react';

interface NavbarProps {
  onOpenRsvp: () => void;
  onOpenOrganizer: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRsvp,
  onOpenOrganizer,
  onScrollTo,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#15040e]/85 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-syne font-black text-base sm:text-lg tracking-tight text-white uppercase whitespace-nowrap shrink-0 hover:text-[#ffe5b4] transition-colors cursor-pointer text-left"
        >
          NORDESTE <span className="text-[#ff5542]">LOC + FEST</span>
        </button>

        {/* Zone 2: 4-5 Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-syne font-bold uppercase tracking-wider text-[#f3dfcf]/80">
          <button
            type="button"
            onClick={() => onScrollTo('event-details')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Programação
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('mural-section')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Mural
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('playlist-section')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            DJ & Músicas
          </button>
          <button
            type="button"
            onClick={onOpenOrganizer}
            className="text-[#ffe5b4] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Painel RH
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenRsvp}
            className="px-4 py-2 text-xs font-syne font-black uppercase tracking-wider text-white bg-[#cf4c28] hover:bg-[#e05632] rounded-full transition-all shadow-md whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Confirmar RSVP</span>
          </button>
        </div>
      </div>
    </header>
  );
};
