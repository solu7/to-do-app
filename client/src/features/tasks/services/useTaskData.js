import { useState, useEffect } from "react";

/**
 * Hook para obtener tags, categorías, etc de varias tareas.
 * @param {Array<Object>} tasks - La lista de tareas.
 * @param {Function} fetchFunction - Funcion que llama a la API.
 * @returns {Object} Un objeto con los datos, donde la clave es el ID de la tarea y el valor es la data obtenida.
 */
export const useTaskData = (tasks, fetchFunction, externalTrigger = null) => {
  const [dataByTaskId, setDataByTaskId] = useState({});
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (
        !tasks ||
        (Array.isArray(tasks) && tasks.length === 0) ||
        !fetchFunction
      ) {
        return;
      }

      const taskList = Array.isArray(tasks) ? tasks : [tasks];

      try {
        const allData = {};
        for (const task of taskList) {
          const data = await fetchFunction({ taskId: task.id });
          allData[task.id] = data;
        }
        setDataByTaskId(allData);
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };

    fetchData();
  }, [tasks, fetchFunction, refetchTrigger, externalTrigger]);
  const refetch = () => setRefetchTrigger((prev) => prev + 1);

  return { data: dataByTaskId, refetch };
};
