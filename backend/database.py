"""
AgilizaCRM - Módulo de Conexão com Banco de Dados
==================================================
Configura a conexão SQLAlchemy com MySQL usando
credenciais do arquivo .env
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from typing import Generator

# Importa as configurações centralizadas
from .config import get_settings

settings = get_settings()

# Cria o engine do SQLAlchemy com a URL do .env
engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,  # Verifica conexão antes de usar (evita erros de timeout)
    pool_recycle=3600,   # Recicla conexões a cada 1 hora
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db() -> Generator:
    """
    Dependência do FastAPI para injeção de sessão do banco.
    
    Uso:
        @router.get("/items")
        def get_items(db: Session = Depends(get_db)):
            ...
    
    O uso de 'yield' garante que a sessão será fechada
    mesmo se ocorrer uma exceção durante a requisição.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
