// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { getAllCustomers, deleteCustomer } from "../../api/customers";

// const ClientsPage = () => {
//   const [clients, setClients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchClients();
//   }, []);

//   const fetchClients = async () => {
//     try {
//       const response = await getAllCustomers();
//       setClients(response.data.customers);
//     } catch (error) {
//       Swal.fire("Error", "Failed to fetch clients", "error");
//     }
//   };

//   const handleDelete = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await deleteCustomer(id);
//           setClients((prev) => prev.filter((client) => client.id !== id));
//           Swal.fire("Deleted!", "The client has been deleted.", "success");
//         } catch (error) {
//           Swal.fire("Error", "Failed to delete client", "error");
//         }
//       }
//     });
//   };

//   const filteredClients = clients.filter((client) =>
//     client.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-700">Clients List</h1>
//         <input
//           type="text"
//           className="border border-gray-300 rounded p-2 w-1/3"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredClients.map((client) => (
//           <div key={client.id} className="bg-white p-4 rounded shadow">
//             <h3 className="font-bold">{client.name}</h3>
//             <p>Phone: {client.phone}</p>
//             <p>Email: {client.email}</p>
//             <div className="flex justify-between mt-4">
//               <Link
//                 to={`/edit-customer/${client.id}`}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Edit
//               </Link>
//               <button
//                 onClick={() => handleDelete(client.id)}
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ClientsPage;

import React from 'react'

const ClientsPage = () => {
  return (
    <div>
      hello
    </div>
  )
}

export default ClientsPage
