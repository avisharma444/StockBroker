import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { StoreContext } from '../../context/StoreContext';

const Dashboard = () => {
  const { user } = useContext(StoreContext); // Get user info from context
  const userId = user?.user_id; // Access user_id from user context
  const [companies, setCompanies] = useState([]);
  const [investment, setInvestment] = useState(0);
  const [lossGain, setLossGain] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
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
      } catch (error) {
        setError('Error fetching companies');
      } finally {
        setLoading(false);
      }
    };

    const fetchUserData = async () => {
      try {
        const [investmentResponse, lossGainResponse, currentValueResponse] = await Promise.all([
          axios.get(`http://localhost:8080/api/getInvestment?userId=${userId}`),
          axios.get(`http://localhost:8080/api/getLossGain?userId=${userId}`),
          axios.get(`http://localhost:8080/api/getCurrentValue?userId=${userId}`)
        ]);
        setInvestment(investmentResponse.data);
        setLossGain(lossGainResponse.data);
        setCurrentValue(currentValueResponse.data);
        console.log(userId)
      } catch (error) {
        setError('Error fetching user data');
      }
    };

    if (userId) {
      fetchCompanies();
      fetchUserData();
    }
  }, [userId]);

  return (
    <div className="DashboardContainer">
      <div className="LeftBox">
        <h1>Market Watch</h1>
        <div className="CompanyList">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div className="cards-container">
              {companies.map((company, index) => (
                <div key={index} className="cards">
                  <div className="topic">{company.company_name}</div>
                  <div className="money">${company.current_price}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="RightBox">
        <h1>Welcome to Zerodha!</h1>
        <div className="cards-container">
          <div className="cards">
            <div className="topic">Current Value</div>
            <div className="money">${currentValue}</div>
          </div>
          <div className="cards">
            <div className="topic">Profits</div>
            <div className="money">${lossGain}</div>
          </div>
          <div className="cards">
            <div className="topic">Invested</div>
            <div className="money">${investment}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;