import React, { useState, useEffect } from 'react';

const Header = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            setUserName(user.nome || 'Usuário');
        }
    }, []);

    return (
        <header style={{
            height: '70px',
            backgroundColor: 'var(--white)',
            boxShadow: 'var(--shadow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            marginLeft: '90px', // width of sidebar
            position: 'sticky',
            top: 0,
            zIndex: 90
        }}>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
                Painel de Controle
            </h2>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--secondary-color)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    marginRight: '1rem'
                }}>
                    {userName.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{userName}</span>
            </div>
        </header>
    );
};

export default Header;
