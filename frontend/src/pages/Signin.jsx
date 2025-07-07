import React from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";

const Signin = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const handleLogin = async (credentialResponse) => {
    try {
      console.log(credentialResponse);
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          token: credentialResponse.credential,
        },
        {
          withCredentials: true,
        }
      );
       console.log(res.data.data.User)
       if (res.status === 200) {
        const data = res.data.data.User;
        setUser({
     googleID:data.googleID,
     email:data.email,
     name:data.name,
     profileIMG:data.profileIMG
  });
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", res.data.data.refreshToken);
        console.log("User Info:",user);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark text-text-light px-4">
      <div className="w-full max-w-md bg-bg-card rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-sm mb-6 text-text-muted">
          Sign in to continue to <span className="text-accent">SaaSFlow</span>
        </p>

        <GoogleLogin
          onSuccess={handleLogin}
          onError={() => {
            console.log("Google Login Failed");
          }}
          useOneTap
        />

        <p className="mt-6 text-center text-sm text-text-muted">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
