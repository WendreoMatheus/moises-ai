import { FAVORITE_SONG_ATOM, SET_FAVORITE_LOADING_ATOM } from '@/atoms/SongDetails.atom';
import { useAtomValue, useSetAtom } from 'jotai';
import './Favorite.css';

export const Favorite: React.FC<{ is_favorite: boolean; id: number, context?: string }> = ({ is_favorite, id, context }) => {
  const loading = useAtomValue(SET_FAVORITE_LOADING_ATOM)
  const favoriteSong = useSetAtom(FAVORITE_SONG_ATOM)

  const handleClick = () => {
    if(!loading) {
        favoriteSong({ songId: id, context })
    }
  }
  return (
    <button disabled={loading} className={`favorite-button button ${loading && 'is-loading'}`} onClick={handleClick}>
      <span key={id} className={`icon is-small heart-icon ${is_favorite ? 'favorite' : ''}`}>
        {is_favorite ? <i className="fas fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
      </span>
    </button>
  )
}
