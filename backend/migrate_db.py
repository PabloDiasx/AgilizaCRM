from backend import database, models
print("Creating new tables...")
models.Base.metadata.create_all(bind=database.engine)
print("Done!")
