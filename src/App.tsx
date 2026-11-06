import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CalendarDays, Clock3, MapPin, Music2, Shirt, Volume2, VolumeX, X } from 'lucide-react';
import { OfficialMark } from './components/OfficialMark';
import { GradientFrame } from './components/GradientFrame';
import { EventSchedule } from './components/EventSchedule';
import { event } from './event';
import { downloadCalendarInvite } from './utils/calendar';

export default function App() {
  const scene = useRef<HTMLElement>(null);
  const welcomeDialog = useRef<HTMLDialogElement>(null);
  const soundtrack = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundtrackError, setSoundtrackError] = useState('');
  const [calendarMessage, setCalendarMessage] = useState('');
  useEffect(() => {
    const dialog = welcomeDialog.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

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
  async function toggleSoundtrack() {
    const audio = soundtrack.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    setSoundtrackError('');
    try {
      await audio.play();
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setSoundtrackError('Não foi possível tocar a música. Tente novamente.');
    }
  }
  return (
    <main ref={scene} className="festival-scene" aria-labelledby="invitation-title">
      <GradientFrame />
      <dialog ref={welcomeDialog} className="welcome-dialog" aria-labelledby="welcome-dialog-title" aria-describedby="welcome-dialog-description">
        <span className="welcome-dialog-edition">{event.name} · {event.edition}</span>
        <h2 id="welcome-dialog-title">Junte-se a nós nessa festa!</h2>
        <p id="welcome-dialog-description">Você é nosso convidado para celebrar os 15 anos da Nordeste Locações.</p>
        <button className="action-button primary-action" type="button" onClick={() => {
          void toggleSoundtrack();
          welcomeDialog.current?.close();
        }}>
          <Volume2 aria-hidden="true" />
          Ativar música
        </button>
        <form method="dialog">
          <button className="welcome-dialog-skip" type="submit">Continuar sem música</button>
        </form>
      </dialog>
      <section className="welcome-section" aria-labelledby="invitation-title">
        <h1 id="invitation-title" className="official-heading reveal"><span className="visually-hidden">{event.name} · {event.edition}. É tempo de celebrar!</span><OfficialMark /></h1>
        <p className="welcome-message reveal">Você é nosso convidado para viver<br className="desktop-break" /> esse momento especial com a gente!</p>
        <audio
          ref={soundtrack}
          src={`${import.meta.env.BASE_URL}caraca-muleke.mp3`}
          loop
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => {
            setIsPlaying(false);
            setSoundtrackError('Não foi possível carregar a música.');
          }}
        />
        <button className="soundtrack-toggle action-button secondary-action" type="button" onClick={toggleSoundtrack}>
          {isPlaying ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
          {isPlaying ? 'Pausar música' : 'Ativar som'}
        </button>
        {soundtrackError && <p role="status">{soundtrackError}</p>}
        <div className="star-divider reveal" aria-hidden="true"><span /><b>✦</b><span /></div>
      </section>
      <nav className="invitation-nav content-width" aria-label="Navegar pelo convite">
        <a href="#informacoes"><CalendarDays aria-hidden="true" />O evento</a>
        <a href="#cronograma"><Music2 aria-hidden="true" />Programação</a>
        <a href="#dress-code"><Shirt aria-hidden="true" />O que vestir</a>
      </nav>
      <section id="informacoes" className="event-section content-width reveal" aria-label="Data, horário e local do evento">
        <button className="event-card calendar-card" onClick={addCalendar} title="Adicionar à minha agenda" aria-label={`Data: ${event.date}, ${event.weekday}. Adicionar à minha agenda.`}>
          <span className="fact-icon"><CalendarDays /></span>
          <span className="fact-label">Data</span>
          <time dateTime="2026-11-27" className="fact-main">{event.date}</time>
          <span className="fact-secondary fact-weekday">{event.weekday}</span>
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
          <span className="fact-secondary">Praia do Futuro,{' '}<br />Fortaleza/CE</span>
        </a>
      </section>
      <div className="event-actions content-width">
        <a className="action-button primary-action" href={event.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Como chegar à Barraca Gran Royal (abre o mapa em nova aba)"><MapPin aria-hidden="true" />Como chegar<ArrowUpRight aria-hidden="true" /></a>
        <button className="action-button secondary-action" type="button" onClick={addCalendar}><CalendarDays aria-hidden="true" />Adicionar à agenda</button>
      </div>
      <p className="calendar-message content-width" role="status">{calendarMessage}</p>
      <EventSchedule />
      <section id="dress-code" className="dress-section content-width reveal" aria-labelledby="dress-title">
        <Shirt className="dress-icon" aria-hidden="true" />
        <div className="dress-content">
          <h2 id="dress-title">Dress code</h2>
          <p>{event.dressCode}</p>
          <h3>Evite:</h3>
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
