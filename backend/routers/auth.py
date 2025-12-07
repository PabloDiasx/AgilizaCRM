from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import database, models, auth
from pydantic import BaseModel

router = APIRouter(
    tags=["Authentication"]
)

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/auth/login")
def login(request: LoginRequest, db: Session = Depends(database.get_db)):
    print(f"Login attempt for: {request.email}")
    try:
        # Update: Use joinedload to ensure cargo is fetched
        from sqlalchemy.orm import joinedload
        user = db.query(models.Usuario).options(joinedload(models.Usuario.cargo)).filter(models.Usuario.email == request.email).first()
        
        if not user:
            print("User not found")
            raise HTTPException(status_code=401, detail="Email não encontrado")
        
        print(f"User found: {user.id_usuario}, active={user.ativo}")
        
        try:
            valid_pass = auth.verify_password(request.password, user.senha_hash)
        except Exception as e:
            print(f"CRITICAL ERROR in verify_password: {e}")
            raise HTTPException(status_code=500, detail=f"Erro interno de autenticação: {str(e)}")

        if not valid_pass:
            print("Password invalid")
            raise HTTPException(status_code=401, detail="Senha incorreta")
            
    except Exception as e:
         print(f"Login Error: {e}")
         raise e
    
    # Original logic continues...
    # if not user or not auth.verify_password... (removed since we did it above)
    
    if not user.ativo:
        raise HTTPException(status_code=400, detail="Usuário inativo")

    # Fetch role name
    role_name = "User"
    if user.cargo:
        role_name = user.cargo.nome_cargo

    access_token = auth.create_access_token(
        data={"sub": user.email, "id": user.id_usuario, "role": role_name}
    )
    
    return {
        "access_token": access_token, 
        "token_type": "bearer", 
        "user": {
            "nome": user.nome, 
            "email": user.email, 
            "role": role_name
        }
    }
