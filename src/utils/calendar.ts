import { event } from '../event';

const escapeIcs = (value: string) => value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

export function downloadCalendarInvite() {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  // 12h30 em Fortaleza (UTC−03:00). O convite não informa horário de término.
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Nordeste Loc Fest//Convite//PT-BR',
    'CALSCALE:GREGORIAN', 'BEGIN:VEVENT', 'UID:nordeste-loc-fest-20261127@convite.local',
    `DTSTAMP:${stamp}`, 'DTSTART:20261127T153000Z',
    `SUMMARY:${escapeIcs(`${event.name} · ${event.edition}`)}`,
    `LOCATION:${escapeIcs(`${event.venue}, ${event.address}`)}`,
    `DESCRIPTION:${escapeIcs(`${event.dressCode}\nNão será permitido o uso de: ${event.prohibitedClothing.join(' ')}`)}`,
    'END:VEVENT', 'END:VCALENDAR', '',
  ];
  // Fold UTF-8 lines at 75 bytes, preserving multibyte characters (RFC 5545).
  const encoder = new TextEncoder();
  const folded = lines.map(line => {
    let result = '', bytes = 0;
    for (const character of line) {
      const size = encoder.encode(character).length;
      if (bytes + size > 75) { result += '\r\n '; bytes = 1; }
      result += character; bytes += size;
    }
    return result;
  }).join('\r\n');
  const url = URL.createObjectURL(new Blob([folded], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url; link.download = 'Nordeste-Loc-Fest-27-11-2026.ics';
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
