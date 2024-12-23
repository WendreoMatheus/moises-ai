import { baseURL } from '@/config/api'
import { ISong } from '@/models'
import { NavLink } from 'react-router'
import './SongCard.css'

export const SongCard: React.FC<{ song: ISong }> = ({ song }) => {

  return (
    <NavLink
      to={`/songs/${song.id}`}
      className="song-card"
    >
      <div className="song-card-container">
        <div className="card-image">
          <figure className="image">
            <img src={`${baseURL}/${song.coverArt}`} alt={song.title} />
          </figure>
        </div>
        <div className="card-content">
          <p className="song-title">
            {song.title}
          </p>
          <div>
            <div className='is-flex is-justify-content-space-between is-align-items-center'>
          <p className="song-album">
            {song.albumTitle}
          </p>
            <span className={`heart-icon ${song.is_favorite ? 'favorite' : ''}`}>
            {song.is_favorite ?
            <i className="fas fa-heart"></i> :
            <i className="fa-regular fa-heart"></i>}
          </span>
          </div>
          </div>
        </div>
      </div>
    </NavLink>
  )
}
