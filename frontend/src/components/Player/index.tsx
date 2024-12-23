import { baseURL } from '@/config/api'
import { ISongDetails } from '@/models'
import React, { useEffect, useRef, useState } from 'react'
import { Favorite } from '../Favorite'
import './Player.css'

interface IPlayer {
  songDetails: ISongDetails
}

const Player: React.FC<IPlayer> = ({ songDetails }) => {
  const [play, setPlay] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const moisesRef = useRef<HTMLAudioElement>(null)

  const toggleAudio = () => {
    if (play) {
      moisesRef.current?.pause()
      setPlay(false)
    } else {
      moisesRef.current?.play()
      setPlay(true)
    }
  }

  const handleLoadedMetadata = () => {
    if (moisesRef.current) {
      setDuration(moisesRef.current.duration)
    }
  }

  const handleTimeUpdate = () => {
    if (moisesRef.current) {
      setCurrentTime(moisesRef.current.currentTime)
    }
  }

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (moisesRef.current) {
      moisesRef.current.currentTime = parseFloat(event.target.value)
      setCurrentTime(moisesRef.current.currentTime)
    }
  }

  useEffect(() => {
    const audioElement = moisesRef.current
    if (audioElement) {
      audioElement.addEventListener('loadedmetadata', handleLoadedMetadata)
      audioElement.addEventListener('timeupdate', handleTimeUpdate)
    }
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audioElement.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [])

  const formatTime = (timeInSeconds: number) => {
     const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <div className="player-controls">
      <div className="player-header">
      <button className="button player-toggle is-large" onClick={toggleAudio}>
      <span className={`icon is-large`}>
        {!play ? <i className="fa-solid fa-play"></i> : <i className="fa-solid fa-pause"></i>}
      </span>
      </button>
      <div className="song-controls">
        <div className="song-details-header">
          <p className="song-title">{songDetails?.title}</p>
          <Favorite
            id={songDetails.id}
            is_favorite={!!songDetails?.is_favorite}
            context="songDetails"
          />
        </div>
        <div className="song-infos">
          <p>
          {songDetails?.album.artist.name} 
          </p>
          <p>|</p>
          <p>
          {songDetails?.album.title}
          </p>
          <p>|</p>
          <p>
          {songDetails?.album.year}
          </p>
        </div>
      </div>
      </div>
      <div className="player-footer">
        <input
          className="styled-range"
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleRangeChange}
        />
        <audio ref={moisesRef} src={`${baseURL}/${songDetails?.audio_file}`} />
        <div className="player-times">
          <p>
            {formatTime(currentTime)}
          </p>
          <p>
            -{formatTime(duration - currentTime)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Player
