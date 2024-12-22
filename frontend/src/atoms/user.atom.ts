import { api } from '@/config/api'
import { IUser } from '@/models'
import axios, { AxiosError } from 'axios'
import { atom } from 'jotai'

export const USERNAME_ATOM = atom<string>('')

export const USER_ATOM = atom<IUser | undefined>(undefined)

export const USER_ERROR_ATOM = atom<string | undefined>(undefined)

export const USER_LOADING_ATOM = atom<boolean>(false)

export const GET_USER_ATOM = atom(null, async (get, set) => {
  const username = get(USERNAME_ATOM)

  set(USER_ATOM, undefined)

  set(USER_LOADING_ATOM, true)

  set(USER_ERROR_ATOM, undefined)

  try {
    const response = await api.get(`/users/${username}`)

    set(USER_ATOM, response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response } = error as AxiosError<{ msg: string }>

      if (response && response.data && response.data.msg) {
        set(USER_ERROR_ATOM, response.data.msg)
      } else if (response?.status === 404) {
        set(USER_ERROR_ATOM, 'Usuário não encontrado')
      } else {
        set(USER_ERROR_ATOM, 'Erro desconhecido ou sem mensagem')
      }
    } else {
      set(USER_ERROR_ATOM, 'Erro desconhecido')
    }
  } finally {
    set(USER_LOADING_ATOM, false)
  }
})
