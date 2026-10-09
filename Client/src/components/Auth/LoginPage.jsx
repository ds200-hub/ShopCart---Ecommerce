import React from 'react';
import { useState } from 'react';
import { FiShoppingBag, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL;


function LoginPage() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${URL}/Login`, formData, { withCredentials: true });
      const { success, id, role } = res.data;
      if (success) {
        if (role == "user") {
          navigate('/');
        }
        else{
          navigate('/shop/shopDashboard');
        }
      }
    }
    catch (err) {
      console.log(err.response.data.message);
    }
  }
  const handleNavigate = () => {
    navigate('/Signup');
  }
  return (
    <div className="h-dvh w-full overflow-hidden bg-[#fedac2]/30 flex items-center justify-center p-4 font-sans box-border">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-orange-100/50">

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-2xl font-bold tracking-tight text-gray-900 mb-2">
            <FiShoppingBag className="text-orange-500 text-2xl" />
            <span>Shop<span className="text-orange-500">Cart</span></span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">Please sign in to your account</p>
        </div>

        {/* Form Template */}
        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <FiMail className="w-4 h-4" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleInput}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <FiLock className="w-4 h-4" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleInput}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            type="button"
            className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center gap-2 group" onClick={handleSubmit}
          >
            <span>Sign In</span>
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm text-gray-500" >
          Don't have an account?{' '}
          <a href="#signup" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors" onClick={handleNavigate}>
            Sign Up
          </a>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;