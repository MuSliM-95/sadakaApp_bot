"use client";

import { BackButton } from "@/features/ui/BackButton";
import { ShowAdButton } from "@/features/ui/ShowAdButton";
import { useState, useEffect } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
  category?: string;
  date?: string;
}

export default function TaskTracker() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [category, setCategory] = useState("Общее");
  const [date, setDate] = useState("");

  // Загружаем задачи из localStorage при монтировании
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Сохраняем задачи в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        priority,
        category,
        date,
      },
    ]);
    setNewTask("");
    setPriority("medium");
    setCategory("Общее");
    setDate("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  const allCompleted = tasks.length > 0 && tasks.every((t) => t.completed);
  const toggleAll = () => {
    setTasks(tasks.map((t) => ({ ...t, completed: !allCompleted })));
  };

  const getPriorityColor = (p?: string) => {
    if (p === "high") return "text-red-400";
    if (p === "medium") return "text-yellow-400";
    return "text-green-400";
  };

  const groupedByDate = tasks.reduce((acc: Record<string, Task[]>, task) => {
    const key = task.date || "Без даты";
    if (!acc[key]) acc[key] = [];
    acc[key].push(task);
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <ShowAdButton />
      <BackButton />
      <h1 className="text-2xl sm:text-3xl font-bold mt-6 sm:mt-0 mb-4">
        Трекер задач 
      </h1>

      <div className="flex flex-col sm:flex-row w-full max-w-xl mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          className="flex-1 p-3 rounded-md text-white bg-neutral-700 placeholder-gray-300 text-sm break-words overflow-hidden truncate"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Добавить новую задачу"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
          className="p-3 rounded-md   text-sm"
        >
          <option className="text-black" value="low">
            Низкий
          </option>
          <option className="text-black" value="medium">
            Средний
          </option>
          <option className="text-black" value="high">
            Высокий
          </option>
        </select>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Категория"
          className="p-3 rounded-md text-sm break-words overflow-hidden truncate"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-3 rounded-md text-sm"
        />
        <button
          onClick={addTask}
          className="bg-white cursor-pointer text-black px-4 rounded-md font-bold transition"
        >
          Добавить
        </button>
      </div>

      {Object.keys(groupedByDate).map((d) => (
        <div key={d} className="w-full max-w-xl mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 border-b border-white/20 pb-1">
            {d}
          </h2>
          <ul className="space-y-2">
            {groupedByDate[d].map((task) => (
              <li
                key={task.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-neutral-950 p-3 rounded shadow hover:shadow-lg transition max-w-full overflow-hidden"
              >
                <label
                  className={`flex-1 cursor-pointer ${
                    task.completed ? "line-through text-neutral-500" : ""
                  } mb-1 sm:mb-0 break-words max-w-full truncate`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="mr-2"
                  />
                  <span
                    className={`${getPriorityColor(
                      task.priority
                    )} font-semibold mr-2`}
                  >
                    ●
                  </span>
                  {task.text}
                </label>
                {task.category && (
                  <p className="text-xs text-white/60 sm:ml-4 break-words max-w-full truncate">
                    Категория: {task.category}
                  </p>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 font-bold hover:text-red-600 transition sm:ml-4 mt-1 sm:mt-0"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {tasks.length > 0 && (
        <p className="mt-6 text-white/70 text-sm">
          Прогресс: {tasks.filter((t) => t.completed).length} / {tasks.length}
        </p>
      )}
    </div>
  );
}
