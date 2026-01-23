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
    fetchUpcomingTasks();
  }, []);
  
  const getTaskById = (taskId) => {
    const idToFind = parseInt(taskId, 10);
    return tasksAll.find((task) => task.id === idToFind);
  };

  const refreshAllLists = () => {
    fetchTodayTasks(); //* Recarga la la lista de hoy
    fetchUpcomingTasks(); //* Recarga la la lista de las proximas tareas
    fetchInboxTasks(); //* Recarga la la lista de inbox
    fetchAllTasks(); //* Recarga la lista completa
    fetchCompletedTasks(); //* Recarga la la lista de completadas
  };

  const value = {
    upcomingTasks,
    todayTasks,
    inboxTasks,
    completedTasks,
    tasksAll,
    refreshAllLists,
    getTaskById,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => useContext(TaskContext);
