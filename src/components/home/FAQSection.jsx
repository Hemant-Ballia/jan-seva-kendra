import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqData } from "../../configs/faqData";
import { useLang } from "../../context/LangContext";

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const { lang } = useLang();

  const isHindi = lang === "hi";

  const handleToggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="w-full border-y border-slate-200 bg-slate-50 px-[5%] py-10"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-blue-950">
            {isHindi ? "सहायता एवं जानकारी" : "Help and Information"}
          </h3>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {isHindi
              ? "जन सेवा केंद्र पर आने से पहले सामान्य सवालों के जवाब यहां देख सकते हैं।"
              : "Jan Seva Kendra par aane se pehle common questions ke answers yahan check kar sakte hain."}
          </p>
        </div>

        <div className="space-y-3">
          {faqData.map((faq, index) => {
            const isOpen = openFaq === index;
            const tag = isHindi ? faq.tagHi || faq.tag : faq.tag;
            const question = isHindi
              ? faq.questionHi || faq.question
              : faq.question;
            const answer = isHindi ? faq.answerHi || faq.answer : faq.answer;

            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => handleToggleFaq(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-4 p-4 text-left hover:bg-slate-50"
                >
                  <span className="flex items-start gap-3">
                    <HelpCircle className="mt-1 h-4 w-4 shrink-0 text-blue-700" />

                    <span>
                      {tag && (
                        <span className="mb-1 inline-block rounded-sm bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
                          {tag}
                        </span>
                      )}

                      <span className="block text-sm font-bold leading-5 text-blue-950">
                        {question}
                      </span>
                    </span>
                  </span>

                  <ChevronDown
                    className={`mt-1 h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="pl-7 text-sm leading-6 text-slate-600">
                      {answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;