import { useState } from "react";
import PropTypes from "prop-types";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

// Helper function to calculate price based on product count
const calculatePrice = (basePrice, productCount) =>
  Math.round(basePrice * (productCount / 50));

const PricingCard = ({ name, price, features, isDarkMode }) => (
  <div
    className={`relative overflow-hidden shadow-xl rounded-3xl p-8 transition-all duration-300 transform hover:-translate-y-1 ${
      isDarkMode
        ? "bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700"
        : "bg-white border border-gray-100"
    }`}
  >
    {/* Popular tag for Business plan */}
    {name === "Business" && (
      <div className="absolute top-5 right-5">
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-4 py-1 rounded-full">
          Popular
        </span>
      </div>
    )}

    <div className="space-y-6">
      {/* Plan name */}
      <h3 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
        {name}
      </h3>

      {/* Price */}
      <div className="flex items-baseline">
        <span className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          ${price}
        </span>
        <span className={`ml-2 text-base ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          /month
          </span>
      </div>

      {/* Features list */}
      <ul className="space-y-4 mt-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-center">
            <CheckCircleIcon 
              className={`w-5 h-5 mr-3 ${
                isDarkMode ? "text-purple-400" : "text-purple-600"
              }`}
            />
            <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={() => toast.info("⚒️ This feature is coming soon! Stay tuned for updates.")}
        className={`w-full py-4 px-8 rounded-xl font-semibold transition-all duration-300 
          ${name === "Business"
            ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            : isDarkMode
            ? "bg-gray-700 hover:bg-gray-600 text-white"
            : "bg-gray-100 hover:bg-gray-200 text-gray-900"
            }
        `}
      >
        Get Started
      </button>
    </div>
  </div>
);

const PricingSection = () => {
  const { isDarkMode } = useTheme();
  const [productCount] = useState(1);
  const starterBasePrice = 4000;
  const businessBasePrice = 8000;
  
  const starterPrice = calculatePrice(starterBasePrice, productCount);
  const businessPrice = calculatePrice(businessBasePrice, productCount);
  const plans = [
    {
      name: "Starter",
      price: starterPrice,
      features: [
        "Up to 10 users",
        "Email support",
        "Basic analytics dashboard",
        "Access to community forum",
        "Standard security features",
        "Weekly performance reports",
      ],
    },
    {
      name: "Business",
      price: businessPrice,
      features: [
        "Unlimited users",
        "Priority email & chat support",
        "Advanced analytics & custom reports",
        "Team collaboration tools",
        "Multiple project workspaces",
        "Daily performance insights",
      ],
    },
  ];

  return (
    <section className={`py-24 px-4 ${isDarkMode ? "bg-gray-900" : "bg-gradient-to-b from-pink-50 to-white"}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Choose the perfect plan for your business needs
          </p>
        </div>

        {/* Pricing cards grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </section>
  );
};


export default PricingSection;