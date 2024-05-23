import React, { useEffect, useRef } from 'react';
import './Container.css';

const Container = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          containerRef.current.classList.add('in-view');
        } else {
          containerRef.current.classList.remove('in-view');
        }
      },
      { threshold: 0.1 } // Adjust this threshold as needed
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <div className="left-side">
        <div className="photo"></div>
      </div>
      <div className="right-side">
        <h1>Largest stock broker in India</h1>
        <p>1.3+ Crore Zerodha clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:</p>
        <ul>
          <li>Futures and Options</li>
          <li>Commodity derivatives</li>
          <li>Currency derivatives</li>
          <li>Stocks & IPOs</li>
          <li>Direct mutual funds</li>
          <li>Bonds and Govt. Securities</li>
        </ul>
      </div>
    </div>
  );
};

export default Container;
