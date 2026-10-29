import invitation from './assets/images/nordeste-loc-fest-convite-final.png';
import { event } from './event';

export default function App() {
  return (
    <main className="invitation-page" aria-labelledby="invitation-title">
      <figure className="invitation">
        <img
          className="invitation-art"
          src={invitation}
          width={941}
          height={1672}
          alt=""
          fetchPriority="high"
        />
        <a
          className="invitation-map"
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Como chegar à ${event.venue}, ${event.address} (abre em nova aba)`}
          title="Abrir localização da Barraca Gran Royal"
        />
        <figcaption className="visually-hidden">
          <h1 id="invitation-title">{event.name} · {event.edition}</h1>
          <p>É tempo de celebrar!</p>
          <p>Você é nosso convidado para viver esse momento especial com a gente!</p>
          <h2>Data, horário e local</h2>
          <p><time dateTime="2026-11-27">{event.dateLabel}</time>, {event.weekday}, a partir das {event.time}.</p>
          <p>{event.venue}. {event.address}.</p>
          <h2>Dress code</h2>
          <p>{event.dressCode}</p>
          <p>Não será permitido o uso de:</p>
          <ul>{event.prohibitedClothing.map(rule => <li key={rule}>{rule}</li>)}</ul>
          <p>Vista seu melhor sorriso e venha celebrar com a gente!</p>
          <p>Nordeste Locações.</p>
        </figcaption>
      </figure>
    </main>
  );
}
