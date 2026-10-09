import React, { useState } from 'react';
import { X, Download, Users, Bus, Utensils, Search, CheckCircle2, XCircle } from 'lucide-react';
import { GuestRsvp } from '../types';
import { exportRsvpsToCsv } from '../utils/storage';

interface OrganizerModalProps {
  rsvps: GuestRsvp[];
  onClose: () => void;
}

export const OrganizerModal: React.FC<OrganizerModalProps> = ({ rsvps, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const attendingList = rsvps.filter((r) => r.attending);
  const totalGuests = attendingList.reduce((acc, curr) => acc + 1 + (curr.hasGuest ? 1 : 0), 0);
  const totalVansNeeded = attendingList.filter((r) => r.needVan).length;

  const meatCount = attendingList.filter((r) => r.foodPreference === 'churrasco').length;
  const seaCount = attendingList.filter((r) => r.foodPreference === 'frutos_do_mar').length;
  const vegCount = attendingList.filter((r) => r.foodPreference === 'vegetariano').length;

  const beerCount = attendingList.filter((r) => r.drinkPreference === 'cerveja').length;
  const drinkCount = attendingList.filter((r) => r.drinkPreference === 'caipirinha').length;
  const softCount = attendingList.filter((r) => r.drinkPreference === 'nao_alcoolico').length;

  const filteredRsvps = rsvps.filter(
    (r) =>
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl my-6 bg-[#1f0a17] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <div className="inline-block text-[10px] font-syne font-bold uppercase tracking-widest text-[#ffe5b4]">
              Comissão Organizadora & RH
            </div>
            <h3 className="font-syne font-black text-2xl sm:text-3xl uppercase text-white">
              Painel de Gestão dos 15 Anos
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => exportRsvpsToCsv(rsvps)}
              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-syne font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar CSV (Excel)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Fechar painel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-6">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
            <span className="text-[10px] font-syne font-bold uppercase text-[#ffe5b4]">Total de Pessoas</span>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-white mt-1 tabular-nums">
              {totalGuests}
            </div>
            <span className="text-[11px] text-white/60">
              {attendingList.length} colabs + {totalGuests - attendingList.length} acomp.
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
            <span className="text-[10px] font-syne font-bold uppercase text-[#ffe5b4]">Vagas nas Vans</span>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#3ed5cc] mt-1 tabular-nums">
              {totalVansNeeded}
            </div>
            <span className="text-[11px] text-white/60">
              ~{Math.ceil(totalVansNeeded / 15)} vans necessárias
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
            <span className="text-[10px] font-syne font-bold uppercase text-[#ffe5b4]">Cardápio</span>
            <div className="text-xs text-white/90 space-y-1 mt-1 font-mono">
              <div>🥩 Churrasco: <b>{meatCount}</b></div>
              <div>🦐 Moqueca: <b>{seaCount}</b></div>
              <div>🥗 Vegano: <b>{vegCount}</b></div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
            <span className="text-[10px] font-syne font-bold uppercase text-[#ffe5b4]">Bebidas</span>
            <div className="text-xs text-white/90 space-y-1 mt-1 font-mono">
              <div>🍺 Cerveja: <b>{beerCount}</b></div>
              <div>🍹 Caipirinha: <b>{drinkCount}</b></div>
              <div>🥥 Não Alcoól: <b>{softCount}</b></div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por colaborador ou departamento..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#cf4c28]"
          />
        </div>

        {/* Table of Guests */}
        <div className="max-h-80 overflow-y-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/60 text-[#ffe5b4] font-syne uppercase text-[10px] sticky top-0">
              <tr>
                <th className="py-3 px-4">Colaborador / Convidado</th>
                <th className="py-3 px-4">Setor</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Acompanhante</th>
                <th className="py-3 px-4">Van</th>
                <th className="py-3 px-4">Preferências</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredRsvps.map((guest) => (
                <tr key={guest.id} className="hover:bg-white/5">
                  <td className="py-3 px-4 font-semibold text-white">
                    {guest.fullName}
                    <div className="text-[10px] text-white/50 font-mono">{guest.phone}</div>
                  </td>
                  <td className="py-3 px-4 text-white/80">{guest.department}</td>
                  <td className="py-3 px-4">
                    {guest.attending ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Confirmado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-400 font-bold">
                        <XCircle className="w-3.5 h-3.5" />
                        Não irá
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-white/80">
                    {guest.hasGuest ? guest.guestName || 'Sim (+1)' : '—'}
                  </td>
                  <td className="py-3 px-4 text-white/80">
                    {guest.needVan ? '🚐 Sim (Sede)' : 'Carro próprio'}
                  </td>
                  <td className="py-3 px-4 text-white/80 capitalize">
                    {guest.foodPreference} · {guest.drinkPreference}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
