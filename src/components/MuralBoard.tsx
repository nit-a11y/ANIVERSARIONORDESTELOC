import { useState } from 'react';
import { ArrowUpRight, Heart, MessageSquare, X } from 'lucide-react';
import type { MuralMessage } from '../types';
import { addMuralMessage, likeMuralMessage } from '../utils/storage';

export function MuralBoard({ messages, onUpdateMessages }: { messages: MuralMessage[]; onUpdateMessages: (messages: MuralMessage[]) => void }) {
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;
    try {
      const saved = addMuralMessage(author.trim(), '', message.trim());
      onUpdateMessages([saved, ...messages]); setAuthor(''); setMessage(''); setShowForm(false); setError('');
    } catch { setError('Não foi possível salvar seu recado neste navegador. Tente novamente.'); }
  }
  function like(id: string) {
    try { onUpdateMessages(likeMuralMessage(id)); setError(''); }
    catch { setError('Não foi possível salvar sua curtida. Tente novamente.'); }
  }
  return <section id="mural-section" className="page-width community-block" aria-labelledby="mural-title"><div className="section-heading"><div><p className="eyebrow">03 / Memórias que ficam</p><h2 id="mural-title">A história é nossa.<br /><span>O recado é seu.</span></h2></div><div><p>Uma lembrança, um agradecimento, um parabéns.<br />Deixe sua mensagem para os nossos 15 anos.</p><button className="inline-link" onClick={() => setShowForm(!showForm)} aria-expanded={showForm} aria-controls="mural-form">{showForm ? 'Fechar formulário' : 'Escrever um recado'} {showForm ? <X size={16} /> : <ArrowUpRight size={16} />}</button></div></div>
    {showForm && <form id="mural-form" className="community-form" onSubmit={submit}><label htmlFor="mural-name">Seu nome</label><input id="mural-name" required autoComplete="name" maxLength={100} value={author} onChange={e => setAuthor(e.target.value)} placeholder="Como você se chama?" /><label htmlFor="mural-message">Sua mensagem</label><textarea id="mural-message" required maxLength={600} rows={4} value={message} onChange={e => setMessage(e.target.value)} placeholder="Qual memória você quer compartilhar?" /><button className="button button-coral" type="submit">Salvar recado <ArrowUpRight size={16} /></button></form>}
    {error && <p role="alert">{error}</p>}
    {messages.length ? <div className="mural-grid">{messages.map(item => <article className="message-card" key={item.id}><span className="quote-mark" aria-hidden="true">“</span><p className="message-text">{item.message}</p><div className="message-bottom"><div className="message-author"><span className="avatar">{item.author.charAt(0).toUpperCase()}</span><div><b>{item.author}</b><small>{item.timeAgo}</small></div></div><button onClick={() => like(item.id)} aria-label={`Curtir recado de ${item.author}. ${item.likes} curtidas.`}><Heart size={16} />{item.likes}</button></div></article>)}</div> : <div className="empty-community"><MessageSquare size={27} /><p>O primeiro capítulo deste mural pode ser seu.</p><button className="inline-link" onClick={() => setShowForm(true)}>Deixe o primeiro recado <ArrowUpRight size={15} /></button></div>}
    <p className="community-note">Os recados e as curtidas ficam salvos somente neste navegador.</p>
  </section>;
}
