// SellStocks.jsx
import React, { useState } from 'react';
import axios from "axios";
import './SellStocks.scss'; // Import SCSS file for styling

const SellStocks = () => {
  const [inputs, setInputs] = useState({
    stock_id: "",
    quantity: "",
  });
  const [err, setErr] = useState(false);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSell = async () => {
    try {
      const res = await axios.post("http://localhost:8080/server/order/sell", inputs, {
        withCredentials: true,
      });
      setErr("Transaction Successful");
      // setErr(res.data);
    } catch(err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="sell-stocks-container">
      <h2>Sell Stocks</h2>
      <input 
        type="stock_id" 
        name="stock_id"

        onChange={handleChange} 
        placeholder="stock_id" 
        style={{ marginBottom: '10px' }} 
      />
      <br />
      <input 
        type="quantity" 
        name="quantity"

        onChange={handleChange} 
        placeholder="Quantity" 
        style={{ marginBottom: '10px' }} 
      />
      <br />
      {err && <p>{err}</p>}
      <button onClick={handleSell} style={{ marginBottom: '10px' }}>Sell</button>
    </div>
  );
};

export default SellStocks;
