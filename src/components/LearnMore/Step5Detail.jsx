import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext"; 
import showGitCommit from "../../assets/showGitCommit.png"; 
import showGitPush from "../../assets/showGitPush.png"; 
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
        <h1 className="text-3xl font-bold mb-6">Commit & Push</h1>
        <p className={` text-2xl mb-6 ${isDarkMode ? "text-gray-300" :" text-gray-800"} `}>
          <span className="text-blue-400 text-2xl mb-2">Step 1:</span>Git commit is used for saving modifications to the current repository that we have do in previus steps ,Commits changes to your local repository, not affecting the remote repository.
          Use <strong>Command</strong> git commit -m "Your commit message" <span className="text-blue-400 text-xl mb-2">Inside Your commit message you can add describe what you done in concise manner</span>
        </p>  
         <img
          src={showGitCommit}
          alt="Step 1 Screenshot"
          className="m-8 px-2.5 py-1.5 flex justify-center align-center rounded-lg shadow-lg w-3xl"
        /> 
        <p className={` text-2xl mb-6 ${isDarkMode ? "text-gray-300" :" text-gray-800"} `}>
          <span className="text-blue-400 text-2xl mb-2">Step 2:</span> After Commit your messages you can push your local changes to remote repo use <strong>Command</strong> <span className="text-blue-400 text-xl mb-2">git push origin "your branch name"</span> 
        </p>
         <img
          src={showGitPush}
          alt="Step 1 Screenshot"
          className="m-8 px-2.5 py-1.5 flex justify-center align-center rounded-lg shadow-lg w-3xl"
        /> 
        
        <h2 className={` text-2xl mb-6 ${isDarkMode ? "text-gray-100" :" text-gray-800"} `}>
          Conclusion
          <p className={`text-gray-300 text-xl m-2 ${isDarkMode ? "text-gray-300" :" text-gray-800"} `}>
           Now all changes are pushed to the remote directory..
          </p>
        </h2>
      </div>
    </div>
  );
}
