import { Routes, Route } from "react-router-dom";

import PublicLayout from "./PublicLayout";
import AdminLayout from "./AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/public/Home";
import Services from "../pages/public/Services";
import Documents from "../pages/public/Documents";
import Scholarships from "../pages/public/Scholarships";
import JobsExams from "../pages/public/JobsExams";
import Notices from "../pages/public/Notices";
import Contact from "../pages/public/Contact";

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/jobs-exams" element={<JobsExams />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/admin/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;