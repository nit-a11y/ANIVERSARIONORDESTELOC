import { useState } from 'react';
import { ArrowUpRight, Check, CheckCircle2 } from 'lucide-react';
import type { GuestRsvp } from '../types';
import { saveRsvp } from '../utils/storage';
import { event } from '../event';

export function RsvpForm({ onSuccess }: { onSuccess: (guest: GuestRsvp) => void }) {
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState(true);
  const [acceptedRules, setAcceptedRules] = useState(false);
  const [submitted, setSubmitted] = useState<GuestRsvp | null>(null);
  const [error, setError] = useState('');
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || (attending && !acceptedRules)) return;
    try {
      const saved = saveRsvp({ fullName: fullName.trim(), department: department.trim(), phone: phone.trim(), attending });
      setSubmitted(saved); setError(''); onSuccess(saved);
    } catch { setError('Não foi possível salvar. Verifique se o armazenamento do navegador está disponível e tente novamente.'); }
  }
  return (
    <section id="rsvp-section" className="rsvp-section section-pad" aria-labelledby="rsvp-title">
      <div className="page-width rsvp-layout">
        <div className="rsvp-intro"><p className="eyebrow">02 / Você faz parte</p><h2 id="rsvp-title">Esse encontro<br />fica melhor<br /><em>com você.</em></h2><p>São 15 anos de uma história construída por pessoas. Vamos celebrar esse momento juntos?</p><div className="rsvp-date"><span>27</span><div>NOVEMBRO / 2026<br /><b>Sexta-feira · {event.time}</b></div></div><p className="local-notice">Por enquanto, sua resposta fica salva apenas neste navegador. O envio à organização ainda não está disponível.</p></div>
        <div className="rsvp-form-card">
          {submitted ? <div className="rsvp-success" role="status"><CheckCircle2 size={44} /><p className="eyebrow">Resposta salva neste navegador</p><h3>{submitted.attending ? 'Vamos celebrar!' : 'Obrigado por avisar.'}</h3><p>{submitted.fullName}, sua resposta foi registrada localmente. Ela ainda não foi enviada à organização.</p><button className="button button-teal" onClick={() => setSubmitted(null)}>Atualizar minha resposta <ArrowUpRight size={17} /></button></div> : <form onSubmit={handleSubmit}>
            <p className="eyebrow">Sua resposta</p><h3>Você vem celebrar?</h3><p className="form-description">Preencha seus dados e confira as orientações do evento.</p>
            <label htmlFor="rsvp-name">Nome completo <span>*</span></label><input id="rsvp-name" name="name" autoComplete="name" required maxLength={120} value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Como podemos chamar você?" />
            <div className="form-row"><div><label htmlFor="rsvp-department">Setor <small>(opcional)</small></label><input id="rsvp-department" maxLength={100} value={department} onChange={e => setDepartment(e.target.value)} placeholder="Seu setor ou departamento" /></div><div><label htmlFor="rsvp-phone">WhatsApp <small>(opcional)</small></label><input id="rsvp-phone" type="tel" name="tel" autoComplete="tel" maxLength={24} value={phone} onChange={e => setPhone(e.target.value)} placeholder="(85) 99999-9999" /></div></div>
            <fieldset><legend>Você estará presente?</legend><div className="attendance-options"><label className={attending ? 'selected' : ''}><input type="radio" name="attending" checked={attending} onChange={() => setAttending(true)} /><span>Sim, estarei lá!</span>{attending && <Check size={16} />}</label><label className={!attending ? 'selected' : ''}><input type="radio" name="attending" checked={!attending} onChange={() => setAttending(false)} /><span>Não poderei ir</span>{!attending && <Check size={16} />}</label></div></fieldset>
            {attending && <label className="rules-check"><input type="checkbox" required checked={acceptedRules} onChange={e => setAcceptedRules(e.target.checked)} /><span>Li e estou ciente das <a href="#dress-code">regras de vestimenta</a> do evento.</span></label>}
            {error && <p className="form-error" role="alert">{error}</p>}
            <button type="submit" className="button button-teal form-submit">Salvar minha resposta <ArrowUpRight size={18} /></button><p className="form-footnote">Registro local · Sem envio à organização</p>
          </form>}
        </div>
      </div>
    </section>
  );
}
