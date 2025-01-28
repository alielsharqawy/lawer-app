import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

const AddExpenseCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("تحذير", "يرجى تسجيل الدخول أولاً.", "warning", { rtl: true });
      return null;
    }
    return token;
  };

  const fetchCategories = async () => {
    setLoading(true);
    const token = checkToken();
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(
        "https://law-office.al-mosa.com/api/expense-categories",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(response.data || []);
    } catch (error) {
      Swal.fire("خطأ", "فشل في جلب أنواع المصروفات.", "error", { rtl: true });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim()) {
      Swal.fire("تحذير", "يرجى تعبئة الحقل أولاً.", "warning", { rtl: true });
      return;
    }
    setIsSubmitting(true);
    const token = checkToken();
    if (!token) {
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await axios.post(
        "https://law-office.al-mosa.com/api/expense-category",
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        Swal.fire("تم", "تمت إضافة نوع المصروف بنجاح.", "success", {
          rtl: true,
        }).then(() => {
          setName("");
          fetchCategories();
        });
      }
    } catch (error) {
      Swal.fire("خطأ", "فشل في إضافة نوع المصروف.", "error", { rtl: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (categoryId) => {
    const token = checkToken();
    if (!token) {
      return;
    }
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "سيتم حذف نوع المصروف نهائياً.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذف!",
      cancelButtonText: "إلغاء",
      rtl: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://law-office.al-mosa.com/api/expense-category/${categoryId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          Swal.fire("تم", "تم حذف نوع المصروف بنجاح.", "success", {
            rtl: true,
          });
          setCategories(categories.filter((cat) => cat.id !== categoryId));
        } catch (error) {
          Swal.fire(
            "خطأ",
            "فشل في حذف نوع المصروف. قد يكون مرتبطاً بمصروفات أخرى.",
            "error",
            { rtl: true }
          );
        }
      }
    });
  };

  return (
    <div
      className="container mx-auto my-6 p-6 bg-gray-100 rounded-lg shadow-md"
      dir="rtl"
    >
      <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">
        إدارة أنواع المصروفات
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 items-center"
      >
        <input
          type="text"
          placeholder="أدخل اسم نوع المصروف الجديد"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full md:w-2/3 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-blue-600 text-white rounded shadow-md ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "جاري الإضافة..." : "إضافة نوع جديد"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">
        قائمة أنواع المصروفات:
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">جاري التحميل...</p>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-4 rounded shadow-md flex justify-between items-center"
            >
              <span className="text-gray-700 font-medium">{category.name}</span>
              <button
                onClick={() => handleDelete(category.id)}
                className="text-red-600 hover:text-red-800"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          لا توجد أنواع مصروفات حالياً.
        </p>
      )}

      <div className="mt-6 text-center">
        <Link
          to="/dashboard/expenses"
          className="text-blue-600 hover:underline"
        >
          العودة إلى قائمة المصروفات
        </Link>
      </div>
    </div>
  );
};

export default AddExpenseCategory;
