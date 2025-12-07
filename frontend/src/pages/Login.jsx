import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                background: 'white',
                padding: '2rem',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <img src="/logo.png" alt="Agiliza CRM" style={{ maxWidth: '150px', marginBottom: '1rem' }} /> {/* Logo placeholder */}
                <h2 style={{ color: 'var(--secondary-color)', marginBottom: '1.5rem' }}>Login</h2>

                {error && <p style={{ color: 'var(--error)', marginBottom: '1rem' }}>{error}</p>}

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        className="input-field"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="input-field"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
