import React from "react";
import { useTheme } from "../context/ThemeContext";

const PurposeSection = () => {
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: "🟣",
      title: "Built for impact",
      description:
        "We identify and nurture a truly diverse team of designers, developers and marketers",
    },
    {
      icon: "🔴",
      title: "In sync with you",
      description:
        "We work the way you do by adapting to your workflows and rhythm we aim to blend in for a seamless.",
    },
  ];

  return (
    <section
      id="about"
      className={`relative w-full py-16 px-4 md:px-8 transition-colors duration-500 bg-transparent`}
    >
      {!isDarkMode && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(99, 102, 241, 0.35), rgba(99, 102, 241, 0.10), transparent 70%)",
          }}
        />
      )}

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-10 md:gap-8">
          {/* Left column */}
          <div>
            <div
              className={`text-sm font-medium mb-3 tracking-wide ${
                isDarkMode ? "text-blue-300/90" : "text-indigo-600"
              }`}
            >
              ACHIEVE MORE
            </div>

            <h2
              className={`text-3xl md:text-4xl font-bold leading-tight ${
                isDarkMode ? "text-gray-100" : "text-gray-900"
              } md:w-4/5`}
            >
              Purpose of a convoy is to keep your team
            </h2>
          </div>

          {/* Right column */}
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative flex items-start space-x-4 p-5 rounded-xl border
                            transition-all duration-300 ease-out hover:translate-y-[-2px]
                            ${
                              isDarkMode
                                ? "bg-slate-800/60 border-slate-700"
                                : "bg-white border-indigo-100"
                            }
                            shadow-sm hover:shadow-lg`}
              >
                {!isDarkMode && (
                  <>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-xl"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(99,102,241,0.08), transparent 40%)",
                      }}
                    />
                  </>
                )}

                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-lg text-xl shrink-0 z-[1] transition-transform duration-300 hover:scale-105
                              ${
                                isDarkMode
                                  ? "bg-slate-700/70 text-gray-100"
                                  : "bg-indigo-50 text-indigo-600"
                              }`}
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>

                <div className="z-[1]">
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-1.5 ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurposeSection;