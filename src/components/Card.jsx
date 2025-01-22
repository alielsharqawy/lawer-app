// src/components/Card.jsx
import React from "react";

const Card = ({ title, value }) => {
  return (
    <div className="bg-blue-900 text-white p-4 rounded-lg shadow-md text-center flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default Card;
