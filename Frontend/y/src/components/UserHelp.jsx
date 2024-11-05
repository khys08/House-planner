// src/Components/UserHelp.jsx
import React, { useState } from 'react';

const UserHelp = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = async (e) => {
    e.preventDefault();
    
    // Here you can implement the logic to send the email to the webpage owner
    console.log(`Email sent: ${email}, Message: ${message}`);
    alert('Your message has been sent!');

    // Clear form fields
    setEmail('');
    setMessage('');
    
    // Close the modal after sending the email
    onClose();
  };

  return (
    <div style={styles.modalContent}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSendEmail}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={styles.textarea}
          />
        </div>
        <button type="submit" style={styles.sendButton}>Send</button>
      </form>
      <button style={styles.closeButton} onClick={onClose}>Close</button>
    </div>
  );
};

// Inline styles for the modal
const styles = {
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '80%',
    maxWidth: '600px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    height: '100px',
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default UserHelp;
