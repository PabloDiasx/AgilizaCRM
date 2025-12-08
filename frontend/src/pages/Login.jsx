import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });

            const { access_token, user } = response.data;
            console.log("LOGIN SUCCESS:", user); // Debug Log

            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));

            // Force reload to ensure fresh state/router
            if (user.role === 'Admin') {
                window.location.href = '/dashboard-admin';
            } else if (user.role === 'Vendedor') {
                window.location.href = '/vendas-vendedor';
            } else {
                // Debug: Alert user instead of infinite loop reset
                alert("ERRO DE PERMISSÃO: Login bem sucedido, mas seu cargo não é reconhecido. Cargo recebido: " + user.role);
                console.error("Unknown Role:", user.role);
            }
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.detail || 'Erro ao conectar ao servidor.';
            setError(errorMessage);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'var(--primary-color)'
        }}>
            <div style={{
                background: 'var(--white)',
                padding: '2.5rem',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)',
                width: '100%',
                maxWidth: '380px',
                textAlign: 'center'
            }}>
                <img src="/logo.png" alt="Agiliza CRM" style={{ width: '140px', height: 'auto', marginBottom: '1.5rem' }} />
                <h2 style={{ color: 'var(--secondary-color)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Login</h2>

                {error && <p style={{ color: 'var(--error)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        className="input-field"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    
                    {/* Campo de senha com botão de visualizar */}
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="input-field"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ paddingRight: '45px' }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '5px',
                                color: 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.85rem',
                                fontWeight: '500'
                            }}
                            title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                        >
                            {showPassword ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                    <line x1="1" y1="1" x2="23" y2="23"/>
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            )}
                        </button>
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', padding: '0.8rem' }}>
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
