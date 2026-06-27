import { useState } from "react";
import { Calendar, Menu, X } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useLang } from "../../context/LangContext";

const navLinks = [
  { labelEn: "Home", labelHi: "होम", path: "/", target: "home" },
  { labelEn: "Services", labelHi: "सेवाएं", path: "/services", target: "services" },
  { labelEn: "Documents", labelHi: "दस्तावेज", path: "/documents", target: "documents" },
  { labelEn: "Scholarships", labelHi: "छात्रवृत्ति", path: "/scholarships", target: "scholarships" },
  { labelEn: "Jobs & Exams", labelHi: "नौकरी और परीक्षा", path: "/jobs-exams", target: "jobs" },
  { labelEn: "Notices", labelHi: "सूचनाएं", path: "/notices", target: "notices" },
  { labelEn: "Contact", labelHi: "संपर्क", path: "/contact", target: "contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useLang();

  const scrollToSection = (targetId) => {
    setMobileMenuOpen(false);

    setTimeout(() => {
      const section = document.getElementById(targetId);

      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleBookToken = () => {
    setMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        scrollToSection("booking-section");
      }, 300);

      return;
    }

    scrollToSection("booking-section");
  };

  return (
    <nav className="sticky top-0 z-[999] w-full bg-[#1f3f93] text-white border-b border-blue-950 shadow-sm">
      <div className="w-full px-[5%] flex items-center justify-between h-10">
        <ul className="hidden md:flex items-center h-full">
          {navLinks.map((item) => (
            <li key={item.path} className="h-full">
              <NavLink
                to={item.path}
                onClick={(event) => {
                  if (location.pathname === item.path) {
                    event.preventDefault();
                    scrollToSection(item.target);
                  }
                }}
                className={({ isActive }) =>
                  `h-full flex items-center px-3.5 border-b-2 text-sm font-semibold ${
                    isActive
                      ? "border-orange-400 text-orange-400"
                      : "border-transparent text-white hover:text-orange-200"
                  }`
                }
              >
                {lang === "en" ? item.labelEn : item.labelHi}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={handleBookToken}
          className="hidden md:flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-3 py-1.5 rounded-sm text-sm"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{lang === "en" ? "Book Token" : "टोकन बुक करें"}</span>
        </button>

        <div className="flex md:hidden items-center justify-between w-full">
          <button
            type="button"
            onClick={handleBookToken}
            className="flex items-center gap-1.5 bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white rounded-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "Book Token" : "टोकन बुक करें"}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-sm bg-blue-800 text-white text-xs font-semibold"
          >
            <span>{lang === "en" ? "Menu" : "मेन्यू"}</span>

            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-950 border-t border-blue-800 px-[5%] py-2">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 px-3 rounded-sm text-sm font-semibold ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-white hover:bg-blue-900"
                }`
              }
            >
              {lang === "en" ? item.labelEn : item.labelHi}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;