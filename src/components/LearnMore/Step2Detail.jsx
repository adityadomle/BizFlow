import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import copyForkedURL from "../../assets/copyForkedURL.jpg";
import showTerminal from "../../assets/showTerminal.jpg";
import pasteURL from "../../assets/pasteURL.jpg";
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
        className={`mb-6 mt-5 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 ${
          isDarkMode ? "text-gray-200" : "text-gray-100"
        } `}
      >
        ← Back
      </button>

      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Clone Locally</h1>
        <p
          className={` text-2xl mb-6 ${
            isDarkMode ? "text-gray-300" : " text-gray-800"
          } `}
        >
          <span className="text-blue-400 text-2xl mb-2">Step 1:</span> Copy the
          Repo URL that you to fork into our repo .
        </p>
        <img
          src={copyForkedURL}
          alt="Step 1 Screenshot"
          className="m-8 px-2.5 py-1.5 flex justify-center align-center rounded-lg shadow-lg w-3xl"
        />
        <p
          className={` text-2xl mb-6 ${
            isDarkMode ? "text-gray-300" : " text-gray-800"
          } `}
        >
          <span className="text-blue-400 text-2xl mb-2">Step 2:</span> Create
          Folder in Your Desktop
        </p>
        <p
          className={` text-2xl mb-6 ${
            isDarkMode ? "text-gray-300" : " text-gray-800"
          } `}
        >
          <span className="text-blue-400 text-2xl mb-2">Step 3:</span> Open VS
          code For this Folder and then Open terminal Using{" "}
          <strong>Command</strong> crtl + j for windows
        </p>
        <img
          src={showTerminal}
          alt="Step 1 Screenshot"
          className="m-8 px-2.5 py-1.5 flex justify-center align-center rounded-lg shadow-lg w-3xl"
        />
        <p
          className={` text-2xl mb-6 ${
            isDarkMode ? "text-gray-300" : " text-gray-800"
          } `}
        >
          <span className="text-blue-400 text-2xl mb-2">Step 4:</span> Now paste
          Here Your Copied URL of Repo that you forked and Hit Enter 
        </p>
        <img
          src={pasteURL}
          alt="Step 1 Screenshot"
          className="m-8 px-2.5 py-1.5 flex justify-center align-center rounded-lg shadow-lg w-3xl"
        />
        <h2
          className={` text-2xl mb-6 ${
            isDarkMode ? "text-gray-100" : " text-gray-800"
          } `}
        >
          Conclusion
          <p
            className={`text-gray-300 text-xl m-2 ${
              isDarkMode ? "text-gray-300" : " text-gray-800"
            } `}
          >
           Forking a GitHub repository enables users to create their own copy of a project. It's useful for contributing to open-source projects or experimenting with code changes. This process encourages collaboration and allows developers to maintain separate development branches while contributing back to the original repository through pull requests. Overall, forking provides community engagement and the sharing of code among developers.
          </p>
        </h2>
      </div>
    </div>
  );
}
