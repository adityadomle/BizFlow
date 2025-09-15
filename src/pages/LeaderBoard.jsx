import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaStar, FaCode, FaUsers, FaGithub, FaSearch } from "react-icons/fa";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const GITHUB_REPO = "adityadomle/bizflow";
const token = import.meta.env.VITE_GITHUB_TOKEN;

// Points configuration for different PR levels
const POINTS = {
  "level 1": 3, // Easy
  "level 2": 7, // Medium
  "level 3": 10, // Hard/Feature
};

// Color codes referenced from ContributorGuide.jsx
const colorCodes = {
  blue: {
    bg: "bg-blue-600",
    text: "text-blue-600",
    lightBg: "bg-blue-50",
    darkBg: "bg-slate-900",
    border: "border-blue-600",
    accent: "text-blue-300",
    badge: "bg-blue-600 text-white",
    badgeLight: "bg-blue-100 text-blue-700",
    badgeDark: "bg-blue-900/30 text-blue-400",
  },
  purple: {
    badgeLight: "bg-purple-100 text-purple-700",
    badgeDark: "bg-purple-900/30 text-purple-400",
  },
  green: {
    badgeLight: "bg-green-100 text-green-700",
    badgeDark: "bg-green-900/30 text-green-400",
  },
  yellow: {
    badgeLight: "bg-yellow-100 text-yellow-600",
    badgeDark: "bg-yellow-900/30 text-yellow-400",
  },
  amber: {
    badgeLight: "bg-amber-100 text-amber-600",
    badgeDark: "bg-amber-900/30 text-amber-400",
  },
  gray: {
    badgeLight: "bg-gray-100 text-gray-600",
    badgeDark: "bg-gray-800 text-gray-300",
  },
};

const Badge = ({ count, label, color }) => (
  <div
    className={`flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${color} bg-opacity-20`}
  >
    <FaCode className="mr-1 sm:mr-1.5 text-xs" />
    <span>
      {count} {label}
    </span>
  </div>
);

// Skeleton Loader Component
const SkeletonLoader = ({ isDark }) => (
  <div className={`${isDark ? colorCodes.blue.darkBg + " border-slate-700" : "bg-white border-gray-100"} rounded-xl shadow-sm border overflow-hidden`}>
    <div className={`hidden sm:grid grid-cols-12 gap-4 px-6 py-4 ${isDark ? colorCodes.blue.darkBg + " border-slate-700" : colorCodes.blue.lightBg + " border-gray-100"} border-b`}>
      <div className="col-span-1 text-sm font-medium text-gray-500 dark:text-gray-400">
        #
      </div>
      <div className="col-span-6 md:col-span-7 text-sm font-medium text-gray-500 dark:text-gray-400">
        Contributor
      </div>
      <div className="col-span-5 md:col-span-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">
        Contributions
      </div>
    </div>
    <div className="divide-y divide-gray-100 dark:divide-slate-700">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="p-4 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center sm:px-6 sm:py-4"
        >
          <div className="flex items-center space-x-3 sm:hidden">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse flex-shrink-0"></div>
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="w-24 h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
              <div className="flex space-x-2">
                <div className="w-12 h-6 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
                <div className="w-12 h-6 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="hidden sm:contents">
            <div className="col-span-1">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse"></div>
            </div>
            <div className="col-span-6 md:col-span-7">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  <div className="w-24 h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="col-span-5 md:col-span-4">
              <div className="flex items-center justify-end space-x-3">
                <div className="w-16 h-8 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
                <div className="w-16 h-8 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function LeaderBoard() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPRs: 0,
    totalContributors: 0,
    totalPoints: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkMode } = useTheme();
  const isDark = isDarkMode;

  useEffect(() => {
    const fetchContributorsWithPoints = async () => {
      try {
        let contributorsMap = {};
        let page = 1;
        const MAX_PAGES = 10;
        let keepFetching = true;

        while (keepFetching && page <= MAX_PAGES) {
          const res = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/pulls?state=closed&per_page=100&page=${page}`,
            {
              headers: {
                Accept: "application/vnd.github.v3+json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
            }
          );
          const prs = await res.json();

          if (!Array.isArray(prs) || prs.length === 0 || (prs.length === 1 && prs[0].message)) {
            keepFetching = false;
            break;
          }

          prs.forEach((pr) => {
            if (!pr.merged_at) return;
            const labels = pr.labels.map((l) => l.name.toLowerCase());
            if (!labels.includes("gssoc25")) return;

            const author = pr.user.login;
            let points = 0;
            labels.forEach((label) => {
              if (POINTS[label]) points += POINTS[label];
            });

            if (!contributorsMap[author]) {
              contributorsMap[author] = {
                username: author,
                avatar: pr.user.avatar_url,
                profile: pr.user.html_url,
                points: 0,
                prs: 0,
              };
            }

            contributorsMap[author].points += points;
            contributorsMap[author].prs += 1;
          });

          page += 1;
        }

        setContributors(
          Object.values(contributorsMap).sort((a, b) => b.points - a.points)
        );
      } catch (error) {
        console.error("Error fetching contributors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributorsWithPoints();
  }, []);

  useEffect(() => {
    if (contributors.length > 0) {
      const totalPRs = contributors.reduce((sum, c) => sum + Number(c.prs), 0);
      const totalPoints = contributors.reduce(
        (sum, c) => sum + Number(c.points),
        0
      );

      const flooredTotalPRs = Math.floor(totalPRs / 10) * 10;
      const flooredTotalPoints = Math.floor(totalPoints / 10) * 10;
      const flooredContributorsCount =
        Math.floor(contributors.length / 10) * 10;

      setStats({
        flooredTotalPRs,
        totalContributors: flooredContributorsCount,
        flooredTotalPoints,
      });
    }
  }, [contributors]);

  // Filter contributors by search term (username)
  const filteredContributors = contributors.filter((c) =>
    c.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination variables and states
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate which contributors to show on current page
  const indexOfLast = currentPage * PAGE_SIZE;
  const indexOfFirst = indexOfLast - PAGE_SIZE;
  const currentContributors = filteredContributors.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredContributors.length / PAGE_SIZE);

  // Gradient backgrounds from ContributorGuide.jsx theme
  const gradientBg = isDark
    ? colorCodes.blue.darkBg
    : colorCodes.blue.lightBg + " backdrop-blur-xl";

  const cardBg = isDark
    ? colorCodes.blue.darkBg
    : colorCodes.blue.lightBg;

  const bounceHover = {
    onMouseEnter: e => e.currentTarget.style.transform = "scale(1.07)",
    onMouseLeave: e => e.currentTarget.style.transform = "scale(1)",
    style: { transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1)" }
  };

  // Refs for contributor containers
  const contributorRefs = useRef([]);

  useGSAP(() => {
    contributorRefs.current.forEach((ref, idx) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref,
              start: "top 85%",
              scrub: 1,
              end: "top 65%"
            },
            delay: idx * 0.05,
          }
        );
      }
    });
  }, [currentContributors]);

  return (
    <div className={`${isDark ? colorCodes.blue.darkBg : "bg-gray-50"} min-h-screen py-6 sm:py-12 px-2 sm:px-4 mt-10`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 px-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className={`text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 ${colorCodes.blue.text}`}
            {...bounceHover}
          >
            GSSoC'25 Leaderboard
          </h1>
          <p {...bounceHover} className={`text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Celebrating the amazing contributions from GSSoC'25 participants.
            Join us in building something incredible together!
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="flex justify-center mb-6 px-2">
          <div className={`relative w-full max-w-xs`}>
            <input
              type="text"
              placeholder="Search contributor..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none transition-colors ${
                isDark
                  ? colorCodes.blue.darkBg + " border-slate-700 text-gray-100 placeholder:text-gray-400"
                  : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
              }`}
            />
            <FaSearch
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDark ? "text-gray-400" : "text-gray-400"
              }`}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12 px-2`}>
          <div className={`p-4 sm:p-6 rounded-xl shadow-lg border ${gradientBg} ${isDark ? "border-slate-700" : "border-blue-100"}`}>
            <div className="flex items-center">
              <div className={`p-2 sm:p-3 rounded-lg ${colorCodes.blue.badgeDark} mr-3 sm:mr-4 flex-shrink-0`}>
                <FaUsers className="text-lg sm:text-2xl" />
              </div>
              <div className="min-w-0">
                <p className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Contributors
                </p>
                <p className={`text-lg sm:text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  {loading ? "..." : stats.totalContributors}+
                </p>
              </div>
            </div>
          </div>

          <div className={`p-4 sm:p-6 rounded-xl shadow-lg border ${gradientBg} ${isDark ? "border-slate-700" : "border-blue-100"}`}>
            <div className="flex items-center">
              <div className={`p-2 sm:p-3 rounded-lg ${colorCodes.green.badgeDark} mr-3 sm:mr-4 flex-shrink-0`}>
                <FaCode className="text-lg sm:text-2xl" />
              </div>
              <div className="min-w-0">
                <p className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Pull Requests
                </p>
                <p className={`text-lg sm:text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  {loading ? "..." : stats.flooredTotalPRs}+
                </p>
              </div>
            </div>
          </div>

          <div className={`p-4 sm:p-6 rounded-xl shadow-lg border ${gradientBg} ${isDark ? "border-slate-700" : "border-blue-100"} sm:col-span-2 md:col-span-1`}>
            <div className="flex items-center">
              <div className={`p-2 sm:p-3 rounded-lg ${colorCodes.purple.badgeDark} mr-3 sm:mr-4 flex-shrink-0`}>
                <FaStar className="text-lg sm:text-2xl" />
              </div>
              <div className="min-w-0">
                <p className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Total Points
                </p>
                <p className={`text-lg sm:text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  {loading ? "..." : stats.flooredTotalPoints}+
                </p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <SkeletonLoader isDark={isDark} />
        ) : (
          <div className={`rounded-xl shadow-lg border overflow-hidden mx-2 sm:mx-0 ${gradientBg} ${isDark ? "border-slate-700" : "border-blue-100"}`}>
            {/* Desktop Table Header - Hidden on mobile */}
            <div className={`hidden sm:grid grid-cols-12 gap-4 px-6 py-4 ${isDark ? colorCodes.blue.darkBg + " border-slate-700" : colorCodes.blue.lightBg + " border-blue-100"} border-b`}>
              <div className="col-span-1 text-sm font-medium text-gray-400">
                #
              </div>
              <div className="col-span-6 md:col-span-7 text-sm font-medium text-gray-400">
                Contributor
              </div>
              <div className="col-span-5 md:col-span-4 text-sm font-medium text-gray-400 text-right">
                Contributions
              </div>
            </div>

            {/* Contributors List */}
            <div className="divide-y divide-gray-100 dark:divide-slate-700">
              {currentContributors.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No contributors found.
                </div>
              ) : (
                currentContributors.map((contributor, index) => (
                  <div
                    key={contributor.username}
                    ref={el => contributorRefs.current[index] = el}
                    className={`group ${isDark ? colorCodes.blue.darkBg : colorCodes.blue.lightBg} hover:shadow-xl transition-colors`}
                  >
                    {/* Mobile Layout */}
                    <div className="sm:hidden p-4">
                      <div className="flex items-center space-x-3">
                        {/* Rank Badge */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                            index === 0
                              ? colorCodes.yellow.badgeDark
                              : index === 1
                              ? colorCodes.gray.badgeDark
                              : index === 2
                              ? colorCodes.amber.badgeDark
                              : colorCodes.blue.badgeDark
                          }`}
                        >
                          {indexOfFirst + index + 1}
                        </div>

                        {/* Avatar */}
                        <img
                          src={contributor.avatar}
                          alt={contributor.username}
                          className={`w-10 h-10 rounded-full border-2 ${isDark ? "border-slate-700" : "border-white"} shadow-sm flex-shrink-0`}
                        />

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                              <a
                                href={contributor.profile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`font-medium ${isDark ? "text-white hover:text-blue-400" : "text-gray-900 hover:text-blue-600"} transition-colors text-sm truncate block`}
                              >
                                {contributor.username}
                              </a>
                              <a
                                href={`https://github.com/${GITHUB_REPO}/pulls?q=is:pr+author:${contributor.username}+is:merged`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-xs ${isDark ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-600"} transition-colors block`}
                              >
                                View Contributions →
                              </a>
                            </div>
                          </div>

                          {/* Badges */}
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge
                              count={contributor.prs}
                              label={`PR${contributor.prs !== 1 ? "s" : ""}`}
                              color={isDark ? colorCodes.blue.badgeDark : colorCodes.blue.badgeLight}
                            />
                            <Badge
                              count={contributor.points}
                              label="Points"
                              color={isDark ? colorCodes.purple.badgeDark : colorCodes.purple.badgeLight}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout - Hidden on mobile */}
                    <div className="hidden sm:grid grid-cols-12 gap-4 items-center px-6 py-4">
                      <div className="col-span-1">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index === 0
                              ? colorCodes.yellow.badgeDark
                              : index === 1
                              ? colorCodes.gray.badgeDark
                              : index === 2
                              ? colorCodes.amber.badgeDark
                              : colorCodes.blue.badgeDark
                          }`}
                        >
                          <span className="font-medium">
                            {indexOfFirst + index + 1}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-6 md:col-span-7">
                        <div className="flex items-center space-x-4">
                          <img
                            src={contributor.avatar}
                            alt={contributor.username}
                            className={`w-10 h-10 rounded-full border-2 ${isDark ? "border-slate-700" : "border-white"} shadow-sm`}
                          />
                          <div>
                            <a
                              href={contributor.profile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`font-medium ${isDark ? "text-white hover:text-blue-400" : "text-gray-900 hover:text-blue-600"} transition-colors`}
                            >
                              {contributor.username}
                            </a>
                            <div className="flex items-center mt-1 space-x-2">
                              <a
                                href={`https://github.com/${GITHUB_REPO}/pulls?q=is:pr+author:${contributor.username}+is:merged`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-xs ${isDark ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-600"} transition-colors`}
                              >
                                View Contributions →
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-5 md:col-span-4">
                        <div className="flex items-center justify-end space-x-3">
                          <Badge
                            count={contributor.prs}
                            label={`PR${contributor.prs !== 1 ? "s" : ""}`}
                            color={isDark ? colorCodes.blue.badgeDark : colorCodes.blue.badgeLight}
                          />
                          <Badge
                            count={contributor.points}
                            label="Points"
                            color={isDark ? colorCodes.purple.badgeDark : colorCodes.purple.badgeLight}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination Controls */}
            <div className={`flex justify-center items-center gap-2 py-4 border-t ${isDark ? "border-slate-700" : "border-blue-100"}`}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className={`px-3 py-1 rounded-md ${cardBg} text-sm disabled:opacity-50 flex items-center justify-center mt-5`}
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex justify-center gap-2 mt-4">
                {Array.from(
                  { length: Math.ceil(filteredContributors.length / PAGE_SIZE) },
                  (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded ${
                        currentPage === i + 1
                          ? isDark
                            ? colorCodes.blue.bg + " text-white"
                            : "bg-blue-600 text-white"
                          : cardBg
                      }`}
                    >
                      {i + 1}
                    </button>
                  )
                )}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className={`px-3 py-1 rounded-md ${cardBg} text-sm disabled:opacity-50 flex items-center justify-center mt-5`}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* CTA Footer */}
            <div className={`px-4 sm:px-6 py-4 text-center border-t ${cardBg}`}>
              <p className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-500"} mb-3`}>
                Want to see your name here? Join GSSoC'25 and start
                contributing!
              </p>
              <a
                href="https://gssoc.girlscript.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-3 sm:px-4 py-2 ${isDark ? colorCodes.blue.bg + " hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"} text-white text-xs sm:text-sm font-medium rounded-lg transition-colors`}
              >
                <FaGithub className="mr-1.5 sm:mr-2" /> Join GSSoC'25
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}