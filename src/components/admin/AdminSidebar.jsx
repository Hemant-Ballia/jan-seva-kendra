import { NavLink } from "react-router-dom";
import {
  Bell,
  CalendarCheck,
  FileText,
  Home,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { useLang } from "../../context/LangContext";

const AdminSidebar = () => {
  const { lang } = useLang();
  const isHindi = lang === "hi";

  const navItems = [
    {
      labelEn: "Dashboard",
      labelHi: "डैशबोर्ड",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      labelEn: "Bookings",
      labelHi: "बुकिंग",
      path: "/admin/bookings",
      icon: CalendarCheck,
    },
    {
      labelEn: "Services",
      labelHi: "सेवाएं",
      path: "/admin/services",
      icon: Settings,
    },
    {
      labelEn: "Notices",
      labelHi: "सूचनाएं",
      path: "/admin/notices",
      icon: Bell,
    },
  ];

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white">
          <FileText className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-sm font-extrabold text-slate-950">
            {isHindi ? "Admin Panel" : "Admin Panel"}
          </h2>

          <p className="text-[11px] font-semibold text-slate-500">
            Ishi Digitech Solutions
          </p>
        </div>
      </div>

      <nav className="space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-blue-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              <span>{isHindi ? item.labelHi : item.labelEn}</span>
            </NavLink>
          );
        })}

        <NavLink
          to="/"
          className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950"
        >
          <Home className="h-4 w-4" />
          <span>{isHindi ? "Website" : "Website"}</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;