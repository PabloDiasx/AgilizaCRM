import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

const Support = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    // Initial Load: Conversations
    useEffect(() => {
        fetchConversations();
        // Simple polling for new conversations every 30s
        const interval = setInterval(fetchConversations, 30000);
        return () => clearInterval(interval);
    }, []);

    // Load Messages when contact selected
    useEffect(() => {
        if (selectedContact) {
            fetchMessages(selectedContact.id_contato);
            // Polling for messages
            const interval = setInterval(() => fetchMessages(selectedContact.id_contato), 5000);
            return () => clearInterval(interval);
        }
    }, [selectedContact]);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchConversations = async () => {
        try {
            const res = await api.get('/support/conversations');
            setConversations(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching conversations", error);
            setLoading(false);
        }
    };

    const fetchMessages = async (contactId) => {
        try {
            const res = await api.get(`/support/messages/${contactId}`);
            setMessages(res.data);
        } catch (error) {
            console.error("Error fetching messages", error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || !selectedContact) return;

        // Optimistic UI Update
        const optimisticMsg = {
            id_mensagem: Date.now(), // Temporary ID
            texto: inputMessage,
            direcao: 'Saida',
            data_hora: new Date().toISOString(),
            tipo_canal: 'WhatsApp'
        };
        setMessages([...messages, optimisticMsg]);
        setInputMessage('');

        try {
            await api.post('/support/send', {
                id_contato: selectedContact.id_contato,
                texto: optimisticMsg.texto,
                tipo_canal: 'WhatsApp'
            });
            // Refetch to confirm/sync ID
            fetchMessages(selectedContact.id_contato);
        } catch (error) {
            console.error("Error sending message", error);
            alert("Erro ao enviar mensagem.");
        }
    };

    const sendTemplate = async () => {
        if (!selectedContact) return;
        const confirmSend = window.confirm(`Enviar template de "Boas Vindas" para ${selectedContact.nome_contato}?`);
        if (confirmSend) {
            try {
                await api.post('/support/send', {
                    id_contato: selectedContact.id_contato,
                    texto: "Olá! Como podemos ajudar você hoje? [Template: Boas Vindas]",
                    tipo_canal: 'WhatsApp'
                });
                fetchMessages(selectedContact.id_contato);
            } catch (error) {
                console.error("Error sending template", error);
            }
        }
    };

    return (
        <Layout>
            <div style={{ display: 'flex', height: 'caLc(100vh - 140px)', background: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>

                {/* Sidebar: Conversation List */}
                <div style={{ width: '300px', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '1rem', background: '#f0f2f5', borderBottom: '1px solid var(--border-color)' }}>
                        <h3 style={{ margin: 0, color: 'var(--text-color)' }}>Conversas</h3>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {conversations.map(conv => (
                            <div
                                key={conv.id_contato}
                                onClick={() => setSelectedContact(conv)}
                                style={{
                                    padding: '1rem',
                                    borderBottom: '1px solid #f0f0f0',
                                    cursor: 'pointer',
                                    background: selectedContact?.id_contato === conv.id_contato ? '#e3f2fd' : 'white',
                                    transition: 'background 0.2s'
                                }}
                            >
                                <div style={{ fontWeight: 'bold', marginBottom: '0.3rem' }}>{conv.nome_contato}</div>
                                <div style={{ fontSize: '0.85rem', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {conv.ultima_mensagem || <i>Nenhuma mensagem</i>}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.3rem', textAlign: 'right' }}>
                                    {conv.data_ultima_mensagem ? new Date(conv.data_ultima_mensagem).toLocaleDateString() : ''}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main: Chat Window */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#e5ddd5' }}> {/* WhatsApp BG Color */}
                    {selectedContact ? (
                        <>
                            {/* Chat Header */}
                            <div style={{ padding: '0.8rem 1rem', background: '#f0f2f5', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                                        {selectedContact.nome_contato.charAt(0)}
                                    </div>
                                    <span style={{ fontWeight: 'bold' }}>{selectedContact.nome_contato}</span>
                                </div>
                                <button className="btn-secondary" onClick={sendTemplate} style={{ fontSize: '0.9rem', padding: '5px 10px' }}>
                                    📲 Enviar Template
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            alignSelf: msg.direcao === 'Saida' ? 'flex-end' : 'flex-start',
                                            background: msg.direcao === 'Saida' ? '#dcf8c6' : 'white',
                                            padding: '0.5rem 0.8rem',
                                            borderRadius: '8px',
                                            maxWidth: '60%',
                                            boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                                            position: 'relative'
                                        }}
                                    >
                                        <div style={{ fontSize: '0.95rem' }}>{msg.texto}</div>
                                        <div style={{ fontSize: '0.7rem', color: '#999', textAlign: 'right', marginTop: '4px' }}>
                                            {new Date(msg.data_hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            {msg.direcao === 'Saida' && <span style={{ marginLeft: '5px' }}>✓✓</span>}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div style={{ padding: '1rem', background: '#f0f2f5', display: 'flex', gap: '10px' }}>
                                <form onSubmit={handleSendMessage} style={{ display: 'flex', width: '100%', gap: '10px' }}>
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="Digite uma mensagem..."
                                        style={{ margin: 0, borderRadius: '20px' }}
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                    />
                                    <button type="submit" className="btn-primary" style={{ borderRadius: '50%', width: '45px', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        ➤
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', color: '#888' }}>
                            <h2>CRM Chat</h2>
                            <p>Selecione um contato para iniciar o atendimento.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Support;
