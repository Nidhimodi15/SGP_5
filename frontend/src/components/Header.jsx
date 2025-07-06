import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");
        setToken('');
        navigate("/signin");
      } else {
        toast.error("Failed to logout");
      }
    } catch (err) {
      toast.error("Logout error: " + err.message);
    }
  };

  return (
    <nav className="flex justify-around items-center p-6 bg-transparent text-white top-0 left-0 w-full fixed z-50 bg-dark-500/80 backdrop-blur-lg shadow-md">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            SaaSFlow
          </h1>
        </Link>
      </div>

      <div className="flex space-x-6 w-120 justify-around items-center">
        <Link to="/features" className="text-gray-200 hover:text-white">
          Features
        </Link>
        <Link to="/about" className="text-gray-200 hover:text-white">
          About
        </Link>
        <Link to="/pricing" className="text-gray-200 hover:text-white">
          Pricing
        </Link>
        <Link to="/docs" className="text-gray-200 hover:text-white">
          Docs
        </Link>
        <Link to="/workspace" className="text-gray-200 hover:text-white">
          Workspace
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {token ? (
          <button
            onClick={handleLogout}
            className="hover:bg-[#000000] bg-gray-800 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/signin">
              <button className="hover:bg-[#000000] bg-gray-900 text-white px-4 py-2 rounded">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 py-2 rounded">
                Get Started
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
