import React, { useState, useEffect } from 'react';
import { Gift, Clock, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { playGiftPopSound, playCelebrationFanfare } from '../utils/audio';

interface GalaStageProps {
  onReveal: () => void;
}

export const GalaStage: React.FC<GalaStageProps> = ({ onReveal }) => {
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 36,
    hours: 14,
    minutes: 28,
    seconds: 45,
  });

  useEffect(() => {
    // Open the curtains shortly after mounting for royal dramatic effect
    const timer = setTimeout(() => {
      setCurtainsOpen(true);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Live countdown timer ticking
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenGift = () => {
    playGiftPopSound();
    playCelebrationFanfare();
    onReveal();
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden px-4 py-20 luxury-stage-bg"
      aria-label="Convite do Baile Nordeste"
    >
      {/* Outer gold decorative borders */}
      <div className="absolute inset-4 sm:inset-6 border border-[#e9c582]/30 pointer-events-none z-10 rounded-sm" />
      <div className="absolute inset-7 sm:inset-10 border border-[#e9c582]/20 pointer-events-none z-10 rounded-sm" />

      {/* Royal Curtains */}
      <div
        className={`fixed inset-y-0 left-0 w-[53%] curtain-texture z-30 transition-transform duration-1000 ease-[cubic-bezier(0.7,0,0.2,1)] ${
          curtainsOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
        aria-hidden="true"
      >
        <div className="h-4 w-full curtain-trim shadow-md" />
      </div>
      <div
        className={`fixed inset-y-0 right-0 w-[53%] curtain-texture z-30 transition-transform duration-1000 ease-[cubic-bezier(0.7,0,0.2,1)] ${
          curtainsOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
        aria-hidden="true"
      >
        <div className="h-4 w-full curtain-trim shadow-md" />
      </div>

      {/* Main Royal Content */}
      <div
        className={`relative z-20 max-w-3xl mx-auto transition-all duration-1000 delay-300 transform ${
          curtainsOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-[0.3em] uppercase text-[#e9c582] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#e9c582]" />
          <span>Nordeste Locações apresenta</span>
          <Sparkles className="w-3.5 h-3.5 text-[#e9c582]" />
        </div>

        {/* Vintage Seal XV ANOS */}
        <div className="mx-auto my-4 w-24 h-24 rounded-full border-2 border-[#e9c582]/80 bg-[#47091b]/90 text-[#e9c582] flex flex-col items-center justify-center -rotate-6 shadow-[0_0_25px_rgba(233,197,130,0.25)] ring-4 ring-[#e9c582]/20">
          <span className="font-playfair text-xl font-bold tracking-wider leading-none">XV</span>
          <span className="text-[10px] uppercase tracking-widest font-bold mt-1 text-[#e9c582]/90">ANOS</span>
        </div>

        {/* Royal Regency Quote */}
        <p className="font-playfair text-lg sm:text-2xl text-[#f3dfcf] max-w-xl mx-auto leading-relaxed my-4 italic">
          &ldquo;Caríssimos e distintos leitores...<br />
          Uma celebração memorável se aproxima.&rdquo;
        </p>

        {/* Big Monogram */}
        <div className="font-playfair text-[#e9c582] text-7xl sm:text-9xl leading-none my-2 font-bold drop-shadow-[0_10px_25px_rgba(233,197,130,0.35)]">
          XV
        </div>

        {/* Title */}
        <h1 className="font-playfair text-4xl sm:text-6xl md:text-7xl font-bold text-[#fff2dc] my-3 leading-tight tracking-tight">
          O Grande <em className="text-[#e9c582] not-italic">Baile Nordeste</em>
        </h1>

        <p className="font-playfair text-base sm:text-xl text-[#f3dfcf]/90 max-w-2xl mx-auto leading-relaxed mt-2 mb-6">
          Quinze anos de pioneirismo, conquistas e pessoas extraordinárias merecem uma celebração inesquecível.
          <br />
          <strong className="text-[#e9c582] font-semibold">Mas há um grande segredo reservado para você...</strong>
        </p>

        {/* Countdown preview */}
        <div className="my-6 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 bg-[#320713]/80 border border-[#e9c582]/30 px-6 py-3 rounded-xl shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-xs text-[#e9c582] uppercase tracking-wider mr-2 font-medium">
            <Clock className="w-4 h-4 text-[#e9c582]" />
            <span>Contagem:</span>
          </div>
          <div className="text-center">
            <div className="font-mono text-xl sm:text-2xl font-bold text-[#fff2dc] tabular-nums">{timeLeft.days}</div>
            <div className="text-[10px] uppercase text-[#e9c582]/80">Dias</div>
          </div>
          <span className="text-[#e9c582]/40 font-bold">:</span>
          <div className="text-center">
            <div className="font-mono text-xl sm:text-2xl font-bold text-[#fff2dc] tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-[10px] uppercase text-[#e9c582]/80">Horas</div>
          </div>
          <span className="text-[#e9c582]/40 font-bold">:</span>
          <div className="text-center">
            <div className="font-mono text-xl sm:text-2xl font-bold text-[#fff2dc] tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-[10px] uppercase text-[#e9c582]/80">Min</div>
          </div>
          <span className="text-[#e9c582]/40 font-bold">:</span>
          <div className="text-center">
            <div className="font-mono text-xl sm:text-2xl font-bold text-[#fff2dc] tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-[10px] uppercase text-[#e9c582]/80">Seg</div>
          </div>
        </div>

        {/* Gift Box Interaction */}
        <div className="my-4">
          <button
            type="button"
            onClick={handleOpenGift}
            className="group relative cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#e9c582]/50 rounded-2xl"
            aria-label="Abrir o presente de 15 anos"
          >
            {/* The Floating Gift Box */}
            <div className="w-32 h-32 mx-auto relative animate-float-gift transition-transform group-hover:scale-105 filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]">
              {/* Bow */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-5xl text-[#fed68a] select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                🎀
              </div>
              {/* Lid */}
              <div className="absolute top-6 left-0 w-32 h-8 rounded-md bg-gradient-to-r from-[#d81932] via-[#fa3351] to-[#a40b2b] border border-[#f4c77c] shadow-md z-10" />
              {/* Box Body */}
              <div className="absolute bottom-0 left-2.5 right-2.5 h-20 rounded-md bg-gradient-to-br from-[#c40f30] via-[#8d0927] to-[#500616] border border-[#f4c77c]/80" />
              {/* Gold Ribbon Vertical */}
              <div className="absolute left-1/2 -translate-x-1/2 top-6 bottom-0 w-6 bg-gradient-to-r from-[#bd802d] via-[#ffe4a2] to-[#a9732b] shadow-sm z-10" />
            </div>

            {/* Main Action Button */}
            <div className="mt-6">
              <span className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#ffe3a6] via-[#f7d084] to-[#d8a95b] hover:from-[#fff0cb] hover:to-[#e8ba6e] text-[#3b1020] px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(233,197,130,0.35)] transition-all group-hover:-translate-y-1 group-hover:shadow-[0_15px_40px_rgba(233,197,130,0.5)]">
                <Sparkles className="w-4 h-4 text-[#720c22]" />
                Abrir o grande segredo
                <Sparkles className="w-4 h-4 text-[#720c22]" />
              </span>
            </div>
          </button>
        </div>

        <p className="text-xs text-[#f6dec0]/70 mt-3">
          Toque no presente acima para abrir o convite e revelar a comemoração oficial.
        </p>

        {/* Direct Skip Action */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleOpenGift}
            className="text-xs text-[#e9c582]/80 hover:text-[#fff2dc] underline underline-offset-4 transition-colors flex items-center gap-1.5"
          >
            Pular suspense e ver anúncio completo
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
