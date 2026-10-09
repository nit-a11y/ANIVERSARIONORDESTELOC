import React, { useRef } from 'react';
import { X, QrCode, Share2, Download, CheckCircle, Sparkles, MapPin, Calendar } from 'lucide-react';
import { GuestRsvp } from '../types';

interface VipBadgeModalProps {
  guest: GuestRsvp | null;
  onClose: () => void;
}

export const VipBadgeModal: React.FC<VipBadgeModalProps> = ({ guest, onClose }) => {
  const badgeRef = useRef<HTMLDivElement>(null);

  if (!guest) return null;

  const serialNumber = 'NL15-' + (guest.id.replace('rsvp_', '').slice(-4) || '2026');

  const handleShareWhatsApp = () => {
    const text = `🎉 Presença confirmada no NORDESTE LOC + FEST - 15 ANOS! 🌴☀️\n\nNome: ${guest.fullName}\nSetor: ${guest.department}\nLocal: Casa de Praia VIP (Litoral Norte)\nPassaporte Oficial: #${serialNumber}\n\n15 Anos de história! Uma festa pra entrar pra história! 🥳`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg hover:bg-gray-200 transition-colors z-20 cursor-pointer"
          aria-label="Fechar credencial"
        >
          <X className="w-5 h-5" />
        </button>

        {/* The VIP Credential Card */}
        <div
          ref={badgeRef}
          className="relative rounded-3xl overflow-hidden border-2 border-[#ffe5b4]/60 bg-gradient-to-b from-[#16435c] via-[#201828] to-[#3a0d18] shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-white p-6 sm:p-8"
        >
          {/* Lanyard Ring Simulator */}
          <div className="w-16 h-3 rounded-full bg-white/30 mx-auto mb-4 border border-white/40" />

          {/* Top Brand Header */}
          <div className="text-center pb-4 border-b border-white/20">
            <div className="font-syne font-black text-2xl tracking-tight text-[#fff8ed] uppercase leading-none">
              NORDESTE LOC + FEST
            </div>
            <div className="font-syne font-extrabold text-xs tracking-[0.25em] text-[#ffe5b4] uppercase mt-1">
              15 ANOS · PASSE VIP DE ACESSO
            </div>
          </div>

          {/* Guest Identity Block */}
          <div className="my-6 text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-[#d81932] text-[10px] font-syne font-extrabold uppercase tracking-widest text-white mb-2 shadow-md">
              🌴 CONVIDADO OFICIAL ☀️
            </div>

            <h3 className="font-syne font-black text-2xl sm:text-3xl text-white tracking-tight uppercase mt-1">
              {guest.fullName}
            </h3>

            <div className="text-sm font-semibold text-[#ffe5b4] mt-0.5">
              {guest.department}
            </div>

            {guest.hasGuest && guest.guestName && (
              <div className="mt-2 text-xs text-[#f3dfcf]/90 bg-white/10 px-3 py-1.5 rounded-lg inline-block">
                +1 Acompanhante: <strong className="text-white">{guest.guestName}</strong>
              </div>
            )}
          </div>

          {/* Event Details Quick Tags */}
          <div className="grid grid-cols-2 gap-2 text-[11px] bg-black/40 p-3 rounded-xl border border-white/10 mb-6">
            <div className="flex items-center gap-1.5 text-[#f3dfcf]">
              <Calendar className="w-3.5 h-3.5 text-[#ffe5b4]" />
              <span>Sábado · 11:00h</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#f3dfcf]">
              <MapPin className="w-3.5 h-3.5 text-[#ffe5b4]" />
              <span>Casa de Praia VIP</span>
            </div>
          </div>

          {/* QR Code and Serial Identification */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white text-gray-900">
            <div className="text-left">
              <span className="text-[10px] font-syne font-bold uppercase tracking-wider text-gray-500 block">
                Nº DE CREDENCIAL
              </span>
              <span className="font-mono font-black text-base text-[#d81932]">
                {serialNumber}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                STATUS: CONFIRMADO
              </span>
            </div>

            {/* Stylized QR Code Graphic */}
            <div className="w-16 h-16 bg-gray-100 p-1 rounded-lg border border-gray-300 flex items-center justify-center">
              <QrCode className="w-full h-full text-gray-900" />
            </div>
          </div>

          {/* Bottom Footer Note */}
          <div className="text-center text-[10px] text-[#ffe5b4]/80 mt-4 font-syne uppercase tracking-wider">
            NORDESTE LOCAÇÕES · 15 ANOS DE HISTÓRIA
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-syne font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartilhar WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="py-3 px-4 rounded-xl bg-white/20 hover:bg-white/30 text-white font-syne font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer border border-white/20"
          >
            <Download className="w-4 h-4" />
            <span>Imprimir / Salvar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
