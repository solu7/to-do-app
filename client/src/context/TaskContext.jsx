import { createContext, useState, useEffect, useContext } from "react";
import {
  getInboxTasks,
  getAllTasks,
} from "../features/tasks/services/tasksServices";
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasksAll, setTasksAll] = useState([]);
  const [tasks, setTasks] = useState([]);

  const fetchAllTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasksAll(data);
    } catch (error) {
      console.error("Error al obtener todas las tareas:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const data = await getInboxTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener las tareas de Inbox:", error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
    fetchTasks();
  }, []);

  /**
   ** Busca una tarea por ID en la lista COMPLETA (tasksAll).
   * @param {string | number} taskId
   * @returns {object | undefined}
   */
  const getTaskById = (taskId) => {
    const idToFind = parseInt(taskId, 10);
    return tasksAll.find((task) => task.id === idToFind);
  };

  const updateTaskCompletion = (taskId, isCompleted) => {
    const idToUpdate = parseInt(taskId, 10);

    setTasksAll((prevTasks) =>
      prevTasks.map((task) =>
        task.id === idToUpdate
          ? { ...task, completed: isCompleted ? 1 : 0 }
          : task
      )
    );

    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== idToUpdate || !isCompleted)
    );
  };

  const value = {
    tasks, //* Lista de tareas activas (Inbox/TodayView)
    tasksAll, //* Lista de todas las tareas (EditPanel)
    fetchTasks, //* Recarga la lista activa
    fetchAllTasks, //* Recarga la lista completa
    getTaskById, //* Helper para el EditPanel
    updateTaskCompletion,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => useContext(TaskContext);
