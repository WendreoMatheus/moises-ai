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
        artist = get_or_create_artist(db, song.artist)
        album = get_or_create_album(db, song.album, artist.id)
        
        db_song = models.Song(
            title=song.title,
            audio_file=f"static/files/audio/{song.audio}",
            album_id=album.id,
        )
        db.add(db_song)
        db.commit()
        db.refresh(db_song)
        return db_song
    except SQLAlchemyError as e:
        db.rollback()
        handle_response_validation_error(e)

def delete_song(db: Session, song_id: int):
    try:
        song = db.query(models.Song).filter(models.Song.id == song_id).first()
        if not song:
            raise HTTPException(status_code=404, detail="Song not found")
        
        db.delete(song)
        db.commit()
        return {"message": "Song deleted successfully"}
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error deleting song: {str(e)}")

def update_song(db: Session, song_id: int, song_data: schemas.SongCreate):
    try:
        db_song = db.query(models.Song).filter(models.Song.id == song_id).first()
        if not db_song:
            raise HTTPException(status_code=404, detail="Song not found")

        # Update album details
        album = db.query(models.Album).filter(models.Album.id == db_song.album_id).first()
        if album:
            album.title = song_data.album.title
            album.year = song_data.album.year
            album.coverArt = f"/static/images/{song_data.album.coverArt}"
            album.poster = f"/static/images/{song_data.album.poster}"
            db.commit()
            db.refresh(album)
        
        # Update artist details
        artist = db.query(models.Artist).filter(models.Artist.id == album.artist_id).first()
        if artist:
            artist.name = song_data.artist
            db.commit()
            db.refresh(artist)

        #
        # Update song details
        db_song.title = song_data.title
        db_song.audio_file = f"static/files/audio/{song_data.audio}"
        db.commit()
        db.refresh(db_song)

        return db_song
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating song: {str(e)}")