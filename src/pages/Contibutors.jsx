import React, { useEffect, useState } from "react";
import { fetchContributors } from "../../api/githubApi";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Contibutors = () => {
	const [contributors, setContributors] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { isDarkMode } = useTheme();

	useEffect(() => {
		fetchContributors("adityadomle", "BizFlow")
			.then((data) => {
				setContributors(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading) return <p className={`${isDarkMode ? "text-white" : "text-gray-900"}`}>Loading Contributors...</p>;
	if (error) return <p className={`${isDarkMode ? "text-red-400" : "text-red-600"}`}>Error: {error}</p>;

	return (
		<motion.main
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
			className="h-auto mt-25 mx-5 mb-5 font-roboto">
			<div className={`h-auto w-full p-5 backdrop-blur-2xl z-50 border rounded-2xl flex flex-col gap-5 transition-colors duration-300 ${
				isDarkMode 
					? "bg-gray-800/80 border-gray-600" 
					: "bg-white/80 border-neutral-200"
			}`}>
				<div className="relative">
					<h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold transition-colors ${
						isDarkMode ? "text-white" : "text-neutral-900"
					}`}>
						Contributors on <span className="text-primary">BizFlow</span>
					</h1>

					<p className={`items-center text-sm sm:text-md md:text-lg transition-colors ${
						isDarkMode ? "text-gray-300" : "text-neutral-600"
					}`}>
						They are the reason you can scroll through this wonderful website.
							<img
								src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Saluting%20Face.png"
								alt="Saluting Face"
								className="inline-block size-5 md:size-8"
							/>
					</p>

					{/* Underline */}
					<div className="absolute w-full h-px mt-2 bg-gradient-to-r from-primary to-transparent"></div>
				</div>

				{/* Contributor-Cards     */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 md:gap-10">
					{contributors.map((contributor, idx) => {
						return (
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: idx * 0.1 }}
								viewport={{ once: true }}
								key={idx}>
								<a
									href={contributor.html_url}
									className={`group flex flex-col justify-center px-5 py-5 sm:py-10 rounded-lg gap-1 sm:gap-2 items-center border shadow-lg hover:shadow-lg hover:shadow-primary transition duration-400 hover:-translate-y-2 ${
										isDarkMode 
											? "bg-gray-700 border-gray-600 hover:bg-gray-600" 
											: "bg-neutral-50 border-neutral-200 hover:bg-white"
									}`}>
                                        
									{/* Avatar */}
									<img
										src={contributor.avatar_url}
										alt="Avatar"
										className="size-20 md:size-25 rounded-full group-hover:border-2 group-hover:border-primary"></img>

									{/* Github username */}
									<h2 className={`flex items-center gap-2 font-medium text-xl group-hover:bg-primary rounded-3xl transition duration-300 ease-in-out group-hover:text-white p-2 ${
										isDarkMode ? "text-gray-200" : "text-gray-800"
									}`}>
										<FaGithub />
										{contributor.login}
									</h2>

									{/* Number of contributions */}
									<p className={`text-sm sm:text-md transition-colors ${
										isDarkMode ? "text-gray-300" : "text-gray-600"
									}`}>
										Contributions: {contributor.contributions}
									</p>
								</a>
							</motion.div>
						);
					})}
				</div>
			</div>
		</motion.main>
	);
};

export default Contibutors;
