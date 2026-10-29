import { ArrowDown, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import identity from '../assets/images/nordeste-loc-fest-identidade.jpeg';
import { event } from '../event';

interface BeachRevealHeroProps { onScrollToDetails: () => void; }
export function BeachRevealHero({ onScrollToDetails }: BeachRevealHeroProps) {
  return (
    <section className="event-hero" aria-labelledby="hero-title">
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <div className="hero-grid page-width">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Nordeste Locações · 15 anos</p>
          <h1 id="hero-title">Nossa história.<br />Nosso encontro.<br /><em>Nossa celebração.</em></h1>
          <p className="hero-description">Você é nosso convidado para viver esse momento especial com a gente!</p>
          <div className="hero-actions">
            <button className="button button-coral" onClick={onScrollToDetails}>Conheça o encontro <ArrowDown size={18} /></button>
            <a className="text-button" href={event.mapsUrl} target="_blank" rel="noopener noreferrer">Como chegar <ArrowUpRight size={16} /></a>
          </div>
          <div className="hero-meta">
            <span><CalendarDays size={16} /> {event.date} <span className="meta-dot">·</span> {event.time}</span>
            <span><MapPin size={16} /> Fortaleza, CE</span>
          </div>
        </div>
        <div className="hero-artwork">
          <div className="artwork-topline"><span>Um novo capítulo para celebrar</span><span>EDIÇÃO 15 ANOS</span></div>
          <div className="artwork-image"><img src={identity} alt="Identidade oficial Nordeste Loc Fest. 15 anos. É tempo de celebrar! Nordeste Locações." fetchPriority="high" /></div>
          <div className="artwork-caption"><span>É tempo de celebrar.</span><span className="artwork-spark" aria-hidden="true">✦</span><span>E você faz parte disso.</span></div>
        </div>
      </div>
      <div className="hero-bottom page-width"><span>15 anos construindo essa história juntos.</span><button onClick={onScrollToDetails} aria-label="Ver informações do encontro"><ArrowDown size={18} /></button><span>27 NOV · FORTALEZA</span></div>
    </section>
  );
}
