import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

const Sales = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [stages, setStages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showActiveOnly, setShowActiveOnly] = useState(true);
    
    // Dropdown de funis
    const [showFunnelDropdown, setShowFunnelDropdown] = useState(false);
    const [selectedFunnel, setSelectedFunnel] = useState(null);
    const [funnels, setFunnels] = useState([]);
    const funnelDropdownRef = useRef(null);
    
    // Lista de funis (mock - depois integrar com backend)
    const mockFunnels = [
        { id: 1, name: 'FUNIL LIVE EQUIPAMENTOS', active: true },
        { id: 2, name: 'FUNIL INDICAÇÃO', active: false },
        { id: 3, name: 'FUNIL ASSSISTÊNCIA TÉCNICA', active: false },
        { id: 4, name: 'FUNIL PÓS VENDA', active: false },
        { id: 5, name: 'FUNIL NUTRIÇÃO', active: false },
        { id: 6, name: 'FUNIL LISTA FRIA', active: false },
        { id: 7, name: 'INSTAGRAM', active: false },
        { id: 8, name: 'Follow-up IA', active: false },
        { id: 9, name: 'Remarketing', active: false },
        { id: 10, name: 'FUNIL SORTEIO', active: false },
        { id: 11, name: 'Prospect', active: false },
    ];

    useEffect(() => {
        fetchData();
        setFunnels(mockFunnels);
        setSelectedFunnel(mockFunnels[0]);
    }, []);

    // Fechar dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (funnelDropdownRef.current && !funnelDropdownRef.current.contains(event.target)) {
                setShowFunnelDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [oppsRes, stagesRes] = await Promise.all([
                api.get('/opportunities/'),
                api.get('/opportunities/pipeline')
            ]);
            setOpportunities(oppsRes.data);
            setStages(stagesRes.data);
        } catch (error) {
            console.error("Error fetching sales data:", error);
        } finally {
            setLoading(false);
        }
    };

    const getOpportunitiesByStage = (stageId) => {
        return opportunities.filter(op => op.id_estagio_atual === stageId);
    };

    const getStageTotal = (stageId) => {
        return getOpportunitiesByStage(stageId).reduce((sum, op) => sum + (op.valor_estimado || 0), 0);
    };

    const getTotalLeads = () => opportunities.length;
    const getTotalValue = () => opportunities.reduce((sum, op) => sum + (op.valor_estimado || 0), 0);

    const handleSelectFunnel = (funnel) => {
        setSelectedFunnel(funnel);
        setShowFunnelDropdown(false);
        // Aqui você pode carregar os dados do funil selecionado
    };

    const handleSelectAllLeads = () => {
        setSelectedFunnel({ id: 0, name: 'Todos os leads' });
        setShowFunnelDropdown(false);
    };

    const handleAddFunnel = () => {
        // TODO: Abrir modal para adicionar novo funil
        alert('Funcionalidade de adicionar funil será implementada');
        setShowFunnelDropdown(false);
    };

    const formatCurrency = (value) => {
        if (value >= 1000000) {
            return `R$${(value / 1000000).toFixed(3).replace('.', '.')}.${String(value % 1000).padStart(3, '0')}`;
        }
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('pt-BR');
    };

    return (
        <Layout fullWidth>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--white)' }}>
                {/* Top Header Bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderBottom: '1px solid var(--border-color)',
                    background: 'var(--white)',
                    flexShrink: 0
                }}>
                    {/* Left Side - Funnel Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {/* Dropdown do Funil */}
                        <div ref={funnelDropdownRef} style={{ position: 'relative' }}>
                            <div 
                                onClick={() => setShowFunnelDropdown(!showFunnelDropdown)}
                                style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem',
                                    fontWeight: '600',
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                    padding: '6px 10px',
                                    borderRadius: '4px',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover-bg)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <span style={{ fontSize: '0.95rem' }}>
                                    {selectedFunnel?.name || 'FUNIL DE VENDAS'}
                                </span>
                                <span style={{ 
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.7rem',
                                    transform: showFunnelDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s'
                                }}>▼</span>
                            </div>
                            
                            {/* Dropdown Menu */}
                            {showFunnelDropdown && (
                                <div style={{
                                    position: 'fixed',
                                    top: '0',
                                    left: '90px',
                                    height: '100vh',
                                    background: 'var(--card-bg)',
                                    borderRight: '1px solid var(--border-color)',
                                    boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
                                    width: '280px',
                                    zIndex: 1000,
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    {/* Header do dropdown */}
                                    <div style={{
                                        padding: '16px 16px',
                                        borderBottom: '1px solid var(--border-color)',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        flexShrink: 0
                                    }}>
                                        Funis
                                    </div>
                                    
                                    {/* Lista de funis */}
                                    <div style={{ padding: '8px 0', flex: 1, overflowY: 'auto' }}>
                                        {funnels.map((funnel) => (
                                            <div
                                                key={funnel.id}
                                                onClick={() => handleSelectFunnel(funnel)}
                                                style={{
                                                    padding: '10px 16px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.9rem',
                                                    color: selectedFunnel?.id === funnel.id ? 'var(--secondary-color)' : 'var(--text-primary)',
                                                    fontWeight: selectedFunnel?.id === funnel.id ? '600' : '400',
                                                    background: selectedFunnel?.id === funnel.id ? 'rgba(255, 153, 0, 0.1)' : 'transparent',
                                                    transition: 'background 0.15s, color 0.15s'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (selectedFunnel?.id !== funnel.id) {
                                                        e.currentTarget.style.background = 'var(--hover-bg)';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (selectedFunnel?.id !== funnel.id) {
                                                        e.currentTarget.style.background = 'transparent';
                                                    }
                                                }}
                                            >
                                                {funnel.name}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Área fixa no rodapé */}
                                    <div style={{ 
                                        flexShrink: 0,
                                        borderTop: '1px solid var(--border-color)',
                                        background: 'var(--card-bg)'
                                    }}>
                                        {/* Adicionar funil */}
                                        <div
                                            onClick={handleAddFunnel}
                                            style={{
                                                padding: '12px 16px',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                                color: 'var(--text-secondary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                transition: 'background 0.15s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover-bg)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <span>Adicionar funil de vendas</span>
                                            <span style={{ 
                                                fontSize: '1rem',
                                                fontWeight: '300',
                                                color: 'var(--text-secondary)'
                                            }}>+</span>
                                        </div>
                                        
                                        {/* Separador */}
                                        <div style={{ 
                                            height: '1px', 
                                            background: 'var(--border-color)'
                                        }} />
                                        
                                        {/* Todos os leads */}
                                        <div
                                            onClick={handleSelectAllLeads}
                                            style={{
                                                padding: '12px 16px',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem',
                                                color: 'var(--text-secondary)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                transition: 'background 0.15s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover-bg)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <span>Todos os leads</span>
                                            <span style={{ fontSize: '0.8rem' }}>≡</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <strong style={{ color: 'var(--text-primary)' }}>{getTotalLeads()} leads</strong>: {formatCurrency(getTotalValue())}
                        </span>
                        
                        <button style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>•••</button>
                        
                        <button style={{
                            padding: '6px 12px',
                            background: 'transparent',
                            color: 'var(--secondary-color)',
                            border: '1px solid var(--secondary-color)',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            ⚡ AUTOMATIZE
                        </button>
                        
                        <button style={{
                            padding: '8px 16px',
                            background: 'var(--secondary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>
                            + NOVO LEAD
                        </button>
                    </div>
                </div>

                {/* Kanban Columns */}
                {loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>Carregando...</div>
                ) : (
                    <div style={{
                        display: 'flex',
                        flex: 1,
                        overflowX: 'auto',
                        overflowY: 'hidden'
                    }}>
                        {stages.map((stage, index) => {
                            const stageOpps = getOpportunitiesByStage(stage.id_estagio);
                            const stageTotal = getStageTotal(stage.id_estagio);
                            
                            return (
                                <div key={stage.id_estagio} style={{
                                    minWidth: '260px',
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRight: '1px solid var(--border-color)',
                                    background: 'var(--card-bg)'
                                }}>
                                    {/* Column Header */}
                                    <div style={{
                                        padding: '0.75rem 1rem',
                                        borderBottom: '1px solid var(--border-color)',
                                        background: 'var(--white)'
                                    }}>
                                        <div style={{
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            color: 'var(--text-secondary)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>
                                            {stage.nome_estagio}
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                                            {stageOpps.length} leads: {formatCurrency(stageTotal)}
                                        </div>
                                    </div>
                                    
                                    {/* Column Body with Cards */}
                                    <div style={{
                                        flex: 1,
                                        overflowY: 'auto',
                                        padding: '0.5rem'
                                    }}>
                                        {/* Quick Add - first column only */}
                                        {index === 0 && (
                                            <div style={{
                                                padding: '0.75rem',
                                                marginBottom: '0.5rem',
                                                border: '1px dashed var(--border-color)',
                                                borderRadius: '6px',
                                                textAlign: 'center',
                                                color: 'var(--text-secondary)',
                                                fontSize: '0.85rem',
                                                cursor: 'pointer',
                                                background: 'var(--white)'
                                            }}>
                                                Adição rápida
                                            </div>
                                        )}
                                        
                                        {/* Lead Cards */}
                                        {stageOpps.map(opp => (
                                            <div key={opp.id_oportunidade} style={{
                                                background: 'var(--white)',
                                                borderRadius: '6px',
                                                padding: '0.75rem',
                                                marginBottom: '0.5rem',
                                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                                cursor: 'pointer',
                                                borderLeft: '3px solid var(--secondary-color)'
                                            }}>
                                                {/* Lead Title */}
                                                <div style={{
                                                    fontSize: '0.8rem',
                                                    color: 'var(--text-secondary)',
                                                    marginBottom: '2px'
                                                }}>
                                                    {opp.nome_oportunidade}
                                                </div>
                                                
                                                {/* Lead Name (clickable link style) */}
                                                <div style={{
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600',
                                                    color: 'var(--secondary-color)',
                                                    marginBottom: '6px'
                                                }}>
                                                    {opp.nome_contato}
                                                </div>
                                                
                                                {/* Tags */}
                                                <div style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: '4px',
                                                    marginBottom: '6px'
                                                }}>
                                                    <span style={{
                                                        fontSize: '0.65rem',
                                                        padding: '2px 6px',
                                                        borderRadius: '3px',
                                                        background: 'var(--badge-bg)',
                                                        color: 'var(--text-secondary)'
                                                    }}>
                                                        CRM
                                                    </span>
                                                </div>
                                                
                                                {/* Footer: Value + Date */}
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginTop: '6px',
                                                    paddingTop: '6px',
                                                    borderTop: '1px solid var(--border-color)'
                                                }}>
                                                    <span style={{
                                                        fontSize: '0.8rem',
                                                        fontWeight: '600',
                                                        color: 'var(--text-primary)'
                                                    }}>
                                                        {formatCurrency(opp.valor_estimado || 0)}
                                                    </span>
                                                    <span style={{
                                                        fontSize: '0.7rem',
                                                        color: 'var(--text-secondary)'
                                                    }}>
                                                        {formatDate(opp.data_criacao)}
                                                    </span>
                                                </div>
                                                
                                                {/* Action link */}
                                                <div style={{
                                                    fontSize: '0.7rem',
                                                    color: 'var(--secondary-color)',
                                                    marginTop: '6px',
                                                    cursor: 'pointer'
                                                }}>
                                                    Sem Tarefas →
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Sales;
