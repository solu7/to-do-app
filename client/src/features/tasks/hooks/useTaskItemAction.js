import { useTasks } from "../../../context/TaskContext";

export const useTaskItemAction = () => {
  const { fetchTasks } = useTasks();

  const handleTaskItemAction = async ({
    task,
    item,
    action,
    refetch,
    payloadKey,
    payloadValue,
  }) => {
    try {
      if (!task) {
        console.error("Task no definida.");
        return;
      }
      await action({
        taskId: task.id,
        [payloadKey]: payloadValue || item?.id,
      });
      refetch();
      fetchTasks();
    } catch (error) {
      console.error(`Error al interacturar con el item:`, error);
    }
  };

  return { handleTaskItemAction };
};
