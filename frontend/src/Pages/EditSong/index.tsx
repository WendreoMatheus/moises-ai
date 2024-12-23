import {
  FETCH_SONG_DETAILS_ATOM,
  SONG_DETAILS_ATOM,
  SONG_DETAILS_ERROR_ATOM,
  SONG_DETAILS_LOADING_ATOM,
} from '@/atoms/SongDetails.atom'
import { ErrorMessage, Loading } from '@/components'
import SongForm, { ISongForm } from '@/components/SongForm'
import { ISongDetails } from '@/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { NavLink, useParams } from 'react-router'
import './EditSong.css'

const EditSong = () => {
  const params = useParams()
  const fetchSong = useSetAtom(FETCH_SONG_DETAILS_ATOM)
  const songDetails = useAtomValue(SONG_DETAILS_ATOM)
  const loading = useAtomValue(SONG_DETAILS_LOADING_ATOM)
  const error = useAtomValue(SONG_DETAILS_ERROR_ATOM)

  useEffect(() => {
    if (params?.songId) {
      fetchSong({ songId: params.songId })
    }
  }, [fetchSong])

  const formatUrl = (url: string) => {
    return url.split('/')[url.split('/').length - 1]
  }

  const formatInitialData = (songDetails: ISongDetails): ISongForm['initialData'] => {
    return {
      title: songDetails.title,
      artist: songDetails.album.artist.name,
      album: {
        title: formatUrl(songDetails.album.title),
        year: songDetails.album.year,
        coverArt: formatUrl(songDetails.album.coverArt),
        poster: formatUrl(songDetails.album.poster),
      },
      audio: formatUrl(songDetails.audio_file),
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="container new-song is-flex">
      {error && <ErrorMessage message={error} />}
      <div className="header">
        <h1 className="title">
          <NavLink to={'/admin'}> Admin </NavLink> / Edit Song - {songDetails?.title}
        </h1>
        {songDetails && (
          <SongForm update songId={songDetails.id} initialData={formatInitialData(songDetails)} />
        )}
      </div>
    </div>
  )
}

export default EditSong
