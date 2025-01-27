import React from "react";

const FormSelect = ({ label, name, value, onChange, options, disabled }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="block w-full px-4 py-2 text-sm border rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
    >
      <option value="">اختر...</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default FormSelect;
