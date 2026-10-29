import { ArrowUpRight } from 'lucide-react';
import { NordesteBrandLockup } from './NordesteBrandLockup';
export function Footer({ onOpenOrganizer }: { onOpenOrganizer: () => void }) {
  return <footer className="site-footer"><div className="page-width"><div className="footer-top"><NordesteBrandLockup /><p>15 anos de história.<br /><span>É tempo de celebrar!</span></p><span>27.11.2026<br />Fortaleza / CE</span></div><div className="footer-bottom"><span>© 2026 Nordeste Locações</span><button onClick={onOpenOrganizer}>Registros neste dispositivo <ArrowUpRight size={14} /></button></div></div></footer>;
}
