import {
  FETCH_SONG_DETAILS_ATOM,
  SONG_DETAILS_ATOM,
  SONG_DETAILS_LOADING_ATOM,
} from '@/atoms/SongDetails.atom'
import { Favorite, Loading } from '@/components'
import { baseURL } from '@/config/api'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import './SongDetail.css'

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
        <div className="song-detail-page">
          <figure className="background">
            <img src={`${baseURL}/${songDetails?.album.poster}`} />
          </figure>
          <div className="container">
            <div className="player">
              <figure className="coverArt">
                <img
                  src={`${baseURL}/${songDetails?.album.coverArt}`}
                  alt={songDetails?.album.title}
                />
              </figure>
              <div className="song-controls">
                <div className="song-detail-header">
                  <p className="song-title">{songDetails?.title}</p>
                  {songId && (
                    <Favorite
                      id={parseInt(songId)}
                      is_favorite={!!songDetails?.is_favorite}
                      context="songDetails"
                    />
                  )}
                </div>
                <p className="song-infos">
                  {songDetails?.album.artist.name} | {songDetails?.album.title} |{' '}
                  {songDetails?.album.year}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SongDetail
