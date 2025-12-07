from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import database, models, auth
from pydantic import BaseModel
from typing import List

router = APIRouter(
    prefix="/funnels",
    tags=["Funnels"]
)

class FunnelCreate(BaseModel):
    nome_funil: str

class FunnelResponse(BaseModel):
    id_funil: int
    nome_funil: str
    class Config:
        orm_mode = True

@router.get("/", response_model=List[FunnelResponse])
def read_funnels(db: Session = Depends(database.get_db), user_id: int = Depends(auth.get_current_user_id)):
    return db.query(models.FunilDeVenda).all()

@router.post("/", response_model=FunnelResponse)
def create_funnel(funnel: FunnelCreate, db: Session = Depends(database.get_db), user_id: int = Depends(auth.get_current_user_id)):
    try:
        new_funnel = models.FunilDeVenda(nome_funil=funnel.nome_funil)
        db.add(new_funnel)
        db.commit()
        db.refresh(new_funnel) # Ensure ID is available
        
        # Optionally create default stages for new funnel
        default_stages = ["Prospecção", "Qualificação", "Proposta", "Negociação", "Fechamento"]
        for i, stage_name in enumerate(default_stages):
            stage = models.EstagioDeFunil(nome_estagio=stage_name, ordem=i+1, id_funil=new_funnel.id_funil)
            db.add(stage)
        db.commit()
        
        return new_funnel
    except Exception as e:
        db.rollback()
        # Check for integrity error (duplicate name)
        if "Duplicate entry" in str(e) or "UNIQUE constraint failed" in str(e):
             raise HTTPException(status_code=400, detail="Um funil com este nome já existe.")
        raise HTTPException(status_code=500, detail=f"Erro ao criar funil: {str(e)}")
