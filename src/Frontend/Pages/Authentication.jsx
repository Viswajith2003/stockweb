import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const AuthPages = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captcha, setCaptcha] = useState({ num1: 5, num2: 6, answer: "" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    setCaptcha({ num1, num2, answer: "" });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCaptchaChange = (e) => {
    setCaptcha({
      ...captcha,
      answer: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login logic
      if (parseInt(captcha.answer) === captcha.num1 + captcha.num2) {
        console.log("Login successful:", formData);
      } else {
        alert("Invalid CAPTCHA");
        generateCaptcha();
      }
    } else {
      // Signup logic
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      console.log("Signup successful:", formData);
    }
  };

  React.useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="min-h-screen  from-gray-900 via-blue-500 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Form Container */}
        <div className="bg-gray-800 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 ">
          <h2 className="text-white text-2xl font-semibold mb-8 text-center">
            {isLogin ? "Login Your Account" : "Create Your Account"}
          </h2>

          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email ID *
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* CAPTCHA (Login only) */}
            {isLogin && (
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Solve CAPTCHA:{" "}
                  <span className="bg-blue-900 px-2 py-1 rounded text-sm">
                    {captcha.num1} + {captcha.num2}
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="Enter the result"
                  value={captcha.answer}
                  onChange={handleCaptchaChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-600 from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>

            {/* Additional Options (Login only) */}
            {isLogin && (
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center text-gray-400">
                  <input
                    type="checkbox"
                    className="mr-2 rounded bg-gray-700 border-gray-600"
                  />
                  Remember Me
                </label>
                <button
                  type="button"
                  className="text-blue-300 hover:text-blue-500 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Toggle between Login/Signup */}
            <div className="text-center pt-4 border-t border-gray-700">
              <p className="text-gray-400">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setFormData({
                      email: "",
                      password: "",
                      confirmPassword: "",
                    });
                    generateCaptcha();
                  }}
                  className="text-blue-300 hover:text-blue-500 font-medium transition-colors"
                >
                  {isLogin ? "Register" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPages;
