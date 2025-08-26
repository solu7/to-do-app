import { createContext, useState, useEffect, useContext } from "react";
import { getLatestTasks } from "../features/tasks/services/tasksServices";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const data = await getLatestTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const value = { tasks, fetchTasks };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => useContext(TaskContext);
