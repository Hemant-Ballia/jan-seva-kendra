import { FileText, GraduationCap, Printer, ShieldCheck } from "lucide-react";

const highlights = [
  {
    title: "Digital Service Counter",
    desc: "Online form, certificate aur document support ke liye helpdesk.",
    icon: Printer,
  },
  {
    title: "Student Form Assistance",
    desc: "Scholarship, admission, admit card aur result related help.",
    icon: GraduationCap,
  },
  {
    title: "Document Support",
    desc: "Photocopy, scan, print aur online application document help.",
    icon: FileText,
  },
];

const stats = [
  {
    value: "Local",
    label: "Digital Service Support",
  },
  {
    value: "8 AM - 8 PM",
    label: "Daily Service Hours",
  },
  {
    value: "WhatsApp",
    label: "Quick Help Available",
  },
];

const GallerySection = () => {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
        <h3 className="mb-4 border-b border-slate-200 pb-3 text-sm font-extrabold uppercase tracking-wide text-blue-900">
          सेवा डेस्क की झलकियां
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:bg-blue-50"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <Icon className="h-5 w-5" />
                </div>

                <h4 className="text-sm font-bold text-slate-900">
                  {item.title}
                </h4>

                <p className="mt-2 text-xs leading-5 text-slate-600">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-blue-900 p-5 text-white shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-orange-300">
          <ShieldCheck className="h-4 w-4" />
          सेवा जानकारी
        </h3>

        <div className="divide-y divide-blue-800">
          {stats.map((item) => (
            <div key={item.label} className="py-4 first:pt-0 last:pb-0">
              <p className="text-lg font-extrabold text-orange-300">
                {item.value}
              </p>

              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-blue-100">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-5 rounded-xl border border-blue-700 bg-blue-950/40 p-3 text-xs leading-5 text-blue-100">
          कृपया सेवा के लिए आने से पहले जरूरी दस्तावेज और मोबाइल नंबर साथ रखें।
        </p>
      </div>
    </section>
  );
};

export default GallerySection;