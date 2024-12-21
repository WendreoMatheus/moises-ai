from fastapi import FastAPI
from app.db import Base, engine
from app.routers import songs_router

# Start database
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(songs_router, prefix="/songs", tags=["songs"])