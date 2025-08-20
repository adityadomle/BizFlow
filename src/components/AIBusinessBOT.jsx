import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { LoaderCircle, Sun, Moon } from "lucide-react";
import { askGroq } from "../utils/askGroq";

function AIBusinessBOT() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const chatEndRef = useRef(null);

  const askBot = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await askGroq(input);
      const reply = res.choices?.[0]?.message?.content || "No response.";
      const botMessage = { role: "bot", content: reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Something went wrong. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askBot();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-5 py-10 pt-32">
        <motion.div
          className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col h-[80vh] overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-purple-600 text-white text-lg font-bold flex justify-between items-center">
            🤖 AI Business Assistant
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="text-white hover:text-yellow-300 transition"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`max-w-[80%] px-4 py-3 rounded-xl shadow ${
                  msg.role === "user"
                    ? "bg-purple-600 text-white self-end ml-auto"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 self-start mr-auto"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {msg.content}
              </motion.div>
            ))}
            {loading && (
              <motion.div
                className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-xl shadow text-gray-600 dark:text-gray-300 self-start w-fit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin h-4 w-4" />
                  Thinking...
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              askBot();
            }}
            className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4"
          >
            <div className="flex gap-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask your business question..."
                rows={1}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-400 transition resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default AIBusinessBOT;
