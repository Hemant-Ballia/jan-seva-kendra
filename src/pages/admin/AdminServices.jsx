import { useEffect, useMemo, useState } from "react";
import { Check, FileText, Search, X } from "lucide-react";
import { toast } from "react-toastify";

import { quickServices } from "../../configs/servicesData";
import { useLang } from "../../context/LangContext";

const SERVICE_STATUS_KEY = "jsk_service_status";

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

const categoryLabels = {
  certificates: {
    en: "Certificates",
    hi: "प्रमाण पत्र",
  },
  scholarship: {
    en: "Scholarship",
    hi: "छात्रवृत्ति",
  },
  jobs_exams: {
    en: "Jobs & Exams",
    hi: "नौकरी और परीक्षा",
  },
  payments: {
    en: "Payments",
    hi: "भुगतान",
  },
  documents: {
    en: "Documents",
    hi: "दस्तावेज",
  },
};

const getSavedStatus = () => {
  const savedStatus = localStorage.getItem(SERVICE_STATUS_KEY);

  if (!savedStatus) {
    return {};
  }

  try {
    return JSON.parse(savedStatus);
  } catch {
    return {};
  }
};

const saveStatus = (statusMap) => {
  localStorage.setItem(SERVICE_STATUS_KEY, JSON.stringify(statusMap));
};

const AdminServices = () => {
  const { lang } = useLang();
  const isHindi = lang === "hi";

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [serviceStatus, setServiceStatus] = useState({});
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    setServiceStatus(getSavedStatus());
  }, []);

  const categories = useMemo(() => {
    return ["all", ...new Set(quickServices.map((service) => service.category))];
  }, []);

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

  const getCategoryLabel = (category) => {
    if (category === "all") {
      return isHindi ? "सभी सेवाएं" : "All Services";
    }

    return categoryLabels[category]?.[isHindi ? "hi" : "en"] || category;
  };

  const isServiceActive = (serviceId) => {
    return serviceStatus[serviceId] !== false;
  };

  const filteredServices = quickServices.filter((service) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      service.label.toLowerCase().includes(query) ||
      service.labelHi?.toLowerCase().includes(query) ||
      service.sub.toLowerCase().includes(query) ||
      service.subHi?.toLowerCase().includes(query) ||
      service.desc?.toLowerCase().includes(query) ||
      service.descHi?.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query);

    const matchesCategory =
      categoryFilter === "all" || service.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const activeCount = quickServices.filter((service) =>
    isServiceActive(service.id)
  ).length;

  const inactiveCount = quickServices.length - activeCount;

  const handleToggleStatus = (serviceId) => {
    const currentStatus = isServiceActive(serviceId);

    const updatedStatus = {
      ...serviceStatus,
      [serviceId]: !currentStatus,
    };

    setServiceStatus(updatedStatus);
    saveStatus(updatedStatus);

    toast.success(
      isHindi
        ? "Service status update हो गया।"
        : "Service status updated."
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-950">
          {isHindi ? "Services" : "Services"}
        </h2>

        <p className="mt-1 text-sm font-medium text-slate-500">
          {isHindi
            ? "जन सेवा केंद्र की सेवाएं, documents और status manage करें।"
            : "Manage Jan Seva Kendra services, documents and status."}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-blue-800">
          <FileText className="mb-3 h-6 w-6" />
          <p className="text-sm font-bold">
            {isHindi ? "कुल सेवाएं" : "Total Services"}
          </p>
          <h3 className="mt-1 text-3xl font-extrabold">
            {quickServices.length}
          </h3>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-800">
          <Check className="mb-3 h-6 w-6" />
          <p className="text-sm font-bold">
            {isHindi ? "Active Services" : "Active Services"}
          </p>
          <h3 className="mt-1 text-3xl font-extrabold">{activeCount}</h3>
        </div>

        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-rose-800">
          <X className="mb-3 h-6 w-6" />
          <p className="text-sm font-bold">
            {isHindi ? "Inactive Services" : "Inactive Services"}
          </p>
          <h3 className="mt-1 text-3xl font-extrabold">{inactiveCount}</h3>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={
                isHindi ? "Service खोजें..." : "Search service..."
              }
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {getCategoryLabel(category)}
              </option>
            ))}
          </select>
        </div>

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredServices.map((service) => {
              const active = isServiceActive(service.id);

              return (
                <article
                  key={service.id}
                  className={`rounded-2xl border p-4 shadow-sm transition-colors ${
                    active
                      ? "border-slate-200 bg-slate-50 hover:border-blue-300"
                      : "border-rose-100 bg-rose-50/50"
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl border text-2xl ${service.color}`}
                      >
                        {service.icon}
                      </div>

                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">
                          {getLabel(service)}
                        </h3>

                        <p className="text-xs font-semibold text-slate-500">
                          {getSub(service)}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${
                        active
                          ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                          : "border-rose-100 bg-rose-50 text-rose-700"
                      }`}
                    >
                      {active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <p className="min-h-[42px] text-xs leading-5 text-slate-500">
                    {getDesc(service)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-blue-900 transition-colors hover:bg-slate-100"
                    >
                      {isHindi ? "Documents देखें" : "View Documents"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleStatus(service.id)}
                      className={`rounded-md px-3 py-2 text-xs font-bold text-white transition-colors ${
                        active
                          ? "bg-rose-600 hover:bg-rose-700"
                          : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                    >
                      {active
                        ? isHindi
                          ? "Inactive करें"
                          : "Mark Inactive"
                        : isHindi
                          ? "Active करें"
                          : "Mark Active"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center">
            <p className="text-sm font-bold text-slate-500">
              {isHindi ? "कोई service नहीं मिली।" : "No services found."}
            </p>
          </div>
        )}
      </section>

      {selectedService && (
        <section className="mt-6 rounded-2xl border-2 border-blue-900 bg-blue-50 p-5 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <span className="rounded border border-blue-200 bg-blue-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-blue-800">
                {isHindi ? "जरूरी दस्तावेज" : "Required Documents"}
              </span>

              <h3 className="mt-2 text-lg font-extrabold text-blue-950">
                {getLabel(selectedService)}
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {getDesc(selectedService)}
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
        </section>
      )}
    </div>
  );
};

export default AdminServices;