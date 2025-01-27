import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  fetchCaseCategories,
  fetchCustomers,
  addCase,
} from "../../api/casesApi";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";

const AddCasePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [caseData, setCaseData] = useState({
    opponent_name: "",
    opponent_type: "",
    opponent_phone: "",
    opponent_address: "",
    case_category_id: "",
    ID_number: "",
    opponent_nation: "",
    opponent_lawyer: "",
    lawyer_phone: "",
    court_name: "",
    judge_name: "",
    case_number: "",
    case_title: "",
    contract_price: "",
    notes: "",
    circle: "",
    attorney_number: "",
    register_date: "",
  });
  const [caseCategories, setCaseCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchCaseCategories(token);
        const customers = await fetchCustomers(token);

        setCaseCategories(
          categories.map((cat) => ({ value: cat.id, label: cat.name }))
        );
        setCustomers(
          customers.map((cust) => ({
            value: cust.id,
            label: `${cust.name} - ${cust.email}`,
          }))
        );
      } catch (error) {
        navigate("/SignUp");
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCaseData({ ...caseData, [name]: value });
  };

  const handleAddCase = async () => {
    if (!selectedCustomerId) {
      Swal.fire("خطأ", "يرجى اختيار العميل.", "error");
      return;
    }

    try {
      setLoading(true);
      await addCase(selectedCustomerId, caseData, token);

      Swal.fire("نجاح", "تمت إضافة القضية بنجاح.", "success");
      setCaseData({
        opponent_name: "",
        opponent_type: "",
        opponent_phone: "",
        opponent_address: "",
        case_category_id: "",
        ID_number: "",
        opponent_nation: "",
        opponent_lawyer: "",
        lawyer_phone: "",
        court_name: "",
        judge_name: "",
        case_number: "",
        case_title: "",
        contract_price: "",
        notes: "",
        circle: "",
        attorney_number: "",
        register_date: "",
      });
      setSelectedCustomerId("");
    } catch (error) {
      console.error(error);
      Swal.fire("خطأ", "حدث خطأ أثناء إضافة القضية.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        إضافة قضية جديدة
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FormSelect
          label="العميل"
          name="selectedCustomer"
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(e.target.value)}
          options={customers}
        />
        <FormInput
          label="اسم الخصم"
          name="opponent_name"
          value={caseData.opponent_name}
          onChange={handleInputChange}
        />
        <FormInput
          label="نوع الخصم"
          name="opponent_type"
          value={caseData.opponent_type}
          onChange={handleInputChange}
        />
        <FormInput
          label="هاتف الخصم"
          name="opponent_phone"
          value={caseData.opponent_phone}
          onChange={handleInputChange}
        />
        <FormInput
          label="عنوان الخصم"
          name="opponent_address"
          value={caseData.opponent_address}
          onChange={handleInputChange}
        />
        <FormSelect
          label="فئة القضية"
          name="case_category_id"
          value={caseData.case_category_id}
          onChange={handleInputChange}
          options={caseCategories}
        />
        <FormInput
          label="رقم هوية الموكل"
          name="ID_number"
          value={caseData.ID_number}
          onChange={handleInputChange}
        />
        <FormInput
          label="جنسية الخصم"
          name="opponent_nation"
          value={caseData.opponent_nation}
          onChange={handleInputChange}
        />
        <FormInput
          label="اسم محامي الخصم"
          name="opponent_lawyer"
          value={caseData.opponent_lawyer}
          onChange={handleInputChange}
        />
        <FormInput
          label="هاتف محامي الخصم"
          name="lawyer_phone"
          value={caseData.lawyer_phone}
          onChange={handleInputChange}
        />
        <FormInput
          label="اسم المحكمة"
          name="court_name"
          value={caseData.court_name}
          onChange={handleInputChange}
        />
        <FormInput
          label="اسم القاضي"
          name="judge_name"
          value={caseData.judge_name}
          onChange={handleInputChange}
        />
        <FormInput
          label="رقم القضية"
          name="case_number"
          value={caseData.case_number}
          onChange={handleInputChange}
        />
        <FormInput
          label="عنوان القضية"
          name="case_title"
          value={caseData.case_title}
          onChange={handleInputChange}
        />
        <FormInput
          label="مبلغ العقد"
          name="contract_price"
          value={caseData.contract_price}
          onChange={handleInputChange}
        />
        <FormInput
          label="الدائرة"
          name="circle"
          value={caseData.circle}
          onChange={handleInputChange}
        />
        <FormInput
          label="رقم التوكيل"
          name="attorney_number"
          value={caseData.attorney_number}
          onChange={handleInputChange}
        />
        <FormInput
          label="تاريخ التسجيل"
          name="register_date"
          value={caseData.register_date}
          type="date"
          onChange={handleInputChange}
        />
        <FormInput
          label="ملاحظات القضية"
          name="notes"
          value={caseData.notes}
          onChange={handleInputChange}
        />
      </div>
      <div className="text-center mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition transform hover:scale-105"
          onClick={handleAddCase}
        >
          إضافة القضية
        </button>
      </div>
    </div>
  );
};

export default AddCasePage;
