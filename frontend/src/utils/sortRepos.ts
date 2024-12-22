import { IRepo } from '@/models'

export const sortRepos = (repos: Array<IRepo>, order: string): Array<IRepo> => {
  return repos.sort((a, b) => {
    return order === 'asc'
      ? a.stargazers_count - b.stargazers_count
      : b.stargazers_count - a.stargazers_count
  })
}
