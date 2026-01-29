from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, database
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/users")
def read_users(db: Session = Depends(database.get_db)):
    return db.query(models.User).all()

