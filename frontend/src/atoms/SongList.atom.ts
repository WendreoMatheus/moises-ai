import { api } from '@/config/api'
import { ISong } from '@/models'
import axios, { AxiosError } from 'axios'
import { atom } from 'jotai'

export const SONG_LIST_ATOM = atom<ISong[]>([])
export const SONG_LIST_ERROR_ATOM = atom<string | undefined>()
export const SONG_LIST_LOADING_ATOM = atom<boolean>(true)

export const FETCH_SONG_LIST_ATOM = atom(null, async (_get, set) => {
  set(SONG_LIST_ATOM, [])
  set(SONG_LIST_LOADING_ATOM, true)
  try {
    const response = await api.get('/songs')
    set(SONG_LIST_ATOM, response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response } = error as AxiosError<{ msg: string }>

      if (response && response.data && response.data.msg) {
        set(SONG_LIST_ERROR_ATOM, response.data.msg)
      } else {
        set(SONG_LIST_ERROR_ATOM, 'Unknown error')
      }
    } else {
      set(SONG_LIST_ERROR_ATOM, 'Unknown error')
    }
    set(SONG_LIST_ERROR_ATOM, 'Failed to fetch song list')
  } finally {
    set(SONG_LIST_LOADING_ATOM, false)
  }
})
