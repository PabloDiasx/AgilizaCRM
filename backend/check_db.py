from backend.database import SessionLocal
from backend.models import Usuario, Conta, Contato, FunilDeVenda, EstagioDeFunil, Oportunidade

db = SessionLocal()

def check_counts():
    users = db.query(Usuario).count()
    accounts = db.query(Conta).count()
    contacts = db.query(Contato).count()
    funnels = db.query(FunilDeVenda).count()
    stages = db.query(EstagioDeFunil).count()
    opps = db.query(Oportunidade).count()

    print(f"Users: {users}")
    print(f"Accounts: {accounts}")
    print(f"Contacts: {contacts}")
    print(f"Funnels: {funnels}")
    print(f"Stages: {stages}")
    print(f"Opportunities: {opps}")
    
    if opps > 0:
        print("Sample Opp:", db.query(Oportunidade).first().nome_oportunidade)

if __name__ == "__main__":
    check_counts()
