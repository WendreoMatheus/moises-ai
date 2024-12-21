from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud.song import get_songs, get_song, create_song
from app.schemas.song import SongCreate, Song as SongSchema
from app.db import get_db

songs_router = APIRouter()

@songs_router.get("/", response_model=list[SongSchema])
def read_songs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    songs = get_songs(db, skip=skip, limit=limit)
    return songs

@songs_router.get("/{song_id}", response_model=SongSchema)
def read_song(song_id: int, db: Session = Depends(get_db)):
    db_song = get_song(db, song_id=song_id)
    if db_song is None:
        raise HTTPException(status_code=404, detail="Song not found")
    return db_song

@songs_router.post("/", response_model=SongSchema)
def create_song(song: SongCreate, db: Session = Depends(get_db)):
    return create_song(db=db, song=song)