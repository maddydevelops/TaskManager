import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";

export default function TaskForm({ addTask }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      setError("Please add something to create a task!");
      return;
    }
    addTask(value.trim());
    setValue("");
  };


  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 1500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <form
      onSubmit={submit}
      className="mb-6 flex flex-col gap-2 rounded-2xl bg-[#121212] p-4 shadow border border-gray-800 relative"
    >
    
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a new task…"
          className="flex-1 rounded-xl bg-[#1a1a1a] border border-gray-700 px-4 py-2 text-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 px-4 py-2 font-medium text-white shadow hover:opacity-90 active:scale-[0.97] transition"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>

      {error && (
        <div className="absolute bottom-[-2.5rem] left-0 right-0 mx-auto max-w-sm rounded-md bg-red-600 px-4 py-2 text-center text-sm font-medium text-white shadow-lg">
          {error}
        </div>
      )}
    </form>
  );
}
