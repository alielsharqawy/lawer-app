import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getCustomerCategories, addCustomer } from "../../api/customers";

const AddCustomer = () => {
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    customer_category_id: "",
    ID_number: "",
    nationality: "",
    company_name: "",
    notes: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch customer categories
  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "غير مصرح",
        text: "يرجى تسجيل الدخول أولاً.",
        icon: "warning",
        confirmButtonText: "حسنًا",
        rtl: true,
      });
      return;
    }

    try {
      const response = await getCustomerCategories(token);
      setCategories(response.data);
    } catch (error) {
      Swal.fire({
        title: "فشل في تحميل فئات العملاء",
        text: "حدث خطأ أثناء تحميل فئات العملاء، يرجى المحاولة مرة أخرى.",
        icon: "error",
        confirmButtonText: "حسنًا",
        rtl: true,
      });
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        title: "غير مصرح",
        text: "يرجى تسجيل الدخول أولاً للوصول إلى هذه الصفحة.",
        icon: "warning",
        confirmButtonText: "حسنًا",
        rtl: true,
      });
      return;
    }

    if (
      clientData.name &&
      clientData.email &&
      clientData.phone &&
      clientData.customer_category_id &&
      clientData.ID_number
    ) {
      try {
        setLoading(true);
        await addCustomer(clientData, token);

        Swal.fire({
          title: "تم إضافة العميل بنجاح",
          text: `تم إضافة العميل ${clientData.name} بنجاح.`,
          icon: "success",
          confirmButtonText: "موافق",
          rtl: true,
        });

        setClientData({
          name: "",
          email: "",
          phone: "",
          address: "",
          customer_category_id: "",
          ID_number: "",
          nationality: "",
          company_name: "",
          notes: "",
        });
      } catch (error) {
        Swal.fire({
          title: "فشل في إضافة العميل",
          text:
            error.response?.data?.message ||
            "حدث خطأ أثناء إضافة العميل، يرجى المحاولة مرة أخرى.",
          icon: "error",
          confirmButtonText: "موافق",
          rtl: true,
        });
      } finally {
        setLoading(false);
      }
    } else {
      Swal.fire({
        title: "خطأ في البيانات",
        text: "يرجى التأكد من ملء جميع الحقول الأساسية.",
        icon: "error",
        confirmButtonText: "موافق",
        rtl: true,
      });
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          إضافة عميل جديد
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                الاسم الكامل
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                name="name"
                value={clientData.name}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                className="w-full border rounded-lg p-2"
                name="email"
                value={clientData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                رقم الهاتف
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                name="phone"
                value={clientData.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                العنوان
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                name="address"
                value={clientData.address}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                فئة العميل
              </label>
              <select
                className="w-full border rounded-lg p-2"
                name="customer_category_id"
                value={clientData.customer_category_id}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">اختر فئة العميل</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                رقم الهوية
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                name="ID_number"
                value={clientData.ID_number}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                الجنسية
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                name="nationality"
                value={clientData.nationality}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                اسم الشركة
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                name="company_name"
                value={clientData.company_name}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">
              الملاحظات
            </label>
            <textarea
              className="w-full border rounded-lg p-2"
              name="notes"
              value={clientData.notes}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "جاري الإضافة..." : "إضافة العميل"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
