from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from backend.app.db import Base

class Artist(Base):
    __tablename__ = 'artists'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    albums = relationship("Album", back_populates="artist")