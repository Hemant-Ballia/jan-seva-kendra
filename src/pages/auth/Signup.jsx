import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Phone, Shield, User } from "lucide-react";
import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";
import { useLang } from "../../context/LangContext";

const Signup = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { lang } = useLang();
  const isHindi = lang === "hi";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    adminCode: "",
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
      adminCode: role === "user" ? "" : prev.adminCode,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;
    setSubmitting(true);

    try {
      const user = await register(formData);
      toast.success(
        user.role === "admin"
          ? isHindi
            ? "Admin account बन गया।"
            : "Admin account created successfully."
          : isHindi
            ? "Account बन गया।"
            : "Account created successfully."
      );
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
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-10 text-white md:flex md:flex-col md:justify-between">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute bottom-[-90px] right-[-90px] h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />

          <div className="relative z-10">
            <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-orange-100 backdrop-blur">
              Ishi Digitech Solutions
            </p>

            <h1 className="mt-10 max-w-lg text-4xl font-extrabold leading-tight tracking-tight">
              {isHindi
                ? "जन सेवा केंद्र पोर्टल"
                : "Jan Seva Kendra Portal"}
            </h1>

            <p className="mt-5 max-w-md text-sm font-medium leading-7 text-slate-300">
              {isHindi
                ? "सेवा बुकिंग, यूजर अकाउंट और एडमिन मैनेजमेंट के लिए सुरक्षित पोर्टल।"
                : "A secure portal for service booking, user access and admin management."}
            </p>
          </div>

          <div className="relative z-10 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm font-medium leading-6 text-slate-200 backdrop-blur">
            {isHindi
              ? "Admin access केवल अधिकृत व्यक्ति के लिए है।"
              : "Admin access is limited to authorized staff only."}
          </div>
        </section>

        <section className="p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-950">
              {isHindi ? "Signup" : "Sign Up"}
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              {isHindi
                ? "अपना role चुनें और अकाउंट बनाएं।"
                : "Choose your role and create your account."}
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
                {isHindi ? "नाम" : "Name"}
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={isHindi ? "अपना नाम लिखें" : "Enter your name"}
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                />
              </div>
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
                {isHindi ? "मोबाइल नंबर" : "Phone Number"}
              </label>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9415689523"
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
                    isHindi ? "कम से कम 6 अक्षर" : "At least 6 characters"
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

            {formData.role === "admin" && (
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-600">
                  Admin Secret Code
                </label>

                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    name="adminCode"
                    value={formData.adminCode}
                    onChange={handleChange}
                    placeholder="Enter admin secret code"
                    className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-800 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-blue-800 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? isHindi
                  ? "अकाउंट बन रहा है..."
                  : "Creating account..."
                : isHindi
                  ? "अकाउंट बनाएं"
                  : "Create Account"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm font-medium text-slate-500">
            {isHindi ? "पहले से अकाउंट है?" : "Already have an account?"}{" "}
            <Link
              to="/login"
              className="font-bold text-blue-800 hover:text-blue-950"
            >
              {isHindi ? "Login करें" : "Login"}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Signup;
