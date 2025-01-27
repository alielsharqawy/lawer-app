import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  fetchCaseTypes,
  addCaseType,
  deleteCaseType,
} from "../../api/caseTypesApi";
import CaseTypeCard from "./components/CaseTypeCard";
import LoadingSpinner from "./components/LoadingSpinner";

const CaseTypesPage = () => {
  const [caseTypes, setCaseTypes] = useState([]);
  const [newCaseType, setNewCaseType] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [loading, setLoading] = useState(true);
  const [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCaseTypes(token);
        setCaseTypes(data);
      } catch (error) {
        console.error("Error fetching case types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleAddCaseType = async () => {
    if (!newCaseType.trim()) {
      Swal.fire("تحذير", "يرجى إدخال اسم نوع القضية.", "warning");
      return;
    }

    try {
      await addCaseType({ name: newCaseType.trim() }, token);
      setCaseTypes((prev) => [...prev, { id: Date.now(), name: newCaseType }]);
      setNewCaseType("");
      Swal.fire("نجاح", "تمت إضافة نوع القضية بنجاح.", "success");
    } catch (error) {
      console.error("Error adding case type:", error);
      Swal.fire("خطأ", "فشل في إضافة نوع القضية.", "error");
    }
  };

  const handleDeleteCaseType = async (id) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن يمكنك استرجاع هذا النوع بعد حذفه.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCaseType(id, token);
          setCaseTypes((prev) => prev.filter((type) => type.id !== id));
          Swal.fire("تم الحذف", "تم حذف نوع القضية بنجاح.", "success");
        } catch (error) {
          console.error("Error deleting case type:", error);
          Swal.fire("خطأ", "فشل في حذف نوع القضية.", "error");
        }
      }
    });
  };

  // Filtered case types based on search term
  const filteredCaseTypes = caseTypes.filter((type) =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        أنواع القضايا
      </h1>
      {/* Search and Input Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 w-[100%]">
        <input
          type="text"
          placeholder="ابحث عن نوع القضية..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg shadow-sm p-3 w-full sm:w-1/3 focus:ring focus:ring-blue-200 transition"
        />
        <input
          type="text"
          value={newCaseType}
          onChange={(e) => setNewCaseType(e.target.value)}
          placeholder="أدخل نوع القضية"
          className="border border-gray-300 rounded-lg shadow-sm p-3 w-full sm:w-1/3 focus:ring focus:ring-green-200 transition"
        />
        <button
          onClick={handleAddCaseType}
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg sm:w-auto w-full shadow-md transition transform hover:scale-105"
        >
          إضافة نوع قضية
        </button>
      </div>
      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCaseTypes.length > 0 ? (
          filteredCaseTypes.map((type) => (
            <CaseTypeCard
              key={type.id}
              caseType={type}
              onDelete={() => handleDeleteCaseType(type.id)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            لا توجد أنواع قضايا تطابق البحث.
          </p>
        )}
      </div>
    </div>
  );
};

export default CaseTypesPage;
