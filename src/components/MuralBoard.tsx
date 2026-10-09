import React, { useState } from 'react';
import { Heart, MessageSquare, Send, Sparkles, User } from 'lucide-react';
import { MuralMessage } from '../types';
import { addMuralMessage, likeMuralMessage } from '../utils/storage';

interface MuralBoardProps {
  messages: MuralMessage[];
  onUpdateMessages: (updated: MuralMessage[]) => void;
}

export const MuralBoard: React.FC<MuralBoardProps> = ({ messages, onUpdateMessages }) => {
  const [author, setAuthor] = useState('');
  const [department, setDepartment] = useState('Geral');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    addMuralMessage(author.trim(), department, message.trim());
    const updated = [
      {
        id: 'msg_' + Date.now(),
        author: author.trim(),
        department,
        message: message.trim(),
        likes: 1,
        timeAgo: 'Agora mesmo',
        avatarSeed: author.toLowerCase().replace(/\s+/g, ''),
      },
      ...messages,
    ];
    onUpdateMessages(updated);
    setAuthor('');
    setMessage('');
    setShowForm(false);
  };

  const handleLike = (id: string) => {
    const updated = likeMuralMessage(id);
    onUpdateMessages(updated);
  };

  return (
    <section id="mural-section" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-widest text-[#ffe5b4] mb-2">
            <Sparkles className="w-4 h-4 text-[#cf4c28]" />
            <span>Mural de Recados & Memórias</span>
          </div>
          <h2 className="font-syne font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
            15 ANOS DE HISTÓRIAS 💬
          </h2>
          <p className="font-dm text-sm text-[#f3dfcf]/80 mt-2 max-w-xl">
            Deixe sua homenagem, lembrança marcante ou recado de parabéns para a Nordeste Locações e para toda a equipe!
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="self-start md:self-auto font-syne font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3 rounded-full bg-[#cf4c28] hover:bg-[#e05632] text-white shadow-lg transition-all flex items-center gap-2 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{showForm ? 'Fechar Formulário' : 'Deixar Meu Recado'}</span>
        </button>
      </div>

      {/* New Message Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-12 p-6 sm:p-8 rounded-3xl bg-[#2a0e1c] border border-white/20 shadow-xl max-w-2xl mx-auto"
        >
          <h3 className="font-syne font-bold text-lg text-white mb-4">Escrever no Mural dos 15 Anos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[11px] font-syne font-bold uppercase text-[#ffe5b4] mb-1">
                Seu Nome *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ex: João da Silva"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white text-sm focus:outline-none focus:border-[#cf4c28]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-syne font-bold uppercase text-[#ffe5b4] mb-1">
                Seu Setor ou Relação
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Ex: Oficina, Comercial, Parceiro..."
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white text-sm focus:outline-none focus:border-[#cf4c28]"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[11px] font-syne font-bold uppercase text-[#ffe5b4] mb-1">
              Sua Mensagem *
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Conte uma história, mande um abraço ou celebre os 15 anos da Nordeste..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/20 text-white text-sm focus:outline-none focus:border-[#cf4c28] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#cf4c28] hover:bg-[#e05632] text-white font-syne font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Publicar no Mural</span>
          </button>
        </form>
      )}

      {/* Messages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.map((item) => (
          <div
            key={item.id}
            className="bg-[#240f1a]/80 border border-white/15 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-white/30 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#cf4c28] to-[#1e7d98] flex items-center justify-center text-white font-syne font-bold text-sm">
                    {item.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-sm text-white">{item.author}</h4>
                    <span className="text-[11px] text-[#ffe5b4]/80 block">{item.department}</span>
                  </div>
                </div>
                <span className="text-[10px] text-white/50">{item.timeAgo}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#f3dfcf]/90 leading-relaxed italic">
                &ldquo;{item.message}&rdquo;
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] text-white/40 uppercase font-syne">Nordeste 15 Anos</span>
              <button
                type="button"
                onClick={() => handleLike(item.id)}
                className="inline-flex items-center gap-1.5 text-xs text-rose-300 hover:text-rose-200 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span className="font-bold">{item.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
