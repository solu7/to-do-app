import { useTasks } from "../../../context/TaskContext";

export const useTaskItemAction = () => {
  const { refreshAllLists } = useTasks();

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
      const payload = {
        taskId: task.id,
      };
      if (payloadKey) {
        payload[payloadKey] = payloadValue || item?.id;
      }
      await action(payload);
      refetch && refetch();
      refreshAllLists;
    } catch (error) {
      console.error(`Error al interacturar con el item:`, error);
    }
  };

  return { handleTaskItemAction };
};
