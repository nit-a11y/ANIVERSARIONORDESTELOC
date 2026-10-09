import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Users, CheckCircle2, Send, Bus, Utensils, GlassWater, HeartHandshake } from 'lucide-react';
import { saveRsvp } from '../utils/storage';
import { GuestRsvp } from '../types';
import { playCelebrationFanfare } from '../utils/audio';

interface RsvpFormProps {
  onSuccess: (savedRsvp: GuestRsvp) => void;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({ onSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('Comercial & Locação');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState(true);
  const [hasGuest, setHasGuest] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [needVan, setNeedVan] = useState(false);
  const [foodPreference, setFoodPreference] = useState<'churrasco' | 'frutos_do_mar' | 'vegetariano'>('churrasco');
  const [drinkPreference, setDrinkPreference] = useState<'cerveja' | 'caipirinha' | 'nao_alcoolico'>('cerveja');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const departments = [
    'Comercial & Locação',
    'Logística & Frotas',
    'Manutenção & Oficina',
    'Financeiro & Controladoria',
    'Recursos Humanos & DP',
    'Diretoria & Gerência',
    'TI & Inovação',
    'Parceiro / Convidado Especial',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    setSubmitting(true);

    try {
      const created = saveRsvp({
        fullName: fullName.trim(),
        department,
        phone: phone.trim() || '(Não informado)',
        attending,
        hasGuest: attending ? hasGuest : false,
        guestName: attending && hasGuest ? guestName.trim() : undefined,
        needVan: attending ? needVan : false,
        foodPreference,
        drinkPreference,
      });

      if (attending) {
        confetti({
          particleCount: 120,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#ffcf50', '#f52349', '#38d8ce', '#ffffff', '#ff873d'],
        });
        playCelebrationFanfare();
      }

      setSubmitted(true);
      setTimeout(() => {
        onSuccess(created);
      }, 900);
    } catch {
      // Graceful error fallback
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="rsvp-section" className="bg-[#260a16]/90 border border-white/20 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-widest text-[#ffe5b4] mb-2">
          <Users className="w-4 h-4 text-[#cf4c28]" />
          <span>Confirmação Oficial</span>
        </div>
        <h3 className="font-syne font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
          CONFIRME SUA PRESENÇA (RSVP)
        </h3>
        <p className="font-dm text-xs sm:text-sm text-[#f3dfcf]/80 mt-2">
          Ajude nossa comissão organizadora a dimensionar o banquete, as vans e o kit de 15 anos com muito carinho.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center max-w-md mx-auto">
          <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-4 animate-bounce" />
          <h4 className="font-syne font-black text-2xl text-white uppercase mb-2">
            Presença Confirmada!
          </h4>
          <p className="text-sm text-emerald-200 mb-4">
            Obrigado, {fullName}! Seu nome já está na lista oficial de convidados dos 15 Anos.
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-[#ffe5b4] bg-black/40 px-4 py-2 rounded-lg font-mono">
            Gerando seu Passaporte VIP...
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          {/* Nome e Departamento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-syne font-bold uppercase tracking-wider text-[#ffe5b4] mb-2">
                Seu Nome Completo *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex: Carlos Eduardo Silva"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#cf4c28] focus:ring-1 focus:ring-[#cf4c28] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-syne font-bold uppercase tracking-wider text-[#ffe5b4] mb-2">
                Setor / Departamento *
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white focus:outline-none focus:border-[#cf4c28] text-sm"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept} className="bg-[#1f0a15] text-white">
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Telefone / WhatsApp */}
          <div>
            <label className="block text-xs font-syne font-bold uppercase tracking-wider text-[#ffe5b4] mb-2">
              WhatsApp / Celular (para avisos do translado)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: (71) 99999-8888"
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#cf4c28] text-sm font-mono"
            />
          </div>

          {/* Status de Presença */}
          <div>
            <label className="block text-xs font-syne font-bold uppercase tracking-wider text-[#ffe5b4] mb-2">
              Você vai comparecer ao Nordeste Loc Fest?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAttending(true)}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-syne font-extrabold uppercase tracking-wider border transition-all cursor-pointer ${
                  attending
                    ? 'bg-[#cf4c28] text-white border-[#cf4c28] shadow-lg shadow-[#cf4c28]/30'
                    : 'bg-black/30 text-white/70 border-white/10 hover:bg-white/10'
                }`}
              >
                🎉 Sim, vou com certeza!
              </button>
              <button
                type="button"
                onClick={() => setAttending(false)}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-syne font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  !attending
                    ? 'bg-rose-950 text-rose-200 border-rose-600'
                    : 'bg-black/30 text-white/70 border-white/10 hover:bg-white/10'
                }`}
              >
                😢 Infelizmente não poderei
              </button>
            </div>
          </div>

          {attending && (
            <>
              {/* Acompanhante (+1) */}
              <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-[#ffe5b4]" />
                    <span className="text-xs sm:text-sm font-syne font-bold text-white uppercase">
                      Levará Acompanhante? (+1 Convidado)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    id="hasGuestCheckbox"
                    checked={hasGuest}
                    onChange={(e) => setHasGuest(e.target.checked)}
                    className="w-5 h-5 accent-[#cf4c28] cursor-pointer"
                  />
                </div>

                {hasGuest && (
                  <div>
                    <label className="block text-[11px] font-syne font-bold uppercase tracking-wider text-[#ffe5b4]/80 mb-1.5">
                      Nome Completo do Acompanhante:
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Nome do seu acompanhante"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#cf4c28]"
                    />
                  </div>
                )}
              </div>

              {/* Transporte / Van */}
              <div className="p-4 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bus className="w-4 h-4 text-[#3ed5cc]" />
                  <div>
                    <span className="text-xs sm:text-sm font-syne font-bold text-white uppercase block">
                      Precisa de vaga na Van da Empresa?
                    </span>
                    <span className="text-[11px] text-[#f3dfcf]/70">
                      Saída pontual da sede da Nordeste Locações às 10:15 / 10:45
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={needVan}
                  onChange={(e) => setNeedVan(e.target.checked)}
                  className="w-5 h-5 accent-[#1e7d98] cursor-pointer"
                />
              </div>

              {/* Gastronomia & Bebidas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-syne font-bold uppercase tracking-wider text-[#ffe5b4] mb-2">
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Preferência do Prato:</span>
                  </label>
                  <select
                    value={foodPreference}
                    onChange={(e) => setFoodPreference(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#cf4c28]"
                  >
                    <option value="churrasco" className="bg-[#1f0a15]">🥩 Churrasco no Fogo de Chão</option>
                    <option value="frutos_do_mar" className="bg-[#1f0a15]">🦐 Moqueca de Frutos do Mar</option>
                    <option value="vegetariano" className="bg-[#1f0a15]">🥗 Opção Vegetariana Especial</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-syne font-bold uppercase tracking-wider text-[#ffe5b4] mb-2">
                    <GlassWater className="w-3.5 h-3.5" />
                    <span>Preferência de Bebida:</span>
                  </label>
                  <select
                    value={drinkPreference}
                    onChange={(e) => setDrinkPreference(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#cf4c28]"
                  >
                    <option value="cerveja" className="bg-[#1f0a15]">🍺 Cerveja & Chopp Geladíssimo</option>
                    <option value="caipirinha" className="bg-[#1f0a15]">🍹 Caipirinha & Drinks Tropicais</option>
                    <option value="nao_alcoolico" className="bg-[#1f0a15]">🥥 Água de Coco & Sucos Naturais</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#d81932] via-[#fa3351] to-[#cf4c28] hover:from-[#e51e39] hover:to-[#df542e] text-white font-syne font-black text-sm uppercase tracking-widest shadow-xl shadow-[#d81932]/40 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Gravando Confirmação...' : 'Confirmar Presença Oficial'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
