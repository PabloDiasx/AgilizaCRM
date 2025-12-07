from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text, Enum, DateTime, Date, DECIMAL, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class Cargo(Base):
    __tablename__ = "cargos"
    id_cargo = Column(Integer, primary_key=True, index=True)
    nome_cargo = Column(String(50), unique=True, nullable=False)
    permissoes = Column(Text)

class Usuario(Base):
    __tablename__ = "usuarios"
    id_usuario = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    senha_hash = Column(String(255), nullable=False)
    id_cargo = Column(Integer, ForeignKey("cargos.id_cargo"), nullable=False)
    ativo = Column(Boolean, default=True)

    cargo = relationship("Cargo")

class Conta(Base):
    __tablename__ = "contas"
    id_conta = Column(Integer, primary_key=True, index=True)
    nome_empresa = Column(String(150), nullable=False)
    cnpj = Column(String(14), unique=True)
    setor = Column(String(50))
    endereco = Column(String(255))
    cidade = Column(String(100))

class Contato(Base):
    __tablename__ = "contatos"
    id_contato = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(100), unique=True)
    telefone = Column(String(15), unique=True)
    id_conta = Column(Integer, ForeignKey("contas.id_conta"))
    id_proprietario = Column(Integer, ForeignKey("usuarios.id_usuario"), nullable=False)
    data_criacao = Column(TIMESTAMP, server_default=func.now())

    conta = relationship("Conta")
    proprietario = relationship("Usuario")

class FunilDeVenda(Base):
    __tablename__ = "funisdevenda"
    id_funil = Column(Integer, primary_key=True, index=True)
    nome_funil = Column(String(100), unique=True, nullable=False)

class EstagioDeFunil(Base):
    __tablename__ = "estagiosdefunil"
    id_estagio = Column(Integer, primary_key=True, index=True)
    id_funil = Column(Integer, ForeignKey("funisdevenda.id_funil"), nullable=False)
    nome_estagio = Column(String(100), nullable=False)
    ordem = Column(Integer, nullable=False)

    funil = relationship("FunilDeVenda")

class Oportunidade(Base):
    __tablename__ = "oportunidades"
    id_oportunidade = Column(Integer, primary_key=True, index=True)
    nome_oportunidade = Column(String(255), nullable=False)
    valor_estimado = Column(DECIMAL(10, 2), default=0.00)
    id_contato_principal = Column(Integer, ForeignKey("contatos.id_contato"), nullable=False)
    id_estagio_atual = Column(Integer, ForeignKey("estagiosdefunil.id_estagio"), nullable=False)
    id_usuario_responsavel = Column(Integer, ForeignKey("usuarios.id_usuario"), nullable=False)
    data_fechamento_prevista = Column(Date)
    status = Column(Enum('Aberta', 'Ganha', 'Perdida'), default='Aberta')

    contato = relationship("Contato")
    estagio = relationship("EstagioDeFunil")
    responsavel = relationship("Usuario")

class Atividade(Base):
    __tablename__ = "atividades"
    id_atividade = Column(Integer, primary_key=True, index=True)
    id_oportunidade = Column(Integer, ForeignKey("oportunidades.id_oportunidade"))
    id_contato = Column(Integer, ForeignKey("contatos.id_contato"), nullable=False)
    id_usuario_criador = Column(Integer, ForeignKey("usuarios.id_usuario"), nullable=False)
    tipo = Column(Enum('Ligacao', 'Reuniao', 'Email', 'Tarefa', 'Lembrete'), nullable=False)
    descricao = Column(Text)
    data_hora_agendada = Column(TIMESTAMP)
    concluida = Column(Boolean, default=False)

class HistoricoDeMensagem(Base):
    __tablename__ = "historicodemensagens"
    id_mensagem = Column(Integer, primary_key=True, index=True)
    id_contato = Column(Integer, ForeignKey("contatos.id_contato"), nullable=False)
    tipo_canal = Column(Enum('WhatsApp', 'Email', 'Chatbot'), nullable=False)
    texto_original = Column(Text, nullable=False)
    sentimento_ia = Column(String(10))
    direcao = Column(Enum('Entrada', 'Saida'), nullable=False)
    data_hora = Column(TIMESTAMP, server_default=func.now())

class LogDeAuditoria(Base):
    __tablename__ = "logsdeauditoria"
    id_log = Column(Integer, primary_key=True, index=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    data_hora = Column(TIMESTAMP, server_default=func.now())
    acao = Column(String(255), nullable=False)
    detalhes = Column(Text)

class Campanha(Base):
    __tablename__ = "campanhas"
    id_campanha = Column(Integer, primary_key=True, index=True)
    nome_campanha = Column(String(150), nullable=False)
    canal = Column(String(50), nullable=False)
    status = Column(Enum('Ativa', 'Pausada', 'Finalizada'), default='Ativa')
    data_criacao = Column(TIMESTAMP, server_default=func.now())
