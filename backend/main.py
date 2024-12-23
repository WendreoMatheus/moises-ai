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

app.mount("/api/static", StaticFiles(directory=static_dir), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"message": "Server running"}
@app.get("/seed")
async def seed_data():
    from backend.app.seed import main
    main()
    return {"message": "Data seeded"}

app.include_router(prefix='/api', router=songs.songs_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)