import json
import os
from sqlalchemy.orm import Session
from backend.app.models import Artist, Album, Song
from backend.app.db import Base, SessionLocal, engine

Base.metadata.create_all(bind=engine)

def load_data(session: Session, data: dict):
    for song_data in data['songs']:
        artist_name = song_data['song']['artist']
        album_title = song_data['song']['album']['title']
        album_year = song_data['song']['album']['year']
        song_title = song_data['song']['title']
        audio_file = f"static/files/audio/{song_data['song']['files']['audio']}"
        cover_art = f"static/files/images/{song_data['song']['files']['coverArt']}"
        poster = f"static/files/images/{song_data['song']['files']['poster']}"

        artist = session.query(Artist).filter_by(name=artist_name).first()
        if not artist:
            artist = Artist(name=artist_name)
            session.add(artist)
            session.commit()

        album = session.query(Album).filter_by(title=album_title, artist_id=artist.id).first()
        if not album:
            album = Album(title=album_title, year=album_year, artist_id=artist.id, coverArt=cover_art, poster=poster)
            session.add(album)
            session.commit()

        song = Song(title=song_title, audio_file=audio_file, album_id=album.id)
        session.add(song)

    session.commit()

def main():
    file_path = os.path.join(os.path.dirname(__file__), 'data.json')
    file_path = os.path.abspath(file_path)
    with open(file_path) as f:
        data = json.load(f)

    session = SessionLocal()

    try:
        load_data(session, data)
    finally:
        session.close()

if __name__ == "__main__":
    main()
