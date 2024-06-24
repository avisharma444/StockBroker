import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51PT5yj07MobmpSNsexeF8EVPVXpY0LmbEhd71qbJOmEQ95ynBrzG6VCs1JHksXAyCU3vXODchSs3gwoqy81KmMha003zLS5PWF');

const PlaceOrder = () => {
  const [inputs, setInputs] = useState({ stock_id: '', quantity: '' });
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBuy = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve token from storage
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
            name: 'User Name',
          },
        },
      });

      if (result.error) {
        setErr(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        console.log("GOOD");
        // check the current cookies 
        console.log("TOKEN IS", token);
      //  await Cookies.set('accesstoken', token, { expires: 700000, sameSite: 'None', secure: true });
        await axios.post('http://localhost:8080/server/order/buy', inputs,{
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        }
        );
        setErr('Transaction Successful');
      }
    } catch (err) {
      setErr('Payment failed or other error');
    }
  };

  return (
    <div className="buy-stocks-container" style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.5rem' }}>Buy Stocks</h2>
      <input
        type="text"
        name="stock_id"
        onChange={handleChange}
        placeholder="Stock ID"
        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <input
        type="number"
        name="quantity"
        onChange={handleChange}
        placeholder="Quantity"
        style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      {err && <p style={{ color: 'red', marginTop: '10px' }}>{err}</p>}
      <form onSubmit={handleBuy} style={{ textAlign: 'center' }}>
        <CardElement style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
        <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Buy
        </button>
      </form>
    </div>
  );
};

const App = () => (
  <Elements stripe={stripePromise}>
    <PlaceOrder />
  </Elements>
);

export default App;

