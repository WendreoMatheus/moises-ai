import { IRepo, IUser } from '@/models'
import { Model } from 'miragejs'
import { ModelDefinition } from 'miragejs/-types'

const UserModel: ModelDefinition<IUser> = Model.extend({})
const RepoModel: ModelDefinition<IRepo> = Model.extend({})

export const models = {
  user: UserModel,
  repo: RepoModel,
}
