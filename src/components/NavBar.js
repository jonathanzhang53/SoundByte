import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="link-style">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/events" className="link-style">Events</Link>
        </li>
        <li className="navbar-item">
          <Link to="/about" className="link-style">About Us</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
