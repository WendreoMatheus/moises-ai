from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from backend.app.db import Base

class Song(Base): 
    __tablename__ = 'songs'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    audio_file = Column(String, index=True)
    album_id = Column(Integer, ForeignKey('albums.id'))
    album = relationship("Album", back_populates="songs")
    is_favorite = Column(Boolean, default=False)