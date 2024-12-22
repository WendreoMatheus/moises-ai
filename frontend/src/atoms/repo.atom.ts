import { api } from '@/config/api'
import { IRepo } from '@/models'
import axios, { AxiosError } from 'axios'
import { atom } from 'jotai'

export const REPO_DETAIL_ATOM = atom<IRepo | undefined>()
export const REPO_DETAIL_ERROR_ATOM = atom<string | undefined>()
export const REPO_DETAIL_LOADING_ATOM = atom<boolean>(true)

export const FETCH_REPO_DETAIL_ATOM = atom(null, async (_get, set, { username, repoName }) => {
  set(REPO_DETAIL_ATOM, undefined)
  set(REPO_DETAIL_LOADING_ATOM, true)
  try {
    const response = await api.get(`/repos/${username}/${repoName}`)
    set(REPO_DETAIL_ATOM, response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response } = error as AxiosError<{ msg: string }>

      if (response && response.data && response.data.msg) {
        set(REPO_DETAIL_ERROR_ATOM, response.data.msg)
      } else if (response?.status === 404) {
        set(REPO_DETAIL_ERROR_ATOM, 'Usuário não encontrado')
      } else {
        set(REPO_DETAIL_ERROR_ATOM, 'Erro desconhecido ou sem mensagem')
      }
    } else {
      set(REPO_DETAIL_ERROR_ATOM, 'Erro desconhecido')
    }
    set(REPO_DETAIL_ERROR_ATOM, 'Erro ao buscar repositório')
  } finally {
    set(REPO_DETAIL_LOADING_ATOM, false)
  }
})
