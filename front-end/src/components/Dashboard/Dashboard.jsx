import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/companies');
        if (response.data.length === 0) {
          console.log("No companies found");
        }
        setCompanies(response.data);
        setSearchResults(response.data);
      } catch (error) {
        setError('Error fetching companies');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setSearchResults(
      companies.filter(company =>
        company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
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
                {result.name}
              </div>
            ))}
          </div>
        )}
        <div className="CompanyList">
          <h2>All Companies</h2>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            companies.map((company, index) => (
              <div key={index} className="CompanyItem">
                {company.name}
              </div>
            ))
          )}
        </div>
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
``
