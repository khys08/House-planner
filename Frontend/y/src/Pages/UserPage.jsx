import React, { useState } from 'react';
import SearchData from '../components/SearchData';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const [showSearchData, setShowSearchData] = useState(false);
  const navigate = useNavigate();

  const handleContactArchitect = async () => {
    navigate('/contact')
  };

  const handleHelp = () => {
    navigate('/user-help');
  };
  const handleSettings = () => alert("Settings clicked");
  const handleUserProfile=()=>{
    navigate('/user-profile');
  }

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <span style={styles.greeting}>Hi User!</span>
        <button style={styles.topButton} onClick={handleContactArchitect}>Contact Architect</button>
        <button style={styles.topButton} onClick={handleHelp}>Help</button>
        <button style={styles.topButton} onClick={handleSettings}>Settings</button>
        <div style={{ marginLeft: 'auto' }}>
          <button style={styles.iconButton} onClick={handleUserProfile}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="currentColor" 
              viewBox="0 0 16 16" 
              style={styles.icon}
            >
              <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm2.166-3a2 2 0 11-4.332 0 2 2 0 014.332 0zM14 14s-1-3-6-3-6 3-6 3 0 1 0 1h12s0-1 0-1zm-1 .5H3.992c.162-.301.835-.676 2.207-.984C7.75 13.197 8.85 13 9.995 13c1.145 0 2.244.197 2.797.516 1.373.308 2.045.683 2.207.984H13z"/>
            </svg>
          </button>
        </div>
      </div>

      <h1 style={styles.title}>Welcome to the Architecture Hub</h1>

      <button style={styles.plusButton} onClick={() => setShowSearchData(true)}>
        +
      </button>

      {showSearchData && (
        <div style={styles.modalOverlay} onClick={() => setShowSearchData(false)}>
          <div
            style={{
              ...styles.modalContent,
              animation: 'fadeIn 0.5s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <SearchData />
            <button style={styles.closeButton} onClick={() => setShowSearchData(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles for layout and animation
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#333',
    padding: '10px',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  greeting: {
    color: 'white', // White color for the greeting
    fontSize: '16px',
    marginRight: '10px',
  },
  iconButton: {
    padding: '10px',
    backgroundColor: 'transparent', // No background color
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    marginLeft: 'auto',
  },
  icon: {
    width: '20px',
    height: '20px',
  },
  topButton: {
    padding: '10px 15px',
    fontSize: '14px',
    color: 'white',
    backgroundColor: 'transparent', // No background color
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '0 8px',
  },
  title: {
    fontSize: '2em',
    marginTop: '60px',
    color: '#333',
  },
  plusButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '50px',
    height: '50px',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: '50%',
    fontSize: '24px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '80%',
    maxWidth: '500px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    position: 'relative',
    animation: 'fadeIn 0.5s ease',
  },
  closeButton: {
    marginTop: '10px',
    padding: '5px 10px',
    fontSize: '14px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

// Add animation for modal fade-in
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`, styleSheet.cssRules.length);

export default UserPage;
