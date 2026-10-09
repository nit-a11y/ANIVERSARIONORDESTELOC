import React, { useState } from 'react';
import { Sparkles, Compass, RotateCcw, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VibeResult {
  title: string;
  badge: string;
  quote: string;
  color: string;
}

export const BeachVibeQuiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<VibeResult | null>(null);

  const questions = [
    {
      q: 'Qual é o seu primeiro destino assim que botar o pé na praia?',
      options: [
        { text: 'Direto pro bar garantir a caipirinha de boas-vindas 🍹', score: 1 },
        { text: 'Conferir a grelha do churrasco pra ver se a picanha tá pronta 🥩', score: 2 },
        { text: 'Reservar a melhor espreguiçadeira perto da piscina 🌴', score: 3 },
        { text: 'Já colar no DJ pra pedir aquela música do Chiclete com Banana 🎶', score: 4 },
      ],
    },
    {
      q: 'O que não pode faltar no seu kit pra essa confraternização?',
      options: [
        { text: 'Óculos escuros espelhados e protetor solar 😎', score: 3 },
        { text: 'A camisa florida mais chamativa que comprei especialmente pro dia 🌺', score: 4 },
        { text: 'Um copo térmico pra não esquentar a cerveja nem com 40°C 🍺', score: 1 },
        { text: 'A melhor animação e disposição pra resenhar até o pôr do sol 🥳', score: 2 },
      ],
    },
  ];

  const resultsPool: VibeResult[] = [
    {
      title: 'O Mestre da Caipirinha & Resenha 🍹',
      badge: 'BARMAN DE CORAÇÃO',
      quote: 'Não deixa copo vazio e sabe os melhores causos dos 15 anos da Nordeste.',
      color: 'from-amber-500 to-rose-600',
    },
    {
      title: 'O Fiscal Oficial da Churrasqueira 🥩',
      badge: 'MESTRE DA BRASA',
      quote: 'Ponto da carne é coisa séria. Se vacilar, ele mesmo pega o garfo do churrasqueiro!',
      color: 'from-red-600 to-amber-700',
    },
    {
      title: 'A Alma do Sunset & Praia 🌴',
      badge: 'PREFEITO DO VERÃO',
      quote: 'Pé na areia, água de coco na mão e contemplando os 15 anos com estilo zen.',
      color: 'from-cyan-500 to-blue-700',
    },
    {
      title: 'O Puxador de Trio & Pista de Axé 💃',
      badge: 'ENERGIA 100% PURA',
      quote: 'Quando toca Eva ou Alceu Valença, não fica ninguém parado se depender dele!',
      color: 'from-fuchsia-600 to-orange-500',
    },
  ];

  const handleSelect = (score: number) => {
    const nextAnswers = [...answers, score];
    setAnswers(nextAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const sum = nextAnswers.reduce((a, b) => a + b, 0);
      const chosen = resultsPool[sum % resultsPool.length];
      setResult(chosen);
      confetti({ particleCount: 60, spread: 60 });
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
      <div className="bg-[#240c1b]/90 border border-white/20 rounded-3xl p-6 sm:p-10 text-center backdrop-blur-md shadow-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-widest text-[#ffe5b4] mb-2">
          <Compass className="w-4 h-4 text-[#cf4c28]" />
          <span>Quiz Descontraído</span>
        </div>
        <h3 className="font-syne font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
          QUAL O SEU PERFIL NO BAILE NA PRAIA?
        </h3>
        <p className="font-dm text-xs sm:text-sm text-[#f3dfcf]/80 mb-6">
          Descubra sua vibe oficial para a celebração dos 15 anos da Nordeste Locações!
        </p>

        {!result ? (
          <div className="max-w-xl mx-auto text-left">
            <div className="text-[11px] font-syne font-bold uppercase text-[#ffe5b4] mb-2">
              Pergunta {step + 1} de {questions.length}
            </div>
            <h4 className="font-syne font-bold text-base sm:text-lg text-white mb-4">
              {questions[step].q}
            </h4>

            <div className="space-y-2.5">
              {questions[step].options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(opt.score)}
                  className="w-full text-left p-3.5 sm:p-4 rounded-xl bg-black/40 hover:bg-[#cf4c28]/20 border border-white/10 hover:border-[#cf4c28]/50 text-white text-xs sm:text-sm transition-all cursor-pointer"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto p-6 rounded-2xl bg-black/50 border border-white/20 text-center animate-fade-in">
            <span className="text-[10px] font-syne font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/15 text-[#ffe5b4]">
              {result.badge}
            </span>

            <h4 className="font-syne font-black text-xl sm:text-2xl text-white uppercase mt-3 mb-2">
              {result.title}
            </h4>

            <p className="text-xs sm:text-sm text-[#f3dfcf] italic mb-6 leading-relaxed">
              &ldquo;{result.quote}&rdquo;
            </p>

            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-xs font-syne font-bold uppercase tracking-wider text-[#ffe5b4] hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Fazer teste novamente</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
