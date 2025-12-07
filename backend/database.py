from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Default XAMPP/WAMP credentials (root with no password usually, or root:root)
# Adjust these credentials if your local environment is different
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:@localhost/agilizacrm"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
