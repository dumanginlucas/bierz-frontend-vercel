import React from 'react';
import './Marquee.css';

const Marquee = ({ children, speed = 28 }) => {
  return (
    <div className="ab-marquee-wrap">
      <div className="ab-marquee" style={{ animationDuration: `${speed}s` }}>
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  );
};

export default Marquee;
