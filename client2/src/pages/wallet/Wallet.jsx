// Wallet.jsx
import React from "react";
import "./Wallet.scss";

const Wallet = () => {
  // Dummy data for money and account information
  const money = 1000; // Example amount, you can replace it with actual data from the backend
  const accountNumber = "1234567890"; // Example account number or UPI ID

  return (
    <div className="wallet-container">
      <h2>Wallet</h2>
      <div className="wallet-info">
        <p>
          <strong>Money:</strong> ${money}
        </p>
        <p>
          <strong>Account Number:</strong> {accountNumber}
        </p>
      </div>
    </div>
  );
};

export default Wallet;