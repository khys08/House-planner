// src/components/UserProfile.jsx
import React, { useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle the image
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('mobileNo', mobileNo);
    formData.append('image', image); // Assume backend handles the image upload

    try {
      const response = await axios.post('http://localhost:4000/api/user-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
    } catch (error) {
      alert('Error saving profile');
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Profile</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="tel"
          placeholder="Mobile No"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.submitButton}>Update Profile</button>
      </form>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default UserProfile;
