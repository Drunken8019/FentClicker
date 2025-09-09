from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, database

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

@app.get("/users")
def read_users(db: Session = Depends(database.get_db)):
    return db.query(models.User).all()

