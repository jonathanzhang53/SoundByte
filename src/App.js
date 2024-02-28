import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EventsPage from './components/EventsPage';
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import useFetchEvents from './hooks/useFetchEvents';

function App() {
  const { events } = useFetchEvents();
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        <Routes>
          <Route path="/" element={<Home events={events}/>} />
          <Route path="/events" element={<EventsPage events={events} />} />
          <Route path="/about" element={<AboutUs/>} />
        </Routes>
      </div>
    </Router>
  );
}

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
}

export default App;
