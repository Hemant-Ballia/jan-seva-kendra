import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../../context/LangContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    const checkOpenStatus = () => {
      const currentHour = new Date().getHours();
      setIsOpen(currentHour >= 8 && currentHour < 20);
    };

    const checkScreen = () => {
      setIsPhone(window.innerWidth <= 640);
    };

    checkOpenStatus();
    checkScreen();

    const intervalId = setInterval(checkOpenStatus, 30000);
    window.addEventListener("resize", checkScreen);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  return (
    <header className="w-full bg-white border-b border-slate-200">
      <div className="w-full px-[5%] py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <svg
            className="shrink-0"
            style={{
              width: isPhone ? "40px" : "52px",
              height: isPhone ? "40px" : "52px",
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

          <div className="leading-tight min-w-0">
            <h1
              className="font-bold tracking-tight whitespace-nowrap"
              style={{
                fontSize: isPhone ? "20px" : "28px",
                lineHeight: "1.05",
              }}
            >
              {lang === "en" ? (
                <>
                  <span className="text-green-600">Jan</span>{" "}
                  <span className="text-sky-600">Seva</span>{" "}
                  <span className="text-orange-500">Kendra</span>
                </>
              ) : (
                <>
                  <span className="text-green-600">जन</span>{" "}
                  <span className="text-sky-600">सेवा</span>{" "}
                  <span className="text-orange-500">केंद्र</span>
                </>
              )}
            </h1>

            <p
              className="mt-1 text-blue-900 font-semibold whitespace-nowrap"
              style={{
                fontSize: isPhone ? "10px" : "13px",
              }}
            >
              Ishi Digitech Solutions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div
            className={`flex items-center gap-1.5 px-2 py-1 rounded-sm border font-semibold ${
              isOpen
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-rose-50 text-rose-700 border-rose-200"
            }`}
            style={{
              fontSize: isPhone ? "10px" : "11px",
            }}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOpen ? "bg-emerald-500" : "bg-rose-500"
              }`}
            />

            <span>
              {isOpen
                ? lang === "en"
                  ? "Open Now"
                  : "खुला है"
                : lang === "en"
                  ? "Closed"
                  : "बंद है"}
            </span>
          </div>

          {!isPhone && (
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-3 py-1 rounded-sm border border-orange-300 text-[11px] font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "Admin Login" : "एडमिन लॉगिन"}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
