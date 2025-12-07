import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { label: 'Dashboard', path: '/dashboard-admin', icon: '📊' },
        { label: 'Vendas & Oportunidades', path: '/vendas', icon: '💰' },
        { label: 'Atendimento', path: '/atendimento', icon: '🎧' },
        { label: 'Marketing', path: '/marketing', icon: '📢' },
        { label: 'Relatórios', path: '/relatorios', icon: '📈' },
        { label: 'Configurações', path: '/config', icon: '⚙️' },
    ];

    return (
        <aside style={{
            width: '260px',
            backgroundColor: 'var(--white)',
            height: '100vh',
            boxShadow: 'var(--shadow)',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 100
        }}>
            <div style={{ padding: '2rem', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
                <img src="/logo.png" alt="Agiliza" style={{ maxWidth: '120px' }} />
            </div>

            <nav style={{ padding: '1rem', flex: 1 }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {menuItems.map((item) => (
                        <li key={item.path} style={{ marginBottom: '0.5rem' }}>
                            <Link to={item.path} style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '12px 16px',
                                textDecoration: 'none',
                                color: location.pathname === item.path ? 'var(--secondary-color)' : 'var(--text-secondary)',
                                backgroundColor: location.pathname === item.path ? 'rgba(33, 150, 243, 0.1)' : 'transparent',
                                borderRadius: 'var(--radius)',
                                fontWeight: location.pathname === item.path ? '600' : '400',
                                transition: 'all 0.3s ease'
                            }}>
                                <span style={{ marginRight: '12px', fontSize: '1.2rem' }}>{item.icon}</span>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <button onClick={() => {
                    localStorage.clear();
                    window.location.href = '/login';
                }} style={{
                    background: 'transparent',
                    color: 'var(--error)',
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <span style={{ marginRight: '10px' }}>🚪</span> Sair
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
