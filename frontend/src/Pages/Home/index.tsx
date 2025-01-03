import {
  FETCH_SONG_LIST_ATOM,
  SONG_LIST_ATOM,
  SONG_LIST_ERROR_ATOM,
  SONG_LIST_LOADING_ATOM,
} from '@/atoms/SongList.atom'
import { ErrorMessage, Loading, SongCard } from '@/components'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { NavLink } from 'react-router'
import './Home.css'

const Home = () => {
  const songs = useAtomValue(SONG_LIST_ATOM)
  const fetchSongs = useSetAtom(FETCH_SONG_LIST_ATOM)
  const loading = useAtomValue(SONG_LIST_LOADING_ATOM)
  const error = useAtomValue(SONG_LIST_ERROR_ATOM)

  useEffect(() => {
    fetchSongs()
  }, [fetchSongs])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container">
      {error && <ErrorMessage message={error} />}
      <div className="header is-flex is-justify-content-space-between is-align-items-center">
        <div>
          <h1 className="title">Your library</h1>
          <h3 className="subtitle">
            You have {songs.length} {songs.length > 1 ? 'songs' : 'song'} on your library
          </h3>
        </div>
        <NavLink to={'/admin'} className="button is-info">
          Admin
        </NavLink>
      </div>
      <div className="songs-list">
        {songs && songs.map((song) => <SongCard key={song.id} song={song} />)}
      </div>
    </div>
  )
}

export default Home
