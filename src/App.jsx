import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState(""); // New sort state

  const addTask = (taskName) => {
    if (!taskName.trim()) {
      alert("Task name cannot be empty!");
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName.trim(),
      completed: false,
      createdAt: new Date().toLocaleDateString(),
    };

    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    setFilter("All");
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newName) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, name: newName.trim(), updatedAt: new Date().toLocaleDateString() }
          : task
      )
    );
  };

  // Filtered tasks
  const filteredTasks =
    filter === "All"
      ? tasks
      : filter === "Completed"
      ? tasks.filter((t) => t.completed)
      : tasks.filter((t) => !t.completed);

  // Sorted tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === "createdAt") {
      return new Date(a.createdAt) - new Date(b.createdAt); // Oldest first
    } else if (sort === "alphabetical") {
      return a.name.localeCompare(b.name);
    } else {
      return 0;
    }
  });

  return (
    <Router>
      <div className="flex flex-col md:flex-row min-h-screen bg-[#0f0f0f] text-white">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-[#121212] p-6 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-center">Task Manager</h2>
          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              className="py-2 px-4 rounded hover:bg-blue-600 transition text-center md:text-left"
            >
              Dashboard
            </Link>
            <Link
              to="/tasks"
              className="py-2 px-4 rounded hover:bg-blue-600 transition text-center md:text-left"
            >
              Tasks
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <Routes>
            {/* Tasks Page */}
            <Route
              path="/tasks"
              element={
                <div className="rounded-2xl bg-[#121212] p-4 md:p-6 shadow border border-gray-800">
                  <h2 className="text-2xl font-bold mb-6 text-center">
                    Task Control Panel
                  </h2>
                  <TaskForm addTask={addTask} />
                  <FilterBar
                    setFilter={setFilter}
                    filter={filter}
                    tasks={tasks}
                    sort={sort}
                    setSort={setSort} // Pass sort props
                  />
                  <TaskList
                    tasks={sortedTasks} // Use sortedTasks
                    toggleTask={toggleTask}
                    deleteTask={deleteTask}
                    editTask={editTask}
                  />
                </div>
              }
            />

            {/* Dashboard Page */}
            <Route path="/" element={<Dashboard tasks={tasks} />} />
          </Routes>

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </Router>
  );
}
