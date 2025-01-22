import React, { useState } from "react";
import Swal from "sweetalert2";
import { resetPassword } from "../api/auth";
import InputField from "../components/InputField";
import Button from "../components/Button";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    code: "", // Token received in the email
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, code, new_password, confirm_password } = formData;

    // Check if passwords match
    if (new_password !== confirm_password) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "كلمات المرور غير متطابقة.",
      });
      return;
    }

    try {
      // Send the reset password request
      await resetPassword({
        email,
        code, // Ensure the code/token field is sent correctly
        new_password,
      });

      // Success message
      Swal.fire({
        icon: "success",
        title: "تم بنجاح",
        text: "تم إعادة تعيين كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول.",
      });

      // Optionally redirect the user to the login page
    } catch (error) {
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
            name="new_password"
            value={formData.new_password}
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
