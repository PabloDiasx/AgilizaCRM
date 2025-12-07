from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import database, models, auth

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(database.get_db), user_id: int = Depends(auth.get_current_user_id)):
    # 1. Open Opportunities (Status 'Aberta')
    open_opps_count = db.query(models.Oportunidade).filter(models.Oportunidade.status == 'Aberta').count()
    
    # 2. Pipeline Value (Sum of 'Aberta' opportunities)
    pipeline_value = 0
    open_opps = db.query(models.Oportunidade).filter(models.Oportunidade.status == 'Aberta').all()
    for opp in open_opps:
        pipeline_value += opp.valor_estimado
        
    # 3. New Leads (This Month) - Mocking 'This Month' by just counting all for now or filtering by ID > X check
    # For now, let's just count total contacts as proxy or filter by recent ID if we don't have created_at
    # Assuming 'id_contato' increments, let's just return total contacts for now.
    new_leads_count = db.query(models.Contato).count()
    
    return {
        "openProperties": open_opps_count,
        "pipelineValue": pipeline_value,
        "newLeads": new_leads_count
    }
