from backend.database import engine
from sqlalchemy import text

def fix_column_size():
    with engine.connect() as conn:
        print("Altering table usuarios to increase senha_hash size...")
        conn.execute(text("ALTER TABLE usuarios MODIFY COLUMN senha_hash VARCHAR(255) NOT NULL"))
        conn.commit()
        print("Column size updated successfully.")

if __name__ == "__main__":
    fix_column_size()
