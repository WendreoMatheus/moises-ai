import { api } from '@/config/api';
import React, { FormEvent, useState } from 'react';
import './SongForm.css';

interface ISongForm {
  initialData?: {
    title: string;
    artist: string;
    album: {
      title: string;
      year: number;
      coverArt: string;
      poster: string;
    };
    audio: string;
  };
}

interface ISongData {
  title: string;
  artist: string;
  album: {
    title: string;
    year: number;
    coverArt: string;
    poster: string;
  };
  audio: string;
}

const SongForm: React.FC<ISongForm> = ({ initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    artist: initialData?.artist || '',
    albumTitle: initialData?.album?.title || '',
    albumYear: initialData?.album?.year || new Date().getFullYear(),
    coverArt: initialData?.album?.coverArt || '',
    poster: initialData?.album?.poster || '',
    audio: initialData?.audio || ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const songData: ISongData = {
      title: formData.title,
      artist: formData.artist,
      album: {
        title: formData.albumTitle,
        year: formData.albumYear,
        coverArt: formData.coverArt || 'default-cover.jpg',
        poster: formData.poster || 'default-poster.jpg',
      },
        audio: formData.audio || 'default-audio.mp3'
    };

    try {
      await api.post('/songs', songData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Song submitted successfully!');	
      setFormData({
        title: '',
        artist: '',
        albumTitle: '',
        albumYear: new Date().getFullYear(),
        coverArt: '',
        poster: '',
        audio: ''
      });
    } catch (error) {
      console.error('Error submitting song:', error);
    }
  };

  return (
    <form className="song-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Song Title</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="artist">Artist</label>
        <input
          type="text"
          id="artist"
          value={formData.artist}
          onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="albumTitle">Album Title</label>
        <input
          type="text"
          id="albumTitle"
          value={formData.albumTitle}
          onChange={(e) => setFormData({ ...formData, albumTitle: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="albumYear">Album Year</label>
        <input
          type="number"
          id="albumYear"
          value={formData.albumYear}
          onChange={(e) => setFormData({ ...formData, albumYear: parseInt(e.target.value) })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="coverArt">Cover Art URL</label>
        <input
          type="text"
          id="coverArt"
          value={formData.coverArt}
          onChange={(e) => setFormData({ ...formData, coverArt: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="poster">Poster URL</label>
        <input
          type="text"
          id="poster"
          value={formData.poster}
          onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="audio">Audio File URL</label>
        <input
          type="text"
          id="audio"
          value={formData.audio}
          onChange={(e) => setFormData({ ...formData, audio: e.target.value })}
          required
        />
      </div>

      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default SongForm;