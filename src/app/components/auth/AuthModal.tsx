import React, { useState, useEffect } from "react";
import { X, Eye, EyeOff, User, Mail, Lock, ArrowRight, CheckCircle } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "register";
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  // Animation effect
  useEffect(() => {
    if (isOpen) {
      // Add a small delay to allow the entrance animation to work
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      if (mode === "register" && formData.password !== formData.confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }

      // Call the appropriate API endpoint
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const payload = mode === "login" 
        ? { email: formData.email, password: formData.password }
        : { fullName: formData.name, email: formData.email, password: formData.password };

      console.log('Sending registration request:', { endpoint, payload });

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setMessage(data.message);
        // Do not store user data in localStorage anymore
        // Trigger custom auth event for other components to update their state
        window.dispatchEvent(new CustomEvent('authStateChanged'));
        window.dispatchEvent(new Event('storage'));
        setTimeout(() => {
          onClose();
          setFormData({ name: "", email: "", password: "", confirmPassword: "" });
          setMessage("");
        }, 2000);
      } else {
        setMessage(data.error || "An error occurred");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'gmail' | 'facebook') => {
    setIsLoading(true);
    setMessage("");
    
    try {
      // For now, we'll simulate the social login process
      // In a real implementation, you would integrate with OAuth providers
      console.log(`Initiating ${provider} login...`);
      
      // Simulate API call for social login
      const response = await fetch(`/api/auth/${provider}-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(`Successfully logged in with ${provider}!`);
        window.dispatchEvent(new CustomEvent('authStateChanged'));
        window.dispatchEvent(new Event('storage'));
        setTimeout(() => {
          onClose();
          setMessage("");
        }, 2000);
      } else {
        setMessage(data.error || `Failed to login with ${provider}`);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Social login error:", error);
      setMessage(`Failed to login with ${provider}. Please try again.`);
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotMessage("");
    if (!forgotEmail) {
      setForgotMessage("Please enter your email address.");
      return;
    }
    try {
      // Simulate API call (replace with your real endpoint)
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await response.json();
      if (response.ok) {
        setForgotMessage("Password reset instructions sent to your email.");
      } else {
        setForgotMessage(data.error || "Failed to send reset instructions.");
      }
    } catch (error) {
      setForgotMessage("An error occurred. Please try again.");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Don't render anything if modal is not open and not visible
  if (!isOpen && !isVisible) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-end z-50 transition-all duration-500 ease-out ${
        isOpen ? 'bg-black/90 backdrop-blur-sm' : 'bg-black/0 pointer-events-none'
      }`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`bg-white shadow-2xl w-full max-w-md h-screen flex flex-col transform transition-all duration-500 ease-out ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        {/* Header with gradient background */}
        <div className="relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#063970] to-[#052c5c] opacity-90"></div>
          <div className="relative flex items-center justify-between px-6 py-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {forgotPasswordMode
                  ? "Forgot Password"
                  : mode === "login"
                  ? "Welcome Back"
                  : "Create Account"}
              </h2>
              <p className="text-white/80 text-sm mt-1">
                {forgotPasswordMode
                  ? "Enter your email to reset your password"
                  : mode === "login"
                  ? "Sign in to your account"
                  : "Join us today"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Forgot Password Form */}
        {forgotPasswordMode ? (
          <form onSubmit={handleForgotPassword} className="p-6 space-y-5 flex-1 overflow-y-auto">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#063970] transition-colors" />
                <input
                  type="email"
                  name="forgotEmail"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#063970]/20 focus:border-[#063970] transition-all duration-200 bg-gray-50/50"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            {forgotMessage && (
              <div className={`p-4 rounded-xl text-sm flex items-center gap-3 transition-all duration-300 ${
                forgotMessage.includes("sent")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}>
                {forgotMessage}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#063970] to-[#052c5c] text-white py-3 rounded-xl hover:from-[#052c5c] hover:to-[#063970] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Send Reset Link
            </button>
            <div className="text-center text-sm text-gray-600 pt-2">
              <button
                type="button"
                className="text-[#063970] hover:text-[#052c5c] font-semibold transition-colors hover:underline"
                onClick={() => {
                  setForgotPasswordMode(false);
                  setForgotEmail("");
                  setForgotMessage("");
                }}
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 flex-1 overflow-y-auto animate-slide-in">
            {mode === "register" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#063970] transition-colors" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#063970]/20 focus:border-[#063970] transition-all duration-200 bg-gray-50/50"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#063970] transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#063970]/20 focus:border-[#063970] transition-all duration-200 bg-gray-50/50"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#063970] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#063970]/20 focus:border-[#063970] transition-all duration-200 bg-gray-50/50"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#063970] transition-colors p-1 hover:bg-gray-100 rounded"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#063970] transition-colors" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#063970]/20 focus:border-[#063970] transition-all duration-200 bg-gray-50/50"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#063970] transition-colors p-1 hover:bg-gray-100 rounded"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center group cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-[#063970] focus:ring-[#063970]/20" />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-[#063970] hover:text-[#052c5c] transition-colors font-medium"
                  onClick={() => setForgotPasswordMode(true)}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Message Display */}
            {message && (
              <div className={`p-4 rounded-xl text-sm flex items-center gap-3 transition-all duration-300 ${
                message.includes("successful") 
                  ? "bg-green-50 text-green-700 border border-green-200" 
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}>
                {message.includes("successful") ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : null}
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#063970] to-[#052c5c] text-white py-3 rounded-xl hover:from-[#052c5c] hover:to-[#063970] transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  {mode === "login" ? "Signing in..." : "Creating account..."}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </button>

            {/* Switch Mode */}
            <div className="text-center text-sm text-gray-600 pt-2">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-[#063970] hover:text-[#052c5c] font-semibold transition-colors hover:underline"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { mode: 'register' } }));
                    }}
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-[#063970] hover:text-[#052c5c] font-semibold transition-colors hover:underline"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { mode: 'login' } }));
                    }}
                  >
                    Login
                  </button>
                </>
              )}
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Gmail Login */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('gmail')}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Gmail</span>
                </button>

                {/* Facebook Login */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('facebook')}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Facebook</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal; 