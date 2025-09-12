import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
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
        className={`mb-6 mt-5 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 ${
          isDarkMode ? "text-gray-200" : "text-gray-100"
        } `}
      >
        ← Back
      </button>

      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Open Pull Request</h1>
        <p
          className={` text-2xl mb-6 ${
            isDarkMode ? "text-gray-300" : " text-gray-800"
          } `}
        >
          <span className="text-blue-400 text-2xl mb-2">Step 1:</span>Navigate
          to Your Repository on GitHub: Go to the repository page where you
          pushed your branch.
          <img
            src={showCreateBranch}
            alt="Step 1 Screenshot"
            className="m-8 px-2.5 py-1.5 flex justify-center align-center rounded-lg shadow-lg w-3xl"
          />
        </p>
        <p
          className={` text-2xl mb-6 ${
            isDarkMode ? "text-gray-300" : " text-gray-800"
          } `}
        >
          <span className="text-blue-400 text-2xl mb-2">Step 2:</span> Click on
          “Pull Requests” Tab: On the repository’s page, click the “Pull
          Requests” tab.
        </p>
        <p
          className={` text-2xl mb-6 ${
            isDarkMode ? "text-gray-300" : " text-gray-800"
          } `}
        >
          <span className="text-blue-400 text-2xl mb-2">Step 3:</span> Click
          “New Pull Request”: GitHub will suggest comparing your feature branch
          with the base branch (e.g., main). Click “New Pull Request.”
        </p>
        <p
          className={` text-2xl mb-6 ${
            isDarkMode ? "text-gray-300" : " text-gray-800"
          } `}
        >
          <span className="text-blue-400 text-2xl mb-2">Step 4:</span> Review
          Changes and Add Details: Review the changes, add a title and
          description for the pull request, and include relevant context.
        </p>

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
          Now you are all set ...if Everything is fine..till now ...You have wait till the PR merged
          </p>
        </h2>
      </div>
    </div>
  );
}
