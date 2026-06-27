import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsPhone(window.innerWidth <= 640);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const message = encodeURIComponent(
    "Namaste, mujhe Jan Seva Kendra services ke baare me jankari chahiye."
  );

  return (
    <div
      className="fixed z-50"
      style={{
        right: isPhone ? "22px" : "5%",
        bottom: isPhone ? "72px" : "32px",
      }}
    >
      <a
        href={`https://wa.me/919415689523?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-all duration-200 hover:bg-emerald-600 active:scale-95"
        style={{
          width: isPhone ? "48px" : "54px",
          height: isPhone ? "48px" : "54px",
        }}
      >
        <MessageCircle
          style={{
            width: isPhone ? "23px" : "26px",
            height: isPhone ? "23px" : "26px",
          }}
        />

        {!isPhone && (
          <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
            WhatsApp सहायता
          </span>
        )}
      </a>
    </div>
  );
};

export default FloatingWhatsApp;