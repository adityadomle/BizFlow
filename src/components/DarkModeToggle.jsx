import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-all duration-300 hover:scale-105"
    >
      {/* Toggle Circle */}
      <div
        className={`w-6 h-6 bg-white dark:bg-black rounded-full shadow-md transform transition-transform duration-300 ${
          isDarkMode ? "translate-x-6" : ""
        }`}
      />
      {/* Icon */}
      <span className="absolute left-1">
        {isDarkMode ? (
          <Moon size={16} className="text-white" />
        ) : (
          <Sun size={16} className="text-yellow-400" />
        )}
      </span>
    </button>
  );
}
