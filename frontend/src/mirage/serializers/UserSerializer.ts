import { IUser } from '@/models'
import { Serializer } from 'miragejs'

export const UserSerializer = Serializer.extend({
  serialize(object): IUser {
    const user = object.attrs || object
    return {
      login: user.login,
      avatar_url: user.avatar_url,
      name: user.name,
      email: user.email,
      bio: user.bio,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
    }
  },
})
