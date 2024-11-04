
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from '../src/Pages/Home';
import HomeDataForm from '../src/components/BuildModel';
import SearchHouseForm from './components/SearchData';
import '../src/Pages/App.css'; 

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>ARCH HUB</h1>
          
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Build-house" element={<HomeDataForm />} />
            <Route path="/search-house" element={<SearchHouseForm />} />
            <Route
              path="/welcome"
              element={
                <div>
                  <h2>Welcome to the House Management System</h2>
                  <p>Select an option from the menu above to get started:</p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
