import { Link } from 'react-router-dom';

export default function Home() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <div
      style={{
        padding: '3rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #84fab0, #8fd3f4)',
        color: '#333',
        borderRadius: '20px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '3rem auto',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>Welcome to MY Website</h1>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
        Discover amazing content, explore our projects, and learn more about our mission.
      </p>
      <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
        We are dedicated to providing innovative solutions and an exceptional user experience.
      </p>
      <div style={{ marginTop: '2rem' }}>
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              style={{
                marginRight: '1rem',
                padding: '1rem 2.5rem',
                background: 'linear-gradient(45deg, #6a5acd, #8a2be2)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '50px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                letterSpacing: '1px',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                padding: '1rem 2.5rem',
                background: 'linear-gradient(45deg, #ff6a00, #ff8e00)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '50px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                letterSpacing: '1px',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              Register
            </Link>
          </>
        ) : (
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            You are already logged in! <Link to="/dashboard" style={{ color: '#4e54c8' }}>Go to Dashboard</Link>
          </p>
        )}
      </div>
    </div>
  );
}
