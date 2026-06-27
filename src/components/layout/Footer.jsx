import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Clock, MapPin, MessageCircle } from "lucide-react";
import { useLang } from "../../context/LangContext";

const Footer = () => {
  const { lang } = useLang();
  const isHindi = lang === "hi";
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsPhone(window.innerWidth <= 640);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

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
        className="w-full px-[5%] grid text-sm"
        style={{
          paddingTop: isPhone ? "28px" : "40px",
          paddingBottom: isPhone ? "30px" : "36px",
          gap: isPhone ? "26px" : "34px",
          gridTemplateColumns: isPhone ? "1fr" : "1.2fr 1.3fr 1.1fr",
        }}
      >
        <div>
          <div className="flex items-center gap-3">
            <svg
              className="shrink-0"
              style={{
                width: isPhone ? "42px" : "48px",
                height: isPhone ? "42px" : "48px",
              }}
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

            <div className="min-w-0 leading-tight">
              <h4
                className="font-bold tracking-tight whitespace-nowrap"
                style={{
                  fontSize: isPhone ? "19px" : "22px",
                  lineHeight: "1.05",
                }}
              >
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

              <p className="mt-1 text-[11px] font-semibold leading-none text-sky-200">
                Ishi Digitech Solutions
              </p>
            </div>
          </div>

          <p
            className="mt-4 leading-6 text-slate-400"
            style={{
              maxWidth: isPhone ? "100%" : "360px",
              fontSize: isPhone ? "13px" : "14px",
            }}
          >
            {isHindi
              ? "फॉर्म, दस्तावेज, छात्रवृत्ति, नौकरी आवेदन, प्रिंट, स्कैन और ऑनलाइन सेवाओं के लिए स्थानीय सहायता केंद्र।"
              : "Local support center for forms, documents, scholarships, job applications, print, scan and online services."}
          </p>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: isPhone ? "18px" : "30px",
          }}
        >
          <div>
            <h5 className="mb-3 border-b border-slate-800 pb-2 text-sm font-bold text-white">
              {isHindi ? "सेवाएं" : "Services"}
            </h5>

            <ul className="space-y-2 text-slate-400">
              {services.map((item) => (
                <li key={item.labelEn}>
                  <Link
                    to={item.href}
                    className="text-[13px] hover:text-orange-400"
                  >
                    {isHindi ? item.labelHi : item.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-3 border-b border-slate-800 pb-2 text-sm font-bold text-white">
              {isHindi ? "छात्र सहायता" : "Student Help"}
            </h5>

            <ul className="space-y-2 text-slate-400">
              {studentHelp.map((item) => (
                <li key={item.labelEn}>
                  <Link
                    to={item.href}
                    className="text-[13px] hover:text-orange-400"
                  >
                    {isHindi ? item.labelHi : item.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h5 className="mb-3 border-b border-slate-800 pb-2 text-sm font-bold text-white">
            {isHindi ? "संपर्क" : "Contact"}
          </h5>

          <div className="space-y-3 text-slate-400">
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-orange-400" />
              <a href="tel:+919415689523" className="hover:text-white">
                +91 94156-89523
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-orange-400" />
              <a
                href="mailto:ishi.digitech@gmail.com"
                className="break-all hover:text-white"
              >
                ishi.digitech@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 shrink-0 text-orange-400" />
              <span>
                {isHindi ? "सुबह 8:00 - रात 8:00" : "8:00 AM - 8:00 PM"}
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
              <p className="leading-6">
                Ishi Complex, Usasa Pur,
                <br />
                Sikandarpur, Uttar Pradesh 277124
              </p>
            </div>

            {!isPhone && (
              <a
                href="https://wa.me/919415689523"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{isHindi ? "WhatsApp करें" : "WhatsApp Us"}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div
        className="w-full border-t border-slate-800 px-[5%] py-4 text-xs text-slate-500"
        style={{
          display: "flex",
          flexDirection: isPhone ? "column" : "row",
          alignItems: isPhone ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: "10px",
          paddingBottom: isPhone ? "22px" : "16px",
        }}
      >
        <p>
          © 2026{" "}
          {isHindi
            ? "जन सेवा केंद्र - Ishi Digitech Solutions. सभी अधिकार सुरक्षित।"
            : "Jan Seva Kendra - Ishi Digitech Solutions. All rights reserved."}
        </p>

        <button
          type="button"
          onClick={scrollToTop}
          className="text-[11px] font-semibold hover:text-orange-400"
        >
          {isHindi ? "ऊपर जाएं ↑" : "Back to Top ↑"}
        </button>
      </div>
    </footer>
  );
};

export default Footer;