import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import showCd from "../../assets/showCd.png"; 
import showCreateBranch from "../../assets/showCreateBranch.png"; 
export default function Step1Detail() {
  const navigate = useNavigate();

  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen p-20 relative overflow-hidden ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
      }`}
    >
      <button
        onClick={() => navigate("/contributor-guide")}
        className={`mb-6 mt-5 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 ${isDarkMode ? "text-gray-200" : "text-gray-100"} `}
      >
        ← Back
      </button>

      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create a Branch</h1>
        <p className={` text-2xl mb-6 ${isDarkMode ? "text-gray-300" :" text-gray-800"} `}>
          <span className="text-blue-400 text-2xl mb-2">Step 1:</span>Go to the current Directory use <strong>Command</strong> cd "your_fork_repo_name"
        </p>  
         <img
          src={showCd}
          alt="Step 1 Screenshot"
          className="m-8 px-2.5 py-1.5 flex justify-center align-center rounded-lg shadow-lg w-3xl"
        />
        <p className={` text-2xl mb-6 ${isDarkMode ? "text-gray-300" :" text-gray-800"} `}>
          <span className="text-blue-400 text-2xl mb-2">Step 2:</span> Create a new local branch: and switch to it. Replace new-feature-branch with your desired branch name.
        </p>
         <img
          src={showCreateBranch}
          alt="Step 1 Screenshot"
          className="m-8 px-2.5 py-1.5 flex justify-center align-center rounded-lg shadow-lg w-3xl"
        />

        <p className={` text-2xl mb-6 ${isDarkMode ? "text-gray-300" :" text-gray-800"} `}>
          <span className="text-blue-400 text-2xl mb-2">Step 3:</span> Now you
          have your own copy of the repository.if You want to switch to main branch then use <strong>Command</strong> checkout main
        </p>
        
        <h2 className={` text-2xl mb-6 ${isDarkMode ? "text-gray-100" :" text-gray-800"} `}>
          Conclusion
          <p className={`text-gray-300 text-xl m-2 ${isDarkMode ? "text-gray-300" :" text-gray-800"} `}>
           Now branch is created GO to next step
          </p>
        </h2>
      </div>
    </div>
  );
}
