import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSearchResults(['Stock A', 'Stock B', 'Stock C'].filter(stock => stock.toLowerCase().includes(event.target.value.toLowerCase())));
  };

  return (
    <div className="DashboardContainer">
      <div className="LeftBox">
        <h1>Market Watch</h1>
        <input
          type="text"
          placeholder="Search for Stocks here"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <div className="Dropdown">
            {searchResults.map((result, index) => (
              <div key={index} className="DropdownItem">
                {result}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="RightBox">
        <h1>Welcome to Zerodha!</h1>
        <div className="cards-container">
          <div className="cards">
            <div className="topic">Equity</div>
            <div className="money"></div>
          </div>
          <div className="cards">
            <div className="topic">Profits</div>
            <div className="money"></div>
          </div>
          <div className="cards">
            <div className="topic">Portfolio</div>
            <div className="money"></div>
          </div>
        </div>
        {/* Add additional content here */}
      </div>
    </div>
  );
};

export default Dashboard;
