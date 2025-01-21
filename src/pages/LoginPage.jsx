import React, { useState } from "react";
import Swal from "sweetalert2";
import { login } from "../api/auth";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      const token = response.data.token; // Adjust based on actual server response
      localStorage.setItem("authToken", token); // Save token for future requests
      Swal.fire({
        icon: "success",
        title: "تم تسجيل الدخول بنجاح",
        text: "مرحبًا بك في التطبيق.",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error.response?.data);
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text:
          error.response?.data?.message || "فشل تسجيل الدخول. حاول مرة أخرى.",
      });
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          تسجيل الدخول
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
            label="كلمة المرور"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="أدخل كلمة المرور"
            type="password"
            required
          />
          <Button type="submit" className="w-full">
            تسجيل الدخول
          </Button>
        </form>
        <div className="text-center mt-4">
          <p>
            ليس لديك حساب؟{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              أنشئ حسابًا الآن
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
