import { NavLink } from 'react-router'

export const NavHeader = () => {
  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <NavLink className="navbar-item" to="/">
          <i className="fa-brands fa-github-alt has-text-white"></i>
          <strong className="has-text-white">GITSTARS</strong>
        </NavLink>
      </div>
    </nav>
  )
}
