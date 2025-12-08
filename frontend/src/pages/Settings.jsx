import React from 'react';
import Layout from '../components/Layout';
import SalesLayout from '../components/SalesLayout';

const Settings = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Escolhe o layout baseado no cargo do usuário
    const LayoutWrapper = user?.role === 'Vendedor' ? SalesLayout : Layout;

    return (
        <LayoutWrapper>
            <h1>Configurações</h1>
            <div style={{ display: 'grid', gap: '2rem', maxWidth: '800px' }}>

                {/* Profile Section */}
                <div style={{ background: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                    <h2 style={{ marginTop: 0, color: 'var(--secondary-color)' }}>Perfil do Usuário</h2>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Nome</label>
                            <input type="text" className="input-field" defaultValue={user?.nome || ''} style={{ background: 'var(--primary-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email</label>
                            <input type="email" className="input-field" defaultValue={user?.email || ''} disabled style={{ background: 'var(--primary-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', opacity: 0.7 }} />
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

            </div>
        </LayoutWrapper>
    );
};

export default Settings;
