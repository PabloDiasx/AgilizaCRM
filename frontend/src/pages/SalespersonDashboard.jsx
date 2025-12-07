import React, { useState, useEffect } from 'react';
import SalesLayout from '../components/SalesLayout';
import FunnelVisualization from '../components/FunnelVisualization';
import api from '../services/api';

const SalespersonDashboard = () => {
    const [funnels, setFunnels] = useState([]);
    const [selectedFunnel, setSelectedFunnel] = useState(null);
    const [stages, setStages] = useState([]);
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newFunnelName, setNewFunnelName] = useState('');
    const [showCreateFunnel, setShowCreateFunnel] = useState(false);

    useEffect(() => {
        fetchFunnels();
    }, []);

    useEffect(() => {
        if (selectedFunnel) {
            fetchPipelineData(selectedFunnel);
        }
    }, [selectedFunnel]);

    const fetchFunnels = async () => {
        try {
            // We need an endpoint to get all funnels. 
            // For now, let's assume we have one or create a new endpoint.
            // Using a mock list if endpoint not ready, but we will add 'routers/funnels.py' next.
            const res = await api.get('/funnels/');
            setFunnels(res.data);
            if (res.data.length > 0 && !selectedFunnel) {
                setSelectedFunnel(res.data[0].id_funil);
            }
        } catch (error) {
            console.error("Error fetching funnels", error);
        }
    };

    const fetchPipelineData = async (funnelId) => {
        setLoading(true);
        try {
            // Fetch stages for specific funnel
            const stagesRes = await api.get(`/opportunities/pipeline?funnel_id=${funnelId}`);
            const oppsRes = await api.get('/opportunities/');
            // Note: In real app, we should filter opps by funnel_id on backend too

            setStages(stagesRes.data);
            setOpportunities(oppsRes.data); // Client-side filter for now if needed or backend handles it
        } catch (error) {
            console.error("Error fetching pipeline", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateFunnel = async () => {
        if (!newFunnelName) return;
        try {
            await api.post('/funnels/', { nome_funil: newFunnelName });
            setNewFunnelName('');
            setShowCreateFunnel(false);
            fetchFunnels(); // Refresh list
        } catch (error) {
            const msg = error.response?.data?.detail || 'Erro ao criar funil';
            alert(msg);
        }
    };

    const handleDragStart = (e, opportunityId) => {
        e.dataTransfer.setData("opportunityId", opportunityId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = async (e, newStageId) => {
        const opportunityId = e.dataTransfer.getData("opportunityId");

        // Optimistic Update
        const updatedOpps = opportunities.map(opp => {
            if (opp.id_oportunidade === Number(opportunityId)) {
                return { ...opp, id_estagio_atual: newStageId };
            }
            return opp;
        });
        setOpportunities(updatedOpps);

        // API Call
        try {
            await api.patch(`/opportunities/${opportunityId}/estagio`, { id_estagio_novo: newStageId });
        } catch (error) {
            console.error("Failed to update stage", error);
            // Revert on failure (could implement refetch)
            fetchPipelineData(selectedFunnel);
        }
    };

    return (
        <SalesLayout>
            <div style={{ paddingBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ margin: 0 }}>Meu Painel de Vendas</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <select
                            className="input-field"
                            style={{ margin: 0, width: '200px' }}
                            value={selectedFunnel || ''}
                            onChange={(e) => setSelectedFunnel(Number(e.target.value))}
                        >
                            {funnels.map(f => (
                                <option key={f.id_funil} value={f.id_funil}>{f.nome_funil}</option>
                            ))}
                        </select>
                        <button className="btn-primary" onClick={() => setShowCreateFunnel(!showCreateFunnel)}>+</button>
                    </div>
                </div>

                {stages.length > 0 && <FunnelVisualization stages={stages} opportunities={opportunities} />}

                {showCreateFunnel && (
                    <div style={{ background: 'var(--white)', padding: '1rem', borderRadius: 'var(--radius)', marginBottom: '1rem', display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Nome do Novo Funil"
                            value={newFunnelName}
                            onChange={(e) => setNewFunnelName(e.target.value)}
                            style={{ margin: 0 }}
                        />
                        <button className="btn-primary" onClick={handleCreateFunnel}>Salvar</button>
                    </div>
                )}

                {/* Kanban Board */}
                <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
                    {stages.map(stage => (
                        <div
                            key={stage.id_estagio}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, stage.id_estagio)}
                            style={{
                                minWidth: '280px',
                                background: '#f5f7fa',
                                borderRadius: 'var(--radius)',
                                padding: '1rem',
                                border: '1px solid var(--border-color)',
                                transition: 'background 0.2s'
                            }}
                        >
                            <h3 style={{ marginTop: 0, borderBottom: '2px solid var(--secondary-color)', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                {stage.nome_estagio}
                                <span style={{ fontSize: '0.8em', background: '#e0e0e0', padding: '2px 8px', borderRadius: '10px' }}>
                                    {getOpportunitiesByStage(stage.id_estagio).length}
                                </span>
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', minHeight: '100px' }}>
                                {getOpportunitiesByStage(stage.id_estagio).map(opp => (
                                    <div
                                        key={opp.id_oportunidade}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, opp.id_oportunidade)}
                                        style={{
                                            background: 'white',
                                            padding: '1rem',
                                            borderRadius: 'var(--radius)',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                            borderLeft: '4px solid var(--secondary-color)',
                                            cursor: 'grab'
                                        }}
                                    >
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
            </div>
        </SalesLayout>
    );
};

export default SalespersonDashboard;
