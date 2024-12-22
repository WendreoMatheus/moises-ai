import './RepoCard.css'
import 'devicon/devicon.min.css'
import githubColors from 'github-colors'
import { IRepo } from '@/models'
import { NavLink } from 'react-router'

export const RepoCard: React.FC<{ repo: IRepo }> = ({ repo }) => {
  const languageColor = githubColors.get(repo.language)?.color || '#333333'
  const languageIconClass = `devicon-${repo.language?.toLowerCase()}-plain`

  return (
    <NavLink
      to={`/repo/${repo.full_name}`}
      className="repo-card"
      style={{ border: `2px solid ${languageColor}` }}
    >
      <div className="card">
        <div className="card-content">
          <p className="title is-5" style={{ marginBottom: '8px' }}>
            {repo.name}
          </p>

          {repo.description && (
            <p className="content" style={{ fontSize: '0.9em', color: '#555' }}>
              {repo.description}
            </p>
          )}
        </div>

        <div className="card-footer" style={{ backgroundColor: languageColor }}>
          <span>⭐ {repo.stargazers_count} Stars</span>
          {repo.language && (
            <div>
              <i className={`${languageIconClass}`}></i>
              <span>{repo.language}</span>
            </div>
          )}
          <span>🍴 {repo.forks_count} Forks</span>
        </div>
      </div>
    </NavLink>
  )
}
