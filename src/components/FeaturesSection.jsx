import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const FeaturesSection = () => {
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: "🔍",
      title: "Find out what you need",
      description: "We present you a proposal and discuss nitty-gritty like",
      bg: "#F1EFFD",
    },
    {
      icon: "⚙️",
      title: "Work out the details",
      description: "Communication protocols apart from engagement models",
      bg: "#FFE7E7",
    },
    {
      icon: "🚀",
      title: "We get to work fast",
      description: "Protocols apart from engage models, pricing billing",
      bg: "#FFF3E4",
    },
  ];

  return (
    <section
      className={`max-w-7xl mx-auto px-4 py-16 transition-colors duration-500 ${
        isDarkMode ? "text-gray-100" : "text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h2
          className={`text-3xl font-bold mb-4 ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          How can we help your business?
        </h2>
        <p
          className={`${isDarkMode ? "text-gray-300/80" : "text-gray-600"}`}
        >
          When you resell Besnik, you build trust and increase
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border ${
              isDarkMode
                ? "bg-slate-800/70 border-slate-700 backdrop-blur-[1px] dark:backdrop-blur-sm dark:hover:shadow-lg "
                : "bg-white border-gray-100 "
            }`}
          >
            <div
              className="w-24 h-24 rounded-full mb-6 flex items-center justify-center transition-transform duration-300 hover:scale-105"
              style={{ backgroundColor: feature.bg }}
              aria-hidden="true"
            >
              <span className="text-3xl">{feature.icon}</span>
            </div>

            <h3
              className={`text-2xl font-medium mb-3 text-center ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {feature.title}
            </h3>

            <p
              className={`text-center ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <Link
          to="/partner"
          className={`inline-block cursor-pointer px-8 py-3 rounded-full font-medium transition-all duration-300 ease-in-out relative
            focus:outline-none focus-visible:ring-2 hover:translate-y-[-2px] ${
              isDarkMode
                ? "bg-blue-500 text-white hover:bg-blue-400 focus-visible:ring-blue-300"
                : "bg-gray-900 text-white hover:brightness-110 focus-visible:ring-gray-300"
            }`}
        >
          Become a Partner
        </Link>
      </div>
    </section>
  );
};

export default FeaturesSection;