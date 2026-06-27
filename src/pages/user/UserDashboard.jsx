import { Link, useNavigate } from "react-router-dom";
import {
  CalendarCheck,
  Clock,
  FileText,
  Home,
  LogOut,
  Phone,
  User,
} from "lucide-react";
import { toast } from "react-toastify";

import { getCurrentUser, logoutUser } from "../../utils/authStorage";
import { useLang } from "../../context/LangContext";

const UserDashboard = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const { lang } = useLang();
  const isHindi = lang === "hi";

  const handleLogout = () => {
    logoutUser();
    toast.success(isHindi ? "Logout हो गया।" : "Logged out successfully.");
    navigate("/login");
  };

  const quickCards = [
    {
      titleEn: "Book a Token",
      titleHi: "टोकन बुक करें",
      descEn: "Choose a service and book your visit.",
      descHi: "सेवा चुनें और केंद्र पर आने के लिए टोकन बुक करें।",
      icon: CalendarCheck,
      link: "/",
    },
    {
      titleEn: "Check Services",
      titleHi: "सेवाएं देखें",
      descEn: "View documents required for services.",
      descHi: "सेवाओं के लिए जरूरी दस्तावेज देखें।",
      icon: FileText,
      link: "/services",
    },
    {
      titleEn: "Contact Center",
      titleHi: "केंद्र से संपर्क करें",
      descEn: "Call or WhatsApp for help.",
      descHi: "सहायता के लिए कॉल या WhatsApp करें।",
      icon: Phone,
      link: "/contact",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div>
            <h1 className="text-xl font-extrabold text-slate-950">
              {isHindi ? "User Dashboard" : "User Dashboard"}
            </h1>

            <p className="mt-1 text-sm font-medium text-slate-500">
              {isHindi
                ? "अपनी सेवा और टोकन जानकारी देखें।"
                : "View your service and token details."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-md bg-rose-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-rose-700"
          >
            <LogOut className="h-4 w-4" />
            <span>{isHindi ? "Logout" : "Logout"}</span>
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-6 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-800">
                <User className="h-7 w-7" />
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-slate-950">
                  {currentUser?.name || "User"}
                </h2>

                <p className="text-sm font-medium text-slate-500">
                  {currentUser?.email}
                </p>

                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                  Role: {currentUser?.role}
                </p>
              </div>
            </div>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-800 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-900"
            >
              <Home className="h-4 w-4" />
              <span>{isHindi ? "Website पर जाएं" : "Go to Website"}</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {quickCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.titleEn}
                to={card.link}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-base font-extrabold text-slate-950">
                  {isHindi ? card.titleHi : card.titleEn}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {isHindi ? card.descHi : card.descEn}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-700" />

            <h3 className="text-lg font-extrabold text-slate-950">
              {isHindi ? "Booking Status" : "Booking Status"}
            </h3>
          </div>

          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
            <p className="text-sm font-bold text-slate-500">
              {isHindi
                ? "अभी कोई booking record नहीं है।"
                : "No booking record found yet."}
            </p>

            <p className="mt-1 text-xs font-medium text-slate-400">
              {isHindi
                ? "Website से token book करने के बाद यहां status दिखेगा।"
                : "After booking a token from the website, the status will appear here."}
            </p>

            <Link
              to="/"
              className="mt-4 inline-flex items-center rounded-md bg-orange-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-orange-600"
            >
              {isHindi ? "अभी टोकन बुक करें" : "Book Token Now"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserDashboard;