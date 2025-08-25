import React, { useState } from "react";
import { CheckCircle, Circle, Edit2, Trash2, Calendar } from "lucide-react";
import { motion } from "framer-motion"; 

export default function TaskItem({ task, toggleTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.name);

  const saveEdit = () => {
    const name = draft.trim();
    if (name && name !== task.name) editTask(task.id, name);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="group flex flex-col rounded-2xl bg-[#121212] p-5 shadow border border-gray-800 hover:shadow-lg transition"
    >
    
      <div className="flex items-start gap-3">
    
        <button
          onClick={() => toggleTask(task.id)}
          className="mt-1 rounded-full p-1 text-gray-400 hover:text-blue-500 transition"
          aria-label="Toggle status"
          title="Toggle status"
        >
          {task.completed ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <Circle className="h-6 w-6" />
          )}
        </button>

        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                autoFocus
                className="w-full rounded-lg bg-[#1a1a1a] border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={saveEdit}
                className="rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 px-3 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setDraft(task.name);
                  setIsEditing(false);
                }}
                className="rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-300 hover:bg-[#1e1e1e]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <h3
                className={
                  "text-base font-semibold " +
                  (task.completed
                    ? "line-through text-gray-500"
                    : "text-white")
                }
              >
                {task.name}
              </h3>

              {task.description && (
                <p className="mt-1 text-sm text-gray-400">
                  {task.description}
                </p>
              )}
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Created {task.createdAt}</span>
                </div>
                {task.updatedAt && (
                  <div className="flex items-center gap-1">
                    <span>• Updated {task.updatedAt}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {!isEditing && (
        <div className="mt-3 flex items-center justify-between">
          <span
            className={
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium " +
              (task.completed
                ? "bg-green-600 text-white"
                : "bg-blue-600 text-white")
            }
          >
            {task.completed ? "Completed" : "Pending"}
          </span>

          <div className="flex items-center gap-2 opacity-100 transition">
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg p-2 text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
              title="Edit"
            >
              <Edit2 className="h-4 w-4" /> 
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="rounded-lg p-2 text-red-500 hover:bg-[#1a1a1a]"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
