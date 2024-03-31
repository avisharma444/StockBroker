// BuyStocks.jsx
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from 'react';
import './BuyStocks.scss'; // Import SCSS file for styling

const BuyStocks = () => {
//   const [symbol, setSymbol] = useState('');
//   const [quantity, setQuantity] = useState(0);
  const [err,setErr] = useState(false);
  const navigate  = useNavigate()
  const [inputs,setInputs] = useState({
    stock_id:"",
    quantity:"",
  })
  
  const handleChange = e=>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    // console.log(inputs)
  }
  const handleBuy = async (e) => {
    e.preventDefault()
      try{
        console.log(inputs)
        const res = await axios.post("http://localhost:8080/server/order/buy",inputs, {
                    withCredentials: true,
        });
        setErr("Transaction Successful")
        // setErr(res.data)
        // navigate("/")
      }catch(err){
        setErr(err.response.data)
      }
  };
//   const handleBuy = () => {
//     // Handle buy logic here, e.g., send a request to the backend
//   };

return (
  <div className="buy-stocks-container">
    <h2>Buy Stocks</h2>
    <input 
      type="stock_id" 
      name="stock_id" 
      onChange={handleChange} 
      placeholder="Stock ID" 
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
    <button onClick={handleBuy} style={{ marginBottom: '10px' }}>Buy</button>
  </div>
);

};

export default BuyStocks;