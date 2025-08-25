import React from "react";
import { Inbox } from "lucide-react";
import TaskItem from "./TaskItem";
import { AnimatePresence } from "framer-motion"; 

export default function TaskList({ tasks, toggleTask, deleteTask, editTask }) {
  if (tasks.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center text-gray-500">
        <Inbox className="h-10 w-10 mb-2 text-gray-600" />
        <p className="text-sm">No tasks available. Start by adding one!</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <AnimatePresence mode="popLayout"> 
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
