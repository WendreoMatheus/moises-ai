import { NAVBAR_COLOR_ATOM } from '@/atoms/navbar.atom'
import { useAtomValue } from 'jotai'
import { NavLink } from 'react-router'

export const NavHeader = () => {
  const backgroundColor = useAtomValue(NAVBAR_COLOR_ATOM)
  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
      style={{ background: backgroundColor || 'rgb(0, 209, 178)' }}
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
