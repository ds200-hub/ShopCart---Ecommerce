import React, { useState } from 'react';
import { FiShoppingBag, FiUser, FiMail, FiLock, FiArrowRight, FiUsers, FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoEllipseSharp } from 'react-icons/io5';

const URL = import.meta.env.VITE_BASE_URL;

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleSelect = (value) => {
    setFormData({ ...formData, role: value });
    setIsDropdownOpen(false);
  };

  const handleNavigate = () => {
    navigate('/Login');
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${URL}/Signup`, formData, { withCredentials: true });
      const { success, role} = res.data;
      if(success){
        if(role == "user"){
          navigate("/");
        }
        else{
          navigate("/shop/shopDashboard");
        }
      }
    }
    catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div className="h-dvh w-full overflow-hidden bg-[#fedac2]/30 flex items-center justify-center p-4 font-sans box-border">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-orange-100/50">

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold tracking-tight text-gray-900 mb-2">
            <FiShoppingBag className="text-orange-500 text-2xl" />
            <span>Shop<span className="text-orange-500">Cart</span></span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Create an Account</h2>
          <p className="text-sm text-gray-500 mt-1">Sign up to get started with ShopCart</p>
        </div>

        {/* UI Template Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Account Type
            </label>
            <div className="relative">
              {/* Custom Trigger Button */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-10 pl-10 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all flex items-center justify-between text-left"
              >
                <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400">
                  <FiUsers className="w-4 h-4" />
                </div>
                <span>{formData.role === "user" ? "User (Buy Products)" : "Seller (Sell Products)"}</span>
                <div className="absolute right-3.5 flex items-center pointer-events-none text-gray-400">
                  <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Custom Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-20 text-sm">
                  <div
                    onClick={() => handleRoleSelect("user")}
                    className={`px-4 py-2.5 cursor-pointer transition-colors flex items-center justify-between ${
                      formData.role === "user" ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    User (Buy Products)
                  </div>
                  <div
                    onClick={() => handleRoleSelect("seller")}
                    className={`px-4 py-2.5 cursor-pointer transition-colors flex items-center justify-between ${
                      formData.role === "seller" ? "bg-orange-50 text-orange-600 font-medium" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Seller (Sell Products)
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1.5">
              Full Name
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400 z-10">
                <FiUser className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleInput}
                placeholder="John Doe"
                className="w-full h-10 pl-10 pr-3.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400 z-10">
                <FiMail className="w-4 h-4" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleInput}
                placeholder="name@example.com"
                className="w-full h-10 pl-10 pr-3.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400 z-10">
                <FiLock className="w-4 h-4" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleInput}
                placeholder="••••••••"
                className="w-full h-10 pl-10 pr-3.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700 mb-1.5">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400 z-10">
                <FiLock className="w-4 h-4" />
              </div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleInput}
                placeholder="••••••••"
                className="w-full h-10 pl-10 pr-3.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            type="button"
            className="w-full h-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center gap-2 group mt-2"
            onClick={handleSubmit}
          >
            <span>Create Account</span>
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="#login" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors" onClick={handleNavigate}>
            Sign In
          </a>
        </div>

      </div>
    </div>
  );
}

export default SignupPage;