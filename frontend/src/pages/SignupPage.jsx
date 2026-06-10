import { useState } from "react";
import { registerUser } from "../services/authSerices.js";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(formData);

      localStorage.setItem("token", res.data.token);

      alert("Registration Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_TODO_API_URL}/auth/google`,
        {
          credential: credentialResponse.credential,
        },
      );

      localStorage.setItem("token", res.data.token);

      alert("Google Signup Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Google Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[560px]">
          {/* Left Side */}
          <div className="flex items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                  C
                </div>
              </div>

              <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                Create Account
              </h1>

              <div className="flex justify-center mb-4">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => console.log("Google Signup Failed")}
                />
              </div>

              <p className="text-center text-gray-400 mb-5">
                Or sign up with email
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition"
                >
                  Create Account
                </button>

                <p className="text-center text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-purple-600 font-semibold hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex relative items-center justify-center overflow-hidden">
            <div className="absolute top-0 left-1/4 w-48 h-48 rounded-full bg-purple-200 opacity-40"></div>

            <div className="absolute -top-8 right-16 w-32 h-32 rounded-full bg-orange-300 opacity-70"></div>

            <div className="absolute top-32 right-0 w-28 h-28 rounded-full bg-purple-300 opacity-60"></div>

            <div className="absolute bottom-12 left-20 w-24 h-36 rounded-[35px] bg-gradient-to-b from-pink-400 to-red-400 rotate-12 opacity-80"></div>

            <div className="absolute bottom-10 right-24 w-24 h-24 bg-cyan-300 rounded-tl-full rounded-br-full opacity-80"></div>

            <div className="absolute bottom-20 right-8 w-16 h-16 bg-purple-300 rounded-3xl rotate-45 opacity-70"></div>

            <div className="relative z-10 text-center px-8">
              <h2 className="text-5xl font-bold text-gray-800 leading-tight">
                Join and start
                <br />
                building amazing
                <br />
                things
              </h2>

              <p className="mt-5 text-gray-500 text-lg">
                Create your account and access your dashboard instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
