import { useState } from "react";
import { loginUser } from "../services/authSerices.js";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../services/authSlice.js";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
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
    const res = await loginUser(formData);
    
    const token = res.data.token;
    const user = res.data.user;
    
    // Dispatch both fields to Redux cleanly
    dispatch(loginSuccess({ user: user, token: token }));
    
    alert("Login Successful");
    navigate("/dashboard", { replace: true });
  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
  }
};

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_TODO_API_URL}/auth/google`,
        { credential: credentialResponse.credential }
      );
      dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 overflow-hidden">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[650px]">
          <div className="flex items-center justify-center p-8 md:p-14">
            <div className="w-full max-w-md">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
                  C
                </div>
              </div>
              <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                Login
              </h1>
              <div className="flex justify-center mb-5">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => console.log("Login Failed")}
                />
              </div>
              <div className="text-center text-gray-400 text-sm mb-5">
                Or sign in with email
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email} // Bound to React State
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password} // Bound to React State
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 transition"
                >
                  Login
                </button>
                <p className="text-center text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-purple-600 font-semibold hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <div className="hidden md:flex relative items-center justify-center bg-white overflow-hidden">
            <div className="absolute top-0 left-1/4 w-56 h-56 rounded-full bg-purple-200 opacity-40"></div>
            <div className="absolute -top-10 right-20 w-40 h-40 rounded-full bg-orange-300 opacity-70"></div>
            <div className="absolute top-32 right-0 w-32 h-32 rounded-full bg-purple-300 opacity-60"></div>
            <div className="absolute bottom-16 left-24 w-28 h-40 rounded-[40px] bg-gradient-to-b from-pink-400 to-red-400 rotate-12 opacity-80"></div>
            <div className="absolute bottom-12 right-28 w-28 h-28 bg-cyan-300 rounded-tl-full rounded-br-full opacity-80"></div>
            <div className="absolute bottom-24 right-8 w-20 h-20 bg-purple-300 rounded-3xl rotate-45 opacity-70"></div>
            <div className="relative z-10 text-center px-10">
              <h2 className="text-5xl font-bold text-gray-800 leading-tight">
                Changing the way
                <br />
                the world writes
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;