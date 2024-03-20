import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
  textDecoration: 'none',
  padding: '10px 50px',
  border: 'none',
  borderRadius: '5px',
  color: '#fff',
  backgroundColor: '#03ddff',
  boxShadow: '0 0 1px #03ddff, 0 0 1px #03ddff, 0 0 1px #03ddff, 0 0 5px #03ddff, 0 0 5px #03ddff, 0 0 40px #03ddff, 0 0 5px #03ddff, 0 0 15px #03ddff',
  animation: 'flicker 1.5s infinite alternate',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
}

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
