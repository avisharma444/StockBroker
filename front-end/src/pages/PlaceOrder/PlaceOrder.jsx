import React, { useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './PlaceOrder.css';  // Import the CSS file

const stripePromise = loadStripe('pk_test_51PT5yj07MobmpSNsexeF8EVPVXpY0LmbEhd71qbJOmEQ95ynBrzG6VCs1JHksXAyCU3vXODchSs3gwoqy81KmMha003zLS5PWF');

const stockNameToId = {
  GOOG: 1,
  APPL: 2,
  INFY: 3,
  MSFT: 4,
  GS: 5
};

const PlaceOrder = () => {
  const { user } = useContext(StoreContext);
  const [inputs, setInputs] = useState({ stock_id: '', quantity: '' });
  const [err, setErr] = useState(false);
  const [quote, setQuote] = useState(null); // Changed to null initially
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [showBuyButton, setShowBuyButton] = useState(false); // State to toggle buy button visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetQuote = async (e) => {
    e.preventDefault();
    try {
      const stockId = inputs.stock_id; // Map the stock name to its corresponding ID

      const res = await axios.post(`http://localhost:8080/server/order/quote?stock_id=${stockId}&quantity=${inputs.quantity}`);
      setQuote({
        companyName: res.data.company_name,
        price: res.data.price,
        quantity: inputs.quantity,
      });
      setErr(false);
      setShowBuyButton(true); // Show the buy button after getting the quote
    } catch (err) {
      setErr('Failed to get quote');
    }
  };

  const handleBuy = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const res = await axios.post('http://localhost:8080/create-payment-intent', {
      amount: inputs.quantity * 100,
    }, { headers });

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.name || 'User Name',
        },
      },
    });

    if (result.error) {
      setErr(result.error.message);
      window.alert(result.error.message);
      return; // Exit early if there's an error
    }

    if (result.paymentIntent.status === 'succeeded') {
      const user_id = user.user_id;

      // Check if quote is available
      if (!quote) {
        setErr('Quote not fetched.');
        return;
      }

      // Proceed with the buy order
      try {
        const buyRes = await axios.post('http://localhost:8080/server/order/buy', {
          side: "bid",
          stock_symbol: inputs.stock_id,
          stock_id: stockNameToId[inputs.stock_id],
          price: quote.price,
          quantity: inputs.quantity,
          user_id: user_id
        });

        setErr('Transaction Successful');
      } catch (buyErr) {
        if (buyErr.response && buyErr.response.status === 403) {
          setErr(buyErr.response.data.error);
        } else {
          setErr('An error occurred while placing the order.');
        }
      }
    }
  } catch (err) {
    setErr('Payment failed or other error');
  }
};

  return (
    <div className="buy-stocks-container">
      <h2 className="header">Buy Stocks</h2>
      <select
        name="stock_id"
        onChange={handleChange}
        value={inputs.stock_id}
        className="dropdown"
      >
        <option value="" disabled>Select Stock</option>
        <option value="GOOG">GOOG</option>
        <option value="APPL">APPL</option>
        <option value="INFY">INFY</option>
        <option value="MSFT">MSFT</option>
        <option value="GS">GS</option>
      </select>
      <input
        type="number"
        name="quantity"
        onChange={handleChange}
        placeholder="Quantity"
        className="input"
      />
      {err && <p className="error">{err}</p>}
      <button onClick={handleGetQuote} className="quote-button">
        Get Quote
      </button>
      {quote && (
        <div className="quote-container">
          <h3 className="quote-header">Quote Details</h3>
          <p><strong>Company Name:</strong> {quote.companyName}</p>
          <p><strong>Quote Price:</strong> {quote.price}</p>
          <p><strong>Quantity:</strong> {quote.quantity}</p>
        </div>
      )}
      {showBuyButton && (
        <form onSubmit={handleBuy} className="form">
          <CardElement className="card-element" />
          <button type="submit" className="buy-button">
            Buy
          </button>
        </form>
      )}
    </div>
  );
};

const App = () => (
  <Elements stripe={stripePromise}>
    <PlaceOrder />
  </Elements>
);

export default App;
