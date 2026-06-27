import { useState } from "react";
import { Check, GraduationCap, X } from "lucide-react";
import { scholarshipsData } from "../../configs/scholarshipsData";

const ScholarshipSection = () => {
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const handleApply = (scholarship) => {
    window.dispatchEvent(
      new CustomEvent("setBookingService", {
        detail: {
          category: "students",
          service: scholarship.title,
        },
      })
    );

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
    <section id="scholarships" className="scroll-mt-24">
      <div className="mb-5 flex flex-col gap-2 border-b border-slate-200 pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-extrabold uppercase tracking-tight text-blue-950">
            <span className="text-orange-400">■</span>
            Scholarship & Student Help Desk
          </h3>

          <p className="mt-1 text-sm font-medium text-slate-500">
            UP Scholarship, NSP, correction, status check aur document upload
            support.
          </p>
        </div>

        <span className="w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-blue-700">
          {scholarshipsData.length} Services
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {scholarshipsData.map((scholarship) => (
          <div
            key={scholarship.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-indigo-200 hover:bg-slate-50"
          >
            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <GraduationCap className="h-5 w-5" />
                </div>

                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase ${
                    scholarship.color || "bg-blue-50 text-blue-700 border-blue-100"
                  }`}
                >
                  {scholarship.badge}
                </span>
              </div>

              <h4 className="text-sm font-extrabold leading-snug text-slate-800">
                {scholarship.title}
              </h4>

              {(scholarship.titleHi || scholarship.classInfo) && (
                <p className="mt-1 text-xs font-semibold leading-5 text-blue-700">
                  {scholarship.titleHi}
                  {scholarship.titleHi && scholarship.classInfo ? " • " : ""}
                  {scholarship.classInfo}
                </p>
              )}

              <p className="mt-2 text-xs leading-5 text-slate-500">
                {scholarship.details}
              </p>

              {scholarship.detailsHi && (
                <p className="mt-1 text-[11px] leading-5 text-slate-400">
                  {scholarship.detailsHi}
                </p>
              )}
            </div>

            <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setSelectedScholarship(scholarship)}
                className="flex-1 rounded border bg-slate-50 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100"
              >
                Details List
              </button>

              <button
                type="button"
                onClick={() => handleApply(scholarship)}
                className="flex-1 rounded bg-blue-900 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-950"
              >
                Apply Token
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedScholarship && (
        <div className="mt-6 rounded-2xl border-2 border-blue-900 bg-blue-50 p-5 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <span className="rounded border border-blue-200 bg-blue-100 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-blue-800">
                Required Documents
              </span>

              <h4 className="mt-2 text-lg font-extrabold text-blue-950">
                {selectedScholarship.title}
              </h4>

              {(selectedScholarship.titleHi || selectedScholarship.classInfo) && (
                <p className="mt-1 text-sm font-semibold text-blue-700">
                  {selectedScholarship.titleHi}
                  {selectedScholarship.titleHi && selectedScholarship.classInfo
                    ? " • "
                    : ""}
                  {selectedScholarship.classInfo}
                </p>
              )}

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Is scholarship service ke liye ye documents saath lekar aayein.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedScholarship(null)}
              className="rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-800"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {selectedScholarship.details && (
            <div className="mb-4 rounded-xl border border-blue-100 bg-white p-3">
              <p className="text-sm font-semibold leading-6 text-slate-700">
                {selectedScholarship.details}
              </p>

              {selectedScholarship.detailsHi && (
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {selectedScholarship.detailsHi}
                </p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {selectedScholarship.docs.map((doc, index) => (
              <div
                key={`${doc}-${index}`}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2"
              >
                <Check className="h-4 w-4 shrink-0 text-emerald-600" />

                <span className="text-sm font-bold text-slate-700">
                  {doc}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => handleApply(selectedScholarship)}
              className="rounded-md bg-blue-800 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-900"
            >
              Book Token for this Service
            </button>

            <button
              type="button"
              onClick={() => setSelectedScholarship(null)}
              className="rounded-md bg-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ScholarshipSection;