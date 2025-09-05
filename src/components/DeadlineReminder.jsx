import React, { useState, useEffect } from "react";

const DeadlineReminder = () => {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [reminders, setReminders] = useState([]);

  const addReminder = () => {
    if (task && deadline) {
      setReminders([...reminders, { task, deadline }]);
      setTask("");
      setDeadline("");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toISOString().slice(0, 16);
      reminders.forEach((reminder) => {
        if (reminder.deadline === now) {
          alert(`⏰ Reminder: ${reminder.task} deadline reached!`);
        }
      });
    }, 60000); // check every 1 minute

    return () => clearInterval(interval);
  }, [reminders]);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white mt-6">
      <h2 className="text-xl font-bold mb-2">📌 Task Deadline Reminders</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <button
          onClick={addReminder}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul>
        {reminders.map((rem, index) => (
          <li key={index} className="mb-1">
            ✅ {rem.task} — <span className="text-gray-600">{rem.deadline}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeadlineReminder;