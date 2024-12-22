import { NavLink, useLocation, useParams } from 'react-router'
import './style.css'

export const Breadcrumb = () => {
  const location = useLocation()
  const { username, repoName } = useParams()

  let paths = [
    { name: 'Home', path: '/' },
    { name: `Profile: ${username}`, path: `/profile/${username}` },
  ]

  paths = repoName ? [...paths, { name: `Detalhes: ${repoName}`, path: location.pathname }] : paths

  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ul>
        {paths.map((item, index) => (
          <li key={index} className={index === paths.length - 1 ? 'is-active' : ''}>
            {index !== paths.length - 1 ? (
              <NavLink to={item.path}>{item.name}</NavLink>
            ) : (
              <span>&nbsp;{item.name}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
