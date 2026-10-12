import { createContext, useContext, useEffect, useState } from 'react';
import * as api from '../api.js';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: when the app first loads, call api.getTasks() and store the result
  // with setTasks. On failure use setError(err.message). Either way, finish
  // with setLoading(false).

  async function addTask(data) {
    const created = await api.createTask(data);
    setTasks((prev) => [created, ...prev]);
  }

  async function editTask(id, data) {
    const updated = await api.updateTask(id, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function removeTask(id) {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const value = { tasks, loading, error, addTask, editTask, removeTask };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  return useContext(TaskContext);
}
