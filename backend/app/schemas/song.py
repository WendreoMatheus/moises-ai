from pydantic import BaseModel
from backend.app.models import Album, Artist, Song 

class ConfigBase(BaseModel):
    class Config:
        arbitrary_types_allowed = True
        from_attributes = True

class ArtistBase(ConfigBase):
    name: str

class ArtistSchema(ArtistBase):
    id: int

class ArtistCreate(ArtistBase):
    pass

class AlbumBase(ConfigBase):
    title: str
    year: int
    coverArt: str
    poster: str

class AlbumSchema(AlbumBase):
    id: int
    artist: ArtistSchema  

class AlbumCreate(AlbumBase):
    pass

class SongBase(ConfigBase):
    title: str
    is_favorite: bool

class SongCreate(SongBase):
    pass    

class SongSchema(SongBase):
    id: int
    audio_file: str
    album: AlbumSchema

class SongListSchema(SongBase):
    id: int
    albumTitle: str
    coverArt: str