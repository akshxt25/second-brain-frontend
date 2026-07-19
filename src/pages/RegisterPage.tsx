import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"signup" | "login">("login");

  async function handleSubmit1(e: any) {
    e.preventDefault();

    const form = e.currentTarget;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!username || !email || !password) {
      alert("Incorrect Values")
      return;
    }
    const data = {
      username,
      email,
      password
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
      });

      if (res.ok) {
        alert("Account Created");
        setActiveTab("login");
      }
      else {
        alert("Account already exist");
      }
      form.username.value = "";
      form.email.value = "";
      form.password.value = "";
      return;

    } catch (err) {
      console.log("Error while sending data: ", err);
    }
  }

  async function handleSubmit2(e: any) {
    e.preventDefault();

    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      alert("Incorrect Values")
      return;
    }
    const data = {
      email,
      password
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
      });
      const backendData = await res.json();
      if (res.ok) {
        localStorage.setItem("token", backendData.token)
        localStorage.setItem("userId", backendData.userID)
        alert("Logged in Successfully");
        navigate("/HomePage");
      } else {
        alert(backendData.message || "Login failed");
      }
    } catch (err) {
      console.log("Error while sending data: ", err);
      alert("Could not reach server. Is the backend running?");
    }
  }

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-500/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-700/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center animate-fade-in-up">
        {/* Logo and Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/30 animate-float">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold gradient-text">Second Brain</h1>
        </div>
        <p className="text-surface-400 text-sm mb-8">Your digital knowledge hub</p>

        {/* Card */}
        <div className="w-[420px] bg-surface-900/80 border border-surface-700/50 rounded-2xl shadow-2xl shadow-black/30 backdrop-blur-xl overflow-hidden">
          {/* Tab Switcher */}
          <div className="flex border-b border-surface-700/50">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3.5 text-sm font-semibold transition-all duration-200 cursor-pointer relative ${
                activeTab === "login"
                  ? "text-brand-400"
                  : "text-surface-500 hover:text-surface-300"
              }`}
            >
              Sign In
              {activeTab === "login" && (
                <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-brand-500 to-brand-400 rounded-full"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-3.5 text-sm font-semibold transition-all duration-200 cursor-pointer relative ${
                activeTab === "signup"
                  ? "text-brand-400"
                  : "text-surface-500 hover:text-surface-300"
              }`}
            >
              Create Account
              {activeTab === "signup" && (
                <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-brand-500 to-brand-400 rounded-full"></div>
              )}
            </button>
          </div>

          {/* Form Content */}
          <div className="p-7 min-h-[340px]">
            {activeTab === "login" ? (
              <form onSubmit={handleSubmit2} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-surface-400">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                    name="email"
                    className="w-full h-12 rounded-xl bg-surface-800 border border-surface-700 px-4 text-sm text-surface-100 placeholder:text-surface-500 outline-none transition-all duration-200 focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 hover:border-surface-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-surface-400">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    name="password"
                    className="w-full h-12 rounded-xl bg-surface-800 border border-surface-700 px-4 text-sm text-surface-100 placeholder:text-surface-500 outline-none transition-all duration-200 focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 hover:border-surface-600"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-12 mt-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  Sign In
                </button>
                <p className="text-center text-xs text-surface-500 mt-4">
                  Don't have an account?{" "}
                  <button type="button" onClick={() => setActiveTab("signup")} className="text-brand-400 hover:text-brand-300 font-medium cursor-pointer">
                    Create one
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleSubmit1} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-surface-400">Username</label>
                  <input
                    type="text"
                    placeholder="Choose a username"
                    required
                    name="username"
                    className="w-full h-12 rounded-xl bg-surface-800 border border-surface-700 px-4 text-sm text-surface-100 placeholder:text-surface-500 outline-none transition-all duration-200 focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 hover:border-surface-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-surface-400">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                    name="email"
                    className="w-full h-12 rounded-xl bg-surface-800 border border-surface-700 px-4 text-sm text-surface-100 placeholder:text-surface-500 outline-none transition-all duration-200 focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 hover:border-surface-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-surface-400">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    required
                    name="password"
                    className="w-full h-12 rounded-xl bg-surface-800 border border-surface-700 px-4 text-sm text-surface-100 placeholder:text-surface-500 outline-none transition-all duration-200 focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 hover:border-surface-600"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-12 mt-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  Create Account
                </button>
                <p className="text-center text-xs text-surface-500 mt-4">
                  Already have an account?{" "}
                  <button type="button" onClick={() => setActiveTab("login")} className="text-brand-400 hover:text-brand-300 font-medium cursor-pointer">
                    Sign in
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-[11px] text-surface-600 mt-6">
          Save, organize & share your knowledge — all in one place.
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;