import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../services/api';
import { ThemeContext } from '../context/ThemeContext';

// Ícones SVG profissionais
const Icons = {
    home: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
    ),
    dashboard: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
    ),
    leads: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
    ),
    chat: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    ),
    whatsapp: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
    ),
    calendar: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
    ),
    list: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
    ),
    products: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
    ),
    email: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
    ),
    stats: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
    ),
    settings: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
    ),
    sales: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
    ),
    marketing: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
    ),
    logout: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
    )
};

const Sidebar = () => {
    const location = useLocation();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const darkMode = theme === 'dark';
    const [badges, setBadges] = useState({});
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userId, setUserId] = useState('');

    // Carregar dados do usuário
    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setUserName(user.nome || 'Usuário');
            setUserEmail(user.email || '');
            setUserRole(user.role || 'Vendedor');
            setUserId(user.id_usuario || user.id || '');
        }
    }, []);

    // Buscar contadores de badges
    useEffect(() => {
        const fetchBadges = async () => {
            try {
                const [contactsRes, conversationsRes] = await Promise.all([
                    api.get('/contacts/').catch(() => ({ data: [] })),
                    api.get('/support/conversations').catch(() => ({ data: [] }))
                ]);
                setBadges({
                    leads: contactsRes.data.length || 0,
                    chats: conversationsRes.data.length || 0
                });
            } catch (error) {
                console.log('Badge fetch error:', error);
            }
        };
        fetchBadges();
        const interval = setInterval(fetchBadges, 60000);
        return () => clearInterval(interval);
    }, []);

    // Menu dinâmico baseado no role
    const adminMenuItems = [
        { label: 'Início', path: '/dashboard-admin', icon: Icons.home },
        { label: 'Vendas', path: '/vendas', icon: Icons.leads, badgeKey: 'leads' },
        { label: 'Chats', path: '/atendimento', icon: Icons.chat, badgeKey: 'chats' },
        { label: 'Marketing', path: '/marketing', icon: Icons.email },
        { label: 'Relatórios', path: '/relatorios', icon: Icons.stats },
        { label: 'Configurações', path: '/config', icon: Icons.settings },
    ];

    const vendedorMenuItems = [
        { label: 'Vendas', path: '/vendas-vendedor', icon: Icons.leads, badgeKey: 'leads' },
        { label: 'Configurações', path: '/config', icon: Icons.settings },
    ];

    const menuItems = userRole === 'Admin' ? adminMenuItems : vendedorMenuItems;

    const sidebarStyles = {
        sidebar: {
            width: '90px',
            backgroundColor: '#1e2a3a',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 100,
            overflow: 'hidden'
        },
        logo: {
            padding: '1.2rem 0.5rem',
            textAlign: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
        },
        nav: {
            flex: 1,
            padding: '0.5rem 0'
        },
        menuList: {
            listStyle: 'none',
            padding: 0,
            margin: 0
        },
        menuItem: {
            marginBottom: '0.25rem'
        },
        link: (isActive) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 8px',
            textDecoration: 'none',
            color: isActive ? '#4fc3f7' : '#8899a6',
            backgroundColor: isActive ? 'rgba(79, 195, 247, 0.1)' : 'transparent',
            borderLeft: isActive ? '3px solid #4fc3f7' : '3px solid transparent',
            transition: 'all 0.2s ease',
            position: 'relative'
        }),
        iconWrapper: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '4px'
        },
        label: {
            fontSize: '0.65rem',
            fontWeight: '500',
            textAlign: 'center',
            lineHeight: '1.2'
        },
        badge: {
            position: 'absolute',
            top: '-8px',
            right: '-12px',
            backgroundColor: '#2196f3',
            color: 'white',
            fontSize: '0.6rem',
            fontWeight: 'bold',
            padding: '2px 5px',
            borderRadius: '10px',
            minWidth: '18px',
            textAlign: 'center'
        },
        footer: {
            padding: '1rem 0',
            borderTop: '1px solid rgba(255,255,255,0.1)'
        },
        logoutBtn: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '12px 8px',
            background: 'transparent',
            border: 'none',
            color: '#ef5350',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        },
        profileMenu: {
            position: 'fixed',
            top: '10px',
            left: '100px',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            zIndex: 9999
        },
        profileCard: {
            backgroundColor: 'var(--card-bg, #1e2a3a)',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            padding: '0.75rem 1rem',
            border: '1px solid var(--border-color, #333)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        },
        profileSection: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            paddingRight: '1rem',
            borderRight: '1px solid var(--border-color, #444)'
        },
        profileAvatar: {
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            backgroundColor: '#2196f3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: 'bold'
        },
        profileInfo: {
            display: 'flex',
            flexDirection: 'column'
        },
        profileName: {
            fontSize: '0.95rem',
            fontWeight: '600',
            color: 'var(--text-primary, #fff)',
            marginBottom: '2px'
        },
        profileEmail: {
            fontSize: '0.75rem',
            color: 'var(--text-secondary, #888)'
        },
        profileId: {
            fontSize: '0.65rem',
            color: '#4fc3f7',
            fontFamily: 'monospace',
            marginTop: '2px'
        },
        profileActions: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        profileBtn: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'var(--text-primary, #fff)',
            fontSize: '0.85rem',
            backgroundColor: 'transparent',
            border: 'none',
            transition: 'background-color 0.2s',
            whiteSpace: 'nowrap'
        },
        logoutBtnProfile: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '8px',
            cursor: 'pointer',
            color: '#ef5350',
            fontSize: '0.85rem',
            backgroundColor: 'transparent',
            border: 'none',
            transition: 'background-color 0.2s',
            whiteSpace: 'nowrap'
        },
        themeSwitcher: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--card-bg, #1e2a3a)',
            borderRadius: '12px',
            padding: '0.5rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            border: '1px solid var(--border-color, #333)',
            gap: '4px'
        },
        themeBtn: (isActive) => ({
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: '500',
            transition: 'all 0.2s',
            backgroundColor: isActive ? '#4fc3f7' : 'transparent',
            color: isActive ? '#1e2a3a' : '#8899a6'
        })
    };

    // Fechar menu ao clicar fora
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showProfileMenu && !e.target.closest('.profile-menu-container')) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showProfileMenu]);

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <>
            {/* Menu de Perfil Horizontal - Dois cards separados */}
            {showProfileMenu && (
                <div style={sidebarStyles.profileMenu} className="profile-menu-container">
                    {/* Card do Perfil (esquerda) */}
                    <div style={sidebarStyles.profileCard}>
                        {/* Seção do Perfil */}
                        <div style={sidebarStyles.profileSection}>
                            <div style={sidebarStyles.profileAvatar}>
                                {getInitials(userName)}
                            </div>
                            <div style={sidebarStyles.profileInfo}>
                                <div style={sidebarStyles.profileName}>{userName}</div>
                                <div style={sidebarStyles.profileId}>ID da conta {userId} 📋</div>
                            </div>
                        </div>

                        {/* Ações */}
                        <div style={sidebarStyles.profileActions}>
                            <button 
                                style={sidebarStyles.profileBtn}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg, rgba(255,255,255,0.1)'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onClick={() => {
                                    setShowProfileMenu(false);
                                    window.location.href = '/config';
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="8" r="4"/>
                                    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
                                </svg>
                                perfil
                            </button>
                            <button 
                                style={sidebarStyles.logoutBtnProfile}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 83, 80, 0.15)'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('user');
                                    window.location.href = '/login';
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                    <polyline points="16,17 21,12 16,7"/>
                                    <line x1="21" y1="12" x2="9" y2="12"/>
                                </svg>
                                sair
                            </button>
                        </div>
                    </div>

                    {/* Card do Seletor de Tema (direita) */}
                    <div style={sidebarStyles.themeSwitcher}>
                        <button 
                            style={sidebarStyles.themeBtn(!darkMode)}
                            onClick={() => { if (darkMode) toggleTheme(); }}
                        >
                            Claro
                        </button>
                        <button 
                            style={sidebarStyles.themeBtn(darkMode)}
                            onClick={() => { if (!darkMode) toggleTheme(); }}
                        >
                            Escuro
                        </button>
                    </div>
                </div>
            )}

            <aside style={sidebarStyles.sidebar}>
                {/* Logo */}
                <div style={sidebarStyles.logo} className="profile-menu-container">
                    <img 
                        src="/logo.png" 
                        alt="Agiliza" 
                        style={{ maxWidth: '50px', filter: 'brightness(0) invert(1)', cursor: 'pointer' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowProfileMenu(!showProfileMenu);
                        }}
                    />
                </div>

                {/* Navigation */}
            <nav style={sidebarStyles.nav}>
                <ul style={sidebarStyles.menuList}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const badgeCount = item.badgeKey ? badges[item.badgeKey] : null;
                        
                        return (
                            <li key={item.label} style={sidebarStyles.menuItem}>
                                <Link to={item.path} style={sidebarStyles.link(isActive)}>
                                    <div style={sidebarStyles.iconWrapper}>
                                        {item.icon}
                                        {badgeCount > 0 && (
                                            <span style={sidebarStyles.badge}>
                                                {badgeCount > 99 ? '99+' : badgeCount}
                                            </span>
                                        )}
                                    </div>
                                    <span style={sidebarStyles.label}>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
        </>
    );
};

export default Sidebar;
