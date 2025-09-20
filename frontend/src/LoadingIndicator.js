import React from 'react';

const LoadingIndicator = ({ type = 'spinner' }) => {
  if (type === 'dots') {
    return (
      <div className="loading-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    );
  }
  
  return (
    <div className="loading-spinner">
      <svg viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4"></circle>
      </svg>
    </div>
  );
};

export default LoadingIndicator;
