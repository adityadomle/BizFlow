import React, { useEffect, useState } from "react";
import { fetchContributors } from "../../api/githubApi";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Contibutors = () => {
	const [contributors, setContributors] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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

	if (loading) return <p>Loading Contributors...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<motion.main
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
			className="h-auto mt-25 mx-5 mb-5 font-roboto">
			<div className="h-auto w-full p-5 bg-white/80 backdrop-blur-2xl z-50 border border-neutral-200 rounded-2xl flex flex-col gap-5">
				<div className="relative">
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900">
						Contributors on <span className="text-primary">BizFlow</span>
					</h1>

					<p className=" items-center text-sm sm:text-md md:text-lg text-neutral-600">
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
									className=" group flex flex-col justify-center px-5 py-5 sm:py-10 rounded-lg bg-neutral-50 gap-1 sm:gap-2 items-center border border-neutral-200 shadow-lg hover:shadow-lg hover:shadow-primary transition duration-400 hover:bg-white hover:-translate-y-2">
                                        
									{/* Avatar */}
									<img
										src={contributor.avatar_url}
										alt="Avatar"
										className="size-20 md:size-25 rounded-full group-hover:border-2 group-hover:border-primary"></img>

									{/* Github username */}
									<h2 className="flex items-center gap-2 font-medium text-xl group-hover:bg-primary rounded-3xl transition duration-300 ease-in-out group-hover:text-white p-2">
										<FaGithub />
										{contributor.login}
									</h2>

									{/* Number of contributions */}
									<p className="text-sm sm:text-md">Contributions: {contributor.contributions}</p>
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
