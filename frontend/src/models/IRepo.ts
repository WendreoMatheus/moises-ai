export interface IRepo {
  id: number
  node_id: string
  owner: IOwner
  private: string
  full_name: string
  name: string
  html_url: string
  description: string
  url: string
  created_at: Date
  updated_at: Date
  homepage: null | string
  size: number
  stargazers_count: number
  watchers_count: number
  language: string
  forks_count: number
  open_issues_count: number
  allow_forking: boolean
  visibility: string
  forks: number
  open_issues: number
  subscribers_count: number
}

interface IOwner {
  login: string
}
