import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
  textDecoration: 'none',
  padding: '10px 50px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  color: '#000',
  backgroundColor: '#9E6060',
  boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
};

function NavBar() {
  return (
    <nav style={{ marginBottom: '20px' }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ display: 'inline', marginRight: '10px' }}>
          <Link to="/" style={linkStyle}>Home</Link>
        </li>
        <li style={{ display: 'inline', marginRight: '10px' }}>
          <Link to="/events" style={linkStyle}>Events</Link>
        </li>
        <li style={{ display: 'inline', marginRight: '10px' }}>
          <Link to="/about" style={linkStyle}>About Us</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
