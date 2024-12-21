from pydantic import BaseModel, ConfigDict
from app.models import Album, Artist  

class ConfigBase(BaseModel):
    class Config:
        arbitrary_types_allowed = True
        from_attributes = True

class AlbumCreate(ConfigBase):
    title: str
    year: int

class ArtistCreate(ConfigBase):
    name: str

class SongBase(ConfigBase):
    title: str
    album: AlbumCreate
    artist: ArtistCreate
    files: dict
    is_favorite: bool  # New field added

class SongCreate(SongBase):
    pass    

class Song(SongBase):
    id: int
    artist_id: int
    artist: 'Artist'
    album_id: int
    album: 'Album'
