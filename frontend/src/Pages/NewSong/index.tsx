import {
  FETCH_SONG_LIST_ATOM,
  SONG_LIST_ERROR_ATOM,
  SONG_LIST_LOADING_ATOM
} from '@/atoms/SongList.atom'
import { ErrorMessage, Loading } from '@/components'
import SongForm from '@/components/SongForm'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import './NewSong.css'

const NewSong = () => {
  const fetchSongs = useSetAtom(FETCH_SONG_LIST_ATOM)
  const loading = useAtomValue(SONG_LIST_LOADING_ATOM)
  const error = useAtomValue(SONG_LIST_ERROR_ATOM)

  useEffect(() => {
    fetchSongs()
  }, [fetchSongs])

  return (
    <div className="container new-song is-flex">
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      <div className="header">
        <h1 className="title">NewSong</h1>
        <SongForm />
      </div>
    </div>
  )
}

export default NewSong
