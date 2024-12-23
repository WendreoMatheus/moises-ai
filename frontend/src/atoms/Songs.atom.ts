import { api } from '@/config/api'
import { ISongDetails } from '@/models'
import axios, { AxiosError } from 'axios'
import { atom } from 'jotai'

export const SONG_DETAILS_ATOM = atom<ISongDetails | undefined>()
export const SONG_DETAILS_ERROR_ATOM = atom<string | undefined>()
export const SONG_DETAILS_LOADING_ATOM = atom<boolean>(true)

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
