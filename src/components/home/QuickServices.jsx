import { useState } from "react";
import { Check, Search, X } from "lucide-react";
import { quickServices } from "../../configs/servicesData";
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
  "Bank Passbook": "बैंक पासबुक",
  Marksheet: "मार्कशीट",
  "Income Certificate": "आय प्रमाण पत्र",
  "Caste Certificate if required": "जरूरत होने पर जाति प्रमाण पत्र",
  "School / College Details": "स्कूल / कॉलेज विवरण",
  "Fee Receipt if required": "जरूरत होने पर फीस रसीद",
  "Qualification Details": "शैक्षणिक योग्यता विवरण",
  "Category Certificate if required": "जरूरत होने पर श्रेणी प्रमाण पत्र",
  "Registration Number": "रजिस्ट्रेशन नंबर",
  "Date of Birth": "जन्म तिथि",
  "Password if required": "जरूरत होने पर पासवर्ड",
  "Roll Number if required": "जरूरत होने पर रोल नंबर",
  "Consumer Number": "कंज्यूमर नंबर",
  "Bill Copy if available": "बिल कॉपी यदि उपलब्ध हो",
  "Original Document": "मूल दस्तावेज",
  "PDF / Photo File": "PDF / फोटो फाइल",
  "Mobile or Pen Drive if available": "मोबाइल या पेन ड्राइव यदि उपलब्ध हो",
  "PAN Card": "पैन कार्ड",
};

const QuickServices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const { lang } = useLang();

  const isHindi = lang === "hi";

  const getLabel = (service) => {
    return isHindi ? service.labelHi || service.label : service.label;
  };

  const getSub = (service) => {
    return isHindi ? service.subHi || service.sub : service.sub;
  };

  const getDesc = (service) => {
    return isHindi ? service.descHi || service.desc : service.desc;
  };

  const getDoc = (doc) => {
    return isHindi ? docsHindi[doc] || doc : doc;
  };

  const filteredQuickServices = quickServices.filter((service) => {
    const query = searchQuery.toLowerCase();

    return (
      service.label.toLowerCase().includes(query) ||
      service.labelHi?.toLowerCase().includes(query) ||
      service.sub.toLowerCase().includes(query) ||
      service.subHi?.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query) ||
      service.desc?.toLowerCase().includes(query) ||
      service.descHi?.toLowerCase().includes(query)
    );
  });

  const selectedService = quickServices.find(
    (service) => service.id === selectedServiceId
  );

  const handleApply = (service) => {
    window.dispatchEvent(
      new CustomEvent("setBookingService", {
        detail: {
          category: service.category,
          service: getLabel(service),
        },
      })
    );

    setSelectedServiceId(null);

    setTimeout(() => {
      const bookingSection = document.getElementById("booking-section");

      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <>
      <section id="services" className="scroll-mt-24">
        <div className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-extrabold uppercase tracking-tight text-blue-950">
              <span className="text-orange-400">■</span>
              {isHindi ? "नागरिक त्वरित सेवाएं" : "Citizens Quick Services"}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {isHindi
                ? "सेवा चुनें और जरूरी दस्तावेज तुरंत देखें।"
                : "Select a service and quickly check required documents."}
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder={isHindi ? "सेवा खोजें..." : "Search service..."}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-4 text-sm font-semibold text-slate-700 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-5">
          {filteredQuickServices.length > 0 ? (
            filteredQuickServices.map((service) => (
              <button
                type="button"
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className="group flex flex-col items-center justify-between rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md active:scale-95"
              >
                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-slate-100 text-2xl shadow-inner ${service.color}`}
                >
                  {service.icon}
                </div>

                <div>
                  <h4 className="text-[13px] font-extrabold leading-snug text-slate-800 transition-colors group-hover:text-blue-700">
                    {getLabel(service)}
                  </h4>

                  <p className="mt-1 text-[11px] font-semibold text-slate-400">
                    {getSub(service)}
                  </p>
                </div>

                <span className="mt-3 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-bold text-blue-700 transition-colors group-hover:bg-blue-50">
                  {isHindi ? "दस्तावेज देखें" : "View Docs"} 📋
                </span>
              </button>
            ))
          ) : (
            <div className="col-span-full rounded-xl border border-slate-200 bg-white py-8 text-center text-sm font-bold text-slate-400">
              {isHindi ? "कोई सेवा नहीं मिली।" : "No matching services found."}
            </div>
          )}
        </div>
      </section>

      {selectedService && (
        <section className="relative mb-8 mt-6 rounded-2xl border-2 border-blue-900 bg-blue-50 p-5 shadow-sm">
          <button
            type="button"
            onClick={() => setSelectedServiceId(null)}
            className="absolute right-3 top-3 rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-800"
            aria-label={isHindi ? "बंद करें" : "Close document list"}
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="w-fit rounded-full border bg-white p-3 text-3xl shadow-sm">
              {selectedService.icon}
            </div>

            <div className="flex-1">
              <span className="rounded border border-blue-200 bg-blue-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-blue-800">
                {isHindi ? "जरूरी दस्तावेज" : "Required Documents"}
              </span>

              <h4 className="mt-2 text-lg font-extrabold leading-tight text-blue-950">
                {getLabel(selectedService)}{" "}
                <span className="text-sm text-slate-500">
                  ({getSub(selectedService)})
                </span>
              </h4>

              <p className="mt-1 text-sm text-slate-600">
                {getDesc(selectedService)}
              </p>

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {selectedService.docs.map((doc) => (
                  <div
                    key={doc}
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
                  onClick={() => setSelectedServiceId(null)}
                  className="rounded-md bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-300"
                >
                  {isHindi ? "बंद करें" : "Close"}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default QuickServices;