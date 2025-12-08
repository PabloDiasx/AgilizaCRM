from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import database, models, auth
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter(
    prefix="/contacts",
    tags=["Contacts"]
)

class ContactBase(BaseModel):
    nome: str
    email: Optional[str] = None
    telefone: Optional[str] = None
    id_conta: Optional[int] = None

class ContactCreate(ContactBase):
    pass

class ContactResponse(ContactBase):
    id_contato: int
    data_criacao: datetime
    # We can add more fields like 'responsavel' name later

    model_config = {"from_attributes": True}

@router.get("/", response_model=List[ContactResponse])
def read_contacts(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db), current_user: int = Depends(auth.get_current_user_id)):
    contacts = db.query(models.Contato).offset(skip).limit(limit).all()
    return contacts

@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def create_contact(contact: ContactCreate, db: Session = Depends(database.get_db), current_user: int = Depends(auth.get_current_user_id)):
    # Deduplication Logic: Check email or phone
    if contact.email:
        existing = db.query(models.Contato).filter(models.Contato.email == contact.email).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email já cadastrado.")
    
    if contact.telefone:
        existing_phone = db.query(models.Contato).filter(models.Contato.telefone == contact.telefone).first()
        if existing_phone:
             raise HTTPException(status_code=400, detail="Telefone já cadastrado.")

    new_contact = models.Contato(
        nome=contact.nome,
        email=contact.email,
        telefone=contact.telefone,
        id_conta=contact.id_conta,
        id_proprietario=current_user # Assign creator as owner for now
    )
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    return new_contact
