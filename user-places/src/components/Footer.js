export default function Footer() {
    return (
      <footer style={{
        textAlign: 'center',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #4e54c8, #8f94fb)',
        color: 'white',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <p>
          <a 
            href="https://github.com/dxtaner" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}
          >
            GitHub
          </a> 
          |
          <a 
            href="https://www.linkedin.com/in/tanerozer16/" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}
          >
            LinkedIn
          </a>
        </p>
      </footer>
    );
  }