import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  getAllCategories,
  addCategory,
  deleteCategory,
} from "../../api/customers";

const CustomerCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

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

  const handleAddCategory = async () => {
    try {
      await addCategory({ name: newCategory });
      Swal.fire("Success", "Category added successfully", "success");
      setNewCategory("");
      fetchCategories();
    } catch (error) {
      Swal.fire("Error", "Failed to add category", "error");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      Swal.fire("Deleted", "Category deleted successfully", "success");
      fetchCategories();
    } catch (error) {
      Swal.fire("Error", "Failed to delete category", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Customer Categories</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <button
          onClick={handleAddCategory}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Category
        </button>
      </div>
      <div>
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex justify-between items-center border p-2 rounded mb-2"
          >
            <span>{category.name}</span>
            <button
              onClick={() => handleDeleteCategory(category.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerCategories;
