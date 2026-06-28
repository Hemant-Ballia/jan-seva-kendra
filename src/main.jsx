import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";

import App from "./App.jsx";
import { LangProvider } from "./context/LangContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <LangProvider>
          <AuthProvider>
            <App />
            <ToastContainer position="top-right" autoClose={2500} theme="colored" />
          </AuthProvider>
        </LangProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
