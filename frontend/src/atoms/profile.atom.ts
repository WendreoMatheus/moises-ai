import { IRepo } from '@/models'
import { atom } from 'jotai'
import axios, { AxiosError } from 'axios'
import { sortRepos } from '@/utils/sortRepos'
import { api } from '@/config/api'

export const REPOS_LIST_ATOM = atom<Array<IRepo> | undefined>()

export const REPOS_ERROR_ATOM = atom<string | undefined>()

export const REPOS_LOADING_ATOM = atom<boolean>(false)

export const SORT_ORDER = atom<string>('desc')

export const GET_REPOS_LIST_ATOM = atom(null, async (get, set, username) => {
  set(REPOS_LIST_ATOM, undefined)

  set(REPOS_LOADING_ATOM, true)

  set(REPOS_ERROR_ATOM, undefined)

  try {
    const sort = get(SORT_ORDER)
    const response = await api.get(`/users/${username}/repos`)
    set(REPOS_LIST_ATOM, sortRepos(response.data, sort))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response } = error as AxiosError<{ msg: string }>

      if (response && response.data && response.data.msg) {
        set(REPOS_ERROR_ATOM, response.data.msg)
      } else if (response?.status === 404) {
        set(REPOS_ERROR_ATOM, 'Repositórios não encontrados')
      } else {
        set(REPOS_ERROR_ATOM, 'Erro desconhecido ou sem mensagem')
      }
    } else {
      set(REPOS_ERROR_ATOM, 'Erro desconhecido')
    }
  } finally {
    set(REPOS_LOADING_ATOM, false)
  }
})
