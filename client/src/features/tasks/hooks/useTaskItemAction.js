import { useTasks } from "../../../context/TaskContext";

export const useTaskItemAction = () => {
  const { fetchTasks } = useTasks();

  const handleActionItem = async ({
    task,
    item,
    action,
    refetch,
    payloadKey,
  }) => {
    try {
      if (!task || !item) {
        console.error("Task o item no definidos.");
        return;
      }
      await action({
        taskId: task.id,
        [payloadKey]: item.id,
      });
      refetch();
      fetchTasks();
    } catch (error) {
      console.error(`Error al interacturar con el item:`, error);
    }
  };

  return { handleActionItem };
};
