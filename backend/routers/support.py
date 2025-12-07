from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import database, models, auth
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter(
    prefix="/support",
    tags=["Support"]
)

class MessageBase(BaseModel):
    id_contato: int
    texto: str
    tipo_canal: str = "WhatsApp" # Default

class MessageCreate(MessageBase):
    pass

class MessageResponse(MessageBase):
    id_mensagem: int
    direcao: str
    data_hora: datetime
    sentimento_ia: Optional[str] = None

    class Config:
        orm_mode = True

class ConversationItem(BaseModel):
    id_contato: int
    nome_contato: str
    ultima_mensagem: Optional[str] = None
    data_ultima_mensagem: Optional[datetime] = None

@router.get("/conversations", response_model=List[ConversationItem])
def get_conversations(db: Session = Depends(database.get_db), user_id: int = Depends(auth.get_current_user_id)):
    # Simple logic: Get all contacts, and for each, find the last message
    # In a real app, we would query the messages table grouped by contact
    contacts = db.query(models.Contato).all()
    results = []
    
    for contact in contacts:
        last_msg = db.query(models.HistoricoDeMensagem).filter(models.HistoricoDeMensagem.id_contato == contact.id_contato).order_by(models.HistoricoDeMensagem.data_hora.desc()).first()
        results.append({
            "id_contato": contact.id_contato,
            "nome_contato": contact.nome,
            "ultima_mensagem": last_msg.texto_original if last_msg else None,
            "data_ultima_mensagem": last_msg.data_hora if last_msg else None
        })
    
    # Sort by date descending
    results.sort(key=lambda x: x['data_ultima_mensagem'] or datetime.min, reverse=True)
    return results

@router.get("/messages/{contact_id}", response_model=List[MessageResponse])
def get_messages(contact_id: int, db: Session = Depends(database.get_db), user_id: int = Depends(auth.get_current_user_id)):
    msgs = db.query(models.HistoricoDeMensagem).filter(models.HistoricoDeMensagem.id_contato == contact_id).order_by(models.HistoricoDeMensagem.data_hora.asc()).all()
    
    # Map manually because pydantic model expects 'texto' but DB has 'texto_original'
    return [
        MessageResponse(
            id_mensagem=m.id_mensagem,
            id_contato=m.id_contato,
            texto=m.texto_original,
            tipo_canal=m.tipo_canal,
            direcao=m.direcao,
            data_hora=m.data_hora,
            sentimento_ia=m.sentimento_ia
        ) for m in msgs
    ]

@router.post("/send", response_model=MessageResponse)
def send_message(msg: MessageCreate, db: Session = Depends(database.get_db), user_id: int = Depends(auth.get_current_user_id)):
    # Logic to actually send to WhatsApp API would go here (e.g. requests.post(WPP_API_URL...))
    
    new_msg = models.HistoricoDeMensagem(
        id_contato=msg.id_contato,
        tipo_canal=msg.tipo_canal,
        texto_original=msg.texto,
        direcao='Saida',
        sentimento_ia='Neutro' # Placeholder
    )
    db.add(new_msg)
    db.commit()
    db.refresh(new_msg)
    
    return MessageResponse(
        id_mensagem=new_msg.id_mensagem,
        id_contato=new_msg.id_contato,
        texto=new_msg.texto_original,
        tipo_canal=new_msg.tipo_canal,
        direcao=new_msg.direcao,
        data_hora=new_msg.data_hora,
        sentimento_ia=new_msg.sentimento_ia
    )

@router.post("/webhook")
def webhook_receiver(data: dict):
    # Stub for receiving Webhooks from Twilio/WppConnect
    print(f"Webhook received: {data}")
    return {"status": "received"}
