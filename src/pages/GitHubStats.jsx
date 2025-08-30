import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

// 🔹 Define the GitHub username and repo we are fetching stats for
const GITHUB_USER = "adityadomle";
const GITHUB_REPO = "BizFlow";

// Custom CountUp component with enhanced animation
function AnimatedCounter({ end, duration = 2, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof end !== "number") return;
    
    const increment = end / (duration * 60);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(current));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function GitHubStats() {
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    stars: 0,
    forks: 0,
    issues: 0,
    contributors: 0,
    lastCommit: "",
    size: 0,
  });

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        setIsLoading(true);
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const repoRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}`,
          { headers }
        );
        const repoData = await repoRes.json();

        const contributorsRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contributors?per_page=1&anon=true`,
          { headers }
        );

        const contributorsCount =
          contributorsRes.headers
            .get("Link")
            ?.match(/&page=(\d+)>; rel="last"/)?.[1] || 0;

        setStats({
          stars: repoData.stargazers_count || 0,
          forks: repoData.forks_count || 0,
          issues: repoData.open_issues_count || 0,
          contributors: contributorsCount || 0,
          lastCommit: new Date(repoData.pushed_at).toLocaleDateString(),
          size: repoData.size || 0,
        });
      } catch (err) {
        console.error("Error fetching GitHub stats:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGitHubStats();
  }, []);

  const statCards = [
    {
      label: "Stars",
      value: stats.stars,
      icon: "⭐",
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/stargazers`,
      gradient: "from-yellow-400 to-orange-500",
      bgGradient: isDarkMode ? "from-yellow-500/20 to-orange-500/20" : "from-yellow-50 to-orange-50"
    },
    {
      label: "Forks",
      value: stats.forks,
      icon: "🍴",
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/network/members`,
      gradient: "from-green-400 to-emerald-500",
      bgGradient: isDarkMode ? "from-green-500/20 to-emerald-500/20" : "from-green-50 to-emerald-50"
    },
    {
      label: "Issues",
      value: stats.issues,
      icon: "🐛",
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/issues`,
      gradient: "from-red-400 to-pink-500",
      bgGradient: isDarkMode ? "from-red-500/20 to-pink-500/20" : "from-red-50 to-pink-50"
    },
    {
      label: "Contributors",
      value: stats.contributors,
      icon: "👥",
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/graphs/contributors`,
      gradient: "from-blue-400 to-indigo-500",
      bgGradient: isDarkMode ? "from-blue-500/20 to-indigo-500/20" : "from-blue-50 to-indigo-50"
    },
    {
      label: "Last Commit",
      value: stats.lastCommit,
      icon: "⏰",
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/commits`,
      gradient: "from-purple-400 to-violet-500",
      bgGradient: isDarkMode ? "from-purple-500/20 to-violet-500/20" : "from-purple-50 to-violet-50"
    },
    {
      label: "Size",
      value: stats.size,
      icon: "💾",
      link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}`,
      gradient: "from-cyan-400 to-blue-500",
      bgGradient: isDarkMode ? "from-cyan-500/20 to-blue-500/20" : "from-cyan-50 to-blue-50",
      suffix: " KB"
    },
  ];

  return (
    <section className={`relative py-10 px-6 overflow-hidden`}>
      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isDarkMode ? "bg-white/10" : "bg-black/5"
            }`}>
              <span className="text-2xl">📊</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${
              isDarkMode 
                ? "from-white via-gray-200 to-gray-400" 
                : "from-gray-900 via-gray-700 to-gray-500"
            } bg-clip-text text-transparent`}>
              Project Analytics
            </h2>
          </div>
          
          <p className={`text-lg max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            Real-time insights and metrics from our GitHub repository
          </p>
          
          {/* Decorative line */}
          <div className="mt-8 flex justify-center">
            <div className={`h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500`}></div>
          </div>
        </div>

        {/* Stats grid with enhanced loading state */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {statCards.map(({ label, value, icon, link, gradient, bgGradient, suffix = "" }, index) => (
            <a
              key={label}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-8 rounded-3xl border transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-700/50 hover:border-gray-600/50 backdrop-blur-sm"
                  : "bg-white/80 border-gray-200/50 hover:border-gray-300/50 backdrop-blur-sm"
              } shadow-xl hover:shadow-2xl`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: isLoading ? "none" : "fadeInUp 0.6s ease-out forwards"
              }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon with enhanced styling */}
                <div className={`mb-6 relative transform group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                  <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center ${
                    isDarkMode ? "bg-gray-700/50" : "bg-white/50"
                  } backdrop-blur-sm`}>
                    <span className="text-3xl">{icon}</span>
                  </div>
                </div>

                {/* Value with loading state */}
                <div className={`mb-3 text-3xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {isLoading ? (
                    <div className={`animate-pulse h-8 w-16 rounded ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}></div>
                  ) : typeof value === "number" ? (
                    <AnimatedCounter end={value} suffix={suffix} />
                  ) : (
                    <span className="text-lg">{value}</span>
                  )}
                </div>

                {/* Label */}
                <div className={`text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                  isDarkMode 
                    ? "text-gray-400 group-hover:text-gray-200" 
                    : "text-gray-600 group-hover:text-gray-800"
                }`}>
                  {label}
                </div>

                {/* Hover indicator */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`flex items-center gap-1 text-xs ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}>
                    <span>View on GitHub</span>
                    <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer note */}
        <div className="text-center mt-12">
          <p className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
            Data refreshed in real-time from GitHub API
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}