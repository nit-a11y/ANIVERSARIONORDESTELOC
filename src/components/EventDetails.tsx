import React, { useState } from 'react';
import { MapPin, Clock, Bus, Shirt, Check, Copy, ExternalLink, Sun, Sparkles } from 'lucide-react';

export const EventDetails: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const locationAddress = 'Alameda das Palmeiras, 1500 - Litoral Norte / Busca Vida, Bahia';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(locationAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scheduleItems = [
    {
      time: '11:00',
      title: 'Recepção Pé na Areia & Boas-Vindas',
      desc: 'Caldinho de boas-vindas, água de coco fresca, caipirinhas artesanais e playlist lounge pra relaxar.',
      tag: 'Chegada',
    },
    {
      time: '12:30',
      title: 'Brinde Histórico dos 15 Anos',
      desc: 'Palavra da Diretoria, homenagem à trajetória da empresa e brinde coletivo com toda a equipe.',
      tag: 'Oficial',
    },
    {
      time: '13:00',
      title: 'Banquete da Confraternização',
      desc: 'Churrasco no fogo de chão, moqueca de peixe e camarão, saladas tropicais e opções vegetarianas.',
      tag: 'Almoço',
    },
    {
      time: '15:00',
      title: 'Homenagens & Sorteio dos 15 Anos',
      desc: 'Entrega de reconhecimentos aos colaboradores por tempo de casa e sorteios de prêmios exclusivos.',
      tag: 'Celebração',
    },
    {
      time: '16:30',
      title: 'Show ao Vivo & Sunset Nordeste Fest',
      desc: 'Banda ao vivo tocando axé retrô, forró e samba-reggae ao pôr do sol na beira da piscina.',
      tag: 'Festa',
    },
    {
      time: '20:00',
      title: 'Saideira & Retorno das Vans',
      desc: 'Café da despedida, distribuição dos kits comemorativos e saída das primeiras vans de retorno.',
      tag: 'Retorno',
    },
  ];

  return (
    <section id="event-details" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-widest text-[#ffe5b4] mb-2">
          <Sun className="w-4 h-4 text-[#cf4c28]" />
          <span>Guia Oficial da Celebração</span>
        </div>
        <h2 className="font-syne font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
          TUDO SOBRE O <span className="text-[#ff5542]">NORDESTE LOC FEST</span>
        </h2>
        <p className="font-dm text-sm sm:text-base text-[#f3dfcf]/80 mt-3">
          Confira o local paradisíaco, a programação completa, a logística de transporte e as dicas de traje para aproveitar ao máximo.
        </p>
      </div>

      {/* Grid of Main Info: Location & Transport */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
        {/* Location Card */}
        <div className="bg-[#240f1a]/80 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#cf4c28]/20 border border-[#cf4c28]/40 flex items-center justify-center text-[#ff5542]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-syne font-bold uppercase tracking-wider text-[#ffe5b4]">Local do Evento</span>
                <h3 className="font-syne font-bold text-xl text-white">Casa de Praia VIP Nordeste</h3>
              </div>
            </div>

            <p className="text-sm text-[#f3dfcf]/90 leading-relaxed mb-4">
              Um espaço exclusivo de frente para o mar, com piscina, coqueiral, área coberta climatizada e acesso direto à areia.
            </p>

            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-[#ffe5b4] mb-4 font-mono">
              📍 {locationAddress}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Endereço Copiado!' : 'Copiar Endereço'}</span>
            </button>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-syne font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg bg-[#cf4c28] hover:bg-[#e05632] text-white transition-colors"
            >
              <span>Abrir no GPS</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Transport & Vans Card */}
        <div className="bg-[#240f1a]/80 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#1e7d98]/20 border border-[#1e7d98]/40 flex items-center justify-center text-[#3ed5cc]">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-syne font-bold uppercase tracking-wider text-[#ffe5b4]">Logística & Translado</span>
                <h3 className="font-syne font-bold text-xl text-white">Vans Executivas da Empresa</h3>
              </div>
            </div>

            <p className="text-sm text-[#f3dfcf]/90 leading-relaxed mb-4">
              Para você curtir e brindar com tranquilidade sem se preocupar em dirigir, teremos vans gratuitas saindo da sede da Nordeste Locações.
            </p>

            <div className="space-y-2 text-xs sm:text-sm text-[#f3dfcf]">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/5">
                <span className="font-semibold text-white">🚐 Ida - Saída 1:</span>
                <span className="font-mono text-[#ffe5b4]">10:15 (Sede Matriz)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/5">
                <span className="font-semibold text-white">🚐 Ida - Saída 2:</span>
                <span className="font-mono text-[#ffe5b4]">10:45 (Sede Matriz)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/5">
                <span className="font-semibold text-white">🔄 Retorno das Vans:</span>
                <span className="font-mono text-[#ffe5b4]">19:30 e 20:30 (Destino Sede)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-xs text-[#ffe5b4]/70">
            * Se preferir ir de carro particular, o local possui estacionamento com seguranças dedicados.
          </div>
        </div>
      </div>

      {/* Schedule Timeline */}
      <div className="bg-[#240f1a]/80 border border-white/15 rounded-3xl p-6 sm:p-10 backdrop-blur-md mb-14">
        <div className="flex items-center gap-3 mb-8">
          <Clock className="w-6 h-6 text-[#ff5542]" />
          <div>
            <span className="text-[11px] font-syne font-bold uppercase tracking-wider text-[#ffe5b4]">Horário a Horário</span>
            <h3 className="font-syne font-black text-2xl sm:text-3xl text-white uppercase">Cronograma da Celebração</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scheduleItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-lg text-[#ffe5b4]">{item.time}</span>
                  <span className="text-[10px] font-syne font-bold uppercase px-2 py-0.5 rounded bg-[#cf4c28]/30 text-[#ff8e75] border border-[#cf4c28]/40">
                    {item.tag}
                  </span>
                </div>
                <h4 className="font-syne font-bold text-base text-white mb-1.5">{item.title}</h4>
                <p className="text-xs text-[#f3dfcf]/80 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dress Code Section: Do Gala ao Praiano */}
      <div className="bg-gradient-to-r from-[#380e1b] via-[#591428] to-[#380e1b] border border-[#e9c582]/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-syne font-bold uppercase tracking-widest text-[#e9c582] mb-1">
            <Shirt className="w-4 h-4" />
            <span>Dress Code Oficial</span>
          </div>
          <h3 className="font-syne font-black text-2xl sm:text-3xl text-white uppercase">
            DO GALA AO PRAIANO 🌴
          </h3>
          <p className="font-dm text-xs sm:text-sm text-[#f3dfcf]/80 mt-1">
            Deixe o smoking e o salto fino em casa. O clima aqui é de celebração, leveza e conforto!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* O que levar / usar */}
          <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/30">
            <div className="flex items-center gap-2 text-emerald-400 font-syne font-bold text-sm uppercase mb-3">
              <Check className="w-4 h-4" />
              <span>Super Bem-Vindo:</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#f3dfcf]/90">
              <li className="flex items-center gap-2">✓ Camisa floral, estampada ou de linho</li>
              <li className="flex items-center gap-2">✓ Bermudas confortáveis & vestidos leves</li>
              <li className="flex items-center gap-2">✓ Óculos de sol, boné ou chapéu de palha</li>
              <li className="flex items-center gap-2">✓ Chinelos Havaianas, rasteirinhas ou tênis leve</li>
              <li className="flex items-center gap-2">✓ Roupa de banho para quem quiser dar um mergulho</li>
            </ul>
          </div>

          {/* O que evitar */}
          <div className="p-5 rounded-2xl bg-black/40 border border-rose-500/30">
            <div className="flex items-center gap-2 text-rose-400 font-syne font-bold text-sm uppercase mb-3">
              <span>✕</span>
              <span>Pode Deixar em Casa:</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#f3dfcf]/90">
              <li className="flex items-center gap-2">✕ Gravata borboleta e paletó quente</li>
              <li className="flex items-center gap-2">✕ Salto fino (que afunda no gramado e na areia)</li>
              <li className="flex items-center gap-2">✕ Preocupações de trabalho e relatórios</li>
              <li className="flex items-center gap-2">✕ Falta de animação!</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
