import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import Swal from "sweetalert2";
import { FiEdit, FiTrash, FiSave, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const API_URL = "https://law-office.al-mosa.com/api";

const ExpensesPage = () => {
  const [chartData, setChartData] = useState(null);
  const [expensesList, setExpensesList] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", amount: "" });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    fetchExpensesData();
  }, []);

  useEffect(() => {
    filterExpenses();
  }, [searchKeyword, expensesList]);

  const fetchExpensesData = async () => {
    Swal.fire({
      title: "جاري التحميل...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const token = localStorage.getItem("token");
      if (!token)
        throw new Error("لم يتم العثور على التوكن. يرجى تسجيل الدخول.");

      const response = await axios.get(`${API_URL}/expenses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const expensesData = response.data;
      setExpensesList(expensesData);
      setFilteredExpenses(expensesData);
      setChartData(prepareChartData(expensesData));
      setTotalExpenses(
        expensesData.reduce(
          (total, expense) => total + parseFloat(expense.amount),
          0
        )
      );
    } catch (error) {
      Swal.fire("خطأ", "فشل في جلب المصروفات.", "error");
    } finally {
      Swal.close();
    }
  };

  const prepareChartData = (expenses) => {
    const dataMap = expenses.reduce((acc, expense) => {
      acc[expense.name] = (acc[expense.name] || 0) + parseFloat(expense.amount);
      return acc;
    }, {});

    const labels = Object.keys(dataMap);
    const data = Object.values(dataMap);
    const backgroundColors = labels.map(
      () =>
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.7)`
    );

    return {
      labels,
      datasets: [
        {
          label: "توزيع المصروفات",
          data,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map((color) =>
            color.replace("0.7", "1")
          ),
          borderWidth: 1,
        },
      ],
    };
  };

  const filterExpenses = () => {
    if (!searchKeyword) {
      setFilteredExpenses(expensesList);
      return;
    }

    setFilteredExpenses(
      expensesList.filter((expense) =>
        expense.name.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );
  };

  const handleDeleteExpense = async (expenseId) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا الإجراء!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذف!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`${API_URL}/expense/${expenseId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Swal.fire("تم الحذف!", "تم حذف المصروف بنجاح.", "success");
          fetchExpensesData();
        } catch (error) {
          Swal.fire("خطأ", "فشل في حذف المصروف.", "error");
        }
      }
    });
  };

  const handleEditExpense = (expense) => {
    setEditingExpenseId(expense.id);
    setEditFormData({ name: expense.name, amount: expense.amount });
  };

  const handleCancelEdit = () => setEditingExpenseId(null);

  const handleEditFormChange = (e) =>
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "جاري التحديث...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/update-expense/${editingExpenseId}`,
        editFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire("تم التعديل!", "تم تعديل المصروف بنجاح.", "success");
      setEditingExpenseId(null);
      fetchExpensesData();
    } catch (error) {
      Swal.fire("خطأ", "فشل في تعديل المصروف.", "error");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
        تقارير المصروفات
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          {chartData && (
            <div className="relative h-96">
              <Pie data={chartData} options={{ responsive: true }} />
            </div>
          )}
          <p className="text-center mt-4 text-lg font-semibold text-gray-700">
            {`إجمالي المصروفات: ${totalExpenses.toFixed(2)} ج.م`}
          </p>
        </div>
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="ابحث عن المصروفات..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded shadow focus:outline-none focus:ring focus:ring-blue-200"
          />
          <div className="space-y-4 overflow-y-auto max-h-96">
            {filteredExpenses.length ? (
              filteredExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="p-4 bg-white rounded shadow flex justify-between items-center"
                >
                  {editingExpenseId === expense.id ? (
                    <form className="w-full" onSubmit={handleUpdateExpense}>
                      <input
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditFormChange}
                        className="w-full mb-2 px-3 py-2 border rounded"
                        placeholder="اسم المصروف"
                      />
                      <input
                        name="amount"
                        value={editFormData.amount}
                        onChange={handleEditFormChange}
                        className="w-full mb-2 px-3 py-2 border rounded"
                        placeholder="المبلغ"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          <FiSave />
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          <FiX />
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <span className="font-medium">{expense.name}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditExpense(expense)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <FiTrash />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">لا توجد مصروفات.</p>
            )}
          </div>
        </div>
      </div>
      {/* Buttons for navigation */}
      <div className="flex justify-center mt-6 gap-4">
        <Link
          to="/dashboard/add-expense-category"
          className="px-4 py-2 bg-green-500 text-white font-bold rounded shadow hover:bg-green-600"
        >
          إضافة تصنيف مصروف
        </Link>
        <Link
          to="/dashboard/add-expense"
          className="px-4 py-2 bg-yellow-500 text-white font-bold rounded shadow hover:bg-yellow-600"
        >
          إضافة مصروف
        </Link>
      </div>
    </div>
  );
};

export default ExpensesPage;
