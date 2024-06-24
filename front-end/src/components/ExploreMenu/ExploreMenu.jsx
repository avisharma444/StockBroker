import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './ExploreMenu.css';

const stockSymbols = ['AAPL', 'GOOGL', 'AMZN', 'MSFT'];
const API_KEY = 'ZQRPDFUQFNKBVJN5';

const stockNames = {
  AAPL: 'Apple Inc.',
  GOOGL: 'Alphabet Inc.',
  AMZN: 'Amazon.com Inc.',
  MSFT: 'Microsoft Corporation'
  
};

const ExploreMenu = () => {
  const [stocks, setStocks] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const stockDataPromises = stockSymbols.map(symbol =>
          axios.get(`https://www.alphavantage.co/query`, {
            params: {
              function: 'GLOBAL_QUOTE',
              symbol,
              apikey: API_KEY
            }
          })
        );

        const responses = await Promise.all(stockDataPromises);
        const fetchedStocks = responses.map(response => {
          const data = response.data['Global Quote'];
          if (data) {
            return {
              symbol: data['01. symbol'],
              name: stockNames[data['01. symbol']] || 'Unknown',
              price: parseFloat(data['05. price']),
              time: data['07. latest trading day']
            };
          }
          throw new Error('Invalid response from API');
        });

        setStocks(fetchedStocks);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const symbol = stockSymbols[0]; // Fetch chart data for the first symbol
        const response = await axios.get(`https://www.alphavantage.co/query`, {
          params: {
            function: 'TIME_SERIES_INTRADAY',
            symbol: symbol,
            interval: '5min',
            apikey: API_KEY
          }
        });

        const data = response.data['Time Series (5min)'];
        if (!data) {
          throw new Error('Invalid response from API');
        }

        const chartLabels = Object.keys(data).reverse();
        const chartPrices = chartLabels.map(label => parseFloat(data[label]['4. close']));

        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: `${symbol} Price`,
              data: chartPrices,
              borderColor: '#3e95cd',
              fill: false
            }
          ]
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchChartData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="explore-menu">
      <h1>Explore Stocks</h1>
      <div className="stock-list">
        {stocks.map((stock, index) => (
          <div key={index} className="stock-item">
            <div className="stock-details">
              <div className="stock-symbol">{stock.symbol}</div>
              <div className="stock-name">{stock.name}</div>
              <div className="stock-price">${stock.price.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="chart-container">
        <h2>Stock Price Chart</h2>
        <div className="chart">
          {chartData.labels.length > 0 && chartData.datasets.length > 0 ? (
            <Line data={chartData} />
          ) : (
            <div>No chart data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreMenu;