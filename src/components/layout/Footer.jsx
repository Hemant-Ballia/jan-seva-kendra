import { Link } from "react-router-dom";
import { Phone, Mail, Clock, MapPin, MessageCircle } from "lucide-react";
import { useLang } from "../../context/LangContext";

const Footer = () => {
  const { lang } = useLang();
  const isHindi = lang === "hi";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const services = [
    {
      labelEn: "PAN Card Help",
      labelHi: "पैन कार्ड सहायता",
      href: "/services",
    },
    {
      labelEn: "Income Certificate",
      labelHi: "आय प्रमाण पत्र",
      href: "/services",
    },
    {
      labelEn: "Caste Certificate",
      labelHi: "जाति प्रमाण पत्र",
      href: "/services",
    },
    {
      labelEn: "Residence Certificate",
      labelHi: "निवास प्रमाण पत्र",
      href: "/services",
    },
    {
      labelEn: "Scholarship Form",
      labelHi: "छात्रवृत्ति फॉर्म",
      href: "/scholarships",
    },
    {
      labelEn: "Job Form",
      labelHi: "नौकरी फॉर्म",
      href: "/jobs-exams",
    },
  ];

  const studentHelp = [
    {
      labelEn: "UP Scholarship",
      labelHi: "यूपी छात्रवृत्ति",
      href: "/scholarships",
    },
    {
      labelEn: "NSP Scholarship",
      labelHi: "एनएसपी छात्रवृत्ति",
      href: "/scholarships",
    },
    {
      labelEn: "Scholarship Renewal",
      labelHi: "छात्रवृत्ति नवीनीकरण",
      href: "/scholarships",
    },
    {
      labelEn: "Admit Card / Result",
      labelHi: "प्रवेश पत्र / परिणाम",
      href: "/jobs-exams",
    },
  ];

  return (
    <footer
      id="contact"
      className="bg-slate-950 text-slate-300 border-t-2 border-blue-700"
    >
      <div
        className="w-full px-[5%] pt-10 pb-8 grid gap-8 text-sm"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
       <div className="space-y-4">
  <div className="flex items-center gap-3">
    <svg
      className="w-12 h-12 shrink-0"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Jan Seva Kendra Logo"
    >
      <path
        d="M12 42C12 51 20 54 32 54C44 54 52 51 52 42"
        stroke="#0ea5e9"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 46.5C20 49.5 26 51 32 51C38 51 44 49.5 48 46.5"
        stroke="#f97316"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect
        x="18"
        y="16"
        width="28"
        height="20"
        rx="3.5"
        fill="#f0f9ff"
        stroke="#1e3a8a"
        strokeWidth="3.5"
      />
      <line
        x1="24"
        y1="36"
        x2="40"
        y2="36"
        stroke="#1e3a8a"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="24" r="4" fill="#0ea5e9" />
      <path
        d="M25 31.5C25 28.5 28 27.5 32 27.5C36 27.5 39 28.5 39 31.5"
        stroke="#0ea5e9"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M32 6L33.8 9.5L37.5 10L34.5 12.5L35.5 16.5L32 14.5L28.5 16.5L29.5 12.5L26.5 10L30.2 9.5L32 6Z"
        fill="#f59e0b"
      />
    </svg>

    <div className="leading-tight">
      <h4 className="text-xl font-bold tracking-tight">
        {isHindi ? (
          <>
            <span className="text-green-500">जन</span>{" "}
            <span className="text-sky-400">सेवा</span>{" "}
            <span className="text-orange-400">केंद्र</span>
          </>
        ) : (
          <>
            <span className="text-green-500">Jan</span>{" "}
            <span className="text-sky-400">Seva</span>{" "}
            <span className="text-orange-400">Kendra</span>
          </>
        )}
      </h4>

      <p className="mt-1 text-xs text-sky-200 font-semibold">
        Ishi Digitech Solutions
      </p>
    </div>
  </div>

  <p className="text-sm text-slate-400 leading-relaxed max-w-[360px]">
    {isHindi
      ? "फॉर्म, दस्तावेज, छात्रवृत्ति, नौकरी आवेदन, प्रिंट, स्कैन और ऑनलाइन सेवाओं के लिए स्थानीय सहायता केंद्र।"
      : "Local support center for forms, documents, scholarships, job applications, print, scan and online services."}
  </p>
</div>

        <div>
          <h5 className="text-white border-b border-slate-800 pb-2 mb-4 text-sm font-bold">
            {isHindi ? "सेवाएं" : "Services"}
          </h5>

          <ul className="space-y-2.5 text-slate-400">
            {services.map((item) => (
              <li key={item.labelEn}>
                <Link
                  to={item.href}
                  className="hover:text-orange-400 transition-colors"
                >
                  {isHindi ? item.labelHi : item.labelEn}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-white border-b border-slate-800 pb-2 mb-4 text-sm font-bold">
            {isHindi ? "छात्र सहायता" : "Student Help"}
          </h5>

          <ul className="space-y-2.5 text-slate-400">
            {studentHelp.map((item) => (
              <li key={item.labelEn}>
                <Link
                  to={item.href}
                  className="hover:text-orange-400 transition-colors"
                >
                  {isHindi ? item.labelHi : item.labelEn}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-white border-b border-slate-800 pb-2 mb-4 text-sm font-bold">
            {isHindi ? "संपर्क" : "Contact"}
          </h5>

          <div className="space-y-3.5 text-slate-400">
            <div className="flex gap-2.5 items-center">
              <Phone className="w-4 h-4 text-orange-400 shrink-0" />
              <a href="tel:+919415689523" className="hover:text-white">
                +91 94156-89523
              </a>
            </div>

            <div className="flex gap-2.5 items-center">
              <Mail className="w-4 h-4 text-orange-400 shrink-0" />
              <a
                href="mailto:ishi.digitech@gmail.com"
                className="hover:text-white transition-colors break-all"
              >
                ishi.digitech@gmail.com
              </a>
            </div>

            <div className="flex gap-2.5 items-center">
              <Clock className="w-4 h-4 text-orange-400 shrink-0" />
              <span>
                {isHindi ? "सुबह 8:00 - रात 8:00" : "8:00 AM - 8:00 PM"}
              </span>
            </div>

            <div className="flex gap-2.5 items-start">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <p className="leading-snug">
                Ishi Complex, Usasa Pur,
                <br />
                Sikandarpur, Uttar Pradesh 277124
              </p>
            </div>

            <a
              href="https://wa.me/919415689523"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-sm transition-colors text-sm font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isHindi ? "WhatsApp करें" : "WhatsApp Us"}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="w-full px-[5%] py-4 border-t border-slate-800 flex flex-wrap justify-between items-center gap-3 text-xs text-slate-500">
        <p>
          © 2026{" "}
          {isHindi
            ? "जन सेवा केंद्र - Ishi Digitech Solutions. सभी अधिकार सुरक्षित।"
            : "Jan Seva Kendra - Ishi Digitech Solutions. All rights reserved."}
        </p>

        <button
          type="button"
          onClick={scrollToTop}
          className="hover:text-orange-400 transition-colors text-[11px] font-semibold"
        >
          {isHindi ? "ऊपर जाएं ↑" : "Back to Top ↑"}
        </button>
      </div>
    </footer>
  );
};

export default Footer;