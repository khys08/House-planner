import React, { useState } from 'react';
import '../Pages/Auth.css'; 

const HomeDataForm = () => {
  const [formData, setFormData] = useState({
    Building: '',
    Area: '',
    BedRoom: '',
    DiningRoom: '',
    Kitchen: '',
    HouseImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      HouseImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('Building', formData.Building);
    form.append('Area', formData.Area);
    form.append('BedRoom', formData.BedRoom);
    form.append('DiningRoom', formData.DiningRoom);
    form.append('Kitchen', formData.Kitchen);
    if (formData.HouseImage) {
      form.append('HouseImage', formData.HouseImage);
    }

    try {
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data submitted successfully', data);
      } else {
        console.error('Error submitting data', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting data', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="home-data-form">
      <h2>Submit Your House Data</h2>
      <div className="form-group">
        <label>Building Name:</label>
        <input
          type="text"
          name="Building"
          value={formData.Building}
          onChange={handleChange}
          required
          placeholder="Enter building name"
        />
      </div>
      <div className="form-group">
        <label>Area (sq ft):</label>
        <input
          type="number"
          name="Area"
          value={formData.Area}
          onChange={handleChange}
          required
          placeholder="Enter area in sq ft"
        />
      </div>
      <div className="form-group">
        <label>Number of Bedrooms:</label>
        <input
          type="number"
          name="BedRoom"
          value={formData.BedRoom}
          onChange={handleChange}
          required
          placeholder="Enter number of bedrooms"
        />
      </div>
      <div className="form-group">
        <label>Number of Dining Rooms:</label>
        <input
          type="number"
          name="DiningRoom"
          value={formData.DiningRoom}
          onChange={handleChange}
          required
          placeholder="Enter number of dining rooms"
        />
      </div>
      <div className="form-group">
        <label>Number of Kitchens:</label>
        <input
          type="number"
          name="Kitchen"
          value={formData.Kitchen}
          onChange={handleChange}
          required
          placeholder="Enter number of kitchens"
        />
      </div>
      <div className="form-group">
        <label>House Image:</label>
        <input type="file" name="HouseImage" onChange={handleFileChange} />
      </div>
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default HomeDataForm;
