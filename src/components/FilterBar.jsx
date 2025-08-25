import React from "react";

export default function FilterBar({ filter, setFilter, tasks, sort, setSort }) {
  const options = [
    { label: "All Tasks", value: "All" },
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" },
  ];

  const counts = {
    All: tasks.length,
    Pending: tasks.filter((t) => !t.completed).length,
    Completed: tasks.filter((t) => t.completed).length,
  };

  const sortOptions = [
    { label: "Sort by Newest First", value: "createdAt" },
    { label: "Sort Alphabetically", value: "alphabetical" },
  ];

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {options.map((opt) => {
          const active = filter === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={
                "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition " +
                (active
                  ? "bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow"
                  : "border border-gray-700 bg-[#121212] text-gray-300 hover:bg-[#1e1e1e]")
              }
            >
              <span>{opt.label}</span>
              <span
                className={
                  "ml-1 flex h-5 w-6 items-center justify-center rounded-full text-xs font-semibold " +
                  (active
                    ? "bg-white/20 text-white"
                    : "bg-gray-700 text-gray-200")
                }
              >
                {counts[opt.value]}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {/* Sort Buttons */}
        {sortOptions.map((opt) => {
          const active = sort === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              className={
                "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition " +
                (active
                  ? "bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow"
                  : "border border-gray-700 bg-[#121212] text-gray-300 hover:bg-[#1e1e1e]")
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
