import uvicorn
from fastapi import FastAPI
from backend.db import Base, engine
from backend.routers import songs

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(songs.songs_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)