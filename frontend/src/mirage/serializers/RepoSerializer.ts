import { IRepo } from '@/models'
import { Serializer } from 'miragejs'

export const RepoSerializer = Serializer.extend({
  serialize(object): IRepo {
    const repo = object.attrs || object
    return {
      id: repo.id,
      node_id: repo.node_id,
      full_name: repo.full_name,
      owner: repo.owner.login,
      private: repo.private ? 'true' : 'false',
      name: repo.name,
      html_url: repo.html_url,
      description: repo.description,
      url: repo.url,
      created_at: new Date(repo.created_at),
      updated_at: new Date(repo.updated_at),
      homepage: repo.homepage,
      size: repo.size,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      language: repo.language,
      forks_count: repo.forks_count,
      open_issues_count: repo.open_issues_count,
      allow_forking: repo.allow_forking,
      visibility: repo.visibility,
      forks: repo.forks,
      open_issues: repo.open_issues,
      subscribers_count: repo.subscribers_count,
    }
  },
})
