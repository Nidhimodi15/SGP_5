import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import WorkspaceNavbar from "./WorkspaceNavbar";
import CodeView from "../components/codeView";
import "../styles/custom-scrollbar.css";

const CodeAndPromptArea = () => {
  const location = useLocation();
  const promptFromLocation =
    typeof location.state?.prompt === "string" ? location.state.prompt : "";

  const [prompt, setPrompt] = useState(promptFromLocation);
  const [isLoading, setIsLoading] = useState(false);

  const [currentSession, setCurrentSession] = useState({
    messages: promptFromLocation
      ? [
          {
            sender: "user",
            content: promptFromLocation,
            createdAt: new Date().toISOString(),
          },
        ]
      : [],
  });

  const [codeFiles, setCodeFiles] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setCurrentSession((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            sender: "user",
            content: prompt,
            createdAt: new Date().toISOString(),
          },
          {
            sender: "ai",
            content: "Here is the code based on your input!",
            createdAt: new Date().toISOString(),
          },
        ],
      }));

      setCodeFiles({
        "/App.js": `export default function App() {
  return <h1 className="text-3xl font-bold text-purple-600">Hello from your idea!</h1>;
};`,
      });

      setIsLoading(false);
    }, 1500);
  };

  const user = { fullName: { firstName: "User" } };

  return (
    <div className="h-screen w-full bg-gradient-to-t from-[#0a0a0a] via-[#0f111a] to-[#0d1117] text-white flex flex-col overflow-hidden">
      <WorkspaceNavbar />

      <div className="flex flex-1 h-[calc(100vh-64px)] gap-4 overflow-hidden">
        {/* Chat Area */}
        <div className="w-[30%] flex flex-col border-[#232122] border-2 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-800 flex-shrink-0">
            <h2 className="text-lg font-semibold text-white">Chat</h2>
            <p className="text-sm text-gray-400">
              Ask me anything about coding
            </p>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto chat-scrollbar">
            <div className="p-4 space-y-4">
              {/* Welcome Message */}
              <div className="bg-[#0a0a0a] rounded-lg p-4 border border-gray-800 shadow-md">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                    <span className="text-sm font-bold">AI</span>
                  </div>
                  <span className="text-sm font-medium text-gray-300">
                    AI Assistant
                  </span>
                </div>
                <p className="text-gray-300">
                  Hello
                  {user?.fullName?.firstName
                    ? `, ${user.fullName.firstName}`
                    : ""}
                  ! Ask me to build anything, and I’ll help you create it!
                </p>
              </div>

              {/* Messages */}
              {currentSession?.messages?.length > 0 ? (
                currentSession.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
                          : "bg-[#0a0a0a] text-gray-300 border border-gray-800 shadow-md"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {message.sender === "ai" && (
                          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                            <span className="text-xs font-bold">AI</span>
                          </div>
                        )}
                        <span className="text-xs font-medium opacity-70">
                          {message.sender === "user" ? "You" : "AI Assistant"}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-sm text-center bg-[#0a0a0a] rounded-lg p-4 border border-gray-800">
                  No messages yet. Start a conversation!
                </div>
              )}
            </div>
          </div>

          {/* Prompt Input */}
          <div className="border-t border-gray-800 p-4 bg-[#0a0a0a] flex-shrink-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want to build..."
                  className="w-full h-12 bg-[#0a0a0a] rounded-lg py-2 px-2 text-white resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-800"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  isLoading || !prompt.trim()
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/20"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  "Generate Code"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Code Preview */}
        <div className="flex-1 h-full custom-scrollbar bg-[#0a0a0a]">
          <CodeView files={codeFiles} />
        </div>
      </div>
    </div>
  );
};

export default CodeAndPromptArea;
