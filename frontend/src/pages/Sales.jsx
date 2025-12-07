import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

const Sales = () => {
    const [activeTab, setActiveTab] = useState('pipeline');
    const [opportunities, setOpportunities] = useState([]);
    const [stages, setStages] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [oppsRes, stagesRes, contactsRes] = await Promise.all([
                api.get('/opportunities/'),
                api.get('/opportunities/pipeline'),
                api.get('/contacts/')
            ]);
            setOpportunities(oppsRes.data);
            setStages(stagesRes.data);
            setContacts(contactsRes.data);
        } catch (error) {
            console.error("Error fetching sales data:", error);
        } finally {
            setLoading(false);
        }
    };

    const getOpportunitiesByStage = (stageId) => {
        return opportunities.filter(op => op.id_estagio_atual === stageId);
    };

    const getStageName = (stageId) => {
        const stage = stages.find(s => s.id_estagio === stageId);
        return stage ? stage.nome_estagio : 'Desconhecido';
    };

    return (
        <Layout>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1 style={{ margin: 0 }}>Vendas & Oportunidades</h1>
                <div>
                    <button
                        className="btn-primary"
                        style={{ marginRight: '1rem', background: activeTab === 'pipeline' ? 'var(--secondary-color)' : '#9e9e9e' }}
                        onClick={() => setActiveTab('pipeline')}
                    >
                        Pipeline
                    </button>
                    <button
                        className="btn-primary"
                        style={{ marginRight: '1rem', background: activeTab === 'list' ? 'var(--secondary-color)' : '#9e9e9e' }}
                        onClick={() => setActiveTab('list')}
                    >
                        Lista Detalhada
                    </button>
                    <button
                        className="btn-primary"
                        style={{ background: activeTab === 'leads' ? 'var(--secondary-color)' : '#9e9e9e' }}
                        onClick={() => setActiveTab('leads')}
                    >
                        Leads
                    </button>
                </div>
            </div>

            {loading ? <p>Carregando dados...</p> : (
                <>
                    {activeTab === 'pipeline' && (
                        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                            {stages.map(stage => (
                                <div key={stage.id_estagio} style={{
                                    minWidth: '280px',
                                    background: '#f5f7fa',
                                    borderRadius: 'var(--radius)',
                                    padding: '1rem',
                                    border: '1px solid var(--border-color)'
                                }}>
                                    <h3 style={{ marginTop: 0, borderBottom: '2px solid var(--secondary-color)', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                        {stage.nome_estagio}
                                        <span style={{ fontSize: '0.8em', background: '#e0e0e0', padding: '2px 8px', borderRadius: '10px' }}>
                                            {getOpportunitiesByStage(stage.id_estagio).length}
                                        </span>
                                    </h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        {getOpportunitiesByStage(stage.id_estagio).map(opp => (
                                            <div key={opp.id_oportunidade} style={{
                                                background: 'white',
                                                padding: '1rem',
                                                borderRadius: 'var(--radius)',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                                borderLeft: '4px solid var(--secondary-color)'
                                            }}>
                                                <div style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>{opp.nome_oportunidade}</div>
                                                <div style={{ fontSize: '0.9rem', color: '#666' }}>{opp.nome_contato}</div>
                                                <div style={{ marginTop: '0.5rem', fontWeight: 'bold', color: '#4caf50' }}>
                                                    R$ {opp.valor_estimado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'list' && (
                        <div style={{ background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ background: '#f5f7fa' }}>
                                    <tr>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Oportunidade</th>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Lead/Contato</th>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Valor (R$)</th>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Etapa</th>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {opportunities.map(opp => (
                                        <tr key={opp.id_oportunidade} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1rem' }}>{opp.nome_oportunidade}</td>
                                            <td style={{ padding: '1rem' }}>{opp.nome_contato}</td>
                                            <td style={{ padding: '1rem', fontWeight: 'bold', color: '#4caf50' }}>
                                                {opp.valor_estimado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    background: '#e3f2fd',
                                                    color: '#1976d2',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.9rem'
                                                }}>
                                                    {getStageName(opp.id_estagio_atual)}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <button style={{ marginRight: '0.5rem', color: 'var(--secondary-color)', background: 'none' }}>Editar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'leads' && (
                        <div style={{ background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ background: '#f5f7fa' }}>
                                    <tr>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Nome</th>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Telefone</th>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map(contact => (
                                        <tr key={contact.id_contato} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1rem' }}>{contact.nome}</td>
                                            <td style={{ padding: '1rem' }}>{contact.email}</td>
                                            <td style={{ padding: '1rem' }}>{contact.telefone}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <button style={{ marginRight: '0.5rem', color: 'var(--secondary-color)', background: 'none' }}>Editar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </Layout>
    );
};

export default Sales;
