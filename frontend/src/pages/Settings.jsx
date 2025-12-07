import React from 'react';
import Layout from '../components/Layout';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <Layout>
            <h1>Configurações</h1>
            <div style={{ display: 'grid', gap: '2rem', maxWidth: '800px' }}>

                {/* Profile Section */}
                <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                    <h2 style={{ marginTop: 0, color: 'var(--secondary-color)' }}>Perfil do Usuário</h2>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Nome</label>
                            <input type="text" className="input-field" defaultValue="Administrador" style={{ background: 'var(--primary-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email</label>
                            <input type="email" className="input-field" defaultValue="admin@agilizacrm.com" disabled style={{ background: 'var(--primary-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', opacity: 0.7 }} />
                        </div>
                    </div>
                    <button className="btn-primary" style={{ marginTop: '1rem' }}>Salvar Alterações</button>
                </div>

                {/* System Settings - Admin Only */}
                {user && user.role === 'Admin' && (
                    <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                        <h2 style={{ marginTop: 0, color: 'var(--secondary-color)' }}>Sistema (Admin)</h2>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                <input type="checkbox" defaultChecked />
                                Notificações por Email
                            </label>
                        </div>
                    </div>
                )}

                {/* Theme Settings - Everyone */}
                <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                    <h2 style={{ marginTop: 0, color: 'var(--secondary-color)' }}>Aparência</h2>
                    <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>Modo Escuro</span>
                        {/* Toggle Switch */}
                        <label style={{ position: 'relative', display: 'inline-block', width: '60px', height: '34px' }}>
                            <input
                                type="checkbox"
                                checked={theme === 'dark'}
                                onChange={toggleTheme}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                backgroundColor: theme === 'dark' ? 'var(--secondary-color)' : '#ccc',
                                borderRadius: '34px',
                                transition: '.4s',
                                cursor: 'pointer'
                            }}></span>
                            <span style={{
                                position: 'absolute',
                                content: '""',
                                height: '26px', width: '26px',
                                left: '4px', bottom: '4px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                transition: '.4s',
                                transform: theme === 'dark' ? 'translateX(26px)' : 'translateX(0)'
                            }}></span>
                        </label>
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default Settings;
