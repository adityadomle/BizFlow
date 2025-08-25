import { motion } from "framer-motion";
import { Calendar, Clock, Users, Zap, CheckCircle, ArrowRight, Star } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ScheduleSection = () => {
  const { isDarkMode } = useTheme();
  const handleUpcomingFeature = () => {
    // Toast notification for upcoming feature
    console.log("⚒️ Our team is working on this amazing feature! Stay tuned.");
  };

  const features = [
    {
      icon: Calendar,
      title: "Smart Calendar Sync",
      description: "Automatically sync across all platforms"
    },
    {
      icon: Clock,
      title: "24/7 Booking",
      description: "Let customers book anytime, anywhere"
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Coordinate multiple staff schedules effortlessly"
    }
  ];

  const benefits = [
    "Reduce no-shows by 40% with automated reminders",
    "Save 5+ hours weekly on manual scheduling",
    "Increase customer satisfaction with instant booking"
  ];

  return (
    <section className={`relative overflow-hidden bg-transparent`}>
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -25, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-r from-blue-200/10 to-purple-200/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-gradient-to-r from-orange-200/10 to-pink-200/10 rounded-full blur-xl"
        />
      </div>

      <div id="SCHEDULE" className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-200/30 text-blue-300'
                  : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200/50 text-blue-700'
              }`}
            >
              <Zap className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className="font-semibold text-sm">SMART SCHEDULING</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <h2 className={`text-3xl lg:text-4xl font-bold leading-tight ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-slate-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent'
              }`}>
                Transform Your Business
                <br />
                <span className="relative">
                  With AI-Powered Scheduling
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full origin-left"
                  />
                </span>
              </h2>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Automate appointments, manage team availability, and deliver exceptional customer experiences.
              </p>
            </motion.div>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className={`font-medium ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-700'
                  }`}>{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={handleUpcomingFeature}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Explore Scheduling Features</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </motion.button>

          </motion.div>

          {/* Right Column - Interactive Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Compact Dashboard Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`relative backdrop-blur-xl rounded-2xl p-6 shadow-xl border ${
                isDarkMode
                  ? 'bg-slate-800/80 border-slate-700/50'
                  : 'bg-white/80 border-white/20'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className={`text-lg font-bold ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-800'
                  }`}>Today's Schedule</h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>March 24, 2025</p>
                </div>
                <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${
                  isDarkMode
                    ? 'bg-green-900/50 text-green-300 border border-green-700/50'
                    : 'bg-green-100 text-green-700'
                }`}>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Live
                </div>
              </div>

              {/* Compact Schedule Items */}
              <div className="space-y-2">
                {[
                  { time: "09:00", client: "Sarah Johnson", type: "Consultation" },
                  { time: "11:30", client: "Mike Chen", type: "Follow-up" },
                  { time: "14:00", client: "Team Meeting", type: "Internal" }
                ].map((appointment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-xl hover:shadow-sm transition-all cursor-pointer group ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-slate-700/50 to-blue-900/30'
                        : 'bg-gradient-to-r from-slate-50 to-blue-50/50'
                    }`}
                  >
                    <div className={`font-semibold text-sm min-w-[45px] ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {appointment.time}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${
                        isDarkMode ? 'text-slate-100' : 'text-slate-800'
                      }`}>{appointment.client}</div>
                      <div className={`text-xs ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}>{appointment.type}</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      isDarkMode ? 'bg-green-400' : 'bg-green-400'
                    }`} />
                  </motion.div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className={`flex gap-4 mt-4 pt-4 border-t ${
                isDarkMode ? 'border-slate-600' : 'border-slate-100'
              }`}>
                <div className="flex-1 text-center">
                  <div className={`font-bold ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>12</div>
                  <div className={`text-xs ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>Today</div>
                </div>
                <div className="flex-1 text-center">
                  <div className={`font-bold ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}>98%</div>
                  <div className={`text-xs ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>Booked</div>
                </div>
                <div className="flex-1 text-center">
                  <div className={`font-bold ${
                    isDarkMode ? 'text-orange-400' : 'text-orange-600'
                  }`}>5h</div>
                  <div className={`text-xs ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>Saved</div>
                </div>
              </div>
            </motion.div>

            {/* Compact Feature Pills */}
            <div className="flex flex-wrap gap-3 mt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`flex items-center gap-2 backdrop-blur-lg rounded-full px-4 py-2 transition-all cursor-pointer group ${
                    isDarkMode
                      ? 'bg-slate-700/70 hover:bg-slate-600/90'
                      : 'bg-white/70 hover:bg-white/90'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <feature.icon className={`w-4 h-4 group-hover:scale-110 transition-transform ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <span className={`font-medium text-sm ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>{feature.title}</span>
                </motion.div>
              ))}
            </div>

            {/* Floating Mini Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl p-2 shadow-lg"
            >
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" />
                <div>
                  <div className="font-bold text-sm">4.9</div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;