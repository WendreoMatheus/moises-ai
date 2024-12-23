import { FAVORITE_SONG_ATOM, SET_FAVORITE_LOADING_ATOM } from '@/atoms/SongDetails.atom'
import { useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import './Favorite.css'

interface IFavorite {
  is_favorite: boolean
  id: number
  context?: string
}

export const Favorite: React.FC<IFavorite> = (props: IFavorite) => {
  const { is_favorite, id, context } = props

  const loadingId = useAtomValue(SET_FAVORITE_LOADING_ATOM)
  const favoriteSong = useSetAtom(FAVORITE_SONG_ATOM)

  const handleClick = () => {
    if (!loadingId) {
      favoriteSong({ songId: id, context })
    }
  }

  const isLoading = () => loadingId === id

  return (
    <button
      disabled={isLoading()}
      className={`favorite-button button ${isLoading() && 'is-loading'}`}
      onClick={handleClick}
    >
      <span key={id} className={`icon is-small heart-icon ${is_favorite ? 'favorite' : ''}`}>
        {is_favorite ? <i className="fas fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
      </span>
    </button>
  )
}
