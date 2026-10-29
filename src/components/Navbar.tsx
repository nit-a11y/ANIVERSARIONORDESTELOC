import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NordesteBrandLockup } from './NordesteBrandLockup';
interface NavbarProps { onScrollTo: (id: string) => void; }
export function Navbar({ onScrollTo }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  function navigate(id: string) { onScrollTo(id); setMenuOpen(false); }
  return (
    <header className="site-header">
      <div className="page-width nav-inner">
        <a href="#inicio" className="nav-brand" aria-label="Nordeste Loc Fest, início"><NordesteBrandLockup /><span className="brand-anniversary">15<br /><span>ANOS</span></span></a>
        <nav className="desktop-nav" aria-label="Navegação principal"><button onClick={() => navigate('event-details')}>O encontro</button><button onClick={() => navigate('dress-code')}>Dress code</button></nav>
        <div className="nav-actions"><button className="button button-small button-outline" onClick={() => navigate('event-details')}>Ver convite <ArrowUpRight size={15} /></button><button className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>{menuOpen ? <X /> : <Menu />}</button></div>
      </div>
      {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Navegação no celular"><button onClick={() => navigate('event-details')}>O encontro</button><button onClick={() => navigate('dress-code')}>Dress code</button></nav>}
    </header>
  );
}
