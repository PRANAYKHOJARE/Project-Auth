// import { useState } from "react";

// import { loginUser } from "../services/authSerices.js";
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//     const handleChange = (e) => {
      
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await loginUser(formData);

//     localStorage.setItem("token", res.data.token);

//     alert("Login Successful");

//     navigate("/dashboard");
//   } catch (error) {
//     alert(error.response?.data?.message || "Login Failed");
//   }
// };
    
    
//     const handleGoogleSuccess = async (credentialResponse) => {
//   try {
//     const res = await axios.post(
//       "http://localhost:3000/api/auth/google",
//       {
//         credential: credentialResponse.credential,
//       }
//     );

//     localStorage.setItem("token", res.data.token);

//     navigate("/dashboard");
//   } catch (error) {
//     console.log(error);
//   }
// };

//   return (
//     <div>
//       <h1>Login</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//         />

//         <button type="submit">
//         <GoogleLogin
//   onSuccess={handleGoogleSuccess}
//   onError={() => console.log("Login Failed")}
// />
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { loginUser } from "../services/authSerices.js";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

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

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/google",
        {
          credential: credentialResponse.credential,
        }
      );

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        <p className="text-center text-gray-600">
  Don't have an account?{" "}
  <Link
    to="/signup"
    className="text-blue-600 font-medium hover:underline"
  >
    Sign Up
  </Link>
</p>

          <div className="flex justify-center pt-2">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Login Failed")}
            />
          </div>
         
          
        </form>
      </div>
    </div>
  );
}

export default Login;




