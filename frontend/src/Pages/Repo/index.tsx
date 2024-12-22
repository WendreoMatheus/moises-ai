import { useEffect } from 'react'
import { useSetAtom, useAtomValue } from 'jotai'
import { useParams } from 'react-router'
import { REPO_DETAIL_ATOM, FETCH_REPO_DETAIL_ATOM } from '@/atoms/repo.atom'
import { REPO_DETAIL_ERROR_ATOM, REPO_DETAIL_LOADING_ATOM } from '@/atoms/repo.atom'
import { Breadcrumb, ErrorMessage, Loading } from '@/components'
import { NAVBAR_COLOR_ATOM } from '@/atoms/navbar.atom'
import githubColors from 'github-colors'

const RepoDetail = () => {
  const { username, repoName } = useParams()
  const fetchRepoDetail = useSetAtom(FETCH_REPO_DETAIL_ATOM)
  const repo = useAtomValue(REPO_DETAIL_ATOM)
  const error = useAtomValue(REPO_DETAIL_ERROR_ATOM)
  const loading = useAtomValue(REPO_DETAIL_LOADING_ATOM)
  const setNavbarColor = useSetAtom(NAVBAR_COLOR_ATOM)

  useEffect(() => {
    fetchRepoDetail({ username, repoName })
  }, [username, repoName, fetchRepoDetail])

  if (loading) {
    return <Loading />
  }

  if (error && !repo) {
    return <ErrorMessage message={error} />
  }

  if (repo) {
    setNavbarColor(githubColors.get(repo.language)?.color || '#333333')
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mt-5">
          <Breadcrumb />
          <div className="card">
            <div className="card-content">
              <p className="title is-4">{repo?.name}</p>
              <p className="subtitle is-6">{repo?.language || 'Sem linguagem'}</p>
              <div className="content">
                {repo?.description || 'Nenhuma descrição disponível.'}
                <br />
                <strong>⭐ Estrelas:</strong> {repo?.stargazers_count}
                <br />
                <strong>🍴 Forks:</strong> {repo?.forks_count}
                <br />
                <strong>🔗 Link:</strong>{' '}
                <a href={repo?.html_url} target="_blank" rel="noopener noreferrer">
                  Visite o repositório no GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RepoDetail
