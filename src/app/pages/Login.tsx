import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Check, Loader2 } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (formData.email && formData.password) {
      // Successful login
      localStorage.setItem("ustad_auth", "true");
      navigate("/dashboard");
    } else {
      setError("Please enter valid credentials");
    }
    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setResetSent(true);
    setIsLoading(false);
  };

  const features = [
    "Monitor platform activity in real-time",
    "Manage workers and customer accounts",
    "Process payments and commissions",
  ];

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div
            className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-10 shadow-modal"
          >
            <button
              onClick={() => {
                setShowForgotPassword(false);
                setResetSent(false);
                setForgotEmail("");
              }}
              className="text-[#888888] hover:text-[#F5F5F5] mb-6 text-sm"
            >
              ← Back to Login
            </button>

            <h2 className="font-['Poppins'] text-2xl font-bold text-[#F5F5F5] mb-2">
              Forgot Password?
            </h2>
            <p className="text-[#888888] text-sm mb-8">
              Enter your email to receive reset instructions
            </p>

            {resetSent ? (
              <div className="bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.2)] rounded-lg p-4 mb-6">
                <p className="text-[#22C55E] text-sm">
                  Check your email for reset instructions
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="admin@ustadoncall.com"
                    className="w-full h-12 px-4 bg-[#252525] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder:text-[#555555] focus:border-[#FF4500] focus:outline-none focus:ring-2 focus:ring-[rgba(255,69,0,0.25)] transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[#FF4500] hover:bg-[#E03E00] active:scale-[0.98] text-white font-semibold rounded-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] relative overflow-hidden">
      {/* Radial glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,69,0,0.06)_0%,transparent_70%)]" />

      <div className="relative min-h-screen flex">
        {/* Left Panel */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 xl:p-16">
          <div>
            <div className="flex items-center gap-3 mb-16">
              <div className="w-10 h-10 bg-[#FF4500] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="text-white font-['Poppins'] text-xl font-bold">
                UstadOnCall
              </span>
            </div>

            <h1 className="font-['Poppins'] text-4xl xl:text-5xl font-bold text-[#F5F5F5] mb-6 leading-tight">
              Control the Platform.<br />
              Manage with Confidence.
            </h1>

            <p className="text-[#888888] text-base mb-12 max-w-md">
              Access your admin dashboard to oversee operations, manage users, and drive business growth.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[rgba(255,69,0,0.12)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#FF4500]" />
                  </div>
                  <span className="text-[#C0C0C0] text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[#555555] text-xs">
            © 2026 UstadOnCall. All rights reserved.
          </p>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div
              className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-10 shadow-modal"
            >
              <div className="lg:hidden flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-[#FF4500] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">U</span>
                </div>
                <span className="text-white font-['Poppins'] text-xl font-bold">
                  UstadOnCall
                </span>
              </div>

              <h2 className="font-['Poppins'] text-2xl font-bold text-[#F5F5F5] mb-2">
                Admin Login
              </h2>
              <p className="text-[#888888] text-sm mb-8">
                Sign in to your admin account
              </p>

              {error && (
                <div className="mb-6 p-3 bg-[rgba(255,69,0,0.12)] border border-[#FF4500] rounded-lg">
                  <p className="text-[#FF4500] text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="admin@ustadoncall.com"
                    className={`w-full h-12 px-4 bg-[#252525] border ${error ? "border-[#FF4500]" : "border-[#333333]"
                      } rounded-lg text-[#F5F5F5] placeholder:text-[#555555] focus:border-[#FF4500] focus:outline-none focus:ring-2 focus:ring-[rgba(255,69,0,0.25)] transition-all`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="••••••••"
                      className={`w-full h-12 px-4 pr-12 bg-[#252525] border ${error ? "border-[#FF4500]" : "border-[#333333]"
                        } rounded-lg text-[#F5F5F5] placeholder:text-[#555555] focus:border-[#FF4500] focus:outline-none focus:ring-2 focus:ring-[rgba(255,69,0,0.25)] transition-all`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#F5F5F5] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-[#333333] bg-[#252525] text-[#FF4500] focus:ring-[#FF4500] focus:ring-offset-0"
                    />
                    <span className="text-sm text-[#C0C0C0]">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-[#FF4500] hover:text-[#FFB700] transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-[#FF4500] hover:bg-[#E03E00] active:scale-[0.98] text-white font-semibold rounded-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
