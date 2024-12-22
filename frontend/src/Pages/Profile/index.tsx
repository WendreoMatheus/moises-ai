import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useAtom, useSetAtom, useAtomValue } from 'jotai'
import {
  REPOS_LIST_ATOM,
  REPOS_ERROR_ATOM,
  REPOS_LOADING_ATOM,
  GET_REPOS_LIST_ATOM,
  SORT_ORDER,
} from '@/atoms/profile.atom'
import { Loading, ErrorMessage, RepoCard, Breadcrumb } from '@/components'
import { sortRepos } from '@/utils/sortRepos'

const Profile = () => {
  const { username } = useParams()
  const [repos, setRepos] = useAtom(REPOS_LIST_ATOM)
  const error = useAtomValue(REPOS_ERROR_ATOM)
  const [sort, handleSort] = useAtom(SORT_ORDER)
  const getRepos = useSetAtom(GET_REPOS_LIST_ATOM)
  const loading = useAtomValue(REPOS_LOADING_ATOM)

  useEffect(() => {
    getRepos(username?.trim())
  }, [])

  const changeSort = (sort: string) => {
    handleSort(sort)
    if (repos) {
      setRepos(sortRepos(repos, sort))
    }
  }

  return (
    <div className="container">
      <Breadcrumb />
      <h1 className="title has-text-centered my-4">Repositórios de {username}</h1>

      <div className="buttons is-centered">
        <button
          className="button is-primary"
          onClick={() => changeSort(sort === 'asc' ? 'desc' : 'asc')}
        >
          <span className="has-text-white">
            Ordenar por Estrelas ({sort === 'asc' ? 'Crescente' : 'Decrescente'})
          </span>

          <span className="icon is-large">
            <i className={`has-text-white fa-solid fa-sort-${sort === 'asc' ? 'down' : 'up'}`}></i>
          </span>
        </button>
      </div>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      <div className="columns is-multiline">
        {repos &&
          repos.map((repo) => (
            <div key={repo.id} className="column is-one-third">
              <RepoCard repo={repo} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Profile
