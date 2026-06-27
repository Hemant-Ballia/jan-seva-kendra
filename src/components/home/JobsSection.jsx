import { BriefcaseBusiness, CalendarDays } from "lucide-react";
import { jobsData } from "../../configs/jobsData";

const JobsSection = () => {
  const handleApply = (job) => {
    window.dispatchEvent(
      new CustomEvent("setBookingService", {
        detail: {
          category: "jobs_exams",
          service: job.title,
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
    <section
      id="jobs"
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
        <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-blue-900">
          <BriefcaseBusiness className="h-4 w-4 text-blue-700" />
          Jobs & Exams Updates
        </h3>

        <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold uppercase text-red-600">
          Latest
        </span>
      </div>

      <div className="flex max-h-[390px] flex-col gap-4 overflow-y-auto pr-1">
        {jobsData.map((job) => (
          <div
            key={job.id}
            className="rounded-xl border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-blue-300 hover:bg-blue-50/40"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-blue-700 shadow-sm">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-1.5">
                  <span className="rounded border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                    {job.type}
                  </span>

                  <span
                    className={`rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${job.color}`}
                  >
                    {job.status}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold leading-snug text-slate-800">
                  {job.title}
                </h4>

                <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                  {job.titleHi}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-200 pt-3 text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-slate-500">
                <CalendarDays className="h-3.5 w-3.5" />
                Last Date: {job.lastDate}
              </span>

              <button
                type="button"
                onClick={() => handleApply(job)}
                className="shrink-0 font-extrabold text-blue-700 transition-colors hover:text-blue-900"
              >
                Book Token »
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-slate-200 pt-3">
        <button
          type="button"
          onClick={() => {
            const bookingSection = document.getElementById("booking-section");

            if (bookingSection) {
              bookingSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
          className="block w-full rounded-lg bg-slate-100 py-2 text-center text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200"
        >
          Check active applications
        </button>
      </div>
    </section>
  );
};

export default JobsSection;