import React from 'react'

const UserInfo = () => {
  return (
    <div>
      <h1>Hi, [User]</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2>Equity</h2>
          <p>0</p>
          <p>Margin available</p>
          <p>0</p>
          <p>Margin used</p>
          <p>0</p>
          <p>Account value</p>
        </div>
        <div>
          <h2>Commodity</h2>
          <p>0</p>
          <p>Segment is not enabled</p>
          <p>0</p>
          <p>Margin used</p>
          <p>0</p>
          <p>Account value</p>
        </div>
        <div>
          <h2>Portfolio</h2>
          <p>0</p>
          <p>Holdings</p>
          <p>0</p>
          <p>Positions</p>
          <p>0</p>
          <p>Pending orders</p>
        </div>
      </div>
      <div>
        <h2>Holdings</h2>
        <p>Nothing here.</p>
      </div>
      <div>
        <h2>Positions</h2>
        <p>Nothing here.</p>
      </div>
    </div>
  );
};

export default UserInfo;
