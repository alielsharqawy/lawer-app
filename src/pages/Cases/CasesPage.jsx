// // import React, { useState, useEffect } from "react";
// // import {
// //   fetchCases,
// //   deleteCase,
// //   fetchCaseDetails,
// //   updateCase,
// // } from "../../api/casesApi";
// // import CaseCard from "./components/CaseCard";
// // import Swal from "sweetalert2";
// // import { Link } from "react-router-dom";

// // const CasesPage = () => {
// //   const [cases, setCases] = useState([]);
// //   const [selectedCase, setSelectedCase] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const data = await fetchCases();
// //       setCases(data.cases);
// //     };
// //     fetchData();
// //   }, []);

// //   const handleDetails = async (customerId, caseId) => {
// //     Swal.fire({
// //       title: "جاري تحميل تفاصيل القضية...",
// //       allowOutsideClick: false,
// //       showConfirmButton: false,
// //       willOpen: () => Swal.showLoading(),
// //     });
// //     try {
// //       const details = await fetchCaseDetails(customerId, caseId);
// //       setSelectedCase(details);
// //       setIsEditModalOpen(true); // فتح الـ Modal
// //       Swal.close();
// //     } catch (error) {
// //       Swal.fire({
// //         icon: "error",
// //         title: "فشل في تحميل تفاصيل القضية",
// //         text: "حدث خطأ أثناء جلب تفاصيل القضية، يرجى المحاولة مرة أخرى.",
// //       });
// //     }
// //   };

// //   const handleDelete = async (customerId, caseId) => {
// //     const confirm = await Swal.fire({
// //       title: "هل أنت متأكد؟",
// //       text: "لن تتمكن من التراجع عن هذا الإجراء.",
// //       icon: "warning",
// //       showCancelButton: true,
// //     });

// //     if (confirm.isConfirmed) {
// //       try {
// //         await deleteCase(customerId, caseId);
// //         setCases((prev) => prev.filter((c) => c.case_id !== caseId));
// //         Swal.fire("تم الحذف", "تم حذف القضية بنجاح.", "success");
// //       } catch (error) {
// //         Swal.fire("خطأ", "فشل في حذف القضية.", "error");
// //       }
// //     }
// //   };

// //   const handleSaveEdit = async () => {
// //     try {
// //       Swal.fire({
// //         title: "جاري الحفظ...",
// //         text: "يرجى الانتظار أثناء حفظ التعديلات.",
// //         allowOutsideClick: false,
// //         showConfirmButton: false,
// //         didOpen: () => Swal.showLoading(),
// //       });

// //       await updateCase(
// //         selectedCase.customer_id,
// //         selectedCase.case_id,
// //         selectedCase
// //       );
// //       setCases((prevCases) =>
// //         prevCases.map((caseItem) =>
// //           caseItem.case_id === selectedCase.case_id
// //             ? { ...caseItem, ...selectedCase }
// //             : caseItem
// //         )
// //       );

// //       Swal.fire("تم التعديل بنجاح", "تم تحديث بيانات القضية.", "success");
// //       setIsEditModalOpen(false);
// //     } catch (error) {
// //       Swal.fire("خطأ", "حدث خطأ أثناء تعديل البيانات.", "error");
// //     }
// //   };

// //   const filteredCases = cases.filter((c) =>
// //     c.case_number.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-bold text-center mb-6">القضايا</h1>
// //       <input
// //         type="text"
// //         className="form-control mb-4"
// //         placeholder="ابحث عن القضية..."
// //         value={searchTerm}
// //         onChange={(e) => setSearchTerm(e.target.value)}
// //       />
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //         {filteredCases.map((caseData) => (
// //           <CaseCard
// //             key={caseData.id}
// //             caseData={caseData}
// //             onDetails={() => handleDetails(caseData.customer_id, caseData.id)}
// //             onDelete={() =>
// //               handleDelete(caseData.customer_id, caseData.case_id)
// //             }
// //           />
// //         ))}
// //       </div>

// //       {/*edit model*/}
// //       {isEditModalOpen && selectedCase && (
// //         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
// //           <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
// //             <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
// //               تعديل بيانات القضية
// //             </h2>
// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   اسم الخصم
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   value={selectedCase.opponent_name}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       opponent_name: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   نوع الخصم
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   value={selectedCase.opponent_type}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       opponent_type: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   هاتف الخصم
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   value={selectedCase.opponent_phone}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       opponent_phone: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   عنوان الخصم
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   value={selectedCase.opponent_address}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       opponent_address: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   فئة القضية
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   value={selectedCase.case_category_id}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       case_category_id: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   رقم هوية الموكل
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   value={selectedCase.ID_number}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       ID_number: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   جنسية الخصم
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   value={selectedCase.opponent_nation}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       opponent_nation: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   اسم محامي الخصم
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   value={selectedCase.opponent_lawyer}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       opponent_lawyer: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   هاتف محامي الخصم
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   value={selectedCase.lawyer_phone}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       lawyer_phone: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   اسم المحكمة
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   value={selectedCase.court_name}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       court_name: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   اسم القاضي
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   value={selectedCase.judge_name}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       judge_name: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   رقم القضية
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   value={selectedCase.case_number}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       case_number: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   عنوان القضية
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   value={selectedCase.case_title}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       case_title: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   مبلغ العقد
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   value={selectedCase.contract_price}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       contract_price: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   الدائرة
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   value={selectedCase.circle}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       circle: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   رقم التوكيل
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   value={selectedCase.attorney_number}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       attorney_number: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   تاريخ التسجيل
// //                 </label>
// //                 <input
// //                   type="date"
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   value={selectedCase.register_date}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       register_date: e.target.value,
// //                     })
// //                   }
// //                 />
// //               </div>
// //               <div className="col-span-2">
// //                 <label className="block text-gray-700 font-semibold mb-2">
// //                   ملاحظات القضية
// //                 </label>
// //                 <textarea
// //                   className="border border-gray-300 rounded-lg p-2 w-full"
// //                   rows="3"
// //                   value={selectedCase.notes}
// //                   onChange={(e) =>
// //                     setSelectedCase({
// //                       ...selectedCase,
// //                       notes: e.target.value,
// //                     })
// //                   }
// //                 ></textarea>
// //               </div>
// //             </div>
// //             <div className="text-center mt-6 flex justify-center  gap-3">
// //               <button
// //                 className="px-6 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 transition mr-2"
// //                 onClick={handleSaveEdit}
// //               >
// //                 حفظ التعديلات
// //               </button>
// //               <button
// //                 className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition"
// //                 onClick={() => setIsEditModalOpen(false)}
// //               >
// //                 إلغاء
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //       <div className="mt-6 text-center">
// //         <Link to="/dashboard/add-case" className="btn btn-primary mx-2">
// //           أضف قضية جديدة
// //         </Link>
// //         <Link to="/dashboard/case-types" className="btn btn-secondary mx-2">
// //           أضف نوع قضية جديدة
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CasesPage;


// import React, { useState, useEffect } from "react";
// import {
//   fetchCases,
//   deleteCase,
//   fetchCaseDetails,
//   updateCase,
// } from "../../api/casesApi";
// import CaseCard from "./components/CaseCard";
// import Swal from "sweetalert2";
// import { Link } from "react-router-dom";

// const CasesPage = () => {
//   const [cases, setCases] = useState([]);
//   const [selectedCase, setSelectedCase] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const data = await fetchCases();
//         setCases(data.cases);
//       } catch (error) {
//         Swal.fire("Error", "Failed to fetch cases.", "error");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleDetails = async (customerId, caseId) => {
//     Swal.fire({
//       title: "Loading case details...",
//       allowOutsideClick: false,
//       showConfirmButton: false,
//       willOpen: () => Swal.showLoading(),
//     });
//     try {
//       const details = await fetchCaseDetails(customerId, caseId);
//       setSelectedCase(details);
//       setIsEditModalOpen(true);
//       Swal.close();
//     } catch (error) {
//       Swal.fire("Error", "Failed to fetch case details.", "error");
//     }
//   };

//   const handleDelete = async (customerId, caseId) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await deleteCase(customerId, caseId);
//         setCases((prev) => prev.filter((c) => c.case_id !== caseId));
//         Swal.fire("Deleted", "The case has been deleted.", "success");
//       } catch (error) {
//         Swal.fire("Error", "Failed to delete case.", "error");
//       }
//     }
//   };

//   const handleSaveEdit = async () => {
//     Swal.fire({
//       title: "Saving changes...",
//       text: "Please wait while the changes are being saved.",
//       allowOutsideClick: false,
//       showConfirmButton: false,
//       willOpen: () => Swal.showLoading(),
//     });

//     try {
//       await updateCase(
//         selectedCase.customer_id,
//         selectedCase.case_id,
//         selectedCase
//       );
//       setCases((prevCases) =>
//         prevCases.map((caseItem) =>
//           caseItem.case_id === selectedCase.case_id
//             ? { ...caseItem, ...selectedCase }
//             : caseItem
//         )
//       );
//       Swal.fire("Success", "Case details updated successfully.", "success");
//       setIsEditModalOpen(false);
//     } catch (error) {
//       Swal.fire("Error", "Failed to update case details.", "error");
//     }
//   };

//   const filteredCases = cases.filter((c) =>
//     c.case_number.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold text-center mb-6">Cases</h1>
//       <input
//         type="text"
//         className="form-control mb-4"
//         placeholder="Search by case number..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {isLoading ? (
//         <div className="text-center">Loading cases...</div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredCases.map((caseData) => (
//             <CaseCard
//               key={caseData.id}
//               caseData={caseData}
//               onDetails={() => handleDetails(caseData.customer_id, caseData.id)}
//               onDelete={() =>
//                 handleDelete(caseData.customer_id, caseData.case_id)
//               }
//             />
//           ))}
//         </div>
//       )}

//       {/* Edit Modal */}
//       {isEditModalOpen && selectedCase && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
//             <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
//               Edit Case Details
//             </h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2">
//                   Opponent Name
//                 </label>
//                 <input
//                   type="text"
//                   className="border border-gray-300 rounded-lg p-2 w-full"
//                   value={selectedCase.opponent_name || ""}
//                   onChange={(e) =>
//                     setSelectedCase({
//                       ...selectedCase,
//                       opponent_name: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-2">
//                   Opponent Type
//                 </label>
//                 <input
//                   type="text"
//                   className="border border-gray-300 rounded-lg p-2 w-full"
//                   value={selectedCase.opponent_type || ""}
//                   onChange={(e) =>
//                     setSelectedCase({
//                       ...selectedCase,
//                       opponent_type: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               {/* Add other fields as needed */}
//             </div>
//             <div className="text-center mt-6 flex justify-center gap-3">
//               <button
//                 className="px-6 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 transition"
//                 onClick={handleSaveEdit}
//               >
//                 Save Changes
//               </button>
//               <button
//                 className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition"
//                 onClick={() => setIsEditModalOpen(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 text-center">
//         <Link to="/dashboard/add-case" className="btn btn-primary mx-2">
//           Add New Case
//         </Link>
//         <Link to="/dashboard/case-types" className="btn btn-secondary mx-2">
//           Add Case Type
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CasesPage;




import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchCases, fetchCaseDetails } from "../../api/casesApi"; // استيراد API

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    const loadCases = async () => {
      try {
        const response = await fetchCases();
        setCases(response.cases);
        setLoading(false);
      } catch (err) {
        setError("فشل في استرجاع البيانات");
        setLoading(false);
        Swal.fire("خطأ", "حدث خطأ أثناء جلب البيانات.", "error");
      }
    };

    loadCases();
  }, []);

  const handleCaseDetails = async (customerId, caseId) => {
    try {
      const response = await fetchCaseDetails(customerId, caseId);
      setSelectedCase(response.case);
    } catch (err) {
      Swal.fire("خطأ", "حدث خطأ أثناء تحميل تفاصيل القضية.", "error");
    }
  };

  const handleDeleteCase = (caseId) => {
    Swal.fire({
      title: "هل أنت متأكد من الحذف؟",
      text: "لن تتمكن من استعادة البيانات بعد الحذف!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذف!",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        // حذف القضية من القائمة (هنا يمكنك إضافة طلب الحذف)
        setCases(cases.filter((c) => c.case_id !== caseId));
        Swal.fire("تم الحذف!", "تم حذف القضية بنجاح.", "success");
      }
    });
  };

  if (loading) return <div className="text-center">جاري التحميل...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold text-center mb-4">بيانات القضايا</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cases.map((caseItem) => (
          <div
            key={caseItem.case_id}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <h3 className="font-bold text-lg">{caseItem.customer_name}</h3>
            <div className="mt-2">
              <p className="text-gray-700">
                <span className="font-bold">رقم الدعوى: </span>
                {caseItem.case_number}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">فئة الدعوى: </span>
                {caseItem.case_category}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">أتعاب المحاماة: </span>
                {caseItem.contract_price} ج.م
              </p>
              <p className="text-gray-700">
                <span className="font-bold">رقم الهاتف: </span>
                {caseItem.customer_phone}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">المبلغ المدفوع: </span>
                {caseItem.paid_amount} ج.م
              </p>
              <p className="text-gray-700">
                <span className="font-bold">المبلغ المتبقي: </span>
                {caseItem.remaining_amount} ج.م
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() =>
                  handleCaseDetails(caseItem.customer_id, caseItem.case_id)
                }
              >
                تفاصيل
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => console.log("Edit case:", caseItem.case_id)}
              >
                تعديل
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDeleteCase(caseItem.case_id)}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link
          to="/dashboard/add-case"
          className="bg-blue-800 text-white px-5 py-3 rounded mx-2"
        >
          إضافة قضية جديدة
        </Link>
        <Link
          to="/dashboard/case-types"
          className="bg-blue-800 text-white px-5 py-3 rounded mx-2"
        >
          إضافة نوع قضية جديد
        </Link>
      </div>
    </div>
  );
};

export default Cases;
