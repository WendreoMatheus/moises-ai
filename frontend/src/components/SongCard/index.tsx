import { baseURL } from '@/config/api'
import { ISong } from '@/models'
import { useNavigate } from 'react-router'
import { Favorite } from '../Favorite'
import './SongCard.css'

export const SongCard: React.FC<{ song: ISong }> = ({ song }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    console.log('Song card clicked')
    return navigate(`/songs/${song.id}`)
  }

  return (
    <div className="song-card">
      <div className="song-card-container">
        <div className="card-image" onClick={handleCardClick}>
          <figure className="image">
            <img src={`${baseURL}/${song.coverArt}`} alt={song.title} />
          </figure>
        </div>
        <div className="card-content">
          <p className="song-title" onClick={handleCardClick}>
            {song.title}
          </p>
          <div>
            <div className="is-flex is-justify-content-space-between is-align-items-center">
              <p className="song-album" onClick={handleCardClick}>
                {song.albumTitle}
              </p>
              <Favorite context='songsList' is_favorite={song.is_favorite} id={song.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
