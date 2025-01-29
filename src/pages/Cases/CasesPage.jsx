import React, { useState, useEffect } from "react";
import {
  fetchCases,
  deleteCase,
  fetchCaseDetails,
  updateCase,
} from "../../api/casesApi";
import CaseCard from "./components/CaseCard";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CasesPage = () => {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCases();
        setCases(data.cases);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch cases.", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDetails = async (customerId, caseId) => {
    Swal.fire({
      title: "Loading case details...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => Swal.showLoading(),
    });
    try {
      const details = await fetchCaseDetails(customerId, caseId);
      setSelectedCase(details);
      setIsEditModalOpen(true);
      Swal.close();
    } catch (error) {
      Swal.fire("Error", "Failed to fetch case details.", "error");
    }
  };

  const handleDelete = async (customerId, caseId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      try {
        await deleteCase(customerId, caseId);
        setCases((prev) => prev.filter((c) => c.case_id !== caseId));
        Swal.fire("Deleted", "The case has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete case.", "error");
      }
    }
  };

  const handleSaveEdit = async () => {
    Swal.fire({
      title: "Saving changes...",
      text: "Please wait while the changes are being saved.",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => Swal.showLoading(),
    });

    try {
      await updateCase(
        selectedCase.customer_id,
        selectedCase.case_id,
        selectedCase
      );
      setCases((prevCases) =>
        prevCases.map((caseItem) =>
          caseItem.case_id === selectedCase.case_id
            ? { ...caseItem, ...selectedCase }
            : caseItem
        )
      );
      Swal.fire("Success", "Case details updated successfully.", "success");
      setIsEditModalOpen(false);
    } catch (error) {
      Swal.fire("Error", "Failed to update case details.", "error");
    }
  };

  const filteredCases = cases.filter((c) =>
    c.case_number.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="sm:flex-row justify-between items-center gap-4">
      <h1 className="text-2xl font-bold text-center mb-6">بيانات القضايا</h1>
      <input
        type="text"
        className="border border-gray-300 rounded-lg p-2 w-full sm:max-w-md mb-3"
        placeholder="ابحث باسم فئة الدعوي ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isLoading ? (
        <div className="text-center">Loading cases...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCases.map((caseData) => (
            <CaseCard
              key={caseData.id}
              caseData={caseData}
              onDetails={() => handleDetails(caseData.customer_id, caseData.id)}
              onDelete={() =>
                handleDelete(caseData.customer_id, caseData.case_id)
              }
            />
          ))}
        </div>
      )}

     

      <div className="mt-6 text-center">
        <Link
          to="/dashboard/add-case"
          className="btn btn-primary mx-2 bg-blue-500 p-3 rounded-lg text-white"
        >
          إضافة قضية جديدة
        </Link>
        <Link
          to="/dashboard/case-types"
          className="btn btn-secondary mx-2 bg-blue-500 p-3 rounded-lg text-white"
        >
          إضافة نوع قضية
        </Link>
      </div>
    </div>
  );
};

export default CasesPage;




