import { createContext, useState, useEffect, useContext } from "react";
import {
  getInboxTasks,
  getAllTasks,
  getCompletedTasks,
  getTodayTasks,
  getUpcomingTasks,
} from "../features/tasks/services/tasksServices";
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasksAll, setTasksAll] = useState([]);
  const [inboxTasks, setInboxTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  const fetchAllTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasksAll(data);
    } catch (error) {
      console.error("Error al obtener todas las tareas:", error);
    }
  };

  const fetchInboxTasks = async () => {
    try {
      const data = await getInboxTasks();
      setInboxTasks(data);
    } catch (error) {
      console.error("Error al obtener las tareas de Inbox:", error);
    }
  };

  const fetchTodayTasks = async () => {
    try {
      const data = await getTodayTasks();
      setTodayTasks(data);
    } catch (error) {
      console.error("Error al obtener las tareas de hoy:", error);
    }
  };

  const fetchUpcomingTasks = async () => {
    try {
      const data = await getUpcomingTasks();
      setUpcomingTasks(data);
    } catch (error) {
      console.error("Error al obtener las tareas próximas:", error);
    }
  };

  const fetchCompletedTasks = async () => {
    try {
      const data = await getCompletedTasks();
      setCompletedTasks(data);
    } catch (error) {
      console.error("Error al obtener las tareas completadas:", error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
    fetchInboxTasks();
    fetchCompletedTasks();
    fetchTodayTasks();
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
  };

  const value = {
    upcomingTasks, //* Lista de tareas (Proximas)
    todayTasks, //* Lista de tareas (Hoy)
    inboxTasks, //* Lista de tareas (Inbox)
    completedTasks, //* Lista de tareas (Completadas)
    tasksAll, //* Lista de todas las tareas (EditPanel)
    fetchUpcomingTasks, //* Recarga la la lista de las proximas tareas
    fetchTodayTasks, //* Recarga la la lista de hoy
    fetchInboxTasks, //* Recarga la la lista de inbox
    fetchCompletedTasks, //* Recarga la la lista de completadas
    fetchAllTasks, //* Recarga la lista completa
    getTaskById, //* Helper para el EditPanel
    updateTaskCompletion,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => useContext(TaskContext);
