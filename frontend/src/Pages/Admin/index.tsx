import {
  FETCH_SONG_LIST_ATOM,
  SONG_LIST_ATOM,
  SONG_LIST_ERROR_ATOM,
  SONG_LIST_LOADING_ATOM,
} from '@/atoms/SongList.atom'
import { ErrorMessage, Loading } from '@/components'
import { api } from '@/config/api'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import './Admin.css'

const Admin = () => {
  const songs = useAtomValue(SONG_LIST_ATOM)
  const fetchSongs = useSetAtom(FETCH_SONG_LIST_ATOM)
  const loading = useAtomValue(SONG_LIST_LOADING_ATOM)
  const error = useAtomValue(SONG_LIST_ERROR_ATOM)
  const [loadingSongIds, setLoadingSongIds] = useState<Array<number>>([])

  useEffect(() => {
    fetchSongs()
  }, [fetchSongs])

  const deleteSong = (id: number) => async () => {
    try {
      setLoadingSongIds((prev) => [...prev, id])
      await api.delete(`/songs/${id}`)
      fetchSongs()
      alert('Song deleted successfully!')
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingSongIds((prev) => prev.filter((songId) => songId !== id))
    }
  }

  const isLoading = (id: number): boolean => {
    return loadingSongIds.includes(id)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container admin-songs-list">
      {error && <ErrorMessage message={error} />}
      <div className="header">
        <h1 className="title">
          <NavLink to={'/'}>Home</NavLink> / Admin
        </h1>
        <NavLink to={'/admin/new-song'} className="button is-success">
          Adicionar
        </NavLink>
      </div>
      <ul className="is-flex is-flex-direction-column is-flex-justify-content-space-between">
        {songs &&
          songs.length > 0 &&
          songs.map((song) => (
            <li key={song.id}>
              <span>
                {song.title} - {song.albumTitle}
              </span>
              <div className="options">
                <NavLink to={`/admin/edit/${song.id}`} className="button is-warning">
                  Editar
                </NavLink>
                <button
                  disabled={isLoading(song.id)}
                  className={`button is-danger ${isLoading(song.id) && 'is-loading'}`}
                  onClick={deleteSong(song.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Admin
