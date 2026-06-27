import { noticesData } from "../../configs/noticesData";
import { useLang } from "../../context/LangContext";

const LiveTicker = () => {
  const { lang } = useLang();
  const isHindi = lang === "hi";

  const tickerItems = [...noticesData, ...noticesData];

  return (
    <div className="w-full border-y border-slate-200 bg-slate-50">
      <div className="flex h-10 w-full items-center overflow-hidden px-[5%]">
        <div className="mr-3 shrink-0 rounded-sm bg-blue-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          {isHindi ? "अपडेट" : "Updates"}
        </div>

        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track flex w-max items-center whitespace-nowrap text-xs font-semibold text-slate-700">
            {tickerItems.map((notice, index) => (
              <span
                key={`${notice.id}-${index}`}
                className="mr-8 inline-flex items-center gap-2"
              >
                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-blue-700">
                  New
                </span>

                <span>{isHindi ? notice.textHi || notice.text : notice.text}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTicker;