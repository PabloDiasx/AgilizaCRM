import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import api from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({ openProperties: 0, pipelineValue: 0, newLeads: 0 });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role === 'Vendedor') {
            navigate('/vendas-vendedor');
            return;
        }

        api.get('/dashboard/stats')
            .then(response => {
                setStats(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error loading dashboard stats:", error);
                setLoading(false);
            });
    }, [navigate]);

    return (
        <Layout>
            <h1>Bem-vindo ao Agiliza CRM</h1>
            <p>Selecione um módulo no menu lateral para começar.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '2rem' }}>
                <div style={{ background: 'var(--white)', padding: '1.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-secondary)' }}>Oportunidades Abertas</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: 'var(--secondary-color)' }}>
                        {loading ? '...' : stats.openProperties}
                    </p>
                </div>
                <div style={{ background: 'var(--white)', padding: '1.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-secondary)' }}>Valor em Pipeline</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#4caf50' }}>
                        {loading ? '...' : `R$ ${stats.pipelineValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                    </p>
                </div>
                <div style={{ background: 'var(--white)', padding: '1.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: 'var(--text-secondary)' }}>Total de Leads</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#ff9800' }}>
                        {loading ? '...' : stats.newLeads}
                    </p>
                </div>
            </div>
        </Layout>
    )
}
export default Dashboard;
