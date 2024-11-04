import React, { useEffect, useState } from 'react'; 
import '../Pages/Auth.css'; 

const SearchHouseForm = () => {
  const [searchData, setSearchData] = useState({
    Building: '',
    Area: '',
    BedRoom: '',
    DiningRoom: '',
    Kitchen: '',
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();
    Object.keys(searchData).forEach((key) => {
      if (searchData[key]) {
        queryParams.append(key, searchData[key]);
      }
    });

    try {
      const response = await fetch(`http://localhost:4000/?${queryParams}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data);
        setError(null);
      } else {
        setError('No data found');
        setResults([]);
      }
    } catch (err) {
      setError('Failed to fetch data');
      setResults([]);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSearch}>
          <div>
            <label>Building Name:</label>
            <input
              type="text"
              name="Building"
              value={searchData.Building}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Area (sq ft):</label>
            <input
              type="number"
              name="Area"
              value={searchData.Area}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Bedrooms:</label>
            <input
              type="number"
              name="BedRoom"
              value={searchData.BedRoom}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Dining Rooms:</label>
            <input
              type="number"
              name="DiningRoom"
              value={searchData.DiningRoom}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Kitchens:</label>
            <input
              type="number"
              name="Kitchen"
              value={searchData.Kitchen}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Search</button>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="all-data-container">
        {results.length > 0 && (
          <div className="results-container">
            <h2>Search Results:</h2>
            <ul>
              {results.map((home, index) => (
                <li key={index}>
                  <p>Building: {home.Building}</p>
                  <p>Area: {home.Area} sq ft</p>
                  <p>Bedrooms: {home.BedRoom}</p>
                  <p>Dining Rooms: {home.DiningRoom}</p>
                  <p>Kitchens: {home.Kitchen}</p>
                  {home.HouseImage && (
                    <img
                      src={`data:${home.HouseImage.contentType};base64,${home.HouseImage.data}`}
                      alt="House"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHouseForm;
