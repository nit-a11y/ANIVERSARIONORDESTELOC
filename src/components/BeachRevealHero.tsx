import React from 'react';
import { Sparkles, Calendar, MapPin, Users, Ticket, Music, Heart, Volume2 } from 'lucide-react';
import { NordesteBrandLockup } from './NordesteBrandLockup';
import { playCelebrationFanfare } from '../utils/audio';

interface BeachRevealHeroProps {
  onOpenRsvp: () => void;
  onOpenBadge: () => void;
  onScrollToDetails: () => void;
  onScrollToMural: () => void;
  onScrollToPlaylist: () => void;
}

export const BeachRevealHero: React.FC<BeachRevealHeroProps> = ({
  onOpenRsvp,
  onOpenBadge,
  onScrollToDetails,
  onScrollToMural,
  onScrollToPlaylist,
}) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center overflow-hidden px-4 sm:px-6 pt-16 pb-20">
      {/* Background Graphic Image & Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/nordeste_loc_fest_bg_1791568217683.jpg"
          alt="Nordeste Loc Fest 15 Anos Background"
          className="w-full h-full object-cover object-center filter brightness-[0.88] saturate-[1.15]"
          referrerPolicy="no-referrer"
        />
        {/* Measured scrim overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#113247]/75 via-[#182635]/65 to-[#120610]/95" />
        {/* Subtle glowing pill frame outlines matching the user's uploaded banner */}
        <div className="absolute inset-6 sm:inset-10 border border-white/20 rounded-[32px] sm:rounded-[48px] pointer-events-none" />
        <div className="absolute top-12 left-12 right-12 h-20 border-t border-r border-l border-white/10 rounded-t-[40px] pointer-events-none hidden md:block" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Official Brand Lockup with Syne Font */}
        <div className="w-full max-w-4xl bg-black/35 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-8">
          <NordesteBrandLockup variant="full" />
        </div>

        {/* The Big Surprise Pill */}
        <div className="inline-flex items-center gap-2 bg-[#d81932] text-[#fff8ed] px-5 py-2 rounded-full text-xs sm:text-sm font-syne font-extrabold uppercase tracking-widest shadow-lg animate-bounce">
          <span>🌴 SURPRESA REVELADA! ☀️</span>
        </div>

        {/* Main Catchphrase */}
        <h1 className="font-syne font-black text-3xl sm:text-5xl md:text-7xl text-white uppercase tracking-tight leading-[1.05] mt-5 mb-4 text-balance drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
          ACHOU QUE ERA <span className="text-[#ffe3a6]">BAILE DE GALA?</span>
          <br />
          <span className="text-[#ff5542] drop-shadow-[0_4px_20px_rgba(255,85,66,0.6)]">
            É FESTA NA PRAIA, MEU POVO!
          </span>
        </h1>

        <p className="font-dm text-base sm:text-xl text-[#f3dfcf] max-w-2xl mx-auto leading-relaxed mb-8">
          A <strong>Nordeste Locações</strong> completa <strong>15 anos</strong> e vai comemorar do jeito que a nossa história merece: com pé na areia, gente boa, música ao vivo e uma energia surreal!
        </p>

        {/* Quick Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl mb-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
            <span className="text-xs uppercase tracking-wider text-[#ffe5b4] font-syne font-bold block mb-1">
              📍 Onde?
            </span>
            <span className="text-sm sm:text-base font-bold text-white block">
              Casa de Praia VIP
            </span>
            <span className="text-xs text-white/70">Litoral Norte · Vista pro Mar</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
            <span className="text-xs uppercase tracking-wider text-[#ffe5b4] font-syne font-bold block mb-1">
              📅 Quando?
            </span>
            <span className="text-sm sm:text-base font-bold text-white block">
              Sábado · A partir das 11h
            </span>
            <span className="text-xs text-white/70">Sunset até o anoitecer</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
            <span className="text-xs uppercase tracking-wider text-[#ffe5b4] font-syne font-bold block mb-1">
              👕 Qual o Traje?
            </span>
            <span className="text-sm sm:text-base font-bold text-white block">
              Livre & Praiano
            </span>
            <span className="text-xs text-white/70">Bermuda, vestido leve, havaianas</span>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenRsvp}
            className="font-syne font-extrabold uppercase text-xs sm:text-sm tracking-wider px-8 py-4 rounded-full bg-gradient-to-r from-[#d81932] via-[#f73859] to-[#cf4c28] text-white shadow-[0_10px_30px_rgba(216,25,50,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>Confirmar Minha Presença (RSVP)</span>
          </button>

          <button
            type="button"
            onClick={onOpenBadge}
            className="font-syne font-extrabold uppercase text-xs sm:text-sm tracking-wider px-7 py-4 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Ticket className="w-4 h-4 text-[#ffe5b4]" />
            <span>Ver Meu Passaporte VIP</span>
          </button>

          <button
            type="button"
            onClick={() => playCelebrationFanfare()}
            className="font-syne font-bold text-xs uppercase tracking-wider px-4 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#ffe5b4] border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Tocar fanfarra comemorativa"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">Som Festivo</span>
          </button>
        </div>

        {/* Navigation Quick Anchors */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[#ffe5b4]/80 font-syne font-semibold tracking-wide">
          <button
            type="button"
            onClick={onScrollToDetails}
            className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
          >
            Detalhes & Programação
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={onScrollToMural}
            className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
          >
            Mural de Histórias (15 Anos)
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={onScrollToPlaylist}
            className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
          >
            Pedir Músicas pro DJ
          </button>
        </div>
      </div>
    </section>
  );
};
