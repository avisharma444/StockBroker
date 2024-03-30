import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [backendData, setBackendData] = useState([]);
  const [lossgaindata , setLossGain] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/admin")
      .then(response =>  {
        setBackendData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:8080/getlossgain/50")
      .then(response =>  {
        setLossGain(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const arrayDataItems = backendData.map((idpass, index) => (
    <li key={index}>
      <p>{idpass.username}</p>
      <span>{idpass.password}</span>
    </li>
  ));
  const lossgains = lossgaindata.map((lg, i) => (
    <li key={i}>
      <p>{lg.user_id}</p>
      <span>{lg.email}</span>
    </li>
  ));

  return (
    <div>
      <ul>{arrayDataItems}</ul>
      <ul>{lossgains}</ul>
    </div>
  );
}

export default App;
