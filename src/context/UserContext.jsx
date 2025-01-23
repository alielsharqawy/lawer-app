import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "" });

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName"); // قراءة الاسم من التخزين المحلي
    if (storedUserName) {
      setUser({ name: storedUserName });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
