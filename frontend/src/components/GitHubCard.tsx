import { IUser } from '@/models'
import { NavLink } from 'react-router'

export const GitHubCard: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <NavLink to={`/profile/${user.login}`}>
      <div className="card" style={{ margin: '10px auto', maxWidth: '320px', width: '100%' }}>
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src={user.avatar_url}
              alt={user.login}
              style={{ objectFit: 'cover', width: '100%', height: '200px' }}
            />
          </figure>
        </div>

        <div className="card-content">
          <p className="title is-5">{user.name}</p>
          <p className="subtitle is-6">{user.login}</p>
          <p className="content" style={{ fontSize: '0.9em' }}>
            {user.bio || 'No description available.'}
          </p>

          <div className="columns is-mobile is-vcentered">
            <div className="column is-half">
              <p>
                <strong>Followers:</strong>
              </p>
              <p>{user.followers}</p>
            </div>
            <div className="column is-half">
              <p>
                <strong>Following:</strong>
              </p>
              <p>{user.following}</p>
            </div>
          </div>

          <p>
            <strong>Email:</strong> {user.email || 'Sem email'}
          </p>
        </div>
      </div>
    </NavLink>
  )
}
