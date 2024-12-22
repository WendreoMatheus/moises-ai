import os
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.db import Base, engine
from backend.app.routers import songs

Base.metadata.create_all(bind=engine)

app = FastAPI()

static_dir = os.path.join(os.path.dirname(__file__), 'static')

app.mount("/static", StaticFiles(directory=static_dir), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prefix='/api', router=songs.songs_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)