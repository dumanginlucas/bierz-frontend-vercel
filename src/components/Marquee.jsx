import React from "react";
import "./Marquee.css";

const Marquee = ({ children, speed = 28 }) => {
  return (
    <div className="ab-marquee-wrap" aria-hidden="true">
      <div
        className="ab-marquee"
        style={{ "--marquee-duration": `${speed}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
};

export default Marquee;
