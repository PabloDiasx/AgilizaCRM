import React from 'react';

const FunnelVisualization = ({ stages, opportunities }) => {
    // Calculate totals per stage
    const metrics = stages.map(stage => {
        const stageOpps = opportunities.filter(op => op.id_estagio_atual === stage.id_estagio);
        const count = stageOpps.length;
        const totalValue = stageOpps.reduce((acc, curr) => acc + Number(curr.valor_estimado), 0);
        return {
            ...stage,
            count,
            totalValue
        };
    });

    const maxCount = Math.max(...metrics.map(m => m.count), 1);

    return (
        <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px',
            background: 'white',
            padding: '20px',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow)',
            overflowX: 'auto'
        }}>
            {metrics.map(stage => (
                <div key={stage.id_estagio} style={{ flex: 1, minWidth: '120px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '5px' }}>{stage.nome_estagio}</div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--secondary-color)' }}>{stage.count}</div>
                    <div style={{ fontSize: '0.8rem', color: '#4caf50' }}>
                        R$ {stage.totalValue.toLocaleString('pt-BR', { notation: 'compact', maximumFractionDigits: 1 })}
                    </div>
                    {/* Visual Bar */}
                    <div style={{
                        height: '6px',
                        width: '100%',
                        background: '#eee',
                        marginTop: '10px',
                        borderRadius: '3px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${(stage.count / maxCount) * 100}%`,
                            background: 'var(--secondary-color)',
                            transition: 'width 0.5s ease'
                        }}></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FunnelVisualization;
