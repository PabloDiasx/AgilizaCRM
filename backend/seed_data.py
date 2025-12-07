from backend.database import SessionLocal, engine
from backend.models import Usuario, Conta, Contato, FunilDeVenda, EstagioDeFunil, Oportunidade, Base
from datetime import date, datetime, timedelta
import random

Base.metadata.create_all(bind=engine)
db = SessionLocal()

from backend.database import SessionLocal, engine
from backend.models import Usuario, Conta, Contato, FunilDeVenda, EstagioDeFunil, Oportunidade, Base, Cargo
from backend.auth import get_password_hash
from datetime import date, datetime, timedelta
import random

Base.metadata.create_all(bind=engine)
db = SessionLocal()

def seed_data():
    print("Enhanced Seeding Started...")

    # 1. Create Roles
    roles = ["Admin", "Vendedor", "Gerente", "Suporte"]
    db_roles = {}
    for r in roles:
        role = db.query(Cargo).filter_by(nome_cargo=r).first()
        if not role:
            role = Cargo(nome_cargo=r, permissoes="all" if r == "Admin" else "standard")
            db.add(role)
            db.flush() # flush to get ID
        db_roles[r] = role
    db.commit()

    # 2. Create Users
    # Admin
    admin = db.query(Usuario).filter_by(email="admin@agilizacrm.com").first()
    if not admin:
        admin = Usuario(
            nome="Administrador", 
            email="admin@agilizacrm.com", 
            senha_hash=get_password_hash("admin123"),
            id_cargo=db_roles["Admin"].id_cargo,
            ativo=True
        )
        db.add(admin)
    
    # Vendedor
    vendedor = db.query(Usuario).filter_by(email="vendedor@agilizacrm.com").first()
    if not vendedor:
        vendedor = Usuario(
            nome="João Vendedor", 
            email="vendedor@agilizacrm.com", 
            senha_hash=get_password_hash("vendedor123"),
            id_cargo=db_roles["Vendedor"].id_cargo,
            ativo=True
        )
        db.add(vendedor)
    db.commit()
    
    # Refresh to ensure we have IDs
    admin = db.query(Usuario).filter_by(email="admin@agilizacrm.com").first()
    vendedor = db.query(Usuario).filter_by(email="vendedor@agilizacrm.com").first()
    users_list = [admin, vendedor]

    # 3. Create Accounts
    account_names = [
        "Tech Solutions Ltda", "Varejo Express", "Consultoria Alpha", "Mega Corp", 
        "Padaria do João", "Startup Innovation", "Logística Veloz", "Safe Bank",
        "Hospital Central", "Escola Futuro"
    ]
    sectors = ["Tecnologia", "Varejo", "Serviços", "Indústria", "Alimentício", "Saúde", "Educação"]
    cities = ["São Paulo", "Rio de Janeiro", "Curitiba", "Belo Horizonte", "Porto Alegre"]
    
    db_accounts = []
    for name in account_names:
        acc = db.query(Conta).filter_by(nome_empresa=name).first()
        if not acc:
            acc = Conta(
                nome_empresa=name, 
                setor=random.choice(sectors), 
                cidade=random.choice(cities),
                endereco="Rua Exemplo, 123"
            )
            db.add(acc)
            db_accounts.append(acc)
        else:
            db_accounts.append(acc)
    db.commit()

    # 4. Create Contacts (20+)
    first_names = ["Carlos", "Ana", "Roberto", "Julia", "Marcos", "Fernanda", "Pedro", "Larissa", "Bruno", "Patricia"]
    last_names = ["Silva", "Souza", "Mendes", "Pereira", "Oliveira", "Costa", "Santos", "Lima", "Rodrigues", "Almeida"]
    
    db_contacts = []
    for i in range(100, 125):
        fname = random.choice(first_names)
        lname = random.choice(last_names)
        email = f"{fname.lower()}.{lname.lower()}{i}@exemplo.com"
        
        cont = db.query(Contato).filter_by(email=email).first()
        if not cont:
            cont = Contato(
                nome=f"{fname} {lname}",
                email=email,
                telefone=f"1199999{i:04d}",
                id_conta=random.choice(db_accounts).id_conta,
                id_proprietario=random.choice(users_list).id_usuario
            )
            db.add(cont)
            db_contacts.append(cont)
        else:
            db_contacts.append(cont)
    db.commit()

    # 5. Funnel & Stages
    funil = db.query(FunilDeVenda).filter_by(nome_funil="Vendas Padrão").first()
    if not funil:
        funil = FunilDeVenda(nome_funil="Vendas Padrão")
        db.add(funil)
        db.commit()
    
    # Ensure Stages exist
    stages_config = [
        ("Prospecção", 1), ("Qualificação", 2), ("Proposta", 3), 
        ("Negociação", 4), ("Fechamento", 5)
    ]
    db_stages = []
    for name, order in stages_config:
        stg = db.query(EstagioDeFunil).filter_by(id_funil=funil.id_funil, nome_estagio=name).first()
        if not stg:
            stg = EstagioDeFunil(nome_estagio=name, ordem=order, id_funil=funil.id_funil)
            db.add(stg)
        db_stages.append(stg)
    db.commit()
    
    # Reload stages to be safe
    db_stages = db.query(EstagioDeFunil).filter_by(id_funil=funil.id_funil).order_by(EstagioDeFunil.ordem).all()

    # 6. Opportunities (15+)
    opp_names = ["Licença Anual", "Consultoria Mensal", "Projeto Web", "App Mobile", "Treinamento Equipe", "Manutenção Servidor"]
    
    for i in range(20):
        # Randomize status mostly 'Aberta', but some 'Ganha'/'Perdida'
        status = random.choices(['Aberta', 'Ganha', 'Perdida'], weights=[0.7, 0.2, 0.1])[0]
        
        # If Won, enable stage to ideally be closed, but random is fine for mock
        stage = random.choice(db_stages)
        if status == 'Ganha':
            stage = db_stages[-1] # Fechamento
            
        opp = Oportunidade(
            nome_oportunidade=f"{random.choice(opp_names)} - {i+1}",
            valor_estimado=random.randint(1000, 50000),
            id_contato_principal=random.choice(db_contacts).id_contato,
            id_estagio_atual=stage.id_estagio,
            id_usuario_responsavel=random.choice(users_list).id_usuario,
            data_fechamento_prevista=date.today() + timedelta(days=random.randint(-10, 60)),
            status=status
        )
        db.add(opp)
    
    db.commit()
    print("Enhanced Seeding Completed!")
    db.close()

if __name__ == "__main__":
    seed_data()
