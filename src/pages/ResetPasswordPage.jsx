import React, { useState } from "react";
import Swal from "sweetalert2";
import { resetPassword } from "../api/auth";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    code: "", // Token received in the email
    password: "", // Adjusted the field name to match backend expectations
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, code, password, confirm_password } = formData;

    if (password !== confirm_password) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "كلمات المرور غير متطابقة.",
      });
      return;
    }

    try {
      await resetPassword({ email, code, password });

      Swal.fire({
        icon: "success",
        title: "تم بنجاح",
        text: "تم إعادة تعيين كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول.",
      });

      navigate("/"); // Redirect to login
    } catch (error) {
      console.error("Reset Password Error:", error.response?.data);
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: error.response?.data?.message || "حدث خطأ أثناء إعادة التعيين.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          إعادة تعيين كلمة السر
        </h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="البريد الإلكتروني"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="أدخل بريدك الإلكتروني"
            type="email"
            required
          />
          <InputField
            label="كود التأكيد"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="أدخل كود التأكيد"
            required
          />
          <InputField
            label="كلمة المرور الجديدة"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="أدخل كلمة المرور الجديدة"
            type="password"
            required
          />
          <InputField
            label="تأكيد كلمة المرور الجديدة"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="أعد إدخال كلمة المرور الجديدة"
            type="password"
            required
          />
          <Button type="submit" className="w-full">
            إعادة تعيين كلمة المرور
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
