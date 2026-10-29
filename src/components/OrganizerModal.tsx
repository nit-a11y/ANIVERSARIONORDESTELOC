import { useEffect, useRef, useState } from 'react';
import { Download, X } from 'lucide-react';
import type { GuestRsvp } from '../types';
import { exportRsvpsToCsv } from '../utils/storage';
export function OrganizerModal({ rsvps, onClose }: { rsvps: GuestRsvp[]; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [search, setSearch] = useState('');
  useEffect(() => { const node = dialog.current; node?.showModal(); return () => { node?.close(); }; }, []);
  const filtered = rsvps.filter(item => `${item.fullName} ${item.department}`.toLowerCase().includes(search.toLowerCase()));
  return <dialog ref={dialog} onCancel={onClose} className="organizer-dialog" aria-labelledby="organizer-title"><div className="organizer-header"><div><p className="eyebrow">Neste dispositivo</p><h2 id="organizer-title">Respostas locais</h2></div><button className="icon-button" onClick={onClose} aria-label="Fechar painel"><X /></button></div><p>Essas respostas estão salvas apenas neste navegador. Este painel não consolida respostas de outros convidados.</p><div className="organizer-metrics"><span><b>{rsvps.filter(item => item.attending).length}</b> Pretendem ir</span><span><b>{rsvps.filter(item => !item.attending).length}</b> Não poderão ir</span></div><div className="organizer-tools"><input aria-label="Buscar por nome ou setor" placeholder="Buscar por nome ou setor" value={search} onChange={e => setSearch(e.target.value)} /><button className="button button-teal" onClick={() => exportRsvpsToCsv(rsvps)} disabled={!rsvps.length}><Download size={16} /> Exportar CSV</button></div><div className="organizer-table"><table><thead><tr><th>Nome</th><th>Setor</th><th>WhatsApp</th><th>Resposta</th></tr></thead><tbody>{filtered.map(item => <tr key={item.id}><td>{item.fullName}</td><td>{item.department || '—'}</td><td>{item.phone || '—'}</td><td>{item.attending ? 'Estarei lá' : 'Não poderei ir'}</td></tr>)}</tbody></table>{!filtered.length && <p className="empty-state">Nenhuma resposta encontrada neste navegador.</p>}</div></dialog>;
}
