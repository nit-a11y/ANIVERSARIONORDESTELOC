import { useState } from 'react';
import { ArrowUpRight, CalendarDays, Check, Clock3, Copy, MapPin, Shirt, X } from 'lucide-react';
import officialInvitation from '../assets/images/nordeste-loc-fest-convite.jpeg';
import { event } from '../event';

export function EventDetails() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');
  async function copyLocation() {
    try {
      await navigator.clipboard.writeText(`${event.venue} — ${event.address}`);
      setCopied(true); setCopyError('');
      setTimeout(() => setCopied(false), 2500);
    } catch { setCopyError('Não foi possível copiar. Selecione o local acima para copiar manualmente.'); }
  }
  return (
    <section id="event-details" className="event-info section-pad" aria-labelledby="info-title">
      <div className="page-width">
        <div className="section-heading"><div><p className="eyebrow">01 / Nosso encontro</p><h2 id="info-title">Marque na agenda.<br /><span>A gente se vê lá.</span></h2></div><p>Um momento especial merece a sua presença.<br />Confira as informações do nosso encontro.</p></div>
        <div className="event-facts">
          <article><CalendarDays /><p className="eyebrow">A data</p><h3>27 de novembro<span>2026</span></h3><p>{event.weekday}</p></article>
          <article><Clock3 /><p className="eyebrow">O horário</p><h3>{event.time}</h3><p>A partir desse horário</p></article>
          <article><MapPin /><p className="eyebrow">O lugar</p><h3>{event.venue}</h3><p>Praia do Futuro<br />Fortaleza / CE</p><a className="inline-link" href={event.mapsUrl} target="_blank" rel="noopener noreferrer">Como chegar <ArrowUpRight size={16} /></a></article>
        </div>
        <div className="location-footnote"><button className="inline-link" onClick={copyLocation}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Local copiado' : 'Copiar local do evento'}</button><a className="inline-link" href={officialInvitation} target="_blank" rel="noopener noreferrer">Ver convite oficial <ArrowUpRight size={16} /></a><span role="status">{copyError}</span></div>
        <div id="dress-code" className="dress-card">
          <div className="dress-intro"><div className="dress-icon"><Shirt size={28} /></div><p className="eyebrow">Para aproveitar o momento</p><h3>Vista seu<br /><em>melhor sorriso.</em></h3><p>{event.dressCode}</p><span className="dress-tag">Dress code do evento</span></div>
          <div className="dress-rules"><p className="eyebrow">Atenção às orientações</p><h4>Não será permitido o uso de:</h4><ul>{event.prohibitedClothing.map((rule, i) => <li key={rule}><span className="rule-number">0{i + 1}</span><span>{rule}</span><X size={18} aria-hidden="true" /></li>)}</ul><p className="dress-note">Venha celebrar com a gente!</p></div>
        </div>
      </div>
    </section>
  );
}
