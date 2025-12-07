from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from .. import database, models, auth
from pydantic import BaseModel
from typing import List, Optional
from datetime import date

router = APIRouter(
    prefix="/opportunities",
    tags=["Opportunities"]
)

class StageResponse(BaseModel):
    id_estagio: int
    nome_estagio: str
    ordem: int
    class Config:
        orm_mode = True

class OpportunityResponse(BaseModel):
    id_oportunidade: int
    nome_oportunidade: str
    valor_estimado: float
    id_estagio_atual: int
    nome_contato: str # Flattened for easier display
    
    class Config:
        orm_mode = True

@router.get("/pipeline", response_model=List[StageResponse])
def get_pipeline_stages(funnel_id: Optional[int] = None, db: Session = Depends(database.get_db), user_id: int = Depends(auth.get_current_user_id)):
    if funnel_id:
        funil = db.query(models.FunilDeVenda).filter_by(id_funil=funnel_id).first()
    else:
        # Default to first one
        funil = db.query(models.FunilDeVenda).first()
        
    if not funil:
        return []
    stages = db.query(models.EstagioDeFunil).filter_by(id_funil=funil.id_funil).order_by(models.EstagioDeFunil.ordem).all()
    return stages

@router.get("/", response_model=List[OpportunityResponse])
def get_opportunities(db: Session = Depends(database.get_db), user_id: int = Depends(auth.get_current_user_id)):
    opps = db.query(models.Oportunidade).options(joinedload(models.Oportunidade.contato)).all()
    
    # Map to response manually or use advanced Pydantic
    results = []
    for opp in opps:
        results.append({
            "id_oportunidade": opp.id_oportunidade,
            "nome_oportunidade": opp.nome_oportunidade,
            "valor_estimado": opp.valor_estimado,
            "id_estagio_atual": opp.id_estagio_atual,
            "nome_contato": opp.contato.nome if opp.contato else "Sem Contato"
        })
    return results

class UpdateStageRequest(BaseModel):
    id_estagio_novo: int

@router.patch("/{id_oportunidade}/estagio")
def update_opportunity_stage(id_oportunidade: int, request: UpdateStageRequest, db: Session = Depends(database.get_db), user_id: int = Depends(auth.get_current_user_id)):
    opp = db.query(models.Oportunidade).filter(models.Oportunidade.id_oportunidade == id_oportunidade).first()
    if not opp:
        raise HTTPException(status_code=404, detail="Oportunidade não encontrada")
    
    # Verify if stage exists
    stage = db.query(models.EstagioDeFunil).filter(models.EstagioDeFunil.id_estagio == request.id_estagio_novo).first()
    if not stage:
        raise HTTPException(status_code=400, detail="Estágio inválido")
        
    opp.id_estagio_atual = request.id_estagio_novo
    db.commit()
    return {"message": "Estágio atualizado com sucesso"}
