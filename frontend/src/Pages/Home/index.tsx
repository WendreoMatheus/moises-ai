import { FETCH_SONG_LIST_ATOM, SONG_LIST_ATOM, SONG_LIST_ERROR_ATOM, SONG_LIST_LOADING_ATOM } from '@/atoms/SongList.atom'
import { Breadcrumb, ErrorMessage, Loading, SongCard } from '@/components'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import './Home.css'

const Home = () => {
  const songs = useAtomValue(SONG_LIST_ATOM)
  const fetchSongs = useSetAtom(FETCH_SONG_LIST_ATOM)
  const loading = useAtomValue(SONG_LIST_LOADING_ATOM)
  const error = useAtomValue(SONG_LIST_ERROR_ATOM)

  useEffect(() => {
    fetchSongs()
  }, [fetchSongs])

  return (
    <div className="container">
      <Breadcrumb />

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      <div className='songs-list'>
        {songs &&
          songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
      </div>
    </div>
  )
}

export default Home
