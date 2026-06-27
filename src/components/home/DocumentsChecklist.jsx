import { useState } from "react";
import { CheckSquare, ClipboardCheck, RotateCcw, ShieldCheck, Square } from "lucide-react";
import { documentsChecklist } from "../../configs/documentsData";
import { useLang } from "../../context/LangContext";

const DocumentsChecklist = () => {
  const [checkedDocs, setCheckedDocs] = useState({});
  const { lang } = useLang();

  const isHindi = lang === "hi";

  const handleToggleChecklist = (id) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleReset = () => {
    setCheckedDocs({});
  };

  const completedCount = Object.values(checkedDocs).filter(Boolean).length;
  const totalDocs = documentsChecklist.length;
  const progress = totalDocs > 0 ? Math.round((completedCount / totalDocs) * 100) : 0;

  return (
    <section
      id="documents"
      className="scroll-mt-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="mb-2 inline-flex items-center gap-1.5 rounded-sm bg-orange-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-orange-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            {isHindi ? "दस्तावेज जांच" : "Document Check"}
          </p>

          <h3 className="flex items-center gap-2 text-xl font-bold tracking-tight text-blue-950">
            <ClipboardCheck className="h-5 w-5 text-orange-500" />
            {isHindi ? "नागरिक दस्तावेज चेकलिस्ट" : "Citizen Document Checklist"}
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            {isHindi
              ? "केंद्र पर आने से पहले अपने जरूरी दस्तावेज चेक कर लें। इससे फॉर्म भरने में देरी नहीं होगी और बार-बार आना नहीं पड़ेगा।"
              : "Center par aane se pehle apne documents check kar lo. Isse form bharne me delay nahi hoga aur baar-baar visit nahi karna padega."}
          </p>
        </div>

        <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
          <p className="text-xs font-semibold text-slate-600">
            {isHindi ? "तैयारी स्थिति" : "Preparation Status"}
          </p>

          <p className="mt-1 text-xl font-bold text-blue-950">
            {completedCount} / {totalDocs}
            <span className="ml-1 text-sm font-semibold text-slate-600">
              {isHindi ? "तैयार" : "Ready"}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold text-slate-600">
          <span>{isHindi ? "प्रगति" : "Progress"}</span>
          <span>{progress}%</span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-orange-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {documentsChecklist.map((item) => {
          const isChecked = checkedDocs[item.id] || false;
          const title = isHindi ? item.titleHi || item.title : item.title;
          const desc = isHindi ? item.descHi || item.desc : item.desc;

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => handleToggleChecklist(item.id)}
              aria-pressed={isChecked}
              className={`group flex items-start gap-3 rounded-lg border p-3 text-left transition-all ${
                isChecked
                  ? "border-emerald-200 bg-emerald-50 text-slate-900"
                  : "border-slate-200 bg-slate-50 text-slate-800 hover:border-orange-200 hover:bg-orange-50"
              }`}
            >
              <span className="mt-0.5 shrink-0">
                {isChecked ? (
                  <CheckSquare className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Square className="h-4 w-4 text-slate-400 group-hover:text-orange-500" />
                )}
              </span>

              <span>
                <span className="block text-sm font-bold leading-tight text-blue-950">
                  {title}
                </span>

                <span
                  className={`mt-1 block text-xs leading-5 ${
                    isChecked ? "text-emerald-800" : "text-slate-500"
                  }`}
                >
                  {desc}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-lg border border-orange-100 bg-orange-50 px-4 py-3 text-sm md:flex-row md:items-center md:justify-between">
        <p className="font-semibold text-orange-900">
          {isHindi
            ? "मूल दस्तावेज और फोटो कॉपी दोनों साथ लेकर आएं।"
            : "Original documents aur photocopy dono saath lekar aayein."}
        </p>

        {completedCount > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex w-fit items-center gap-1.5 rounded-sm border border-orange-200 bg-white px-3 py-1.5 text-xs font-bold text-orange-700 hover:bg-orange-100"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{isHindi ? "रीसेट करें" : "Reset"}</span>
          </button>
        )}
      </div>
    </section>
  );
};

export default DocumentsChecklist;