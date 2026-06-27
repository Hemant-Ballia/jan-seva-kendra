import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white p-5">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <p className="text-sm text-slate-300 mt-1">Ishi Digitech Solutions</p>
      </aside>

      <main className="ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;