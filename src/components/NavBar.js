import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';

function NavBar() {
  const getNavLinkClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

  return (
    <nav className="custom-navbar navbar navbar-expand-lg">
      <div className="container-fluid justify-content-center">
        <NavLink to="/" className="navbar-brand me-5">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-list navbar-nav">
            <li className="link-style nav-item">
              <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
            </li>
            <li className="link-style nav-item">
              <NavLink to="/events" className={getNavLinkClass}>Events</NavLink>
            </li>
            <li className="link-style nav-item">
              <NavLink to="/about" className={getNavLinkClass}>About Us</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
