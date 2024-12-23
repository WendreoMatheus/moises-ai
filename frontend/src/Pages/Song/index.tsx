import {
  FETCH_SONG_DETAILS_ATOM,
  SONG_DETAILS_ATOM,
  SONG_DETAILS_LOADING_ATOM,
} from '@/atoms/SongDetails.atom'
import { Breadcrumb, Loading } from '@/components'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useParams } from 'react-router'

const SongDetail = () => {
  const { songId } = useParams()
  const songDetails = useAtomValue(SONG_DETAILS_ATOM)
  const fetchSongDetails = useSetAtom(FETCH_SONG_DETAILS_ATOM)
  const loading = useAtomValue(SONG_DETAILS_LOADING_ATOM)

  useEffect(() => {
    fetchSongDetails({ songId })
  }, [songId, fetchSongDetails])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mt-5">
          <Breadcrumb />
          <div className="card">
            <div className="card-content">
              <p className="title is-4">{songDetails?.title}</p>
              <p className="subtitle is-6">{songDetails?.artist.name}</p>
              <div className="content">
                <br />
                <strong>{songDetails?.is_favorite ? 'Favorito' : 'Não Favorito'}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SongDetail
