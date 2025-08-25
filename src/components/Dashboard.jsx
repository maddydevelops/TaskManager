import React from "react";
import { CheckCircle, Clock, Target, TrendingUp } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Dashboard({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const completionRate = total ? Math.round((completed / total) * 100) : 0;

  const pieData = [
    { name: "Completed", value: completed || 0, color: "#22c55e" },
    { name: "Pending", value: pending || 0, color: "#f59e0b" },
  ];
  const barData = [
    { name: "Completed", value: completed || 0, fill: "#22c55e" },
    { name: "Pending", value: pending || 0, fill: "#f59e0b" },
  ];

  const StatCard = ({ title, value, icon: Icon, gradient }) => (
    <div className="rounded-2xl bg-[#121212] p-6 shadow hover:shadow-lg transition border border-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="mt-1 text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-xl text-white ${gradient}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );

  // Optional Button Component
  const BlueButton = ({ children, onClick }) => (
    <button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition"
    >
      {children}
    </button>
  );

  return (
    <div className="bg-[#0f0f0f] min-h-screen p-8 space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold ">
          Task Manager Dashboard
        </h1>
        <p className="mt-1 text-gray-400">
          Organize your work, track your progress
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Tasks"
          value={total}
          icon={Target}
          gradient="bg-gradient-to-br from-blue-600 to-blue-400"
        />
        <StatCard
          title="Completed"
          value={completed}
          icon={CheckCircle}
          gradient="bg-gradient-to-br from-blue-600 to-blue-400"
        />
        <StatCard
          title="Pending"
          value={pending}
          icon={Clock}
          gradient="bg-gradient-to-br from-blue-600 to-blue-400"
        />
        <StatCard
          title="Completion Rate"
          value={`${completionRate}%`}
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-blue-600 to-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="rounded-2xl bg-[#121212] p-6 shadow border border-gray-800">
          <h3 className="mb-3 text-lg font-semibold text-white">
            Task Distribution
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={5}
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex justify-center gap-6">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: d.color }}
                />
                <span className="text-sm text-gray-300">
                  {d.name}: {d.value}
                </span>
              </div>
            ))}
          </div>
          {total === 0 && (
            <p className="text-center mt-3 text-gray-400">
              No tasks available. Add some tasks to see real data.
            </p>
          )}
        </div>

        {/* Bar Chart */}
        <div className="rounded-2xl bg-[#121212] p-6 shadow border border-gray-800">
          <h3 className="mb-3 text-lg font-semibold text-white">
            Task Overview
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis allowDecimals={false} stroke="#ccc" />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {total === 0 && (
            <p className="text-center mt-3 text-gray-400">
              No tasks available. Add some tasks to see real data.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
