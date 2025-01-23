import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { FullscreenProvider } from "./context/FullscreenContext";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import HomePage from "./pages/HomePage";
import ClientsPage from "./pages/Clients/ClientsPage";
import ClientTypesPage from "./pages/Clients/ClientTypesPage";
import AddClientPage from "./pages/Clients/AddClientPage";
import CaseTypesPage from "./pages/Cases/CaseTypesPage";
import AddCasePage from "./pages/Cases/AddCasePage";
import SessionsPage from "./pages/Sessions/SessionsPage";
import PaymentsPage from "./pages/Payments/PaymentsPage";
import PaymentReportsPage from "./pages/Payments/PaymentReportsPage";
import FilesPage from "./pages/Files/FilesPage";
import ExpensesPage from "./pages/Expenses/ExpensesPage";
import AddExpensePage from "./pages/Expenses/AddExpensePage";
import AddExpenseCategoryPage from "./pages/Expenses/AddExpenseCategoryPage";

function App() {
  return (
    <UserProvider>
      <FullscreenProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="clients-types" element={<ClientTypesPage />} />
              <Route path="add-client" element={<AddClientPage />} />
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
