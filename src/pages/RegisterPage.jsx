import React, { useState } from "react";
import Swal from "sweetalert2";
import { register } from "../api/auth";
import InputField from "../components/InputField";
import Button from "../components/Button";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    card_number: "",
    pic: null,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const { name, email, phone, card_number, pic, password, confirmPassword } =
      formData;
    if (
      !name ||
      !email ||
      !phone ||
      !card_number ||
      !pic ||
      !password ||
      !confirmPassword
    ) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "يرجى تعبئة جميع الحقول.",
      });
      return false;
    }
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "كلمات المرور غير متطابقة.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) =>
      formDataObj.append(key, formData[key])
    );

    try {
      await register(formDataObj);
      Swal.fire({
        icon: "success",
        title: "تم التسجيل بنجاح",
        text: "تم إنشاء الحساب بنجاح. يمكنك الآن تسجيل الدخول.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        card_number: "",
        pic: null,
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text:
          error.response?.data?.message ||
          "حدث خطأ أثناء التسجيل. حاول مرة أخرى.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          إنشاء حساب
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <InputField
            label="الاسم الكامل"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="أدخل اسمك الكامل"
          />
          <InputField
            label="البريد الإلكتروني"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
          />
          <InputField
            label="رقم الهاتف"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="أدخل رقم هاتفك"
          />
          <InputField
            label="رقم الكارنية"
            name="card_number"
            value={formData.card_number}
            onChange={handleChange}
            placeholder="أدخل رقم الكارنية"
          />
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">الصورة الشخصية</label>
            <input
              name="pic"
              type="file"
              onChange={handleChange}
              className="block w-full text-gray-700"
            />
          </div>
          <InputField
            label="كلمة المرور"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="أدخل كلمة المرور"
          />
          <InputField
            label="تأكيد كلمة المرور"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="أعد إدخال كلمة المرور"
          />
          <Button type="submit" className="md:col-span-2 w-full">
            إنشاء حساب
          </Button>
        </form>
        <div className="text-center mt-4">
          <p>
            لديك حساب؟{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              تسجيل الدخول
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
