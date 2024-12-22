import { createServer, Response } from 'miragejs'
import { Repos, User } from './fixtures'
import { AppSchema } from './types'
import { models } from './models'
import { serializers } from './serializers'
import { IRepo } from '@/models'

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,
    models,
    serializers,

    seeds(server) {
      server.create('user', { ...User } as object)
      Repos.list.forEach((repo) => server.create('repo', { ...repo } as object))
    },

    routes() {
      this.namespace = '/api'

      this.get('/users/:username', (schema: AppSchema, request) => {
        const { username } = request.params
        const data = schema.users.findBy({ login: username })
        if (data) {
          return new Response(200, {}, data)
        }

        return new Response(404, {}, { msg: 'Usuário não encontrado' })
      })
      this.get('/users/:username/repos', (schema: AppSchema, request) => {
        const { username } = request.params
        const data = schema.repos.where((repo: IRepo) => repo.owner.login === username).models
        if (data.length > 0) {
          return new Response(200, {}, data)
        }

        return new Response(404, {}, { msg: 'Repositórios não encontrados' })
      })
      this.get('/repos/:username/:repoName', (schema: AppSchema, request) => {
        const { username, repoName } = request.params
        const isTest = process.env.NODE_ENV === 'test'
        const data = isTest
          ? schema.repos.first()
          : schema.repos.findBy({ full_name: `${username}/${repoName}` })

        // Forca 404 em teste para o mock
        if (isTest && username !== 'WendreoMatheus') {
          return new Response(404, {}, { msg: 'Repositório não encontrados' })
        }
        if (data) {
          return new Response(200, {}, data)
        }
        return new Response(404, {}, { msg: 'Repositório não encontrados' })
      })
    },
  })

  server.logging = false
  return server
}
