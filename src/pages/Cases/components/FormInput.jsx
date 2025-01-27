import React from "react";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="block w-full px-4 py-2 text-sm border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
    />
  </div>
);

export default FormInput;
