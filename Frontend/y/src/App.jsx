import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
//import Login from '../src/Pages/Login'; // Keep only one import for Home
import HomeDataForm from '../src/components/BuildModel';
import SearchHouseForm from './components/SearchData';
import UserPage from './Pages/UserPage';
import UserProfile from './components/UserProfile';
import UserHelp from './components/UserHelp';
import Home from './Pages/Home';
// import './App.css'; // Uncomment this if you have CSS

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
            <Route path="/user-page" element={<UserPage />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user-help" element={<UserHelp />} />
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
