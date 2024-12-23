import { api } from '@/config/api'
import { ISongDetails } from '@/models'
import axios, { AxiosError } from 'axios'
import { atom } from 'jotai'
import { SONG_LIST_ATOM } from './SongList.atom'

export const SONG_DETAILS_ATOM = atom<ISongDetails | undefined>()
export const SONG_DETAILS_ERROR_ATOM = atom<string | undefined>()
export const SONG_DETAILS_LOADING_ATOM = atom<boolean>(true)
export const SET_FAVORITE_LOADING_ATOM = atom<number | undefined>(undefined)

export const FETCH_SONG_DETAILS_ATOM = atom(null, async (_get, set, { songId }) => {
  set(SONG_DETAILS_ATOM, undefined)
  set(SONG_DETAILS_LOADING_ATOM, true)
  try {
    const response = await api.get(`/songs/${songId}`)
    set(SONG_DETAILS_ATOM, response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response } = error as AxiosError<{ msg: string }>

      if (response && response.data && response.data.msg) {
        set(SONG_DETAILS_ERROR_ATOM, response.data.msg)
      } else if (response?.status === 404) {
        set(SONG_DETAILS_ERROR_ATOM, 'Song not found')
      } else {
        set(SONG_DETAILS_ERROR_ATOM, 'Unknown error')
      }
    } else {
      set(SONG_DETAILS_ERROR_ATOM, 'Unknown error')
    }
    set(SONG_DETAILS_ERROR_ATOM, 'Failed to fetch song details')
  } finally {
    set(SONG_DETAILS_LOADING_ATOM, false)
  }
})

export const FAVORITE_SONG_ATOM = atom(
  null,
  async (get, set, { songId, context = 'songDetails' }) => {
    try {
      set(SET_FAVORITE_LOADING_ATOM, songId)
      const response = await api.patch(`/songs/${songId}/favorite`)
      if (context === 'songDetails') {
        const song = get(SONG_DETAILS_ATOM)
        if (!song) {
          throw new Error('Song not found')
        }
        song.is_favorite = response.data.is_favorite
        set(SONG_DETAILS_ATOM, { ...song, is_favorite: response.data.is_favorite })
      } else {
        const songs = get(SONG_LIST_ATOM)
        set(
          SONG_LIST_ATOM,
          songs.map((song) =>
            song.id === songId ? { ...song, is_favorite: !song.is_favorite } : song
          )
        )
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error as AxiosError<{ msg: string }>

        if (response && response.data && response.data.msg) {
          console.error(response.data.msg)
        } else if (response?.status === 404) {
          console.error('Song not found')
        } else {
          console.error('Unknown error', error)
        }
      } else {
        console.error('Unknown error', error)
      }
      console.error('Failed to favorite the song', error)
    } finally {
      set(SET_FAVORITE_LOADING_ATOM, undefined)
    }
  }
)
