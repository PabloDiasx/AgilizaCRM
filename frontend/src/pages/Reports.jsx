import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

const Reports = () => {
    const [salesByOwner, setSalesByOwner] = useState([]);
    const [funnelStats, setFunnelStats] = useState(null);
    const [monthlyData, setMonthlyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [ownerRes, funnelRes, monthlyRes] = await Promise.all([
                api.get('/reports/sales-by-owner'),
                api.get('/reports/funnel-conversion'),
                api.get('/reports/monthly-performance')
            ]);
            setSalesByOwner(ownerRes.data);
            setFunnelStats(funnelRes.data);
            setMonthlyData(monthlyRes.data);
        } catch (error) {
            console.error("Error fetching report data", error);
        } finally {
            setLoading(false);
        }
    };

    // Helper for currency
    const fmt = (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <Layout>
            <h1 style={{ marginBottom: '2rem' }}>Relatórios Gerenciais</h1>

            {loading ? <p>Carregando análises...</p> : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    {/* 1. Sales Leaderboard */}
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                        <h3 style={{ marginTop: 0, borderBottom: '2px solid var(--secondary-color)', paddingBottom: '0.5rem' }}>🏆 Ranking de Vendas</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                            <thead>
                                <tr style={{ background: '#f5f5f5' }}>
                                    <th style={{ textAlign: 'left', padding: '8px' }}>Vendedor</th>
                                    <th style={{ textAlign: 'right', padding: '8px' }}>Total</th>
                                    <th style={{ textAlign: 'center', padding: '8px' }}>Qtd</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesByOwner.map((s, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '8px', fontWeight: i === 0 ? 'bold' : 'normal' }}>
                                            {i === 0 && '🥇 '} {s.nome}
                                        </td>
                                        <td style={{ padding: '8px', textAlign: 'right', color: '#4caf50', fontWeight: 'bold' }}>
                                            {fmt(s.total)}
                                        </td>
                                        <td style={{ padding: '8px', textAlign: 'center' }}>{s.quantidade}</td>
                                    </tr>
                                ))}
                                {salesByOwner.length === 0 && <tr><td colSpan="3" style={{ padding: '1rem', textAlign: 'center' }}>Sem dados de vendas.</td></tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* 2. Funnel Conversion */}
                    {funnelStats && (
                        <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
                            <h3 style={{ marginTop: 0, borderBottom: '2px solid var(--secondary-color)', paddingBottom: '0.5rem' }}>📊 Conversão do Funil</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ fontSize: '0.9rem', color: '#666' }}>Total Leads</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{funnelStats.total_leads}</div>
                                    </div>
                                    <div style={{ fontSize: '2rem' }}>⬇️</div>
                                </div>

                                <div style={{ background: '#e3f2fd', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                                    <strong>{funnelStats.taxa_conversao_lead_opp.toFixed(1)}% conversion</strong> lead → opportunity
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ fontSize: '0.9rem', color: '#666' }}>Oportunidades</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{funnelStats.total_oportunidades}</div>
                                    </div>
                                    <div style={{ fontSize: '2rem' }}>⬇️</div>
                                </div>

                                <div style={{ background: '#e8f5e9', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                                    <strong>{funnelStats.taxa_conversao_opp_venda.toFixed(1)}% conversion</strong> opportunity → won
                                </div>

                                <div>
                                    <div style={{ fontSize: '0.9rem', color: '#666' }}>Vendas Fechadas</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4caf50' }}>{funnelStats.total_vendas}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. Monthly Performance Chart (CSS Bar Chart) */}
                    <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', gridColumn: '1 / -1' }}>
                        <h3 style={{ marginTop: 0, borderBottom: '2px solid var(--secondary-color)', paddingBottom: '0.5rem' }}>📈 Desempenho Mensal (Semestre)</h3>

                        <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '2rem', padding: '2rem 1rem 0 1rem' }}>
                            {monthlyData.map((m, i) => {
                                const height = (m.valor / 30000) * 100; // Scale based on 30k max
                                return (
                                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                                        <div style={{
                                            flex: 1,
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            justifyContent: 'center'
                                        }}>
                                            <div style={{
                                                width: '100%',
                                                height: `${Math.min(height, 100)}%`,
                                                background: 'var(--secondary-color)',
                                                borderRadius: '4px 4px 0 0',
                                                transition: 'height 0.5s',
                                                position: 'relative'
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '-25px',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {m.valor >= 1000 ? `${(m.valor / 1000).toFixed(0)}k` : m.valor}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '10px', fontWeight: 'bold', color: '#666' }}>{m.mes}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>
            )}
        </Layout>
    );
};

export default Reports;
