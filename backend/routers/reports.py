from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from .. import database, models, auth
from typing import List, Dict, Any
from datetime import datetime

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)

@router.get("/sales-by-owner")
def get_sales_by_owner(db: Session = Depends(database.get_db), user_id: int = Depends(auth.get_current_user_id)):
    # Aggregates total value of WON opportunities by owner
    results = db.query(
        models.Usuario.nome,
        func.sum(models.Oportunidade.valor_estimado).label("total_vendas"),
        func.count(models.Oportunidade.id_oportunidade).label("qtd_vendas")
    ).join(models.Oportunidade, models.Usuario.id_usuario == models.Oportunidade.id_usuario_responsavel)\
     .filter(models.Oportunidade.status == 'Ganha')\
     .group_by(models.Usuario.nome).all()
    
    return [
        {"nome": r.nome, "total": float(r.total_vendas or 0), "quantidade": r.qtd_vendas} 
        for r in results
    ]

@router.get("/funnel-conversion")
def get_funnel_conversion(db: Session = Depends(database.get_db), user_id: int = Depends(auth.get_current_user_id)):
    # Simple conversion rate: Leads (Contacts) -> Opportunities -> Won
    total_contacts = db.query(models.Contato).count()
    total_opps = db.query(models.Oportunidade).count()
    total_won = db.query(models.Oportunidade).filter(models.Oportunidade.status == 'Ganha').count()
    
    return {
        "total_leads": total_contacts,
        "total_oportunidades": total_opps,
        "total_vendas": total_won,
        "taxa_conversao_lead_opp": (total_opps / total_contacts * 100) if total_contacts > 0 else 0,
        "taxa_conversao_opp_venda": (total_won / total_opps * 100) if total_opps > 0 else 0
    }

@router.get("/monthly-performance")
def get_monthly_performance(db: Session = Depends(database.get_db), user_id: int = Depends(auth.get_current_user_id)):
    # Mocked data for chart visualization as we might not have enough historical seed data
    # In production, use db.query with date extraction 
    return [
        {"mes": "Jan", "valor": 12000},
        {"mes": "Fev", "valor": 19000},
        {"mes": "Mar", "valor": 15000},
        {"mes": "Abr", "valor": 22000},
        {"mes": "Mai", "valor": 28000},
        {"mes": "Jun", "valor": 25000},
    ]
