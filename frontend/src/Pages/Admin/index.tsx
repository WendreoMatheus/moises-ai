import {
  FETCH_SONG_LIST_ATOM,
  SONG_LIST_ATOM,
  SONG_LIST_ERROR_ATOM,
  SONG_LIST_LOADING_ATOM,
} from '@/atoms/SongList.atom'
import { ErrorMessage, Loading } from '@/components'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import './Admin.css'

const Admin = () => {
  const songs = useAtomValue(SONG_LIST_ATOM)
  const fetchSongs = useSetAtom(FETCH_SONG_LIST_ATOM)
  const loading = useAtomValue(SONG_LIST_LOADING_ATOM)
  const error = useAtomValue(SONG_LIST_ERROR_ATOM)

  useEffect(() => {
    fetchSongs()
  }, [fetchSongs])

  return (
    <div className="container admin-songs-list">
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      <div className="header">
        <h1 className="title">Admin</h1>
        <button className='button is-success'>Adicionar</button>
      </div>
      <ul className="is-flex is-flex-direction-column is-flex-justify-content-space-between">
        {songs &&
          songs.length > 0 &&
          songs.map((song) => (
            <li>
              <span>
                {song.title} - {song.albumTitle}
              </span>
              <div className="options">
                <button className="button is-warning">Editar</button>
                <button className="button is-danger">Excluir</button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Admin
