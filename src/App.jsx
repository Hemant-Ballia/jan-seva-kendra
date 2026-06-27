import { Navigate, Route, Routes } from "react-router-dom";

import TopBar from "./components/layout/TopBar";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingWhatsApp from "./components/layout/FloatingWhatsApp";

import RoleProtectedRoute from "./components/auth/RoleProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";

import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import UserDashboard from "./pages/user/UserDashboard";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminServices from "./pages/admin/AdminServices";
import AdminNotices from "./pages/admin/AdminNotices";

const PublicLayout = () => {
  return (
    <>
      <TopBar />
      <Header />
      <Navbar />

      <main className="flex w-full flex-1 flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Home />} />
          <Route path="/documents" element={<Home />} />
          <Route path="/scholarships" element={<Home />} />
          <Route path="/jobs-exams" element={<Home />} />
          <Route path="/jobs" element={<Navigate to="/jobs-exams" replace />} />
          <Route path="/notices" element={<Home />} />
          <Route path="/contact" element={<Home />} />
        </Routes>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

const App = () => {
  return (
    <div
      id="top"
      className="relative flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800"
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/user/dashboard"
          element={
            <RoleProtectedRoute allowedRole="user">
              <UserDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRole="admin">
              <AdminLayout />
            </RoleProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="notices" element={<AdminNotices />} />
        </Route>

        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </div>
  );
};

export default App;