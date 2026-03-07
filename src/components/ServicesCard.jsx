
import React from "react";

export default function ServicesCard({ children, className="" }){

  const handleMove = (e)=>{
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    e.currentTarget.style.setProperty("--x", x + "%");
    e.currentTarget.style.setProperty("--y", y + "%");
  };

  return (
    <div
      className={`equip-card ${className}`}
      onMouseMove={handleMove}
    >
      {children}
    </div>
  );
}
