import React, { useState } from "react";
import { Link } from "react-router-dom"; // optional, if using React Router
import { ArrowUp, ArrowUpRight } from "lucide-react";

const MainSection = ({ user = { fullName: { firstName: "User" } } }) => {
  const [messages, setMessages] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    alert(`Your idea: ${messages}`);
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-t from-[#0a0a0a] via-[#0f111a] to-[#0d1117] text-white flex flex-col items-center justify-center px-4 py-20 relative">
      {/* Top bar */}
      <div className="absolute  top-0 left-0 w-full flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold text-white ml-4">
          <Link to="/">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              SaaSFlow
            </span>
          </Link>
        </h1>
        <div className="flex items-center space-x-2  bg-pink-600 text-white px-4 py-2 mr-10 mt-4 rounded-full text-sm font-semibold">
          <span className="rounded-full bg-pink-700 w-6 h-6 flex items-center justify-center text-sm">
            {user.fullName?.firstName?.[0] || "U"}
          </span>
          <span>{user.fullName?.firstName}'s SaaSFlow</span>
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 mt-8">
        You write the{" "}
        <span className="bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">
          vision
        </span>
        . We write the code
      </h2>
      <p className="text-gray-300 text-center text-lg mb-10">
        Idea to app in seconds, with your personal full stack engineer
      </p>

      {/* Prompt Box */}
      <form
        onSubmit={submitHandler}
        className="bg-black bg-opacity-60 backdrop-blur-md rounded-xl p-6 w-full max-w-2xl shadow-2xl"
      >
        <textarea
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
          placeholder="Describe your app idea or feature..."
          className="w-full h-24 bg-[#18181b] outline-none text-white text-base resize-none placeholder-gray-400 rounded-lg p-4 border border-gray-700 focus:ring-2 focus:ring-purple-500 shadow-md transition-all duration-200"
        ></textarea>
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="text-white font-medium flex items-center space-x-2 cursor-pointer">
            📎
            <span className="underline">Attach</span>
          </div>
          <button
            type="submit"
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 shadow-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <ArrowUp size={16} />
            <span>Generate</span>
          </button>
        </div>
      </form>
    </main>
  );
};

export default MainSection;
