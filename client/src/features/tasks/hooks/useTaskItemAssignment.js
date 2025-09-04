import { useTasks } from "../../../context/TaskContext";

export const useTaskItemAssignment = () => {
  const { fetchTasks } = useTasks();

  const handleAssignItem = async ({
    task,
    item,
    assignFunction,
    refetchFunction,
    payloadKey,
  }) => {
    try {
      if (!task || !item) {
        console.error("Task o item no definidos.");
        return;
      }
      await assignFunction({
        taskId: task.id,
        [payloadKey]: item.id,
      });
      refetchFunction();
      fetchTasks();
      console.log(`${item.name} asignado a la tarea ${task.id}`);
    } catch (error) {
      console.error(`Error al asignar item:`, error);
    }
  };

  return { handleAssignItem };
};
