"""
AgilizaCRM - Módulo de Configuração Centralizada
=================================================
Este módulo utiliza pydantic-settings para carregar e validar
todas as variáveis de ambiente de forma type-safe.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
from pathlib import Path

# Obtém o diretório onde este arquivo (config.py) está localizado
BASE_DIR = Path(__file__).resolve().parent


class Settings(BaseSettings):
    """
    Classe de configurações do AgilizaCRM.
    
    Utiliza Pydantic Settings para:
    - Carregar variáveis do arquivo .env automaticamente
    - Validar tipos em tempo de execução
    - Fornecer valores default seguros
    - Documentar todas as configurações em um único lugar
    """
    
    # ============== JWT Configuration ==============
    secret_key: str  # Obrigatório - sem default para forçar configuração
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440  # 24 horas
    
    # ============== Database Configuration ==============
    database_url: str = "mysql+pymysql://root:@localhost/agilizacrm"
    
    # ============== Application Settings ==============
    environment: str = "development"
    debug: bool = True
    
    # ============== Pydantic Settings Config ==============
    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",  # Caminho absoluto para o .env
        env_file_encoding="utf-8",   # Encoding do arquivo
        case_sensitive=False,        # SECRET_KEY = secret_key
        extra="ignore"               # Ignora variáveis extras no .env
    )


@lru_cache()
def get_settings() -> Settings:
    """
    Retorna uma instância cacheada das configurações.
    
    O decorator @lru_cache() garante que o arquivo .env
    seja lido apenas uma vez durante toda a vida da aplicação,
    melhorando a performance.
    
    Returns:
        Settings: Objeto com todas as configurações da aplicação
    """
    return Settings()


# Instância global para imports diretos (opcional)
settings = get_settings()
