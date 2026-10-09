import React, { useState } from 'react';
import { Music, ThumbsUp, PlusCircle, Radio, Sparkles } from 'lucide-react';
import { SongTrack } from '../types';
import { voteSong, addSongSuggestion } from '../utils/storage';

interface DjPlaylistProps {
  songs: SongTrack[];
  onUpdateSongs: (updated: SongTrack[]) => void;
}

export const DjPlaylist: React.FC<DjPlaylistProps> = ({ songs, onUpdateSongs }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleVote = (id: string) => {
    const updated = voteSong(id);
    onUpdateSongs(updated);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newArtist.trim()) return;

    const updated = addSongSuggestion(newTitle.trim(), newArtist.trim(), 'Pedido dos Convidados');
    onUpdateSongs(updated);
    setNewTitle('');
    setNewArtist('');
    setShowAddForm(false);
  };

  return (
    <section id="playlist-section" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="bg-[#1f0b18]/85 border border-white/15 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-widest text-[#ffe5b4] mb-2">
              <Radio className="w-4 h-4 text-[#cf4c28]" />
              <span>Setlist dos Convidados</span>
            </div>
            <h2 className="font-syne font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              O QUE O DJ TEM QUE TOCAR? 🎧
            </h2>
            <p className="font-dm text-xs sm:text-sm text-[#f3dfcf]/80 mt-1 max-w-lg">
              Vote nas músicas que não podem faltar no pôr do sol ou sugira o seu hit favorito para tocar na festa!
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="self-start md:self-auto text-xs font-syne font-bold uppercase tracking-wider px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#ffe5b4] border border-[#ffe5b4]/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{showAddForm ? 'Fechar' : 'Pedir Outra Música'}</span>
          </button>
        </div>

        {/* Suggest Form */}
        {showAddForm && (
          <form
            onSubmit={handleAdd}
            className="mb-8 p-5 rounded-2xl bg-black/40 border border-white/20 max-w-lg mx-auto space-y-3"
          >
            <h4 className="font-syne font-bold text-sm text-white">Sugerir Música para o DJ:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Nome da Música"
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white text-xs focus:outline-none focus:border-[#cf4c28]"
              />
              <input
                type="text"
                required
                value={newArtist}
                onChange={(e) => setNewArtist(e.target.value)}
                placeholder="Cantor / Banda"
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/20 text-white text-xs focus:outline-none focus:border-[#cf4c28]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-[#cf4c28] hover:bg-[#e05632] text-white font-syne font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Enviar Sugestão pro DJ
            </button>
          </form>
        )}

        {/* Tracks List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {songs.map((song, idx) => (
            <div
              key={song.id}
              className="p-3.5 sm:p-4 rounded-2xl bg-black/30 hover:bg-black/50 border border-white/10 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs font-mono font-bold text-[#ffe5b4] shrink-0">
                  #{idx + 1}
                </div>
                <div className="truncate">
                  <h4 className="font-syne font-bold text-sm text-white truncate">{song.title}</h4>
                  <p className="text-[11px] text-[#f3dfcf]/70 truncate">
                    {song.artist} <span className="text-white/30">·</span> {song.genre}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleVote(song.id)}
                className="shrink-0 ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#cf4c28]/20 hover:bg-[#cf4c28]/40 border border-[#cf4c28]/40 text-[#ff8e75] text-xs font-bold font-mono transition-colors cursor-pointer"
                title="Votar nesta música"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{song.votes}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
