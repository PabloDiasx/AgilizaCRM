import Link from 'next/link';

const items = [
  { href: '/', label: 'Dashboard' },
  { href: '/leads', label: 'Leads' },
  { href: '/contacts', label: 'Contatos e empresas' },
  { href: '/opportunities', label: 'Oportunidades' },
  { href: '/activities', label: 'Atividades' },
  { href: '/timeline', label: 'Timeline 360' },
  { href: '/reports', label: 'Relatorios' },
  { href: '/import', label: 'Importacao CSV' },
  { href: '/settings', label: 'Configuracoes' },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div style={{ marginBottom: 20 }}>
        <p className="sidebar-kicker">Agiliza CRM</p>
        <h1 className="sidebar-title">Painel operacional</h1>
      </div>
      <nav className="sidebar-nav">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="sidebar-link">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
