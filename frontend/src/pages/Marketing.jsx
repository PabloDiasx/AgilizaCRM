import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

const Marketing = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [aiInsights, setAiInsights] = useState(null);
    const [loadingAI, setLoadingAI] = useState(false);
    const [newCampaign, setNewCampaign] = useState({ nome_campanha: '', canal: '', status: 'Ativa' });

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const res = await api.get('/marketing/campaigns');
            setCampaigns(res.data);
        } catch (error) {
            console.error("Error fetching campaigns", error);
        }
    };

    const handleCreateCampaign = async (e) => {
        e.preventDefault();
        try {
            await api.post('/marketing/campaigns', newCampaign);
            setNewCampaign({ nome_campanha: '', canal: '', status: 'Ativa' });
            fetchCampaigns();
        } catch (error) {
            alert("Erro ao criar campanha");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Remover campanha?")) {
            await api.delete(`/marketing/campaigns/${id}`);
            fetchCampaigns();
        }
    };

    const generateInsights = async () => {
        setLoadingAI(true);
        try {
            const res = await api.get('/marketing/ai-advisor');
            setAiInsights(res.data);
        } catch (error) {
            console.error("AI Error", error);
        } finally {
            setLoadingAI(false);
        }
    };

    return (
        <Layout>
            <h1 style={{ marginBottom: '2rem' }}>Marketing & Estratégia</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>

                {/* Campaigns Panel */}
                <div>
                    <div style={{ background: 'var(--white)', padding: '1.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', marginBottom: '2rem' }}>
                        <h2 style={{ marginTop: 0 }}>Campanhas Ativas</h2>

                        <form onSubmit={handleCreateCampaign} style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
                            <input
                                className="input-field"
                                placeholder="Nome da Campanha"
                                value={newCampaign.nome_campanha}
                                onChange={e => setNewCampaign({ ...newCampaign, nome_campanha: e.target.value })}
                                required
                                style={{ margin: 0, flex: 2 }}
                            />
                            <select
                                className="input-field"
                                value={newCampaign.canal}
                                onChange={e => setNewCampaign({ ...newCampaign, canal: e.target.value })}
                                required
                                style={{ margin: 0, flex: 1 }}
                            >
                                <option value="">Canal...</option>
                                <option value="Email">Email</option>
                                <option value="Instagram">Instagram</option>
                                <option value="LinkedIn">LinkedIn</option>
                                <option value="Ads">Google Ads</option>
                            </select>
                            <button className="btn-primary" type="submit">Criar</button>
                        </form>

                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--card-bg)', textAlign: 'left' }}>
                                    <th style={{ padding: '10px' }}>Nome</th>
                                    <th style={{ padding: '10px' }}>Canal</th>
                                    <th style={{ padding: '10px' }}>Status</th>
                                    <th style={{ padding: '10px' }}>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaigns.map(c => (
                                    <tr key={c.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '10px' }}>{c.nome_campanha}</td>
                                        <td style={{ padding: '10px' }}>{c.canal}</td>
                                        <td style={{ padding: '10px' }}>
                                            <span style={{
                                                background: c.status === 'Ativa' ? 'var(--success)' : '#ffebee',
                                                color: c.status === 'Ativa' ? 'white' : 'red',
                                                padding: '2px 8px', borderRadius: '4px', fontSize: '0.85rem'
                                            }}>
                                                {c.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '10px' }}>
                                            <button onClick={() => handleDelete(c.id)} style={{ color: 'red', background: 'none', cursor: 'pointer' }}>🗑️</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* AI Advisor Panel */}
                <div>
                    <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius)',
                        boxShadow: 'var(--shadow)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                            🤖 Consultor IA
                        </h2>

                        {!aiInsights ? (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <p>Clique abaixo para analisar seus dados e gerar insights.</p>
                                <button
                                    className="btn-secondary"
                                    onClick={generateInsights}
                                    disabled={loadingAI}
                                    style={{ background: 'white', color: '#764ba2', border: 'none', marginTop: '1rem' }}
                                >
                                    {loadingAI ? 'Analisando...' : 'Gerar Estratégias'}
                                </button>
                            </div>
                        ) : (
                            <div style={{ animation: 'fadeIn 0.5s' }}>
                                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                                    <strong>🎯 Persona Foco:</strong>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{aiInsights.persona_foco}</div>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                                    <strong>💡 Sugestão:</strong>
                                    <p style={{ margin: '5px 0' }}>{aiInsights.sugestao_conteudo}</p>
                                </div>
                                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                                    <strong>⚙️ Automação:</strong>
                                    <div>{aiInsights.automacao_recomendada}</div>
                                </div>
                                <button
                                    onClick={() => setAiInsights(null)}
                                    style={{ background: 'transparent', color: 'white', border: '1px solid white', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Nova Análise
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Marketing;
