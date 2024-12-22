from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.db import Base

class Album(Base):
    __tablename__ = 'albums'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    year = Column(Integer, index=True)
    poster = Column(String, index=True)
    coverArt = Column(String, index=True)
    artist_id = Column(Integer, ForeignKey('artists.id'))
    artist = relationship("Artist", back_populates="albums")
    songs = relationship("Song", back_populates="album")