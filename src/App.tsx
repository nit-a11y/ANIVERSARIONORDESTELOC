import { useEffect, useRef, useState } from 'react';
import { CalendarDays, Clock3, MapPin, Shirt, X } from 'lucide-react';
import { OfficialMark } from './components/OfficialMark';
import { GradientFrame } from './components/GradientFrame';
import { event } from './event';
import { downloadCalendarInvite } from './utils/calendar';

export default function App() {
  const scene = useRef<HTMLElement>(null);
  const [calendarMessage, setCalendarMessage] = useState('');
  useEffect(() => {
    const root = scene.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    root.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  function addCalendar() {
    downloadCalendarInvite();
    setCalendarMessage('Convite baixado. Abra o arquivo para adicionar à sua agenda.');
  }
  return (
    <main ref={scene} className="festival-scene" aria-labelledby="invitation-title">
      <GradientFrame />
      <section className="welcome-section" aria-labelledby="invitation-title">
        <h1 id="invitation-title" className="official-heading reveal"><span className="visually-hidden">{event.name} · {event.edition}. É tempo de celebrar!</span><OfficialMark /></h1>
        <p className="welcome-message reveal">Você é nosso convidado para viver<br className="desktop-break" /> esse momento especial com a gente!</p>
        <div className="star-divider reveal" aria-hidden="true"><span /><b>✦</b><span /></div>
      </section>
      <section id="informacoes" className="event-section content-width reveal" aria-label="Data, horário e local do evento">
        <button className="event-card calendar-card" onClick={addCalendar} title="Adicionar à minha agenda" aria-label={`Data: ${event.date}, ${event.weekday}. Adicionar à minha agenda.`}>
          <span className="fact-icon"><CalendarDays /></span>
          <span className="fact-label">Data</span>
          <time dateTime="2026-11-27" className="fact-main">{event.date}</time>
          <span className="fact-secondary fact-weekday">{event.weekday}</span>
          <span className="card-hint">Adicionar à agenda ↗</span>
        </button>
        <article className="event-card time-card">
          <span className="fact-icon"><Clock3 /></span>
          <h2 className="fact-label">Horário</h2>
          <p className="fact-secondary">A partir das</p>
          <p className="fact-main">{event.time}</p>
        </article>
        <a className="event-card venue-card" href={event.mapsUrl} target="_blank" rel="noopener noreferrer" title="Abrir localização no mapa" aria-label={`${event.venue}. ${event.address}. Abrir mapa em nova aba.`}>
          <span className="fact-icon"><MapPin /></span>
          <span className="fact-label">Local</span>
          <span className="fact-main">{event.venue}</span>
          <span className="fact-secondary">Praia do Futuro,<br />Fortaleza/CE</span>
          <span className="card-hint">Abrir localização ↗</span>
        </a>
      </section>
      <p className="visually-hidden" role="status">{calendarMessage}</p>
      <section id="dress-code" className="dress-section content-width reveal" aria-labelledby="dress-title">
        <Shirt className="dress-icon" aria-hidden="true" />
        <div className="dress-content">
          <h2 id="dress-title">Dress code</h2>
          <p>{event.dressCode}</p>
          <h3>Não será permitido o uso de:</h3>
          <ul>{event.prohibitedClothing.map(rule => <li key={rule}><span className="prohibition-icon" aria-hidden="true"><X /></span><span>{rule}</span></li>)}</ul>
        </div>
      </section>
      <section className="closing-section reveal" aria-label="Vamos celebrar">
        <p>Vista seu melhor sorriso<br /><span>e venha celebrar com a gente!</span></p>
        <svg className="signature-stroke" viewBox="0 0 400 35" aria-hidden="true"><path d="M10 27 Q190 -3 389 11 M26 30 Q208 5 373 13 M57 26 Q220 10 341 15" /></svg>
        <OfficialMark company />
      </section>
      <GradientFrame bottom />
    </main>
  );
}
