import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const AddExpense = () => {
  const [formData, setFormData] = useState({
    expenseName: "",
    expenseAmount: "",
    expenseMethod: "",
    expenseCategoryId: "",
    expenseNotes: "",
    expenseDate: "",
    expenseDescription: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("تحذير", "يرجى تسجيل الدخول أولاً.", "warning", { rtl: true });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        "https://law-office.al-mosa.com/api/expense-categories",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      Swal.fire("خطأ", "فشلت جلب أنواع المصروفات.", "error", { rtl: true });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire("تحذير", "يرجى تسجيل الدخول أولاً.", "warning", { rtl: true });
      return;
    }

    if (Object.values(formData).some((value) => !value)) {
      Swal.fire("تحذير", "يرجى تعبئة جميع الحقول.", "warning", { rtl: true });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://law-office.al-mosa.com/api/store-expense",
        {
          name: formData.expenseName,
          amount: formData.expenseAmount,
          method: formData.expenseMethod,
          category_id: formData.expenseCategoryId,
          notes: formData.expenseNotes,
          date: formData.expenseDate,
          description: formData.expenseDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        Swal.fire("تم الإضافة بنجاح!", "تمت إضافة المصروف.", "success", {
          rtl: true,
        });
        resetForm();
      } else {
        Swal.fire("خطأ", "فشلت إضافة المصروف.", "error", { rtl: true });
      }
    } catch (error) {
      console.error("خطأ أثناء إضافة المصروف:", error);
      Swal.fire("خطأ", "حدث خطأ أثناء إضافة المصروف.", "error", { rtl: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      expenseName: "",
      expenseAmount: "",
      expenseMethod: "",
      expenseCategoryId: "",
      expenseNotes: "",
      expenseDate: "",
      expenseDescription: "",
    });
  };

  return (
    <div
      className="container mx-auto mt-6 bg-gray-100 p-6 rounded-lg shadow-md"
      dir="rtl"
    >
      <h1 className="text-center text-2xl font-bold mb-4 text-blue-800">
        إضافة مصروف
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="expenseName"
              className="block text-gray-700 font-bold"
            >
              اسم المصروف
            </label>
            <input
              type="text"
              id="expenseName"
              value={formData.expenseName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded shadow-sm focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="expenseAmount"
              className="block text-gray-700 font-bold"
            >
              المبلغ
            </label>
            <input
              type="number"
              id="expenseAmount"
              value={formData.expenseAmount}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded shadow-sm focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="expenseMethod"
              className="block text-gray-700 font-bold"
            >
              طريقة الدفع
            </label>
            <input
              type="text"
              id="expenseMethod"
              value={formData.expenseMethod}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded shadow-sm focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="expenseCategoryId"
              className="block text-gray-700 font-bold"
            >
              نوع المصروف
            </label>
            <select
              id="expenseCategoryId"
              value={formData.expenseCategoryId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded shadow-sm focus:border-blue-500"
            >
              <option value="">-- اختر نوع المصروف --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label
            htmlFor="expenseNotes"
            className="block text-gray-700 font-bold"
          >
            ملاحظات
          </label>
          <textarea
            id="expenseNotes"
            value={formData.expenseNotes}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded shadow-sm focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="expenseDate"
              className="block text-gray-700 font-bold"
            >
              تاريخ المصروف
            </label>
            <input
              type="date"
              id="expenseDate"
              value={formData.expenseDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded shadow-sm focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="expenseDescription"
              className="block text-gray-700 font-bold"
            >
              الوصف
            </label>
            <textarea
              id="expenseDescription"
              value={formData.expenseDescription}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded shadow-sm focus:border-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 bg-blue-600 text-white font-bold rounded shadow-md ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "جاري الإضافة..." : "إضافة مصروف"}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
