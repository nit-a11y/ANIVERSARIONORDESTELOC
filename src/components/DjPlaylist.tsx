import { useState } from 'react';
import { ArrowUpRight, Music2, Plus, ThumbsUp, X } from 'lucide-react';
import type { SongTrack } from '../types';
import { addSongSuggestion, voteSong } from '../utils/storage';
export function DjPlaylist({ songs, onUpdateSongs }: { songs: SongTrack[]; onUpdateSongs: (songs: SongTrack[]) => void }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [error, setError] = useState('');
  function submit(e: React.FormEvent) {
    e.preventDefault(); if (!title.trim() || !artist.trim()) return;
    try { onUpdateSongs(addSongSuggestion(title.trim(), artist.trim(), 'Sugestão')); setTitle(''); setArtist(''); setShowForm(false); setError(''); }
    catch { setError('Não foi possível salvar sua sugestão. Tente novamente.'); }
  }
  function vote(id: string) {
    try { onUpdateSongs(voteSong(id)); setError(''); } catch { setError('Não foi possível salvar seu voto. Tente novamente.'); }
  }
  return <section id="playlist-section" className="page-width playlist-section" aria-labelledby="playlist-title"><div className="playlist-intro"><span className="playlist-symbol" aria-hidden="true"><Music2 size={35} /></span><p className="eyebrow">A trilha da nossa história</p><h2 id="playlist-title">Que música lembra<br /><em>esse momento?</em></h2><p>Deixe sua sugestão e escolha suas favoritas.<br />Uma seleção de memórias em forma de música.</p><button className="button button-outline" onClick={() => setShowForm(!showForm)} aria-expanded={showForm} aria-controls="song-form">{showForm ? 'Fechar' : 'Sugerir uma música'}{showForm ? <X size={16} /> : <Plus size={16} />}</button></div><div className="playlist-content">
    {showForm && <form id="song-form" className="community-form" onSubmit={submit}><label htmlFor="song-title">Nome da música</label><input id="song-title" required maxLength={120} value={title} onChange={e => setTitle(e.target.value)} placeholder="Aquela que não sai da cabeça" /><label htmlFor="song-artist">Artista ou banda</label><input id="song-artist" required maxLength={120} value={artist} onChange={e => setArtist(e.target.value)} placeholder="Quem canta?" /><button className="button button-coral" type="submit">Salvar sugestão <ArrowUpRight size={16} /></button></form>}
    {error && <p role="alert">{error}</p>}
    {songs.length ? <ol className="song-list">{songs.map((song, i) => <li key={song.id}><span className="song-number">{String(i + 1).padStart(2, '0')}</span><div><h3>{song.title}</h3><p>{song.artist}</p></div><button onClick={() => vote(song.id)} aria-label={`Votar em ${song.title}. ${song.votes} votos.`}><ThumbsUp size={15} /> {song.votes}</button></li>)}</ol> : <div className="empty-community"><Music2 size={26} /><p>Toda boa trilha começa com uma música.</p><button className="inline-link" onClick={() => setShowForm(true)}>Adicione a primeira <ArrowUpRight size={15} /></button></div>}
    <p className="community-note">Sugestões e votos locais. Não representam a programação musical confirmada do evento.</p>
  </div></section>;
}
