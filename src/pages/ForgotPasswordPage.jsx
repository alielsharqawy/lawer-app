import React, { useState } from "react";
import Swal from "sweetalert2";
import { forgotPassword } from "../api/auth";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email });
      Swal.fire({
        icon: "success",
        title: "تم الإرسال",
        text: "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.",
      });
      navigate("/reset-password");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text:
          error.response?.data?.message ||
          "فشل في إرسال الرابط. حاول مرة أخرى.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          نسيان كلمة المرور
        </h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="البريد الإلكتروني"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="أدخل بريدك الإلكتروني"
            type="email"
            required
          />
          <Button type="submit" className="w-full">
            إرسال رابط إعادة تعيين كلمة السر
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
