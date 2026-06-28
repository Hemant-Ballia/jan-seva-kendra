import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Shield, User } from "lucide-react";
import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";
import { useLang } from "../../context/LangContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { lang } = useLang();
  const isHindi = lang === "hi";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;
    setSubmitting(true);

    try {
      const user = await login(formData);
      toast.success(isHindi ? "Login सफल रहा।" : "Login successful.");
      navigate(user.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl md:grid-cols-2">
        <section className="hidden bg-blue-950 p-8 text-white md:flex md:flex-col md:justify-between">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-orange-300">
              {isHindi ? "जन सेवा केंद्र" : "Jan Seva Kendra"}
            </div>

            <h1 className="text-3xl font-extrabold leading-tight">
              {isHindi
                ? "अपने role के अनुसार login करें"
                : "Login according to your role"}
            </h1>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              {isHindi
                ? "यूजर अपनी बुकिंग देख सकते हैं और एडमिन बुकिंग, सेवाएं और नोटिस मैनेज कर सकते हैं।"
                : "Users can view their bookings, while admins can manage bookings, services and notices."}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-200">
            {isHindi
              ? "सही role चुनना जरूरी है, वरना login नहीं होगा।"
              : "Choose the correct role, otherwise login will not work."}
          </div>
        </section>

        <section className="p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-950">
              {isHindi ? "Login" : "Login"}
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              {isHindi
                ? "अपना role चुनें और login करें।"
                : "Choose your role and login to your account."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleRoleChange("user")}
                className={`rounded-xl border px-4 py-3 text-sm font-bold transition-colors ${
                  formData.role === "user"
                    ? "border-blue-700 bg-blue-50 text-blue-800"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <User className="mx-auto mb-1 h-5 w-5" />
                User
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("admin")}
                className={`rounded-xl border px-4 py-3 text-sm font-bold transition-colors ${
                  formData.role === "admin"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Shield className="mx-auto mb-1 h-5 w-5" />
                Admin
              </button>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600">
                {isHindi ? "पासवर्ड" : "Password"}
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={
                    isHindi ? "अपना पासवर्ड लिखें" : "Enter your password"
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-11 text-sm font-semibold text-slate-800 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-blue-800 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? isHindi
                  ? "Login हो रहा है..."
                  : "Logging in..."
                : isHindi
                  ? "Login करें"
                  : "Login"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm font-medium text-slate-500">
            {isHindi ? "अकाउंट नहीं है?" : "Don't have an account?"}{" "}
            <Link
              to="/signup"
              className="font-bold text-blue-800 hover:text-blue-950"
            >
              {isHindi ? "Signup करें" : "Sign Up"}
            </Link>
          </p>

          <div className="mt-5 rounded-xl border border-orange-100 bg-orange-50 p-3 text-xs font-semibold leading-5 text-orange-800">
            {isHindi
              ? "Note: Admin login के लिए पहले admin role से signup करना होगा।"
              : "Note: For admin login, first create an account using the admin role."}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
