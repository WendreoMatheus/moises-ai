import { FETCH_SONG_LIST_ATOM, SONG_LIST_ATOM, SONG_LIST_ERROR_ATOM, SONG_LIST_LOADING_ATOM } from '@/atoms/SongList.atom'
import { Breadcrumb, ErrorMessage, Loading, SongCard } from '@/components'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

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

      <div className="columns is-multiline">
        {songs &&
          songs.map((song) => (
            <div key={song.id} className="column is-one-third">
              <SongCard song={song} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Home
