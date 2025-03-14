export default function About() {
    return (
      <div
        style={{
          padding: '3rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
          color: '#333',
          borderRadius: '20px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          maxWidth: '800px',
          margin: '3rem auto'
        }}
      >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>About Us</h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
          Welcome to our platform! We are committed to providing the best user experience
          and delivering innovative solutions.
        </p>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
          My is proudly based in <strong>Bursa, Turkey</strong>, and we are passionate
          about pushing the boundaries of technology and innovation.
        </p>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
          Feel free to explore our website and discover more about our projects and initiatives.
        </p>
      </div>
    );
  }
  