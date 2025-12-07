from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, database

# Create tables if they don't exist (though we expect them to exist from the SQL dump, this is safe)
# models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Agiliza CRM API")

# CORS configuration
origins = [
    "http://localhost:5173", # Vite default port
    "http://localhost:3000",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from .routers import auth, contacts, opportunities, dashboard, funnels
# ...
app.include_router(auth.router)
app.include_router(contacts.router)
app.include_router(opportunities.router)
app.include_router(dashboard.router)
app.include_router(funnels.router)
from .routers import support
app.include_router(support.router)
from .routers import marketing
app.include_router(marketing.router)
from .routers import reports
app.include_router(reports.router)

@app.get("/")
def read_root():
    return {"message": "Bem-vindo a API do Agiliza CRM"}
