from backend.database import SessionLocal
from backend.models import Usuario
from backend.auth import verify_password, get_password_hash

db = SessionLocal()

def test_login(email, password):
    print(f"Testing login for: {email} with password: {password}")
    
    user = db.query(Usuario).filter(Usuario.email == email).first()
    
    if not user:
        print("❌ User not found in database.")
        return

    print(f"[OK] User found: ID={user.id_usuario}, Name={user.nome}, Active={user.ativo}")
    print(f"Stored Hash: {user.senha_hash}")
    
    is_valid = verify_password(password, user.senha_hash)
    
    if is_valid:
        print("[OK] Password is CORRECT! Login should work.")
    else:
        print("[FAIL] Password verification FAILED.")
        
        # Debugging: Generate a new hash and compare visually
        new_hash = get_password_hash(password)
        print(f"Debug - New Hash for '{password}': {new_hash}")

if __name__ == "__main__":
    test_login("admin@agilizacrm.com", "admin123")
