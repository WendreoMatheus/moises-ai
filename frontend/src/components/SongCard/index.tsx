import { ISong } from '@/models'
import { NavLink } from 'react-router'
import './songCard.css'

export const SongCard: React.FC<{ song: ISong }> = ({ song }) => {

  return (
    <NavLink
      to={`/song/${song.id}`}
      className="song-card"
    >
      <div className="card">
        <div className="card-content">
          <p className="title is-5" style={{ marginBottom: '8px' }}>
            {song.title}
          </p>
            <p className="content" style={{ fontSize: '0.9em', color: '#555' }}>
              {song.artist}
            </p>
        </div>
        <div className="card-footer">
          <span>{song.isFavorite ? 'Favorito' : 'Não Favorito'} Stars</span>
        </div>
      </div>
    </NavLink>
  )
}
