import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { FullscreenProvider } from "./context/FullscreenContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Layout from "./pages/Layout";
import {
  HomePage,
  ClientsPage,
  ClientTypesPage,
  AddClientPage,
  CaseTypesPage,
  AddCasePage,
  SessionsPage,
  PaymentsPage,
  PaymentReportsPage,
  FilesPage,
  ExpensesPage,
  AddExpensePage,
  AddExpenseCategoryPage,
  CasesPage,
} from "./pages"; // تم تحديث الاستيراد


function App() {
  return (
    <UserProvider>
      <FullscreenProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="clients-types" element={<ClientTypesPage />} />
              <Route path="add-client" element={<AddClientPage />} />
              <Route path="cases" element={<CasesPage/>} />
              <Route path="case-types" element={<CaseTypesPage />} />
              <Route path="add-case" element={<AddCasePage />} />
              <Route path="sessions" element={<SessionsPage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="payment-reports" element={<PaymentReportsPage />} />
              <Route path="files" element={<FilesPage />} />
              <Route path="expenses" element={<ExpensesPage />} />
              <Route path="add-expense" element={<AddExpensePage />} />
              <Route
                path="add-expense-category"
                element={<AddExpenseCategoryPage />}
              />
            </Route>
          </Routes>
        </Router>
      </FullscreenProvider>
    </UserProvider>
  );
}

export default App;
