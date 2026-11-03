import { OfficialMark } from './OfficialMark';
import { eventSchedule } from '../event';

type ScheduleIconName = 'lunch' | 'ceremony' | 'music' | 'closing';

function ScheduleIcon({ name }: { name: ScheduleIconName }) {
  return <svg viewBox="0 0 100 100" aria-hidden="true">
    {name === 'lunch' && <>
      <path d="M73 12 49 36 Q44 41 49 46 L55 52 Q60 57 65 52 L89 28 M81 20 56 45 M55 49 21 84" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 12 Q12 10 17 29 Q23 47 37 50 L72 85 Q77 90 83 84 Q87 80 82 75 L46 39 Q31 21 18 12Z" fill="currentColor" />
    </>}
    {name === 'ceremony' && <>
      <circle cx="56" cy="45" r="18" fill="none" stroke="currentColor" strokeWidth="6" />
      <path d="M42 48 14 77 Q9 84 16 90 Q22 95 28 87 L57 59Z" fill="currentColor" />
      <path d="M56 3V14 M25 12 32 22 M11 36 23 40 M85 13 78 23 M99 36 87 40" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </>}
    {name === 'music' && <>
      <path d="M30 75V25L79 12V63 M30 38 79 25" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="20" cy="79" rx="14" ry="12" fill="currentColor" transform="rotate(-12 20 79)" />
      <ellipse cx="69" cy="67" rx="14" ry="12" fill="currentColor" transform="rotate(-12 69 67)" />
    </>}
    {name === 'closing' && <>
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="7" />
      <path d="M30 50 45 65 72 35" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </>}
  </svg>;
}

export function EventSchedule() {
  return (
    <section id="cronograma" className="schedule-section reveal" aria-labelledby="schedule-title">
      <div className="schedule-card">
        <svg className="schedule-ornaments" viewBox="0 0 850 1240" preserveAspectRatio="none" aria-hidden="true">
          <path d="M65 75 H170 V125 Q170 155 140 155 H60 M635 35 V110 Q635 140 665 140 H790" />
          <path d="M0 1145 H132 Q165 1145 165 1178 V1239 M62 1240 L79 1205 Q86 1182 113 1182 H236 M690 1226 L721 1162 Q729 1140 753 1140 H850" />
        </svg>
        <svg className="schedule-palm" viewBox="0 0 300 400" aria-hidden="true">
          <path d="M303 35 Q188 114 96 375 M283 49 Q186 21 43 78 Q169 60 260 78 M270 68 Q136 46 0 156 Q132 95 251 92 M255 88 Q118 104 0 239 Q129 145 236 116 M241 112 Q116 158 33 311 Q138 206 224 143 M226 139 Q128 223 83 377 Q156 268 211 171 M272 60 Q246 146 275 272 Q288 167 292 78 M251 91 Q209 183 232 326 Q246 210 271 109" />
        </svg>
        <div className="schedule-brand"><OfficialMark festival /></div>
        <h2 id="schedule-title" className="schedule-title"><span aria-hidden="true" />Agenda do evento<span aria-hidden="true" /></h2>
        <ol className="schedule-list">
          {eventSchedule.map(item => {
            return <li className="schedule-item" key={item.icon}>
              <span className="schedule-icon" aria-hidden="true"><ScheduleIcon name={item.icon} /></span>
              <div className="schedule-copy"><h3>{item.title}</h3><p><time dateTime={`2026-11-27T${item.start}:00-03:00`}>{item.time.split(' às ')[0]}</time>{'end' in item && <> às <time dateTime={`2026-11-27T${item.end}:00-03:00`}>{item.time.split(' às ')[1]}</time></>}</p></div>
            </li>;
          })}
        </ol>
        <div className="schedule-bottom-glow" aria-hidden="true" />
      </div>
    </section>
  );
}
