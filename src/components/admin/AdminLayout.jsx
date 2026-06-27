import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <section className="flex min-w-0 flex-1 flex-col">
          <AdminHeader />

          <div className="flex-1 px-4 py-6 md:px-6 lg:px-8">
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminLayout;