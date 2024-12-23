from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException

from backend.app import models, schemas

def get_song(db: Session, song_id: int):
    return db.query(models.Song).filter(models.Song.id == song_id).first()

def get_songs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(
        models.Song.id,
        models.Song.title,
        models.Song.is_favorite,
        models.Album.title.label('albumTitle'),
        models.Album.coverArt.label('coverArt')
    ).join(models.Album).offset(skip).limit(limit).all()

def get_or_create_artist(db: Session, artist_name: str):
    try:
        artist = db.query(models.Artist).filter(models.Artist.name == artist_name).first()
        if not artist:
            artist = models.Artist(name=artist_name)
            db.add(artist)
            db.commit()
            db.refresh(artist)
        return artist
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error creating artist")

def get_or_create_album(db: Session, album_data: schemas.AlbumCreate, artist_id: int):
    try:
        album = db.query(models.Album).filter(models.Album.title == album_data.title, models.Album.year == album_data.year).first()
        if not album:
            album = models.Album(
                title=album_data.title, 
                year=album_data.year, 
                artist_id=artist_id,
                coverArt=f"/static/images/{album_data.coverArt}",
                poster=f"/static/images/{album_data.poster}"
            )
            db.add(album)
            db.commit()
            db.refresh(album)
        return album
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error creating album")

def handle_response_validation_error(e: SQLAlchemyError):
    raise HTTPException(status_code=500, detail="Error creating song: " + str(e))

def create_song(db: Session, song: schemas.SongCreate):
    try:
        artist = get_or_create_artist(db, song.album.artist.name)
        album = get_or_create_album(db, song.album, artist.id)
        
        db_song = models.Song(
            title=song.title,
            audio_file=f"static/files/audio/{song.files['audio']}",
            album_id=album.id,
            artist_id=artist.id
        )
        db.add(db_song)
        db.commit()
        db.refresh(db_song)
        return db_song
    except SQLAlchemyError as e:
        db.rollback()
        handle_response_validation_error(e)