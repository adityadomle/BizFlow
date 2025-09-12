import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import forkRepoDemo from "../../assets/forkRepoDemo.jpg";
import showForkedRepo from "../../assets/showForkedRepo.jpg";
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
        <h1 className="text-3xl font-bold mb-6">Fork the Repository</h1>
        <p className={` text-2xl mb-6 ${isDarkMode ? "text-gray-300" :" text-gray-800"} `}>
          <span className="text-blue-400 text-2xl mb-2">Step 1:</span> Open the
          repository that you want to Fork there You can see the icon as shown
          in the image below in the repo’s top right corner. Now, this feature
          is used to Fork the repo.
        </p>
        <p className=" text-blue-300 text-xl text-center mb-6 mt-0.5">
          Here we are using a sample repo of Our Website repository
        </p>
        <img
          src={forkRepoDemo}
          alt="Step 1 Screenshot"
          className="m-8 px-2.5 py-1.5 flex justify-center align-center rounded-lg shadow-lg w-3xl"
        />
        <p className={` text-2xl mb-6 ${isDarkMode ? "text-gray-300" :" text-gray-800"} `}>
          <span className="text-blue-400 text-2xl mb-2">Step 2:</span> CLick On
          fork
        </p>
        <p className={` text-2xl mb-6 ${isDarkMode ? "text-gray-300" :" text-gray-800"} `}>
          <span className="text-blue-400 text-2xl mb-2">Step 3:</span> Now you
          have your own copy of the repository.
        </p>
        <img
          src={showForkedRepo}
          alt="Step 1 Screenshot"
          className="m-8 px-2.5 py-1.5 flex justify-center align-center rounded-lg shadow-lg w-3xl"
        />
        <h2 className={` text-2xl mb-6 ${isDarkMode ? "text-gray-100" :" text-gray-800"} `}>
          Conclusion
          <p className={`text-gray-300 text-xl m-2 ${isDarkMode ? "text-gray-300" :" text-gray-800"} `}>
            Now we can see your user name(**********)/ adityadomle/BizFlow and
            also below that, we have the link to the original project I forked
            from. Whatever changes are made to ‘******/ adityadomle/BizFlow We
            can make my changes here and then make a Pull Request to the
            maintainers of the project. Now it is in their hand if they will
            accept or reject your changes to the main project.
          </p>
        </h2>
      </div>
    </div>
  );
}
