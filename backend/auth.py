"""
AgilizaCRM - Módulo de Autenticação
====================================
Responsável por:
- Hashing de senhas com Argon2
- Geração e validação de tokens JWT
- Extração do usuário atual das requisições
"""

from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status

# Importa as configurações centralizadas
from .config import get_settings

# Obtém as configurações (cacheado pelo lru_cache)
settings = get_settings()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# Contexto de criptografia para senhas (Argon2 é o mais seguro atualmente)
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica se a senha plain-text corresponde ao hash armazenado."""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Gera um hash Argon2 para a senha fornecida."""
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Cria um token JWT com os dados fornecidos.
    
    Args:
        data: Dados a serem codificados no token (ex: user_id, role)
        expires_delta: Tempo de expiração customizado (opcional)
    
    Returns:
        Token JWT codificado como string
    """
    to_encode = data.copy()
    
    # Usa timezone-aware datetime (mais seguro e moderno)
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.access_token_expire_minutes
        )
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, 
        settings.secret_key,  # ✅ Agora vem do .env!
        algorithm=settings.algorithm
    )
    return encoded_jwt


def get_current_user_id(token: str = Depends(oauth2_scheme)) -> int:
    """
    Dependência do FastAPI para extrair o ID do usuário do token JWT.
    
    Uso:
        @router.get("/protected")
        def protected_route(user_id: int = Depends(get_current_user_id)):
            ...
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, 
            settings.secret_key,  # ✅ Agora vem do .env!
            algorithms=[settings.algorithm]
        )
        user_id: int = payload.get("id")
        if user_id is None:
            raise credentials_exception
        return user_id
    except JWTError:
        raise credentials_exception
