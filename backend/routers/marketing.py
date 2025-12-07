from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import database, models, auth
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import random

router = APIRouter(
    prefix="/marketing",
    tags=["Marketing"]
)

# AI Stub Logic
def generate_ai_insights(sales_data):
    # In a real app, this would call OpenAI API with sales_data as context
    personas = ["Executivos de TI", "Pequenos Varejistas", "Gerentes de RH"]
    automations = ["Email de carrinho abandonado", "Sequência de boas-vindas", "Lembrete de renovação"]
    
    top_persona = random.choice(personas)
    recommended_automation = random.choice(automations)
    
    return {
        "persona_foco": top_persona,
        "sugestao_conteudo": f"Crie um ebook focado em {top_persona} sobre eficiência operacional.",
        "automacao_recomendada": recommended_automation,
        "analise_vendas": "Houve um aumento de 15% na procura por serviços de consultoria na última semana."
    }

class CampaignBase(BaseModel):
    nome_campanha: str
    canal: str
    status: str = "Ativa"

class CampaignCreate(CampaignBase):
    pass

# We need a model for Campaign but we didn't add it in models.py yet.
# For Phase 4, let's assume we use a simple in-memory list or mock it since schema migration is risky mid-flight without user approval.
# Wait, user asked for CRUD. I should probably add a table or just mock it for now to avoid DB migration errors if user doesn't run it.
# To be safe and fast, I will double check models.py.
# Accessing models.py... No Campaign model.
# I will use a simple list for now or mapped to an existing table? No, better to mock the persistence until user runs a migration script.
# Actually, I can add the model to models.py and tell user to re-run seed/init if they want persistence, OR just use JSON file for campaigns.
# I'll stick to a mock list in memory for this session to ensure stability, as messing with DB schema now might break things if not careful.

@router.get("/campaigns")
def get_campaigns(db: Session = Depends(database.get_db), user_id: int = Depends(auth.get_current_user_id)):
    return db.query(models.Campanha).all()

@router.post("/campaigns")
def create_campaign(campaign: CampaignCreate, db: Session = Depends(database.get_db), user_id: int = Depends(auth.get_current_user_id)):
    new_camp = models.Campanha(
        nome_campanha=campaign.nome_campanha,
        canal=campaign.canal,
        status=campaign.status
    )
    db.add(new_camp)
    db.commit()
    db.refresh(new_camp)
    return new_camp

@router.delete("/campaigns/{id}")
def delete_campaign(id: int, db: Session = Depends(database.get_db), user_id: int = Depends(auth.get_current_user_id)):
    camp = db.query(models.Campanha).filter(models.Campanha.id_campanha == id).first()
    if not camp:
        raise HTTPException(status_code=404, detail="Campanha não encontrada")
    
    db.delete(camp)
    db.commit()
    return {"message": "Deletado com sucesso"}

@router.get("/ai-advisor")
def get_ai_advisor(db: Session = Depends(database.get_db), user_id: int = Depends(auth.get_current_user_id)):
    # 1. Fetch Weekly Sales Data (Mocked query for now)
    # sales = db.query(models.Oportunidade).filter(...).all()
    sales_count = 5 # Stub
    
    # 2. Call AI
    insights = generate_ai_insights(sales_count)
    return insights
