import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getAllCategories, addCustomer } from "../../api/customers";

const AddCustomer = () => {
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    customer_category_id: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch categories", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCustomer(customerData);
      Swal.fire("Success", "Customer added successfully", "success");
      setCustomerData({
        name: "",
        email: "",
        phone: "",
        address: "",
        customer_category_id: "",
      });
    } catch (error) {
      Swal.fire("Error", "Failed to add customer", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Add New Customer</h2>
      <div className="mb-4">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={customerData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={customerData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={customerData.phone}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label>Category</label>
        <select
          name="customer_category_id"
          value={customerData.customer_category_id}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Customer
      </button>
    </form>
  );
};

export default AddCustomer;


// import React from 'react'

// const AddClientPage = () => {
//   return (
//     <div>
//       hello
//     </div>
//   )
// }

// export default AddClientPage
