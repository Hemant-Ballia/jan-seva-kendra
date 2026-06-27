import {
  Bell,
  CalendarCheck,
  CheckCircle2,
  Clock,
  FileText,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getUsers } from "../../utils/authStorage";
import { useLang } from "../../context/LangContext";

const AdminDashboard = () => {
  const { lang } = useLang();
  const isHindi = lang === "hi";

  const users = getUsers();
  const totalUsers = users.filter((user) => user.role === "user").length;
  const totalAdmins = users.filter((user) => user.role === "admin").length;

  const stats = [
    {
      titleEn: "Total Users",
      titleHi: "कुल यूजर",
      value: totalUsers,
      icon: Users,
      color: "bg-blue-50 text-blue-700 border-blue-100",
    },
    {
      titleEn: "Admins",
      titleHi: "एडमिन",
      value: totalAdmins,
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
      titleEn: "Bookings",
      titleHi: "बुकिंग",
      value: 0,
      icon: CalendarCheck,
      color: "bg-orange-50 text-orange-700 border-orange-100",
    },
    {
      titleEn: "Pending",
      titleHi: "पेंडिंग",
      value: 0,
      icon: Clock,
      color: "bg-rose-50 text-rose-700 border-rose-100",
    },
  ];

  const quickLinks = [
    {
      titleEn: "Manage Bookings",
      titleHi: "बुकिंग मैनेज करें",
      descEn: "View and update service token requests.",
      descHi: "सेवा टोकन requests देखें और update करें।",
      icon: CalendarCheck,
      path: "/admin/bookings",
    },
    {
      titleEn: "Manage Services",
      titleHi: "सेवाएं मैनेज करें",
      descEn: "View Jan Seva Kendra services and documents.",
      descHi: "जन सेवा केंद्र सेवाएं और दस्तावेज देखें।",
      icon: FileText,
      path: "/admin/services",
    },
    {
      titleEn: "Manage Notices",
      titleHi: "सूचनाएं मैनेज करें",
      descEn: "Add latest updates for users.",
      descHi: "यूजर के लिए latest updates add करें।",
      icon: Bell,
      path: "/admin/notices",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-950">
          {isHindi ? "Dashboard" : "Dashboard"}
        </h2>

        <p className="mt-1 text-sm font-medium text-slate-500">
          {isHindi
            ? "यहां से पूरे जन सेवा केंद्र पोर्टल को मैनेज करें।"
            : "Manage the Jan Seva Kendra portal from here."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.titleEn}
              className={`rounded-2xl border bg-white p-5 shadow-sm ${item.color}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold">
                    {isHindi ? item.titleHi : item.titleEn}
                  </p>

                  <h3 className="mt-2 text-3xl font-extrabold">
                    {item.value}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/70">
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {quickLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.titleEn}
              to={item.path}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="text-base font-extrabold text-slate-950">
                {isHindi ? item.titleHi : item.titleEn}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {isHindi ? item.descHi : item.descEn}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-extrabold text-slate-950">
          {isHindi ? "Recent Activity" : "Recent Activity"}
        </h3>

        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
          <p className="text-sm font-bold text-slate-500">
            {isHindi
              ? "अभी कोई activity नहीं है।"
              : "No recent activity yet."}
          </p>

          <p className="mt-1 text-xs font-medium text-slate-400">
            {isHindi
              ? "Booking और notice system connect होने के बाद data यहां दिखेगा।"
              : "Data will appear here after booking and notice systems are connected."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;