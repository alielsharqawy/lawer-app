import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { login } from "../api/auth";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // استخدام setUser من UserContext
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData); // استدعاء API تسجيل الدخول
      const userName = response.data?.name || response.data?.user?.name; // قراءة الاسم من الاستجابة
      if (!userName) throw new Error("اسم المستخدم غير موجود في الاستجابة");
      console.log(response.data.token);
      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setUser({ name: userName }); // تحديث UserContext
      localStorage.setItem("userName", userName); // تخزين الاسم في localStorage

      Swal.fire({
        icon: "success",
        title: "تم تسجيل الدخول بنجاح",
        text: `مرحبًا بك يا ${userName}`,
      });

      navigate("/dashboard");
    } catch (error) {
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
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="أدخل بريدك الإلكتروني"
            required
          />
          <InputField
            label="كلمة المرور"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="أدخل كلمة المرور"
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
          <p>
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              هل نسيت كلمة المرور؟
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
