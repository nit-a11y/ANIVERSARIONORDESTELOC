import type { GuestRsvp, MuralMessage, SongTrack } from '../types';

const RSVP_KEY = 'nordeste_15anos_rsvps';
const MURAL_KEY = 'nordeste_15anos_mural';
const SONGS_KEY = 'nordeste_15anos_songs';

// Remove somente registros demonstrativos da versão anterior; preserva contribuições reais.
function readList<T extends { id: string }>(key: string, demoId: RegExp): T[] {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(key) || '[]');
    if (!Array.isArray(stored)) return [];
    return stored.filter((item): item is T => item && typeof item.id === 'string' && !demoId.test(item.id));
  } catch { return []; }
}
export const getRsvps = () => readList<GuestRsvp>(RSVP_KEY, /^r[1-4]$/);
export const getMuralMessages = () => readList<MuralMessage>(MURAL_KEY, /^m[1-5]$/);
export const getSongs = () => readList<SongTrack>(SONGS_KEY, /^s[1-8]$/);

export function saveRsvp(rsvp: Omit<GuestRsvp, 'id' | 'createdAt'>): GuestRsvp {
  const list = getRsvps();
  const normalized = rsvp.fullName.toLocaleLowerCase('pt-BR');
  const existing = list.find(item => item.fullName.toLocaleLowerCase('pt-BR') === normalized && item.phone === rsvp.phone);
  const saved = { ...rsvp, id: existing?.id || 'rsvp_' + crypto.randomUUID(), createdAt: new Date().toISOString() };
  localStorage.setItem(RSVP_KEY, JSON.stringify([saved, ...list.filter(item => item.id !== saved.id)]));
  return saved;
}
export function addMuralMessage(author: string, department: string, message: string): MuralMessage {
  const saved = { id: 'msg_' + crypto.randomUUID(), author, department, message, likes: 0, timeAgo: 'Agora mesmo', avatarSeed: author.toLowerCase().replace(/\s+/g, '') };
  localStorage.setItem(MURAL_KEY, JSON.stringify([saved, ...getMuralMessages()]));
  return saved;
}
export function likeMuralMessage(id: string): MuralMessage[] {
  const updated = getMuralMessages().map(item => item.id === id ? { ...item, likes: item.likes + 1 } : item);
  localStorage.setItem(MURAL_KEY, JSON.stringify(updated));
  return updated;
}
export function voteSong(id: string): SongTrack[] {
  const updated = getSongs().map(item => item.id === id ? { ...item, votes: item.votes + 1 } : item).sort((a, b) => b.votes - a.votes);
  localStorage.setItem(SONGS_KEY, JSON.stringify(updated));
  return updated;
}
export function addSongSuggestion(title: string, artist: string, genre: string): SongTrack[] {
  const track = { id: 'song_' + crypto.randomUUID(), title, artist, genre: genre || 'Sugestão', votes: 0 };
  const updated = [...getSongs(), track].sort((a, b) => b.votes - a.votes);
  localStorage.setItem(SONGS_KEY, JSON.stringify(updated));
  return updated;
}
export function exportRsvpsToCsv(rsvps: GuestRsvp[]): void {
  const cell = (value: string) => '"' + value.replace(/^[\s]*[=+@-]/, "'$&").replace(/"/g, '""') + '"';
  const rows = [['Nome completo', 'Setor', 'WhatsApp', 'Presença', 'Data do registro'], ...rsvps.map(item => [item.fullName, item.department, item.phone, item.attending ? 'SIM' : 'NÃO', new Date(item.createdAt).toLocaleString('pt-BR')])];
  const csv = '\uFEFF' + rows.map(row => row.map(cell).join(';')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  const link = document.createElement('a');
  link.href = url; link.download = `Nordeste_Loc_Fest_Respostas_Locais_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
