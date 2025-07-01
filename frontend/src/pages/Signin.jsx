import React from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import Signup from "./Signup";

const Signin = () => {
 const handleLogin = async(credentialResponse)=>{
        try {
          console.log(credentialResponse.credential)
      const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
        token: credentialResponse.credential,
      },
    {
      withCredentials:true
    });
    

      // localStorage.setItem("token", res.data.data.refreshToken);
      console.log("User Info:", res.data.data.User);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c0c1e] text-white px-4">
      <div className="w-full max-w-md bg-[#161629] rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back </h2>
        <p className="text-center text-sm mb-6 text-gray-400">
          Sign in to continue to <span className="text-pink-500">SaaSFlow</span>
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-[#1e1e30] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-[#1e1e30] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition"
          >
            Sign In
          </button>
        </form>

        <div className="my-6 text-center text-gray-400">or</div>

        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => {
            console.log("Google Login Failed");
          }}
          useOneTap
        />

        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-pink-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin