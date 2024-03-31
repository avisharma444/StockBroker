import React from 'react';
import './Help.scss';

const Help = () => {
  const handleContactSupport = () => {
    // Logic to handle contacting customer support
    console.log('Contacting customer support...');
  };

  return (
    <div className="help-container">
      <h1>Help Page</h1>
      <p>This is the help page content.</p>
      {/* Button to contact customer support */}
      <button className="contact-button" onClick={handleContactSupport}>
        Contact Customer Support
      </button>
    </div>
  );
};

export default Help;