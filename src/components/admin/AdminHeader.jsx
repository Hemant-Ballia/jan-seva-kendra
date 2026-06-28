import { Link, useNavigate } from "react-router-dom";
import { Home, LogOut, Menu, UserCircle } from "lucide-react";
import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";
import { useLang } from "../../context/LangContext";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { user: currentUser, logout } = useAuth();
  const { lang } = useLang();

  const isHindi = lang === "hi";

  const handleLogout = () => {
    logout();
    toast.success(isHindi ? "Logout हो गया।" : "Logged out successfully.");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 lg:hidden"
            aria-label="Open admin menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-base font-extrabold text-slate-950 md:text-lg">
              {isHindi ? "Admin Panel" : "Admin Panel"}
            </h1>

            <p className="text-xs font-medium text-slate-500">
              {isHindi
                ? "बुकिंग, सेवाएं और नोटिस मैनेज करें"
                : "Manage bookings, services and notices"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="hidden items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100 sm:flex"
          >
            <Home className="h-4 w-4" />
            <span>{isHindi ? "Website" : "Website"}</span>
          </Link>

          <div className="hidden items-center gap-2 rounded-md border border-slate-200 px-3 py-2 sm:flex">
            <UserCircle className="h-4 w-4 text-blue-800" />

            <div className="leading-tight">
              <p className="text-xs font-bold text-slate-800">
                {currentUser?.name || "Admin"}
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                {currentUser?.role || "admin"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-md bg-rose-600 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-rose-700"
          >
            <LogOut className="h-4 w-4" />
            <span>{isHindi ? "Logout" : "Logout"}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
