from .models import Album, Artist, Song
from .schemas import SongBase, SongCreate, SongSchema
from .routers import songs_router
from .db import Base, SessionLocal, engine
from .config import SQLALCHEMY_DATABASE_URL