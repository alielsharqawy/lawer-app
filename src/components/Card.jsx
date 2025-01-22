import React from "react";

const Card = ({ title, value, icon }) => (
  <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold text-blue-800">{title}</h3>
      {value && <p className="text-2xl font-bold text-blue-600">{value}</p>}
    </div>
    {icon && <div className="text-3xl text-blue-800">{icon}</div>}
  </div>
);

export default Card;
