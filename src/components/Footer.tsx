import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenOrganizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrganizer }) => {
  return (
    <footer className="border-t border-white/10 bg-[#12050c] text-[#f3dfcf]/70 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left text-xs">
        <div>
          <div className="font-syne font-black text-white text-base tracking-tight uppercase">
            NORDESTE LOCAÇÕES · 15 ANOS
          </div>
          <p className="mt-1 text-[#f3dfcf]/60">
            15 Anos de história, superação e parceria no Nordeste. Uma festa pra entrar pra história!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 font-syne font-semibold uppercase tracking-wider text-[11px]">
          <span className="text-[#ffe5b4]">Salvador · Bahia</span>
          <span>·</span>
          <span>Fortequip · JLG · M Tower</span>
          <span>·</span>
          <button
            type="button"
            onClick={onOpenOrganizer}
            className="text-[#ffe5b4] hover:text-white underline underline-offset-4 cursor-pointer"
          >
            Acesso Comissão RH
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-[10px] text-white/40">
        © 2026 Nordeste Locações. Todos os direitos reservados.
      </div>
    </footer>
  );
};
