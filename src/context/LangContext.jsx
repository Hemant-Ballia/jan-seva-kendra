import { createContext, useContext, useState } from "react";

const LangContext = createContext(null);

export const LangProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    const savedLang = localStorage.getItem("jsk_lang");

    if (savedLang === "hi" || savedLang === "en") {
      return savedLang;
    }

    return "en";
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem("jsk_lang", newLang);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LangContext);

  if (!context) {
    throw new Error("useLang must be used within a LangProvider");
  }

  return context;
};