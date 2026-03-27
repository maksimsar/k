import { NavLink } from 'react-router-dom';

const getNavLinkClass = ({ isActive }) =>
  isActive ? 'nav-link nav-link--active' : 'nav-link';

function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <NavLink to="/" className="brand">
          Kaspersky Users
        </NavLink>

        <nav className="nav">
          <NavLink to="/" className={getNavLinkClass} end>
            Welcome
          </NavLink>
          <NavLink to="/users" className={getNavLinkClass}>
            Users
          </NavLink>
          <NavLink to="/groups" className={getNavLinkClass}>
            Groups
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;