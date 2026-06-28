import { useEffect, useState } from "react";
import { Check, Phone, Printer, Send, User } from "lucide-react";
import { toast } from "react-toastify";

import { useCreateBooking } from "../../api/hooks";

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const getMaxDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().split("T")[0];
};

const serviceOptions = {
  certificates: [
    "Income Certificate",
    "Caste Certificate",
    "Residence Certificate",
    "PAN Card Help",
    "Aadhaar PAN Link",
  ],
  students: [
    "UP Scholarship Form Assistance",
    "NSP Scholarship Help",
    "Scholarship Correction",
    "Student Document Upload",
  ],
  scholarship: [
    "UP Scholarship Form Assistance",
    "NSP Scholarship Help",
    "Scholarship Renewal",
    "Scholarship Correction",
  ],
  jobs_exams: [
    "Government Job Form",
    "Admit Card Download",
    "Result / Scorecard Print",
    "Exam Form Assistance",
  ],
  payments: [
    "Electricity Bill Payment",
    "Mobile Recharge",
    "PM Kisan e-KYC",
  ],
  documents: [
    "Print / Scan",
    "Photocopy",
    "Document Upload",
    "PDF / Photo Print",
  ],
};

const categories = [
  { id: "certificates", label: "Certificates" },
  { id: "students", label: "Students" },
  { id: "jobs_exams", label: "Jobs & Exams" },
  { id: "payments", label: "Payments" },
];

const TokenBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    category: "certificates",
    service: "Income Certificate",
    message: "",
    date: getTodayDate(),
  });

  const [bookedToken, setBookedToken] = useState(null);
  const { mutateAsync: createBooking, isPending } = useCreateBooking();

  useEffect(() => {
    const handleSetService = (event) => {
      const detail = event.detail || {};

      setFormData((prev) => ({
        ...prev,
        category: detail.category || prev.category,
        service: detail.service || prev.service,
      }));
    };

    window.addEventListener("setBookingService", handleSetService);

    return () => {
      window.removeEventListener("setBookingService", handleSetService);
    };
  }, []);

  const handleSelectCategory = (categoryId) => {
    const firstService = serviceOptions[categoryId]?.[0] || "";

    setFormData((prev) => ({
      ...prev,
      category: categoryId,
      service: firstService,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTokenSubmit = async (event) => {
    event.preventDefault();

    if (isPending) return;

    const mobileRegex = /^[6-9]\d{9}$/;

    if (!formData.name.trim()) {
      toast.error("Please enter applicant name.");
      return;
    }

    if (!mobileRegex.test(formData.mobile)) {
      toast.error("Please enter valid 10 digit mobile number.");
      return;
    }

    if (!formData.service.trim()) {
      toast.error("Please select a service.");
      return;
    }

    try {
      const booking = await createBooking({
        name: formData.name,
        mobile: formData.mobile,
        category: formData.category,
        service: formData.service,
        message: formData.message,
        date: formData.date,
      });

      setBookedToken({
        tokenNo: booking.tokenNo,
        name: booking.name,
        mobile: booking.phone,
        service: booking.service,
        date: formData.date,
        time: "Visit during opening hours",
      });

      toast.success("Token generated successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    setBookedToken(null);

    setFormData({
      name: "",
      mobile: "",
      category: "certificates",
      service: "Income Certificate",
      message: "",
      date: getTodayDate(),
    });
  };

  return (
    <section
      id="booking-section"
      className="scroll-mt-24 rounded-2xl border-2 border-blue-200 bg-blue-50 p-5 shadow-sm md:p-6"
    >
      <div className="mb-5 border-b border-blue-200 pb-3">
        <span className="rounded bg-blue-700 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          Book Service Token
        </span>

        <h3 className="mt-2 text-lg font-extrabold uppercase text-blue-950">
          Service Token Request
        </h3>

        <p className="mt-1 text-xs leading-5 text-blue-800">
          Center par visit karne se pehle token request karein. Backend connect
          hone ke baad ye request admin panel me dikhegi.
        </p>
      </div>

      {bookedToken ? (
        <div className="relative rounded-xl border-2 border-dashed border-emerald-500 bg-white p-5 text-center">
          <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            Token Generated
          </span>

          <div className="flex flex-col items-center justify-center pt-3">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check className="h-7 w-7" />
            </div>

            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Booking Token Number
            </p>

            <span className="my-3 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 font-mono text-2xl font-extrabold tracking-wide text-blue-950">
              {bookedToken.tokenNo}
            </span>
          </div>

          <div className="my-4 grid grid-cols-1 gap-3 rounded-lg border bg-slate-50 p-4 text-left text-xs font-bold text-slate-700 sm:grid-cols-2">
            <div>
              <span className="block text-[9px] uppercase text-slate-400">
                Applicant
              </span>
              <span className="text-slate-900">{bookedToken.name}</span>
            </div>

            <div>
              <span className="block text-[9px] uppercase text-slate-400">
                Mobile
              </span>
              <span className="text-slate-900">{bookedToken.mobile}</span>
            </div>

            <div>
              <span className="block text-[9px] uppercase text-slate-400">
                Service
              </span>
              <span className="text-slate-900">{bookedToken.service}</span>
            </div>

            <div>
              <span className="block text-[9px] uppercase text-slate-400">
                Preferred Date
              </span>
              <span className="text-slate-900">{bookedToken.date}</span>
            </div>
          </div>

          <p className="mb-4 text-xs leading-5 text-slate-500">
            Token number ka screenshot le lijiye. Center par original documents
            aur mobile number saath lekar aayein.
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-900 py-2.5 text-xs font-bold text-white transition-colors hover:bg-slate-800"
            >
              <Printer className="h-4 w-4" />
              Print Slip
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="flex-1 rounded-lg border border-slate-300 bg-slate-100 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200"
            >
              Book Another
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleTokenSubmit} className="space-y-4 text-xs">
          <div>
            <label className="mb-2 block font-extrabold text-slate-700">
              1. Select Service Category
            </label>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleSelectCategory(category.id)}
                  className={`rounded-lg border px-2 py-2 text-center text-[11px] font-bold transition-colors ${
                    formData.category === category.id
                      ? "border-blue-700 bg-blue-700 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-extrabold text-slate-700">
                Applicant Name
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 font-bold outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block font-extrabold text-slate-700">
                Mobile Number
              </label>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="tel"
                  name="mobile"
                  placeholder="10 digit mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength="10"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 font-bold outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-extrabold text-slate-700">
                Selected Service
              </label>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-bold outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              >
                {(serviceOptions[formData.category] || []).map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block font-extrabold text-slate-700">
                Preferred Date
              </label>

              <input
                type="date"
                name="date"
                min={getTodayDate()}
                max={getMaxDate()}
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-bold outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block font-extrabold text-slate-700">
              Message Optional
            </label>

            <textarea
              name="message"
              rows="2"
              placeholder="Any special query or urgent work..."
              value={formData.message}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2 font-bold outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-900 py-3 font-extrabold uppercase tracking-wide text-white shadow transition-colors hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            {isPending ? "Registering..." : "Register Token"}
          </button>
        </form>
      )}
    </section>
  );
};

export default TokenBooking;
