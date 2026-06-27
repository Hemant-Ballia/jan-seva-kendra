import { Mail, Phone, Megaphone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useLang } from "../../context/LangContext";

const TopBar = () => {
  const { lang, setLang } = useLang();

  return (
    <div className="w-full text-[11px]">
      <div className="bg-[#17345d] text-white">
        <div className="w-full px-[5%] flex items-center min-h-8">
          <div className="bg-[#d61f4f] self-stretch px-3 font-semibold flex items-center gap-1.5 shrink-0">
            <Megaphone className="w-3.5 h-3.5" />
            <span>{lang === "en" ? "Latest Update" : "ताजा अपडेट"}</span>
          </div>

          <p className="ml-3 truncate text-slate-100">
            {lang === "en"
              ? "Online forms, scholarship, Aadhaar, PAN and result services are available."
              : "ऑनलाइन फॉर्म, छात्रवृत्ति, आधार, पैन और रिजल्ट सेवाएँ उपलब्ध हैं।"}
          </p>
        </div>
      </div>

      <div className="bg-[#d61f4f] text-white">
        <div className="w-full px-[5%] min-h-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 overflow-hidden font-medium">
            <a
              href="mailto:ishi.digitech@gmail.com"
              className="flex items-center gap-1.5 shrink-0"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ishi.digitech@gmail.com</span>
            </a>

            <a
              href="tel:+919415689523"
              className="hidden md:flex items-center gap-1.5 shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 94156-89523</span>
            </a>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <span className="hidden md:inline font-semibold">Follow Us</span>

            <a
              href="#"
              aria-label="Facebook"
              className="h-5 w-5 rounded-full bg-white flex items-center justify-center"
            >
              <FaFacebookF className="w-3 h-3 text-[#1877F2]" />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="h-5 w-5 rounded-full bg-white flex items-center justify-center"
            >
              <FaInstagram className="w-3.5 h-3.5 text-[#E4405F]" />
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="h-5 w-5 rounded-full bg-white flex items-center justify-center"
            >
              <FaYoutube className="w-3.5 h-3.5 text-[#FF0000]" />
            </a>

            <a
              href="#"
              aria-label="WhatsApp"
              className="h-5 w-5 rounded-full bg-white flex items-center justify-center"
            >
              <FaWhatsapp className="w-3.5 h-3.5 text-[#25D366]" />
            </a>

            <a
              href="#"
              aria-label="Location"
              className="h-5 w-5 rounded-full bg-white flex items-center justify-center"
            >
              <FaLocationDot className="w-3 h-3 text-[#34A853]" />
            </a>

            <div className="h-4 w-px bg-white/35" />

            <button
              type="button"
              onClick={() => setLang("en")}
              className={`font-semibold ${
                lang === "en" ? "text-white" : "text-white/70"
              }`}
            >
              English
            </button>

            <span className="text-white/40">|</span>

            <button
              type="button"
              onClick={() => setLang("hi")}
              className={`font-semibold ${
                lang === "hi" ? "text-white" : "text-white/70"
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;