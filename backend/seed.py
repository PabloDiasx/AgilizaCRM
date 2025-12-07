from backend.database import SessionLocal, engine
from backend.models import Usuario, Cargo, Base
from backend.auth import get_password_hash

# Ensure tables exist
Base.metadata.create_all(bind=engine)

db = SessionLocal()

def seed():
    # 1. Create Role 'Admin' if not exists
    admin_role = db.query(Cargo).filter_by(nome_cargo="Admin").first()
    if not admin_role:
        print("Creating Admin Role...")
        admin_role = Cargo(nome_cargo="Admin", permissoes="all")
        db.add(admin_role)
        db.commit()
        db.refresh(admin_role)

    # 2. Create User 'admin' if not exists
    admin_user = db.query(Usuario).filter_by(email="admin@agilizacrm.com").first()
    if not admin_user:
        print("Creating Admin User...")
        hashed_pw = get_password_hash("admin123")
        admin_user = Usuario(
            nome="Administrador",
            email="admin@agilizacrm.com",
            senha_hash=hashed_pw,
            id_cargo=admin_role.id_cargo,
            ativo=True
        )
        db.add(admin_user)
        db.commit()
        print("User 'admin@agilizacrm.com' created with password 'admin123'")
    else:
        print("Updating Admin Password...")
        hashed_pw = get_password_hash("admin123")
        admin_user.senha_hash = hashed_pw
        db.commit()
        print("Admin password updated.")

    db.close()

if __name__ == "__main__":
    seed()
