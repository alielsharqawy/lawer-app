// import React, { useState, useEffect } from "react";
// import SearchBar from "./SearchBar";

// const ParentComponent = () => {
//   const [cases, setCases] = useState([]);
//   const [filteredCases, setFilteredCases] = useState([]);

//   useEffect(() => {
//     // Simulated fetch call
//     const fetchCases = async () => {
//       const data = [
//         { id: 1, name: "Case A" },
//         { id: 2, name: "Case B" },
//         { id: 3, name: "Case C" },
//       ];
//       setCases(data);
//       setFilteredCases(data);
//     };

//     fetchCases();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-xl font-bold mb-4">Search Cases</h1>
//       <SearchBar cases={cases} onSearch={setFilteredCases} />
//       <ul>
//         {filteredCases.map((item) => (
//           <li key={item.id} className="p-2 border-b">
//             {item.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ParentComponent;
