import { useState } from "react";
import { Check, Info, X } from "lucide-react";
import { certificateServices } from "../../configs/servicesData";
import { useLang } from "../../context/LangContext";

const docsHindi = {
  "Aadhaar Card": "आधार कार्ड",
  "Mobile Number": "मोबाइल नंबर",
  "Passport Size Photo": "पासपोर्ट साइज फोटो",
  Signature: "हस्ताक्षर",
  "Family Details": "परिवार विवरण",
  "Income Related Supporting Document": "आय से संबंधित दस्तावेज",
  "Self Declaration Form if required": "जरूरत होने पर स्व-घोषणा पत्र",
  "Old Caste Certificate if available": "पुराना जाति प्रमाण पत्र यदि उपलब्ध हो",
  "Address Proof": "पता प्रमाण",
  "Ration Card if available": "राशन कार्ड यदि उपलब्ध हो",
};

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(null);
  const { lang } = useLang();

  const isHindi = lang === "hi";

  const getTitle = (service) => {
    return isHindi ? service.titleHi || service.title : service.title;
  };

  const getDesc = (service) => {
    return isHindi ? service.descHi || service.desc : service.desc;
  };

  const getFee = (fee) => {
    if (!isHindi) return fee;
    return "शुल्क सेवा के अनुसार";
  };

  const getDoc = (doc) => {
    return isHindi ? docsHindi[doc] || doc : doc;
  };

  const handleApply = (service) => {
    window.dispatchEvent(
      new CustomEvent("setBookingService", {
        detail: {
          category: service.category,
          service: getTitle(service),
        },
      })
    );

    setSelectedService(null);

    setTimeout(() => {
      const bookingSection = document.getElementById("booking-section");

      if (bookingSection) {
        bookingSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-5 flex flex-col gap-2 border-b border-slate-200 pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-extrabold uppercase tracking-tight text-blue-950">
            <span className="text-orange-400">■</span>
            {isHindi ? "मुख्य प्रमाण पत्र सेवाएं" : "Major Certificate Services"}
          </h3>

          <p className="mt-1 text-sm font-medium text-slate-500">
            {isHindi
              ? "आय, जाति और निवास प्रमाण पत्र के लिए दस्तावेज जानकारी।"
              : "Document guidance for income, caste and residence certificates."}
          </p>
        </div>

        <span className="w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-blue-700">
          {certificateServices.length} {isHindi ? "सेवाएं" : "Services"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {certificateServices.map((service) => (
          <div
            key={service.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50/40"
          >
            <div>
              <div className="mb-3 flex items-start justify-between gap-3">
                <span className="rounded-lg border border-slate-200 bg-white p-2 text-2xl shadow-sm">
                  {service.icon}
                </span>

                <span className="rounded border border-emerald-100 bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                  {getFee(service.fee)}
                </span>
              </div>

              <h4 className="text-sm font-extrabold text-slate-800">
                {getTitle(service)}
              </h4>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                {getDesc(service)}
              </p>
            </div>

            <div className="mt-4 flex gap-2 border-t border-slate-200 pt-3">
              <button
                type="button"
                onClick={() => setSelectedService(service)}
                className="flex-1 rounded border border-slate-300 bg-white py-2 text-xs font-bold text-blue-900 transition-colors hover:bg-slate-100"
              >
                {isHindi ? "जानकारी" : "Guidelines"}
              </button>

              <button
                type="button"
                onClick={() => handleApply(service)}
                className="flex-1 rounded bg-blue-800 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-900"
              >
                {isHindi ? "टोकन बुक करें" : "Apply Token"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="mt-6 rounded-2xl border-2 border-blue-900 bg-blue-50 p-5 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1 rounded border border-blue-200 bg-blue-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-blue-800">
                <Info className="h-3.5 w-3.5" />
                {isHindi ? "जरूरी दस्तावेज" : "Required Documents"}
              </span>

              <h4 className="mt-2 text-lg font-extrabold text-blue-950">
                {getTitle(selectedService)}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {isHindi
                  ? "इस सेवा के लिए केंद्र पर आते समय ये दस्तावेज साथ लेकर आएं।"
                  : "Please bring these documents when visiting the center for this service."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedService(null)}
              className="rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-800"
              aria-label={isHindi ? "बंद करें" : "Close"}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {getDesc(selectedService) && (
            <div className="mb-4 rounded-xl border border-blue-100 bg-white p-3">
              <p className="text-sm font-semibold leading-6 text-slate-700">
                {getDesc(selectedService)}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {selectedService.docs.map((doc, index) => (
              <div
                key={`${doc}-${index}`}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2"
              >
                <Check className="h-4 w-4 shrink-0 text-emerald-600" />

                <span className="text-sm font-bold text-slate-700">
                  {getDoc(doc)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => handleApply(selectedService)}
              className="rounded-md bg-blue-800 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-900"
            >
              {isHindi
                ? "इस सेवा के लिए टोकन बुक करें"
                : "Book Token for this Service"}
            </button>

            <button
              type="button"
              onClick={() => setSelectedService(null)}
              className="rounded-md bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-300"
            >
              {isHindi ? "बंद करें" : "Close"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;