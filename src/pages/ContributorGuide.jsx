import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, textVariant } from '../utils/motion';
import { useTheme } from '../context/ThemeContext';
import { 
  FiGithub, 
  FiExternalLink, 
  FiCopy, 
  FiCheck, 
  FiGitBranch, 
  FiGitCommit, 
  FiGitPullRequest, 
  FiUsers, 
  FiHeart, 
  FiBook, 
  FiTerminal, 
  FiMessageSquare, 
  FiFileText, 
  FiEye, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiZap,
  FiChevronDown,
  FiChevronUp 
} from 'react-icons/fi';


const ContributorGuide = () => {
  const { isDarkMode } = useTheme();
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [copiedCommand, setCopiedCommand] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const copyToClipboard = (text, commandId) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(commandId);
    setTimeout(() => setCopiedCommand(''), 2000);
  };

  const commands = [
    {
      id: 'clone',
      title: 'Clone your fork',
      command: 'git clone https://github.com/YOUR-USERNAME/BizFlow.git',
      description: 'Replace YOUR-USERNAME with your GitHub username'
    },
    {
      id: 'branch',
      title: 'Create a new branch',
      command: 'git checkout -b feature/your-feature-name',
      description: 'Create and switch to a new branch for your changes'
    },
    {
      id: 'add',
      title: 'Stage your changes',
      command: 'git add .',
      description: 'Add all modified files to staging area'
    },
    {
      id: 'commit',
      title: 'Commit your changes',
      command: 'git commit -m "Add: your descriptive commit message"',
      description: 'Commit your staged changes with a clear message'
    },
    {
      id: 'push',
      title: 'Push to your fork',
      command: 'git push origin feature/your-feature-name',
      description: 'Push your branch to your forked repository on GitHub'
    }
  ];

  const steps = [
    {
      icon: <FiGitBranch className="w-6 h-6" />,
      title: 'Fork the Repository',
      description: 'Click the "Fork" button on the GitHub repository page to create your own copy.',
      details: 'This creates a personal copy of the project in your GitHub account that you can freely modify.'
    },
    {
      icon: <FiTerminal className="w-6 h-6" />,
      title: 'Clone Locally',
      description: 'Download your forked repository to your computer using git clone.',
      details: 'This creates a local working copy where you can make and test your changes.'
    },
    {
      icon: <FiGitBranch className="w-6 h-6" />,
      title: 'Create a Branch',
      description: 'Create a new branch for your feature or bug fix.',
      details: 'Branches keep your changes organized and separate from the main codebase.'
    },
    {
      icon: <FiGitCommit className="w-6 h-6" />,
      title: 'Make Changes',
      description: 'Edit files, add features, or fix bugs in your local repository.',
      details: 'Take your time to write clean, well-documented code that follows the project standards.'
    },
    {
      icon: <FiGitCommit className="w-6 h-6" />,
      title: 'Commit & Push',
      description: 'Save your changes and upload them to your GitHub fork.',
      details: 'Write clear commit messages that explain what changes you made and why.'
    },
    {
      icon: <FiGitPullRequest className="w-6 h-6" />,
      title: 'Open Pull Request',
      description: 'Submit your changes for review by creating a pull request.',
      details: 'Describe your changes clearly and be open to feedback from maintainers.'
    }
  ];

  const prSteps = [
    {
      icon: <FiGitPullRequest className="w-7 h-7" />,
      title: 'Navigate to Pull Requests',
      description: 'Go to your forked repository on GitHub and click the "Pull requests" tab.',
      tip: 'You might also see a yellow banner suggesting to create a PR after pushing your branch!'
    },
    {
      icon: <FiZap className="w-7 h-7" />,
      title: 'Click "New Pull Request"',
      description: 'Click the green "New pull request" button to start creating your PR.',
      tip: 'Make sure you\'re comparing your branch to the correct base repository and branch.'
    },
    {
      icon: <FiEye className="w-7 h-7" />,
      title: 'Review Your Changes',
      description: 'GitHub will show you a diff of all the changes you\'ve made. Review them carefully.',
      tip: 'This is your last chance to spot any issues before submitting. Look for typos or debugging code!'
    },
    {
      icon: <FiFileText className="w-7 h-7" />,
      title: 'Write a Descriptive Title',
      description: 'Create a clear, concise title that summarizes what your PR accomplishes.',
      tip: 'Good: "Add dark mode toggle to header". Bad: "Updated some files".'
    },
    {
      icon: <FiMessageSquare className="w-7 h-7" />,
      title: 'Add Detailed Description',
      description: 'Explain what changes you made, why you made them, and how to test them.',
      tip: 'Include screenshots for UI changes and mention any breaking changes or dependencies.'
    },
    {
      icon: <FiCheckCircle className="w-7 h-7" />,
      title: 'Submit Your PR',
      description: 'Click "Create pull request" to submit your contribution for review!',
      tip: 'Congratulations! You\'ve just made your first contribution. The maintainers will review it soon.'
    }
  ];

  const faqs = [
    {
      question: 'What is a fork?',
      answer: 'A fork is your personal copy of someone else\'s repository. It allows you to freely experiment with changes without affecting the original project. You can later submit your changes back to the original project through a pull request.',
      category: 'basics',
      icon: <FiGitBranch className="w-5 h-5" />
    },
    {
      question: 'What is a pull request?',
      answer: 'A pull request (PR) is a way to propose changes to a repository. It lets you tell others about changes you\'ve pushed to a GitHub repository and request that your changes be reviewed and potentially merged into the main project.',
      category: 'basics',
      icon: <FiGitPullRequest className="w-5 h-5" />
    },
    {
      question: 'What should I name my branch?',
      answer: 'Use descriptive names like "feature/user-authentication", "fix/login-bug", or "docs/readme-update". Avoid generic names like "my-changes" or "patch". The name should clearly indicate what the branch contains.',
      category: 'workflow',
      icon: <FiGitBranch className="w-5 h-5" />
    },
    {
      question: 'How do I write good commit messages?',
      answer: 'Start with a verb like "Add", "Fix", "Update", or "Remove". Keep it under 50 characters for the title. Example: "Add user profile validation" or "Fix header responsive design issue".',
      category: 'workflow',
      icon: <FiGitCommit className="w-5 h-5" />
    },
    {
      question: 'What if my PR gets rejected?',
      answer: 'Don\'t take it personally! Rejections often happen due to timing, project direction, or minor issues that can be fixed. Read the feedback carefully, ask questions if unclear, and use it as a learning opportunity.',
      category: 'troubleshooting',
      icon: <FiAlertCircle className="w-5 h-5" />
    },
    {
      question: 'How do I handle merge conflicts?',
      answer: 'Merge conflicts occur when your changes conflict with recent updates to the main branch. Pull the latest changes, resolve conflicts manually in your editor, then commit the resolution. Many IDEs have built-in tools to help with this.',
      category: 'troubleshooting',
      icon: <FiAlertCircle className="w-5 h-5" />
    },
    {
      question: 'What if I make a mistake?',
      answer: 'Don\'t worry! Git is designed to handle mistakes. You can always create new commits to fix issues, or ask for help in the project\'s discussion forums. The maintainers are usually happy to help newcomers.',
      category: 'troubleshooting',
      icon: <FiHeart className="w-5 h-5" />
    },
    {
      question: 'How long do pull requests take to review?',
      answer: 'Review times vary by project and maintainer availability. Some PRs are reviewed within hours, others may take days or weeks. Be patient and don\'t hesitate to politely follow up if there\'s no response after a reasonable time.',
      category: 'process',
      icon: <FiEye className="w-5 h-5" />
    },
    {
      question: 'Should I create an issue before making a PR?',
      answer: 'For significant changes or new features, yes! Create an issue first to discuss your idea with maintainers. For small bug fixes or typos, you can usually go straight to a PR.',
      category: 'process',
      icon: <FiMessageSquare className="w-5 h-5" />
    },
    {
      question: 'How do I update my PR after feedback?',
      answer: 'Simply make the requested changes in your local branch, commit them, and push to the same branch. Your PR will automatically update with the new commits.',
      category: 'process',
      icon: <FiCheckCircle className="w-5 h-5" />
    }
  ];

  const faqCategories = {
    basics: { name: 'Getting Started', color: 'text-blue-600' },
    workflow: { name: 'Git Workflow', color: 'text-green-600' },
    process: { name: 'Review Process', color: 'text-purple-600' },
    troubleshooting: { name: 'Common Issues', color: 'text-orange-600' }
  };

  const resources = [
    {
      title: 'GitHub\'s Official Guide',
      description: 'Comprehensive documentation for GitHub beginners',
      url: 'https://docs.github.com/en/get-started',
      icon: <FiBook className="w-5 h-5" />
    },
    {
      title: 'Git Handbook',
      description: 'Learn the basics of Git version control',
      url: 'https://guides.github.com/introduction/git-handbook/',
      icon: <FiTerminal className="w-5 h-5" />
    },
    {
      title: 'First Contributions',
      description: 'Hands-on tutorial for your first open source contribution',
      url: 'https://firstcontributions.github.io/',
      icon: <FiUsers className="w-5 h-5" />
    }
  ];

  // Accordion Item Component
  const AccordionItem = ({ faq, index }) => {
    const isOpen = expandedFAQ === index;
    
    return (
      <div className={`border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
        <button
          onClick={() => setExpandedFAQ(isOpen ? null : index)}
          className="w-full flex justify-between items-center text-left py-5 px-1"
        >
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg bg-blue-600 text-white`}>
              {faq.icon}
            </div>
            <span className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              {faq.question}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? 
              <FiChevronUp className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} /> :
              <FiChevronDown className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            }
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className={`pb-5 px-1 ml-16 ${isDarkMode ? 'bg-slate-800/50' : 'bg-blue-50'} rounded-lg p-4`}>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // In your actual project, add PropTypes validation:
  // AccordionItem.propTypes = {
  //   faq: PropTypes.shape({
  //     question: PropTypes.string.isRequired,
  //     answer: PropTypes.string.isRequired,
  //     icon: PropTypes.element.isRequired
  //   }).isRequired,
  //   index: PropTypes.number.isRequired
  // };

  return (
    <div className={`min-h-screen pt-24 pb-16 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <motion.section
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-6 text-center mb-16"
      >
        <motion.div
          variants={textVariant(0.3)}
          className="max-w-4xl mx-auto"
        >
          <div className={`flex items-center justify-center gap-2 w-fit px-4 py-2 rounded-full mx-auto mb-6 ${isDarkMode ? 'bg-slate-800' : 'bg-blue-50'}`}>
            <FiHeart className="w-5 h-5 text-red-500" />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>Contributors Welcome</span>
          </div>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome, Future Contributor!
          </h1>
          <p className={`text-lg md:text-xl mb-8 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We're thrilled you want to contribute! Let's make your first contribution smooth and enjoyable.
          </p>
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-8 max-w-2xl mx-auto shadow-lg`}>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Every expert was once a beginner. This guide will walk you through everything you need to know 
              to make your first contribution with confidence. You've got this! 🚀
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* Step-by-Step Guide */}
      <motion.section
        variants={fadeIn('up', 0.4)}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-6 mb-16"
      >
        <h2 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Your Contribution Journey
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeIn('up', 0.1 * index)}
              className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-lg p-6 border-l-4 border-blue-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 p-3 rounded-full mr-4 text-white">
                  {step.icon}
                </div>
                <div>
                  <span className="text-sm font-semibold text-blue-600">STEP {index + 1}</span>
                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{step.title}</h3>
                </div>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>{step.description}</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{step.details}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Git Commands Cheat Sheet */}
      <motion.section
        variants={fadeIn('up', 0.6)}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-6 mb-16"
      >
        <h2 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Essential Git Commands
        </h2>
        <div className={`w-full ${isDarkMode ? 'bg-slate-800' : 'bg-gray-800'} rounded-xl p-4 md:p-6 shadow-2xl`}>
          <div className="space-y-4">
            {commands.map((cmd) => (
              <div key={cmd.id} className={`${isDarkMode ? 'bg-slate-950' : 'bg-gray-950'} rounded-lg p-3 md:p-4`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
                  <h4 className="text-blue-300 font-semibold text-sm md:text-base">{cmd.title}</h4>
                  <button
                    onClick={() => copyToClipboard(cmd.command, cmd.id)}
                    className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-500 px-3 py-2 rounded text-sm text-white transition-all duration-300 hover:scale-105 self-start sm:self-center"
                  >
                    {copiedCommand === cmd.id ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                    <span>{copiedCommand === cmd.id ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <code className="text-blue-300 block mb-2 font-mono text-sm md:text-base break-all">{cmd.command}</code>
                <p className="text-gray-400 text-xs md:text-sm">{cmd.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pull Request Creation Guide */}
      <motion.section
        variants={fadeIn('up', 0.8)}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-6 mb-16"
      >
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Creating Your Pull Request
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Once you've pushed your changes, it's time to create a pull request. This is where your contribution 
            gets reviewed and potentially merged into the main project!
          </p>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-blue-50'} rounded-2xl p-4 md:p-8 shadow-xl`}>
          <div className="space-y-6 md:space-y-8">
            {prSteps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6 group">
                <div className="flex-shrink-0 self-center md:self-start">
                  <div className="bg-blue-600 p-3 md:p-4 rounded-full text-white shadow-lg group-hover:scale-110 transition-all duration-300">
                    {step.icon}
                  </div>
                  <div className={`hidden md:block w-px h-12 bg-blue-300 mx-auto mt-4 ${index === prSteps.length - 1 ? 'hidden' : ''}`}></div>
                </div>
                <div className={`flex-1 ${isDarkMode ? 'bg-slate-700/50' : 'bg-white/80'} rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-600 bg-clip-text text-transparent font-bold text-sm">
                      STEP {index + 1}
                    </span>
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{step.title}</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 text-sm md:text-base`}>{step.description}</p>
                  <div className={`${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-lg p-3 border-l-4 border-blue-500`}>
                    <p className={`text-xs md:text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                      <span className="font-semibold">💡 Pro tip:</span> {step.tip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        variants={fadeIn('up', 1.0)}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-6 mb-16"
      >
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Frequently Asked Questions
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Got questions? We've got answers! Click on any question to expand it.
          </p>
        </div>

        {Object.entries(faqCategories).map(([categoryKey, categoryInfo]) => {
          const categoryFaqs = faqs.filter(faq => faq.category === categoryKey);
          
          return (
            <div key={categoryKey} className="mb-8">
              <h3 className={`text-xl font-bold mb-4 border-l-4 border-blue-600 pl-4 ${categoryInfo.color} ${isDarkMode ? 'text-white' : ''}`}>
                {categoryInfo.name}
              </h3>
              <div className="space-y-3">
                {categoryFaqs.map((faq, index) => {
                  const faqIndex = faqs.indexOf(faq);
                  return (
                    <div key={faqIndex} className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300`}>
                      <AccordionItem faq={faq} index={faqIndex} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </motion.section>

      {/* Learning Resources */}
      <motion.section
        variants={fadeIn('up', 1.2)}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-6 mb-16"
      >
        <h2 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Learning Resources
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 group`}
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 p-3 rounded-full mr-4 text-white group-hover:scale-110 transition-transform duration-300">
                  {resource.icon}
                </div>
                <FiExternalLink className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} group-hover:text-blue-600 transition-colors duration-300`} />
              </div>
              <h3 className={`text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{resource.title}</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{resource.description}</p>
            </a>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        variants={fadeIn('up', 1.4)}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-6"
      >
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-lg'} rounded-2xl p-8 text-center`}>
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Ready to Make Your First Contribution?</h2>
          <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            You're all set! Remember, the community is here to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open("https://github.com/adityadomle/BizFlow", "_blank")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center transform hover:-translate-y-0.5"
            >
              <FiGithub className="w-5 h-5 mr-2" />
              Continue to GitHub
            </button>
            <button
              onClick={() => window.open("/contact", "_blank")}
              className={`${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 transform hover:-translate-y-0.5`}
            >
              Join Our Community Chat
            </button>
          </div>
          <p className={`text-sm mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            💡 Pro tip: Don't hesitate to ask questions in our community channels. We're all here to help!
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default ContributorGuide;