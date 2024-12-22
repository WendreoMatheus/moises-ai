from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.crud.song import get_songs, get_song, create_song
from backend.app.schemas.song import SongCreate, SongSchema, SongListSchema
from backend.app.db import get_db

songs_router = APIRouter()

@songs_router.get("/songs", response_model=list[SongListSchema])
def read_songs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    songs = get_songs(db, skip=skip, limit=limit)
    return songs

@songs_router.get("/songs/{song_id}", response_model=SongSchema)
def read_song(song_id: int, db: Session = Depends(get_db)):
    db_song = get_song(db, song_id=song_id)
    if db_song is None:
        raise HTTPException(status_code=404, detail="Song not found")
    return db_song

@songs_router.put("/songs/{song_id}/favorite", response_model=SongSchema)
def favorite_song(song_id: int, db: Session = Depends(get_db)):
    db_song = get_song(db, song_id=song_id)
    if db_song is None:
        raise HTTPException(status_code=404, detail="Song not found")
    db_song.is_favorite = not db_song.is_favorite
    db.commit()
    db.refresh(db_song)
    return db_song

@songs_router.post("/songs", response_model=SongSchema)
def create_song(song: SongCreate, db: Session = Depends(get_db)):
    return create_song(db=db, song=song)