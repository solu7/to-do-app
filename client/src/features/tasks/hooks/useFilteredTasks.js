import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getFilteredTasks } from "../services/tasksServices";

export const useFilteredTasks = () => {
  const [searchParams] = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const data = await getFilteredTasks(filters);
        setTasks(data);
      } catch (err) {
        setError("Error al cargar las tareas con los filtros seleccionados.");
        console.error(err);
        setTasks([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [searchParams]);

  return { tasks, isLoading, error, filters };
};
